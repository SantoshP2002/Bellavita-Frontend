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
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center justify-center px-4 dark:bg-black dark:text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-10 mb-10 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-white dark:bg-black/60 shadow-md dark:shadow-white rounded-tl-full rounded-br-full p-6"
      >
        <p className="text-xl font-medium py-3 dark:text-blue-300">
          Change You Password 🔏
        </p>
        {/* CURRENT PASSWORD */}
        <div className="relative w-full">
          <Input
            label="Current Password"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
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
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("newPassword")}
            inputProps={{
              placeholder: "New Password",
              type: showNewPassword ? "text" : "password",
            }}
            error={errors.newPassword?.message}
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
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
            register={register("confirmPassword")}
            inputProps={{
              placeholder: "Confirm New Password",
              type: showConfirmPassword ? "text" : "password",
            }}
            error={errors.confirmPassword?.message}
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
          pattern="outline"
          className="
    w-full py-2.5 sm:py-3 rounded-lg
    bg-white text-black border border-black
    hover:bg-black hover:text-white
    hover:scale-[1.02]

    dark:bg-transparent dark:text-white dark:border-white
    dark:hover:bg-white dark:hover:text-black!
"
          buttonProps={{ disabled: isPending, type: "submit" }}
        />
      </form>
      <Button
        content="BACK"
        pattern="outline"
        buttonProps={{
          onClick: () => navigate("/profile"),
          className:
            "mb-10! flex! flex-col! hover:text-white! w-20! font-semibold rounded-lg hover:scale-[1.02]",
        }}
      />
    </div>
  );
};

export default ChangePassword;
