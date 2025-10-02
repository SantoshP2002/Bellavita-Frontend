import { useForm } from "react-hook-form";
import { Button } from "./Button";
import Input from "./Input";
import type z from "zod";
import { addressSchema } from "../validations/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAddress } from "../api/address/service";
import { ADDRESS_INITIAL_VALUES } from "../constants";
import type { IBaseAddress } from "../types";

const AddressForm = () => {
  const { mutateAsync: addAddress, isPending } = useAddAddress();
  const { register, handleSubmit } = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: ADDRESS_INITIAL_VALUES,
  });

  const onSubmit = (data: z.infer<typeof addressSchema>) => {
    const finalizedData = data;
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof IBaseAddress;
      if (data[typedKey]) {
        finalizedData[typedKey] = data[typedKey];
      } else {
        delete finalizedData[typedKey];
      }
    });
    console.log(" Object.keys(data)", finalizedData);

    addAddress(finalizedData);
  };
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-indigo-600">
        🏠 Add Your First Address
      </h2>

      <div className="bg-gradient-to-r from-indigo-100 to-pink-100 shadow-xl rounded-2xl p-8 mb-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              register={register("firstName")}
              inputProps={{ placeholder: "Enter First Name" }}
            />
            <Input
              label="Last Name"
              register={register("lastName")}
              inputProps={{ placeholder: "Enter Last Name" }}
            />
            <div className="col-span-2">
              <Input
                label="Email"
                register={register("email")}
                inputProps={{ placeholder: "Enter Email", type: "email" }}
              />
            </div>
            <Input
              label="Phone Number"
              register={register("phoneNumber")}
              inputProps={{ placeholder: "Enter Phone Number" }}
            />
            <Input
              label="Alt. Phone Number"
              register={register("altPhoneNumber")}
              inputProps={{ placeholder: "Enter Alternative Number" }}
            />
            <Input
              label="Address"
              register={register("address")}
              inputProps={{ placeholder: "Enter Address" }}
            />
            <Input
              label="Landmark"
              register={register("landmark")}
              inputProps={{ placeholder: "Enter Landmark" }}
            />
            <Input
              label="City"
              register={register("city")}
              inputProps={{ placeholder: "Enter City" }}
            />
            <Input
              label="Pincode"
              register={register("pinCode")}
              inputProps={{ placeholder: "Enter PinCode", type: "number" }}
            />
            <Input
              label="State"
              register={register("state")}
              inputProps={{ placeholder: "Enter State" }}
            />
            <Input
              label="Country"
              register={register("country")}
              inputProps={{ placeholder: "Enter Country" }}
            />
          </div>
          <Button
            content={isPending ? "Saving..." : "Save Address"}
            pattern="secondary"
            className="mt-6"
            buttonProps={{ type: "submit", disabled: isPending }}
          />
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
