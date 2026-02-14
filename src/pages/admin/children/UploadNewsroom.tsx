import { useRef } from "react";
import type Quill from "quill";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCheckmarkDoneCircleSharp, IoImage } from "react-icons/io5";

import { newsroomSchema } from "../../../validations/newsroom";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import { getQuillValue, processQuillContent } from "../../../utils";
import Textarea from "../../../components/TextArea";
import { useUploadNewsroom } from "../../../api/newsroom/service";
import type { TBaseNewsroom } from "../../../types";
import { NEWSROOM_INITIAL_VALUES } from "../../../constants";
import { HiDocumentText } from "react-icons/hi2";

const UploadNewsroom = () => {
  const quillRefs = {
    newsroom: useRef<Quill | null>(null),
  };

  const blobUrlRefs = {
    newsroom: useRef<string[]>([]),
  };

  const { mutateAsync } = useUploadNewsroom();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<TBaseNewsroom>({
    defaultValues: NEWSROOM_INITIAL_VALUES,
    resolver: zodResolver(newsroomSchema),
  });

  const image = watch("image");

  const onSubmit = async (data: TBaseNewsroom) => {
    await processQuillContent({
      quillRef: quillRefs.newsroom,
      blobUrlsRef: blobUrlRefs.newsroom,
      setValue: (value) => setValue("newsroom", value),
      folderName: `newsroom/${data.title}/content`,
    });

    const formData = new FormData();
    const content = getValues("newsroom");

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("newsroom", getQuillValue(content));
    formData.append("image", data.image);

    if (data.date) {
      formData.append("date", data.date);
    }

    await mutateAsync(formData);
  };

  return (
    <div className="p-2">
      <span className=" text-xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
        Upload Newsroom
      </span>

      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* image start  */}
          <div className="relative flex flex-col gap-2">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <Input
                  label="Newsroom Images"
                  error={errors?.image?.message}
                  icons={{
                    right: {
                      icon: (
                        <label
                          htmlFor="images"
                          className="flex items-center p-3 text-sm text-black/50 dark:text-white w-full cursor-pointer"
                        >
                          {image
                            ? "Add Newsroom Images"
                            : "Upload Newsroom Image"}
                        </label>
                      ),
                    },
                  }}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{
                    type: "file",
                    accept: "image/*",
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
            <IoImage className="absolute bottom-3 left-3 lg:bottom-4 lg:left-5" />
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

          {/* TITLE */}
          <div className="relative">
            <Input
              label="Title"
              register={register("title")}
              error={errors.title?.message}
              inputProps={{ placeholder: "Enter Title" }}
              className="border-b-4 border-r-4 pl-12 pr-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            />

            <HiDocumentText className="absolute bottom-3 left-3 lg:bottom-4 lg:left-5" />
          </div>

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
                  className="w-full bg-white text-black cursor-pointer outline-none rounded-lg px-3 py-2 dark:bg-black dark:text-white border dark:border-b-4 dark:border-r-4 dark:border-gray-600 border-b-4 border-r-4 border-gray-300"
                />

                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>
            )}
          />

          {/* DESCRIPTION */}
          <Textarea
            label="Description"
            register={register("description")}
            error={errors.description?.message}
            textareaProps={{
              placeholder: "Write description",
              className: "h-80!",
            }}
          />

          {/* NEWSROOM CONTENT */}
          <Controller
            control={control}
            name="newsroom"
            render={({ field }) => (
              <QuillEditor
                label="Newsroom Content"
                ref={quillRefs.newsroom}
                blobUrlsRef={blobUrlRefs.newsroom}
                value={typeof field.value === "string" ? field.value : ""}
                onChange={field.onChange}
                placeholder="Write newsroom content..."
                errorText={errors.newsroom?.message}
              />
            )}
          />

          {/* SUBMIT */}
          <Button
            className="w-60!"
            content="Upload Newsroom"
            pattern="secondary"
            icons={{
              right: <IoCheckmarkDoneCircleSharp className="size-7" />,
            }}
            buttonProps={{ type: "submit" }}
          />
        </form>
      </div>
    </div>
  );
};

export default UploadNewsroom;
