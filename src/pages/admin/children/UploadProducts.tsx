import type z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import type { TBaseProduct } from "../../../types";
import { productSchema } from "../../../validations/product";
import { RxCross1 } from "react-icons/rx";
import { useUploadProduct } from "../../../api/products/service";
import Select from "../../../components/Select";
import { CATEGORIES_DATA, PRODUCT_INITIAL_VALUES } from "../../../constants";

const UploadProducts = () => {
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

  const onSubmit = async (data: TBaseProduct) => {
    console.log("data", data);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("sellingPrice", data.sellingPrice.toString());
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("category", data.category);

    data.images.forEach((file) => formData.append("images", file));

    await mutateAsync(formData);
  };
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
          <Input
            label="Description"
            className="w-full bg-white text-black"
            register={register("description")}
            error={errors.description?.message}
            inputProps={{
              placeholder: "Enter Description",
              name: "description",
            }}
          />

          {/* Category */}
          <Select
            label="Category"
            placeholder="Select Category"
            options={CATEGORIES_DATA}
            containerClassName="[&_label]:cursor-default"
            register={register("category")}
            selectProps={{
              className: `-ml-1 ${
                watch("category") ? "text-black" : "text-black/50"
              }`,
            }}
            error={errors?.category?.message}
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
