import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import type { TBaseProduct } from "../../../types";
import { uploadProductSchema } from "../../../validations/product";

const initialValues: TBaseProduct = {
  title: "",
  brand: "",
  price: undefined,
};

const UploadProducts = () => {
  const {
    register,
    handleSubmit,
    setValue,
    // control,
    formState: { errors },
  } = useForm<z.infer<typeof uploadProductSchema>>({
    defaultValues: initialValues,
    resolver: zodResolver(uploadProductSchema),
  });

  const onSubmit = (data: TBaseProduct) => {
    console.log("data", data);

    // const formData = new FormData();
    // console.log(formData)

    // formData.append("title", data.title);
    // formData.append("brand", data.brand);
    // formData.append("sellingPrice", data.sellingPrice.toString());
    // formData.append("price", data.price.toString());
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
          {/* <Input
            label="Price"
            error={errors?.price?.message}
            register={register("price")}
            inputProps={{
              type: "number",
              name: "price",
              placeholder: "Enter price",
              // onChange: (val) => {
              //   console.log("HELLO")
              //   setValue("price", Number(val) || 0, {
              //     shouldValidate: true,
              //   });
              //   // field.onChange(val);
              // },
            }}
          /> */}
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

          {/* <Controller
            name="price"
            control={control}
            defaultValue={undefined}
            render={({ field }) => {
              return (

              );
            }}
          /> */}

          {/* Category */}
          {/* <select
            {...register("category")}
            name="category"
            className="w-full h-12 border border-black rounded-xl outline-none cursor-pointer bg-white"
          >
            Category
            <option value="">Shop All</option>
            <option value="">Crazy Deals</option>
            <option value="">Bestsellers</option>
            <option value="">Perfumes</option>
            <option value="">Bath & Body</option>
            <option value="">Cosmetics</option>
            <option value="">New Arrivals</option>
            <option value="">Skincare</option>
            <option value="">Gifting</option>
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )} */}

          {/* productImage */}

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
