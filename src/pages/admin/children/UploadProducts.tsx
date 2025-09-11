import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import type { TBaseProduct } from "../../../types";
import { uploadProductSchema } from "../../../validations/product";
import { RxCross1 } from "react-icons/rx";
import { useUploadProduct } from "../../../api/products/service";
import CategorySelect from "../../../components/Category";
import { CATEGORIES_DATA } from "../../../constants";

const initialValues: TBaseProduct = {
  title: "",
  brand: "",
  price: 0,
  sellingPrice: 0,
  description: "",
  category: "",
  productImages: [],
};

const UploadProducts = () => {
  const { mutateAsync } = useUploadProduct();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    // control,
    formState: { errors },
  } = useForm<z.infer<typeof uploadProductSchema>>({
    defaultValues: initialValues,
    resolver: zodResolver(uploadProductSchema),
  });

  console.log("errors", errors);

  const productImages = watch("productImages") || [];

  const onSubmit = async (data: TBaseProduct) => {
    console.log("data", data);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("brand", data.brand);
    formData.append("sellingPrice", data.sellingPrice.toString());
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("category", data.category);

    data.productImages.forEach((file) =>
      formData.append("productImages", file)
    );

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
            inputProps={{ placeholder: "Enter Title" }}
          />

          {/* BRAND */}
          <Input
            label="Brand"
            className="w-full bg-white text-black"
            register={register("brand")}
            error={errors?.brand?.message}
            inputProps={{ placeholder: "Enter Brand" }}
          />

          {/*  Price */}
          <Input
            label="Price"
            error={errors?.price?.message}
            inputProps={{
              type: "number",
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
            inputProps={{ placeholder: "Enter Description" }}
          />

          {/* Category */}
          <CategorySelect
            label="Category"
            name="category"
            register={register("category")}
            error={errors?.category?.message}
            value={watch("category")}
            options={CATEGORIES_DATA}
          />
          {/* productImage */}
          <div className="flex flex-col gap-2">
            <Input
              label="Product Images"
              error={errors?.productImages?.message}
              icons={{
                right: {
                  icon: (
                    <label htmlFor="productImages" className="pl-1.5 text-sm text-black/50 w-full">
                      {productImages?.length
                        ? "Add Product Images"
                        : "Upload Product Images"}
                    </label>
                  ),
                },
              }}
              className="[&>span]:w-full"
              inputProps={{
                type: "file",
                accept: "image/*",
                name: "productImages",
                multiple: true,
                className: "sr-only",

                onChange: (e) => {
                  const files = Array.from(e.target.files || []);
                  setValue("productImages", files, { shouldValidate: true });
                },
              }}
            />
            {/* Preview */}
            {productImages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {/* {errors?.productImages?.message} */}
                {productImages.map((file, idx) => {
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
                            const remainingImages = productImages.filter(
                              (_, i) => i !== idx
                            );
                            setValue("productImages", remainingImages, {
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
              {errors?.productImages &&
                Array.isArray(errors.productImages) &&
                errors.productImages.map((err, ind) =>
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
