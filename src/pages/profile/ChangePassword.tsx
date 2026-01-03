import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type changePasswordType,
} from "../../validations/changePassword";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { useUpdatePassword } from "../../api/auth/service";
import Input from "../../components/Input";
import { TbLockPassword } from "react-icons/tb";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useUpdatePassword();

  // ONSUBMIT
  const onSubmit = async (formdata: changePasswordType) => {
    mutate({
      currentPassword: formdata.currentPassword,
      newPassword: formdata.newPassword,
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-white rounded-tl-full rounded-br-full shadow-2xl p-6"
      >
        <p className="text-xl font-medium py-3">Change You Password 🔏</p>
        {/* CURRENT PASSWORD */}
        <div className="relative w-full">
          <Input
            label="Current Password"
            className="w-full border-b-4"
            register={register("currentPassword")}
            inputProps={{
              placeholder: "Current Password",
              type: showCurrentPassword ? "text" : "password",
            }}
            error={errors.currentPassword?.message}
            icons={{
              left: {
                icon: <TbLockPassword className="text-gray-400 text-lg" />,
              },
              right: {
                icon: (
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      <IoEyeOffOutline className="text-gray-400 text-lg" />
                    ) : (
                      <IoEyeOutline className="text-gray-400 text-lg cursor-pointer" />
                    )}
                  </button>
                ),
              },
            }}
          />
        </div>
        {/* NEW PASSWORD */}
        <div className="max-w-4xl relative w-full">
          <Input
            label="New Password"
            className="w-full border-b-4"
            register={register("newPassword")}
            inputProps={{
              placeholder: "New Password",
              type: showNewPassword ? "text" : "password",
            }}
            icons={{
              left: {
                icon: <TbLockPassword className="text-gray-400 text-lg" />,
              },
              right: {
                icon: (
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? (
                      <IoEyeOffOutline className="text-gray-400 text-lg cursor-pointer" />
                    ) : (
                      <IoEyeOutline className="text-gray-400 text-lg cursor-pointer" />
                    )}
                  </button>
                ),
              },
            }}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="max-w-4xl relative w-full">
          <Input
            label="Confirm Password"
            className="w-full border-b-4"
            register={register("confirmPassword")}
            inputProps={{
              placeholder: "Confirm New Password",
              type: showConfirmPassword ? "text" : "password",
            }}
            icons={{
              left: {
                icon: <TbLockPassword className="text-gray-400 text-lg" />,
              },
              right: {
                icon: (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <IoEyeOffOutline className="text-gray-400 text-lg cursor-pointer" />
                    ) : (
                      <IoEyeOutline className="text-gray-400 text-lg cursor-pointer" />
                    )}
                  </button>
                ),
              },
            }}
          />
        </div>

        {/* Update PassWord BUTTON  */}
        <Button
          content={isPending ? "Updating..." : "Update Password"}
          pattern="secondary"
          className="w-full! mt-8!"
          buttonProps={{ disabled: isPending, type: "submit" }}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
