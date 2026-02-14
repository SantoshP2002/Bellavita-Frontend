import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type Quill from "quill";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCheckmarkDoneCircleSharp, IoImagesOutline } from "react-icons/io5";

import { newsroomSchema } from "../../../validations/newsroom";
import Input from "../../../components/Input";
import Textarea from "../../../components/TextArea";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import { Button } from "../../../components/Button";

import {
  useGetNewsroomById,
  useUpdateNewsroom,
} from "../../../api/newsroom/service";

import { getQuillValue } from "../../../utils";
import type { TBaseNewsroom } from "../../../types";
import { HiDocumentText } from "react-icons/hi2";

const EditNewsroom = () => {
  const { id } = useParams<{ id: string }>();

  const quillRef = useRef<Quill | null>(null);
  const blobUrlsRef = useRef<string[]>([]);

  const { data: newsroomData } = useGetNewsroomById(id!);
  const { mutateAsync } = useUpdateNewsroom(id!);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TBaseNewsroom>({
    resolver: zodResolver(newsroomSchema),
  });

  const image = watch("image");

  // PREFILL DATA
  useEffect(() => {
    if (newsroomData) {
      reset({
        title: newsroomData.title,
        description: newsroomData.description,
        date: newsroomData.date ?? "",
        newsroom: newsroomData.newsroom,
        image: newsroomData.image, // string URL
      });
    }
  }, [newsroomData, reset]);

  // UPDATE SUBMIT
  const onSubmit = async (data: TBaseNewsroom) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.date) {
      formData.append("date", data.date);
    }

    formData.append("newsroom", getQuillValue(data.newsroom));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    await mutateAsync(formData);
  };

  return (
    <div className="p-2">
      <span className=" text-xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
        Edit Newsroom
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
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
                        htmlFor="image"
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
          <IoImagesOutline className="absolute bottom-3 left-3 lg:bottom-4 lg:left-5" />
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

        {/* DATE */}
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
                maxDate={new Date()}
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

        {/* DESCRIPTION */}
        <Textarea
          label="Description"
          register={register("description")}
          error={errors.description?.message}
          textareaProps={{ className: "h-80!" }}
        />

        {/* CONTENT */}
        <Controller
          control={control}
          name="newsroom"
          render={({ field }) => (
            <QuillEditor
              label="Newsroom Content"
              ref={quillRef}
              blobUrlsRef={blobUrlsRef}
              value={field.value || ""}
              onChange={field.onChange}
              errorText={errors.newsroom?.message}
            />
          )}
        />

        {/* SUBMIT */}
        <Button
          content="Update Newsroom"
          pattern="secondary"
          icons={{
            right: <IoCheckmarkDoneCircleSharp className="size-6" />,
          }}
          buttonProps={{ type: "submit" }}
          className="w-60!"
        />
      </form>
    </div>
  );
};

export default EditNewsroom;
