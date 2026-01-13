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
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { LuLandmark } from "react-icons/lu";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { PiAddressBook, PiCity } from "react-icons/pi";
import { IoFlagOutline } from "react-icons/io5";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addressSchema>>({
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 dark:bg-black py-2">
        {/* FIRST NAME */}
        <div className="relative">
          <Input
            label="First Name"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("firstName")}
            inputProps={{ placeholder: "Enter First Name" }}
          />
          <FaRegUser className="absolute top-3 lg:top-4 left-3 dark:text-gray-400 text-gray-500 size-3 lg:size-4" />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        {/* LASTNAME  */}
        <div className="relative">
          <Input
            label="Last Name"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("lastName")}
            inputProps={{ placeholder: "Enter Last Name" }}
          />
          <FaRegUser className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        {/* EMAIL  */}
        <div className="relative">
          <Input
            label="Email"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("email")}
            inputProps={{ placeholder: "Enter Email", type: "email" }}
          />
          <MdOutlineEmail className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* PHONE NUMBERS  */}
        <div className="relative">
          <Input
            label="Phone Number"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("phoneNumber")}
            inputProps={{
              placeholder: "Phone Number",
              type: "text",
            }}
          />
          <FiPhone className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        {/* ALTERNATIVE PHONE NUMBER */}
        <div className="relative">
          <Input
            label="Alt. Phone Number"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("altPhoneNumber")}
            inputProps={{
              placeholder: "Alt. Number",
              type: "text",
            }}
          />
          <FiPhone className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.altPhoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.altPhoneNumber.message}
            </p>
          )}
        </div>
        {/* ADDRESS */}
        <div className="relative">
          <Input
            label="Address"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("address")}
            inputProps={{ placeholder: "Enter Address" }}
          />
          <PiAddressBook className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        {/* LANDMARK  */}
        <div className="relative">
          <Input
            label="Landmark"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("landmark")}
            inputProps={{ placeholder: "Enter Landmark" }}
          />
          <LuLandmark className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.landmark && (
            <p className="text-red-500 text-sm mt-1">
              {errors.landmark.message}
            </p>
          )}
        </div>
        {/* CITY */}
        <div className="relative">
          <Input
            label="City"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("city")}
            inputProps={{ placeholder: "Enter City" }}
          />
          <PiCity className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        {/* PINCODE  */}
        <div className="relative">
          <Input
            label="Pincode"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("pinCode")}
            inputProps={{
              placeholder: "Pin-Code",
              type: "text",
            }}
          />
          <FiMapPin className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.pinCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pinCode.message}
            </p>
          )}
        </div>
        {/* STATE */}
        <div className="relative">
          <Input
            label="State"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("state")}
            inputProps={{ placeholder: "Enter State" }}
          />
          <IoFlagOutline className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>
        {/* COUNTRY */}
        <div className="relative">
          <Input
            label="Country"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("country")}
            inputProps={{ placeholder: "Enter Country" }}
          />
          <IoFlagOutline className="absolute top-3 lg:top-4 left-3 text-gray-500 size-3 lg:size-4" />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Button
          content={isPending ? "Saving..." : "Save Address"}
          pattern="outline"
          className="w-50! mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
          buttonProps={{ type: "submit", disabled: isPending }}
        />
        <Link to="/cart">
          <Button
            content="BACK"
            pattern="outline"
            className="w-40! mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
            icons={{
              left: <IoIosArrowBack size={10} />,
            }}
            buttonProps={{
              type: "button",
            }}
          />
        </Link>
      </div>
    </form>
  );
};

export default AddressForm;
