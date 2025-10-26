import CryptoJS from "crypto-js";
import { VITE_ENCRYPTION_SECRET_KEY, VITE_TOKEN_KEY } from "../env";
import type {
  IQuillToolbarExtended,
  IToolBarOptions,
  QuillToolbar,
  TQuillImageBlot,
} from "../types";
import Quill, { Delta } from "quill";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_QUILL_LINK_ID, MB } from "../constants";
import type { RefObject } from "react";
import { toastErrorMessage } from "./toast.utils";
import Inline from "quill/blots/inline";

export const encryptData = (data: object | string) => {
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(
    stringData,
    VITE_ENCRYPTION_SECRET_KEY
  );
  return encrypted.toString();
};

export const decryptData = (
  encryptedData: string | null
): object | string | null => {
  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedData, VITE_ENCRYPTION_SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (decrypted) {
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  }
  return null;
};

export const removeLocalToken = () => localStorage.removeItem(VITE_TOKEN_KEY);

export const saveLocalToken = (token: string) => {
  const encryptedToken = encryptData(token);
  localStorage.setItem(VITE_TOKEN_KEY, encryptedToken);
};

export const getUserToken = () => {
  const raw_token = localStorage.getItem(VITE_TOKEN_KEY);
  if (!raw_token) {
    // throw new Error("No Token found");
    return null;
  }

  const token = decryptData(raw_token);
  if (!token) {
    // throw new Error("No Token found");
    return null;
  }
  return token as string;
};

export const debounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 300
): ((...args: Args) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const BaseImage = Quill.import("formats/image") as TQuillImageBlot;
export class QuillImage extends BaseImage {
  static create(value: { alt: string; src: string } | string) {
    const node = super.create(value) as HTMLImageElement;
    if (typeof value === "string") {
      node.setAttribute("src", value);
    } else if (value?.src) {
      node.setAttribute("src", value.src);
      if (value.alt) node.setAttribute("alt", value.alt);
    }
    return node;
  }
  static value(node: HTMLImageElement) {
    return { src: node.getAttribute("src"), alt: node.getAttribute("alt") };
  }
  static sanitize(url: string) {
    if (url.startsWith("blob:")) return url;
    const Link = Quill.import("formats/link") as {
      sanitize?: (url: string) => string;
    };
    return Link?.sanitize ? Link.sanitize(url) : url;
  }
}

export function addIdsToHeadings(quill: Quill, options: { enable: boolean }) {
  if (!options.enable) return;

  const processHeadings = () => {
    const headings = quill.root.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading: Element) => {
      if (heading.id) return;
      heading.id = uuidv4();
    });
  };

  const debouncedProcess = debounce(processHeadings, 200);
  quill.on("text-change", debouncedProcess);
}

export const buildToolbarFromOptions = (
  options?: IToolBarOptions
): QuillToolbar => {
  if (!options) return [];

  const toolbar: QuillToolbar = [];

  if (options.header?.length) toolbar.push([{ header: options.header }]);
  if (options.text?.length) toolbar.push(options.text);
  if (options.list?.length)
    toolbar.push(options.list.map((item) => ({ list: item })));
  if (options.script?.length)
    toolbar.push(options.script.map((item) => ({ script: item })));
  if (options.indent?.length)
    toolbar.push(options.indent.map((item) => ({ indent: item })));
  if (options.color || options.background) {
    const colorOptions = [
      ...(options.color ? [{ color: [] }] : []),
      ...(options.background ? [{ background: [] }] : []),
    ];
    if (colorOptions.length) toolbar.push(colorOptions);
  }
  if (options.align) toolbar.push([{ align: [] }]);
  if (options.direction) toolbar.push([{ direction: options.direction }]);
  if (options.media?.length) toolbar.push(options.media);
  if (options.misc?.length) toolbar.push(options.misc);

  return toolbar;
};

export const addBlobUrlToImage = (
  quill: Quill,
  blobUrlsRef: RefObject<string[]>
) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Validate file size (2MB max)
    if (file.size > 2 * MB) {
      toastErrorMessage("Image size must be under 2MB!");
      return;
    }

    const blobUrl = URL.createObjectURL(file);

    const range = quill.getSelection();
    if (!range) return;

    blobUrlsRef.current?.push(blobUrl);

    quill.insertEmbed(range.index, "image", blobUrl, "user");

    quill.setSelection({ index: range.index + 1, length: 0 });
  };
};

export const addIdToLink = (quill: Quill) => {
  const range = quill.getSelection();
  if (!range) return;

  const [link] = quill.scroll.descendant(Inline, range.index);

  if (!link) return;

  const domNode = (link as Inline & { domNode: HTMLElement }).domNode;
  if (domNode.getAttribute("id") === DEFAULT_QUILL_LINK_ID) {
    domNode.removeAttribute("id");
  } else {
    domNode.setAttribute("id", DEFAULT_QUILL_LINK_ID);
  }
};

export const removeDefaultCss = (delta: Delta) => {
  delta.ops = delta.ops.map((op: (typeof delta.ops)[0]) => {
    if (op.attributes) {
      ["color", "background-color", "background-image", "background"].forEach(
        (attr) => delete op?.attributes?.[attr]
      );
    }
    return op;
  });
  return delta;
};

export const createLinkIdButtonToToolbar = (quill: Quill) => {
  const toolbarContainer = document.querySelector(".ql-toolbar");
  if (toolbarContainer) {
    const toolbarModule = quill.getModule("toolbar") as IQuillToolbarExtended;
    const button = document.createElement("button");
    const section = document.createElement("span");
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" class="ql-fill">
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      <circle cx="12" cy="12" r="5"></circle>
    </svg>`;
    button.type = "button";
    button.onclick = () => toolbarModule?.handlers.addIdToLink();
    section.classList.add("ql-formats");
    section.appendChild(button);
    toolbarContainer.appendChild(section);
  }
};

export const removeUnusedBlobUrls = (
  quill: Quill,
  blobUrlsRef: RefObject<string[]>
) => {
  const editorImages = Array.from(quill.root.querySelectorAll("img")).map(
    (img) => img.getAttribute("src")
  );

  const removedBlobUrls = blobUrlsRef.current?.filter(
    (url) => !editorImages.includes(url)
  );

  removedBlobUrls?.forEach((url) => URL.revokeObjectURL(url));

  if (blobUrlsRef.current) {
    const filteredUrls = blobUrlsRef.current.filter((url) =>
      editorImages.includes(url)
    );
    blobUrlsRef.current.length = 0; // clear old
    blobUrlsRef.current.push(...filteredUrls); // add new
  }
};

export const blockDraggedOrCopiedImage = (delta: Delta): boolean => {
  let block = false;
  delta.ops.forEach((op) => {
    if (op.insert && typeof op.insert === "object" && "image" in op.insert) {
      const image = op.insert.image as { src: string };
      // Todo: Replace ctruh with actual CDN Domain
      const isAllowedURL = ["blob:", "ctruh"].some((prefix) =>
        image.src.includes(prefix)
      );
      if (image && !isAllowedURL) {
        block = true;
        return;
      }
    }
  });
  if (block) {
    toastErrorMessage(
      "You cannot copy, drag & drop images here. Please upload it using the upload image button."
    );
  }

  return block;
};
// DeepEqual => 
export const deepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];
  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
};
