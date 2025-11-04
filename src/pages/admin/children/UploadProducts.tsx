import type z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import { productSchema } from "../../../validations/product";
import { RxCross1 } from "react-icons/rx";
import { useUploadProduct } from "../../../api/products/service";
import Select from "../../../components/Select";
import {
  CATEGORIES_DATA,
  navMapData,
  PRODUCT_INITIAL_VALUES,
} from "../../../constants";
import { useMemo, useRef } from "react";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import { getQuillValue, processQuillContent } from "../../../utils";
import type Quill from "quill";

const UploadProducts = () => {
  const quillRefs = {
    description: useRef<Quill | null>(null),
    howToUse: useRef<Quill | null>(null),
    ingredients: useRef<Quill | null>(null),
    keyBenefits: useRef<Quill | null>(null),
    otherInformation: useRef<Quill | null>(null),
  };

  const blobUrlRefs = {
    description: useRef<string[]>([]),
    howToUse: useRef<string[]>([]),
    ingredients: useRef<string[]>([]),
    keyBenefits: useRef<string[]>([]),
    otherInformation: useRef<string[]>([]),
  };
  const { mutateAsync } = useUploadProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    defaultValues: PRODUCT_INITIAL_VALUES,
    resolver: zodResolver(productSchema),
  });

  console.log("errors", errors);

  const images = watch("images") || [];

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    console.log("data", data);

    // Description
    await processQuillContent({
      quillRef: quillRefs.description,
      blobUrlsRef: blobUrlRefs.description,
      setValue: (value) => setValue("description", value),
      folderName: `Products/${data.title}/Description`,
    });
    // How to use
    await processQuillContent({
      quillRef: quillRefs.howToUse,
      blobUrlsRef: blobUrlRefs.howToUse,
      setValue: (value) => setValue("howToUse", value),
      folderName: `Products/${data.title}/howToUse`,
    });

    // ingredients
    await processQuillContent({
      quillRef: quillRefs.ingredients,
      blobUrlsRef: blobUrlRefs.ingredients,
      setValue: (value) => setValue("ingredients", value),
      folderName: `Products/${data.title}/ingredients`,
    });

    // keyBenefits
    await processQuillContent({
      quillRef: quillRefs.keyBenefits,
      blobUrlsRef: blobUrlRefs.keyBenefits,
      setValue: (value) => setValue("keyBenefits", value),
      folderName: `Products/${data.title}/keyBenefits`,
    });

    // otherInformation
    await processQuillContent({
      quillRef: quillRefs.otherInformation,
      blobUrlsRef: blobUrlRefs.otherInformation,
      setValue: (value) => setValue("otherInformation", value),
      folderName: `Products/${data.title}/otherInformation`,
    });

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("sellingPrice", data.sellingPrice.toString());
    formData.append("price", data.price.toString());
    formData.append("description", getQuillValue(data.description));
    formData.append("howToUse", getQuillValue(data.howToUse));
    formData.append("ingredients", getQuillValue(data.ingredients));
    formData.append("keyBenefits", getQuillValue(data.keyBenefits));
    formData.append("otherInformation", getQuillValue(data.otherInformation));
    formData.append("category", JSON.stringify(data.category));
    formData.append("subCategory", JSON.stringify(data.subCategory));

    data.images.forEach((file) => formData.append("images", file));

    await mutateAsync(formData);
  };

  const category = watch("category");

  const subCategoryOptions = useMemo(
    () => navMapData.find((cat) => cat.value === category.value)?.options || [],
    [category.value]
  );

  return (
    <div className="p-2">
      <div>Upload Products</div>
      <div className="mt-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* TITLE */}
          <Input
            label="Title"
            className="w-full bg-white text-black"
            register={register("title")}
            error={errors.title?.message}
            inputProps={{ placeholder: "Enter Title", name: "title" }}
          />
          {/* BRAND */}
          <Input
            label="Brand"
            className="w-full bg-white text-black"
            register={register("brand")}
            error={errors?.brand?.message}
            inputProps={{ placeholder: "Enter Brand", name: "brand" }}
          />
          {/*  Price */}
          <Input
            label="Price"
            error={errors?.price?.message}
            inputProps={{
              type: "number",
              name: "price",
              placeholder: "Enter price",
              onChange: (e) => {
                const val = e.target.value;
                setValue("price", Number(val), {
                  shouldValidate: true,
                });
              },
            }}
          />
          {/* Selling Price */}
          <Input
            label="Selling Price"
            error={errors?.sellingPrice?.message}
            inputProps={{
              type: "number",
              name: "sellingPrice",
              placeholder: "Enter Selling price",
              onChange: (e) => {
                const val = e.target.value;
                setValue("sellingPrice", Number(val), {
                  shouldValidate: true,
                });
              },
            }}
          />
          {/* Description */}
          <Controller
            control={control}
            name={"description"}
            render={({ field }) => (
              <QuillEditor
                label={"Description"}
                ref={quillRefs.description}
                blobUrlsRef={blobUrlRefs.description}
                onChange={field.onChange}
                value={typeof field.value === "string" ? field.value : ""}
                placeholder="Write description here..."
                errorText={errors?.description?.message}
              />
            )}
          />
          {/* How To Use */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6  rounded-lg">
            <Controller
              control={control}
              name="howToUse"
              render={({ field }) => (
                <QuillEditor
                  label="How To Use"
                  ref={quillRefs.howToUse}
                  blobUrlsRef={blobUrlRefs.howToUse}
                  onChange={field.onChange}
                  value={typeof field.value === "string" ? field.value : ""}
                  placeholder="Write How To Use here..."
                  errorText={errors?.howToUse?.message}
                />
              )}
            />
            {/* ingredients */}
            <Controller
              control={control}
              name="ingredients"
              render={({ field }) => (
                <QuillEditor
                  label="ingredients"
                  ref={quillRefs.ingredients}
                  blobUrlsRef={blobUrlRefs.ingredients}
                  onChange={field.onChange}
                  value={typeof field.value === "string" ? field.value : ""}
                  placeholder="Write ingredients here..."
                  errorText={errors?.ingredients?.message}
                />
              )}
            />
            {/* Key Benefits */}
            <Controller
              control={control}
              name="keyBenefits"
              render={({ field }) => (
                <QuillEditor
                  label="key Benefits"
                  ref={quillRefs.keyBenefits}
                  blobUrlsRef={blobUrlRefs.keyBenefits}
                  onChange={field.onChange}
                  value={typeof field.value === "string" ? field.value : ""}
                  placeholder="Write Key Benefits here..."
                  errorText={errors?.keyBenefits?.message}
                />
              )}
            />
            {/*Other Information*/}
            <Controller
              control={control}
              name="otherInformation"
              render={({ field }) => (
                <QuillEditor
                  label="Other Information"
                  ref={quillRefs.otherInformation}
                  blobUrlsRef={blobUrlRefs.otherInformation}
                  onChange={field.onChange}
                  value={typeof field.value === "string" ? field.value : ""}
                  placeholder="Write Other Information here..."
                  errorText={errors?.otherInformation?.message}
                />
              )}
            />
          </div>
          {/* Category */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                label="Category"
                selectProps={{
                  value: watch("category"),
                  onChange: (value) => field.onChange(value),
                  options: CATEGORIES_DATA,
                  placeholder: "Select Category",
                }}
                error={errors?.category?.message}
              />
            )}
          />
          {/* Sub-Category */}
          <Controller
            control={control}
            name="subCategory"
            render={({ field }) => {
              return (
                <Select
                  label="Sub-Category"
                  selectProps={{
                    value: watch("subCategory"),
                    onChange: (value) => field.onChange(value),
                    options: subCategoryOptions,
                    disabled: !subCategoryOptions.length,
                    placeholder:
                      subCategoryOptions.length > 0
                        ? "Select Sub-Category"
                        : "No Sub-Category available",
                  }}
                  error={errors?.subCategory?.message}
                />
              );
            }}
          />
          {/* productImage */}
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="images"
              defaultValue={[]}
              render={({ field }) => (
                <Input
                  label="Product Images"
                  error={errors?.images?.message}
                  icons={{
                    right: {
                      icon: (
                        <label
                          htmlFor="images"
                          className="flex items-center p-3 text-sm text-black/50 w-full cursor-pointer"
                        >
                          {images?.length
                            ? "Add Product Images"
                            : "Upload Product Images"}
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
                      const files = Array.from(e.target.files || []);
                      const newFiles = [...images, ...files];
                      field.onChange(newFiles);
                    },
                  }}
                />
              )}
            />
            {/* Preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {/* {errors?.images?.message} */}
                {images.map((file, idx) => {
                  const imagePreview = URL.createObjectURL(file); // ek-ek file ka preview
                  return (
                    <div key={idx} className="relative w-22 h-22">
                      <img
                        src={imagePreview}
                        alt={`Preview ${idx}`}
                        className="w-22 h-22 object-cover rounded-lg border border-gray-300"
                      />
                      <Button
                        content={<RxCross1 />}
                        pattern="secondary"
                        className="!w-4 !h-4 !p-0 absolute top-0 right-0 rounded-full flex items-center justify-center text-xs bg-red-500 hover:bg-red-600"
                        buttonProps={{
                          type: "button",
                          onClick: () => {
                            // Remove selected image
                            const remainingImages = images.filter(
                              (_, i) => i !== idx
                            );
                            setValue("images", remainingImages, {
                              shouldValidate: true,
                            });
                          },
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              {errors?.images &&
                Array.isArray(errors.images) &&
                errors.images.map((err, ind) =>
                  err?.message ? (
                    <p key={ind} className="text-sm text-red-500 mt-1">
                      {err?.message}
                    </p>
                  ) : null
                )}
            </div>
          </div>
          {/* Upload Product Button */}
          <Button
            className="w-40!"
            content="Upload Product"
            pattern="secondary"
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

export default UploadProducts;
