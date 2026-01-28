import { useEffect, useRef } from "react";
import type Quill from "quill";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import { blogSchema } from "../../../validations/blog";
import { BLOG_INITIAL_VALUES } from "../../../constants";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import { getQuillValue, processQuillContent } from "../../../utils";
import Textarea from "../../../components/TextArea";
// import { useUploadBlog } from "../../../api/blog/service";
import type { TBaseBlog } from "../../../types";
import { useParams } from "react-router-dom";
import { useGetBlogById, useUpdateBlog } from "../../../api/blog/service";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();

  const quillRefs = {
    blog: useRef<Quill | null>(null),
  };

  const blobUrlRefs = {
    blog: useRef<string[]>([]),
  };

  // const { mutateAsync } = useUploadBlog();

  const { data: blogData, isLoading } = useGetBlogById(id!);
  const { mutateAsync } = useUpdateBlog(id!);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<TBaseBlog>({
    defaultValues: BLOG_INITIAL_VALUES,
    resolver: zodResolver(blogSchema),
  });

  console.log("BLOG ERROR", errors);
  const image = watch("image");

  useEffect(() => {
    if (blogData) {
      reset({
        title: blogData.blog.title,
        description: blogData.blog.description,
        blog: blogData.blog.blog,
        date: blogData.blog.date,
        image: undefined,
      });
    }
  }, [blogData, reset]);

  if (isLoading) {
    return <p className="p-4">Loading blog...</p>;
  }

  const onSubmit = async (data: TBaseBlog) => {
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
    formData.append("date", data.date);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    await mutateAsync(formData);
  };

  return (
    <div className="p-2">
      <h3>Update Blogs</h3>
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
                          className="flex items-center p-3 text-sm text-black/50 dark:text-white/50 w-full cursor-pointer"
                        >
                          {image ? "Change Blog Images" : "Upload Blog Image"}
                        </label>
                      ),
                    },
                  }}
                  className="[&>span]:w-full [&>span]:p-0 border border-b-4 border-r-4 border-gray-400 dark:border-gray-400 dark:text-white/50 dark:bg-black"
                  inputProps={{
                    type: "file",
                    accept: "image/*",
                    // multiple: true,
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
            className="w-full text-black  dark:bg-black border-gray-400 border-b-4 border-r-4"
            register={register("title")}
            error={errors.title?.message}
            inputProps={{ placeholder: "Enter Title", name: "title" }}
          />

          {/* DATE  */}
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <div className="relative flex flex-col gap-1">
                <label className="z-10 text-[10px] lg:text-xs dark:bg-black dark:text-gray-300 dark:border-gray-300 text-black bg-white absolute top-0 left-3 transform -translate-y-1/2 border border-black/10 leading-none px-1 md:px-2 py-0.5 rounded cursor-pointer">
                  Date
                </label>

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
                  className="w-full h-12 rounded-lg pl-3 bg-white dark:text-white text-black dark:bg-black border border-gray-400 border-b-4 border-r-4"
                />

                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>
            )}
          />

          <div className="flex flex-col gap-4">
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
          </div>

          {/* Upload Product Button */}
          <Button
            className="w-60!"
            content="Update Blog Done"
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

export default EditBlog;
