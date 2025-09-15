import type z from "zod";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import Select from "../../../components/Select";
import { RxCross1 } from "react-icons/rx";
import { productSchema } from "../../../validations/product";
import { CATEGORIES_DATA, PRODUCT_INITIAL_VALUES } from "../../../constants";

import {
  useGetProductById,
  useUpdateProduct,
} from "../../../api/products/service";
import LoadingScreen from "../../../components/LoadingScreen";
import { deepEqual } from "../../../utils";
import type { TBaseProduct, TProduct } from "../../../types";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();

  const getProductQuery = useGetProductById(id!);
  const updateProductQuery = useUpdateProduct(id!);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: PRODUCT_INITIAL_VALUES,
  });

  const product: TProduct = useMemo(
    () => getProductQuery.data ?? {},
    [getProductQuery.data]
  );

  useEffect(() => {
    const setProductValues = async () => {
      setValue("title", product?.title ?? "");
      setValue("brand", product?.brand ?? "");
      setValue("category", product?.category ?? "");
      setValue("price", product?.price ?? 0);
      setValue("sellingPrice", product?.sellingPrice ?? 0);
      setValue("description", product?.description ?? "");
      setValue("productImages", product?.productImages ?? []);
    };

    setProductValues();
  }, [product, setValue]);


  // console.log("data1", getProductQuery.data);
  // console.log("ERRORS", errors);

  const onSubmit = async (data: TBaseProduct) => {
    const formData = new FormData();
    let hasChanges = false;
    const previousData: Partial<TBaseProduct> = {
      title: product.title,
      brand: product.brand,
      description: product.description,
      category: product.category,
      sellingPrice: product.sellingPrice,
      price: product.price,
    };

    const updatedData: Partial<TBaseProduct> = {
      title: data.title,
      brand: data.brand,
      description: data.description,
      category: data.category,
      sellingPrice: data.sellingPrice,
      price: data.price,
    };

    // const removedImages: string[] = [];
    const existingImages: string[] = [];

    (data.productImages || []).forEach((file) => {
      if (file instanceof File) {
        hasChanges = true;
        formData.append("newImages", file);
      } else if (typeof file === "string") {
        existingImages.push(file);
      }
    });

    const removedImages =
      product?.productImages?.filter((img) => !existingImages.includes(img)) ||
      [];

    if (removedImages.length > 0) {
      hasChanges = true;
      formData.append("removedImages", JSON.stringify(removedImages));
    }

    const changedProductFields: Partial<TBaseProduct> = {};
    Object.keys(updatedData).forEach((key) => {
      const typedKey = key as keyof TBaseProduct;
      if (!deepEqual(updatedData[typedKey], previousData?.[typedKey])) {
        (changedProductFields[typedKey] as unknown) = updatedData[typedKey];
      }
    });

    if (!Object.keys(changedProductFields).length && !hasChanges) {
      toast.error("No changes made to the product.");
      return;
    }

   Object.entries(changedProductFields).forEach(([key, value]) => {
     if (value !== undefined && value !== null) {
       if (key === "price" || key === "sellingPrice") {
         formData.append(key, String(Number(value)));
       } else {
         formData.append(key, String(value));
       }
     }
   });

    updateProductQuery.mutateAsync(formData);
  };

  const images = watch("productImages") || [];

  if (getProductQuery?.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Edit Product</h2>

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <Input
          label="Title"
          register={register("title")}
          error={errors.title?.message}
          inputProps={{ placeholder: "Enter Title" }}
        />

        {/* Brand */}
        <Input
          label="Brand"
          register={register("brand")}
          error={errors.brand?.message}
          inputProps={{ placeholder: "Enter Brand" }}
        />

        {/* Price */}
        <Input
          label="Price"
          error={errors.price?.message}
          inputProps={{
            placeholder: "Enter Price",
            type: "number",
            value: watch("price") || "",
            onChange: (e) => setValue("price", Number(e.target.value)),
          }}
        />

        {/* Selling Price */}
        <Input
          label="Selling Price"
          error={errors.sellingPrice?.message}
          inputProps={{
            placeholder: "Enter Selling Price",
            type: "number",
            value: watch("sellingPrice") || "",
            onChange: (e) => setValue("sellingPrice", Number(e.target.value)),
          }}
        />

        {/* Description */}
        <Input
          label="Description"
          register={register("description")}
          error={errors.description?.message}
          inputProps={{ placeholder: "Enter Description" }}
        />

        {/* Category */}
        <Select
          label="Category"
          placeholder="Select Category"
          options={CATEGORIES_DATA}
          containerClassName="[&_label]:cursor-default"
          register={register("category")}
          selectProps={{
            name: "category",
            className: `${watch("category") ? "text-black" : "text-black/50"}`,
          }}
          error={errors?.category?.message}
        />

        <Controller
          control={control}
          name="productImages"
          defaultValue={[]}
          render={({ field }) => (
            <Input
              label="Product Images"
              error={errors.productImages?.message}
              icons={{
                right: {
                  icon: (
                    <label
                      htmlFor="productImages"
                      className="pl-1.5 text-sm text-black/50 w-full"
                    >
                      {images?.length
                        ? "Add Product Images"
                        : "Upload Product Images"}
                    </label>
                  ),
                },
              }}
              className="[&>span]:w-full"
              inputProps={{
                type: "file",
                multiple: true,
                accept: "image/*",
                className: "sr-only",
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
        {images?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((file, idx) => {
              const url =
                file instanceof File ? URL.createObjectURL(file) : file;
              return (
                <div key={idx} className="relative w-24 h-24">
                  <img
                    src={url}
                    alt="preview"
                    className="w-24 h-24 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-0.5 bg-red-500 text-white rounded-full"
                    onClick={() => {
                      const newImages = images.filter((_, i) => i !== idx);
                      setValue("productImages", newImages, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <RxCross1 className="!w-3 !h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <Button
          content="Update Product"
          pattern="secondary"
          buttonProps={{ type: "submit" }}
        />
      </form>
    </div>
  );
};

export default EditProduct;
