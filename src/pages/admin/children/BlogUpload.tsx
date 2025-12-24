import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type z from "zod";
import { blogSchema } from "../../../validations/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { BLOG_INITIAL_VALUES } from "../../../constants";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import { useRef } from "react";
import type Quill from "quill";
import { getQuillValue, processQuillContent } from "../../../utils";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import Textarea from "../../../components/TextArea";
import { useUploadBlog } from "../../../api/blog/service";

const BlogUpload = () => {
  const quillRefs = {
    blog: useRef<Quill | null>(null),
  };

  const blobUrlRefs = {
    blog: useRef<string[]>([]),
  };

  const { mutateAsync } = useUploadBlog();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof blogSchema>>({
    defaultValues: BLOG_INITIAL_VALUES,
    resolver: zodResolver(blogSchema),
  });

  console.log("BLOG ERROR", errors);
  const image = watch("image") || [];

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    console.log("data", data);

    await processQuillContent({
      quillRef: quillRefs.blog,
      blobUrlsRef: blobUrlRefs.blog,
      setValue: (value) => setValue("blog", value),
      folderName: `blog/${data.title}/blog`,
    });

    const formData = new FormData();

    const content = getValues("blog");
    console.log("Content Blog", content);

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("blog", getQuillValue(content));

    formData.append("image", data.image);

    await mutateAsync(formData);
  };

  return (
    <div className="p-2">
      <h3>Upload Blogs</h3>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* image start  */}
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <Input
                  label="Blog Images"
                  error={errors?.image?.message}
                  icons={{
                    right: {
                      icon: (
                        <label
                          htmlFor="images"
                          className="flex items-center p-3 text-sm text-black/50 w-full cursor-pointer"
                        >
                          {image ? "Add Blog Images" : "Upload Blog Image"}
                        </label>
                      ),
                    },
                  }}
                  className="[&>span]:w-full [&>span]:p-0"
                  inputProps={{
                    type: "file",
                    accept: "image/*",
                    multiple: true,
                    className: "sr-only",
                    id: "images",
                    name: "images",
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    },
                  }}
                />
              )}
            />
            {/* Preview */}
            {image instanceof File && (
              <div className="relative w-22 h-22">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview`}
                  className="w-22 h-22 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
          {/* image end  */}

          {/* TITLE  */}
          <Input
            label="Title"
            className="w-full bg-white text-black"
            register={register("title")}
            error={errors.title?.message}
            inputProps={{ placeholder: "Enter Title", name: "title" }}
          />

          {/* DATE  */}
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-black">Date</label>

                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

                      field.onChange(formattedDate);
                    } else {
                      field.onChange("");
                    }
                  }}
                  maxDate={new Date()} // 🚫 future dates disabled
                  placeholderText="Select Date"
                  dateFormat="MMMM d, yyyy"
                  className="w-full bg-white text-black cursor-pointer outline-none rounded px-3 py-2"
                />

                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>
            )}
          />

          {/* Description  */}
          <Textarea
            label="Description"
            register={register("description")}
            error={errors.description?.message}
            textareaProps={{
              name: "description",
              id: "description",
              placeholder: "Write a Description",
            }}
          />

          {/* BLOG  */}
          <Controller
            control={control}
            name={"blog"}
            render={({ field }) => (
              <QuillEditor
                label={"Blog"}
                ref={quillRefs.blog}
                blobUrlsRef={blobUrlRefs.blog}
                onChange={field.onChange}
                value={typeof field.value === "string" ? field.value : ""}
                placeholder="Write Blog here..."
                errorText={errors?.blog?.message}
              />
            )}
          />

          {/* Upload Product Button */}
          <Button
            className="w-60!"
            content="Upload Blog"
            pattern="secondary"
            icons={{
              right: <IoCheckmarkDoneCircleSharp className="size-7" />,
            }}
            buttonProps={{
              // disabled: isSubmitting,
              type: "submit",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default BlogUpload;
