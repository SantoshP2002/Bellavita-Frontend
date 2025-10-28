import type {
  InputHTMLAttributes,
  JSX,
  ReactNode,
  RefObject,
  SVGProps,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { ALLOW_COUNTRIES } from "../constants";
import type { ToolbarProps } from "quill/modules/toolbar";

export type IconProps = SVGProps<SVGSVGElement>;

export type TUserRole = "ADMIN" | "USER";

export type TBaseUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | string;
};

export type TBaseProduct = {
  title: string;
  brand: string;
  price: number;
  sellingPrice: number;
  description: string;
  category: { name: string; value: string };
  subCategory?: { name: string; value: string };
  images: (File | string)[];
};

export interface TProduct extends Omit<TBaseProduct, "images"> {
  _id: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Omit<TBaseUser, "profilePic"> {
  _id: string;
  role: TUserRole;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserStore {
  user: IUser | null;
  isLoggedIn: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export interface ClassName {
  className?: string;
}

interface TBaseInput extends ClassName {
  containerClassName?: string;
  icons?: { left?: TInputIcon; right?: Omit<TInputIcon, "text"> };
  register?: UseFormRegisterReturn;
  label?: string;
  error?: string;
}

type TInputIcon = { text?: string; icon?: ReactNode; onClick?: () => void };

export interface IInput extends TBaseInput {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

export interface ISelect extends Omit<TBaseInput, "register"> {
  selectProps: {
    onChange?: (data: Record<"name" | "value", string>) => void;
    options: Record<"name" | "value", string>[];
    value?: Record<"name" | "value", string>;
    placeholder?: string;
    disabled?: boolean;
  };
}

export interface TQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
}

export type TProductCart = {
  _id: string;
  product: Pick<
    TProduct,
    "_id" | "title" | "brand" | "price" | "sellingPrice" | "images"
  >;
  quantity: number;
};

export interface ICart {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  products: TProductCart[];
}

export interface IQueryParams {
  [key: string]: string;
}

export interface IBaseAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  altPhoneNumber?: string; // optional
  email: string;
  address: string;
  landmark?: string; // optional
  city: string;
  state: string;
  pinCode: string; // length = 6
  country: (typeof ALLOW_COUNTRIES)[number]; // default: "India"
}

export interface IAddress extends IBaseAddress {
  _id: string;
}

// modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  containerProps?: JSX.IntrinsicElements["div"];
  heading?: string;
  className?: string;
}

export interface IOrder {
  _id: string;
  user: string;
  address: {
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pinCode: string;
    phone?: string;
    name?: string;
  };
  products: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      title: string;
      brand: string;
      price: number;
      sellingPrice: number;
      quantity: number;
      images: string[];
    };
  }[];
  totalPrice: number | string;
  order_result: {
    order_status: "PENDING" | "PAID" | "FAILED";
    amount: number;
    order_receipt: string;
    discount?: number;
    charges?: number;
  };
  razorpay_payment_result: {
    payment_mode: "ONLINE" | "COD";
    rzp_payment_status: "UNPAID" | "PAID" | "FAILED";
    currency: "INR";
  };
  payment_details?: {
    fee?: number;
    tax?: number;
  };
  status?: "paid" | "pending" | "failed"; // Optional frontend-friendly alias
  createdAt: string;
  updatedAt: string;
}

export type ToolbarOption =
  | { header: (1 | 2 | 3 | 4 | 5 | 6 | false)[] }
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | { list: "ordered" | "bullet" }
  | { script: "sub" | "super" }
  | { indent: "-1" | "+1" }
  | { color: string[] } // can be empty for Quill to auto-generate colors
  | { background: string[] }
  | { align: string[] }
  | { direction: "rtl" }
  | "link"
  | "image"
  | "video"
  | "code"
  | "clean";

export type QuillToolbar = (ToolbarOption | ToolbarOption[])[];

export interface IToolBarOptions {
  header?: (1 | 2 | 3 | 4 | 5 | 6 | false)[];
  script?: ("sub" | "super")[];
  indent?: ("-1" | "+1")[];
  color?: boolean;
  background?: boolean;
  align?: boolean;
  direction?: "rtl";
  text?: ("bold" | "italic" | "underline" | "strike" | "link")[];
  list?: ("ordered" | "bullet")[];
  media?: ("image" | "video" | "link")[];
  misc?: ("code" | "clean")[];
}

export type TQuillImageBlot = {
  new (): HTMLElement;
  create(value: unknown): HTMLElement;
  value(node: HTMLElement): unknown;
};

export interface QuillEditorProps {
  label?: string;
  readOnly?: boolean;
  errorText?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  blobUrlsRef?: RefObject<string[]>;
  placeholder?: string;
  toolbarOptions?: IToolBarOptions;
}

export interface IQuillToolbarExtended extends ToolbarProps {
  handlers: Record<string, (...args: unknown[]) => void>;
}

// review type
export interface IReview {
  _id?: string;
  name: string;
  rating: number;
  title?: string;
  description?: string;
  date?: string;
  images: string[];
}
