import { useForm } from "react-hook-form";
import { Button } from "./Button";
import Input from "./Input";
import type z from "zod";
import { addressSchema } from "../validations/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAddress, useUpdateAddress } from "../api/address/service";
import { ADDRESS_INITIAL_VALUES } from "../constants";
import type { IAddress, IBaseAddress } from "../types";
import useQueryParams from "../hooks/useQueryParams";
import { deepEqual } from "../utils";
import toast from "react-hot-toast";

const AddressForm = ({
  addresses,
  className,
}: {
  addresses?: IAddress[];
  className?: string;
}) => {
  const { queryParams, removeParam } = useQueryParams();
  const { mutateAsync: addAddress, isPending } = useAddAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const address =
    addresses?.find((a) => a._id === queryParams.edit) ||
    ADDRESS_INITIAL_VALUES;

  const { register, handleSubmit } = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: address,
  });

  const onSubmit = (data: z.infer<typeof addressSchema>) => {
    if ("_id" in address && typeof address._id === "string" && address?._id) {
      const changedFields: Partial<IAddress> = {};
      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof IBaseAddress;
        if (!deepEqual(data[typedKey], address[typedKey])) {
          (changedFields[typedKey] as unknown) = data[typedKey];
        }
      });

      if (!Object.keys(changedFields).length) {
        toast("No changes made to update address!");
        return;
      }

      changedFields._id = address._id;
      updateAddress(changedFields, {
        onSuccess: () => removeParam("edit"),
      });
    } else {
      const finalizedData = data;
      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof IBaseAddress;
        if (data[typedKey]) {
          finalizedData[typedKey] = data[typedKey];
        } else {
          delete finalizedData[typedKey];
        }
      });
      addAddress(finalizedData, {
        onSuccess: () => removeParam("add"),
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Input
          label="First Name"
          className="border-b-4 border-r-4"
          register={register("firstName")}
          inputProps={{ placeholder: "Enter First Name" }}
        />
        <Input
          label="Last Name"
          className="border-b-4 border-r-4"
          register={register("lastName")}
          inputProps={{ placeholder: "Enter Last Name" }}
        />
        <div className="col-span-2">
          <Input
            label="Email"
            className="border-b-4 border-r-4"
            register={register("email")}
            inputProps={{ placeholder: "Enter Email", type: "email" }}
          />
        </div>
        <Input
          label="Phone Number"
          className="border-b-4 border-r-4"
          register={register("phoneNumber")}
          inputProps={{ placeholder: "Enter Phone Number", type: "number" }}
        />
        <Input
          label="Alt. Phone Number"
          className="border-b-4 border-r-4"
          register={register("altPhoneNumber")}
          inputProps={{ placeholder: "Enter Alt. Number", type:"number" }}
        />
        <Input
          label="Address"
          className="border-b-4 border-r-4"
          register={register("address")}
          inputProps={{ placeholder: "Enter Address" }}
        />
        <Input
          label="Landmark"
          className="border-b-4 border-r-4"
          register={register("landmark")}
          inputProps={{ placeholder: "Enter Landmark" }}
        />
        <Input
          label="City"
          className="border-b-4 border-r-4"
          register={register("city")}
          inputProps={{ placeholder: "Enter City" }}
        />
        <Input
          label="Pincode"
          className="border-b-4 border-r-4"
          register={register("pinCode")}
          inputProps={{ placeholder: "Enter Pin-Code", type: "number" }}
        />
        <Input
          label="State"
          className="border-b-4 border-r-4"
          register={register("state")}
          inputProps={{ placeholder: "Enter State" }}
        />
        <Input
          label="Country"
          className="border-b-4 border-r-4"
          register={register("country")}
          inputProps={{ placeholder: "Enter Country" }}
        />
      </div>
      <Button
        content={isPending ? "Saving..." : "Save Address"}
        pattern="outline"
        className="w-50! mt-4 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
        buttonProps={{ type: "submit", disabled: isPending }}
      />
    </form>
  );
};

export default AddressForm;
