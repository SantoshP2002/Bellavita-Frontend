import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaLock, FaArrowRight, FaImages } from "react-icons/fa";
import type { TBaseUser } from "../../types";
import { useRegisterUser } from "../../api/auth/service";
import { registerSchema } from "../../validations/auth";
import { ALLOWED_IMAGE_TYPES } from "../../constants";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import LoadingScreen from "../../components/LoadingScreen";
import { VITE_BACKEND_URI } from "../../env";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError } = useRegisterUser();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TBaseUser) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    if (data.profilePic) {
      formData.append("profilePic", data.profilePic);
    }

    mutateAsync(formData);
  };

  if (isPending)
    return (
      <div>
        <LoadingScreen content="Register Loading Please Wait !" />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;

  const profilePic = watch("profilePic") ?? null;

  const handleGoogleLogin = () => {
    window.location.href = `${VITE_BACKEND_URI}/api/google`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-700 text-transparent bg-clip-text">
        REGISTER
      </h1>
      {/* MAIN CARD */}
      <div className="flex w-90 lg:w-130 overflow-hidden">
        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-full pl-5 py-5">
          <form
            className="max-w-md mx-auto flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Profile Preview */}
            {profilePic && (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
            )}

            {/* Upload Image */}
            <div className="relative">
              <Controller
                name="profilePic"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Upload Image"
                    className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                    inputProps={{
                      type: "file",
                      accept: ALLOWED_IMAGE_TYPES.join(","),
                      onChange: (e) =>
                        field.onChange(e.target.files?.[0] || null),
                    }}
                  />
                )}
              />
              <FaImages className="absolute top-3 lg:top-4 left-3 text-gray-500" />
              {errors.profilePic && (
                <p className="text-red-500 text-xs">
                  {String(errors.profilePic.message)}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="flex gap-4">
              <div className="relative">
                <Input
                  label="First Name"
                  register={register("firstName")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "First name" }}
                />
                <FaRegUser className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Input
                  label="Last Name"
                  register={register("lastName")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "Last name" }}
                />
                <FaRegUser className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Input
                label="Email"
                register={register("email")}
                className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                inputProps={{ placeholder: "Enter Email" }}
              />
              <AiOutlineMail className="absolute top-3 lg:top-4 left-3 text-gray-500" />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex gap-4">
              <div className="relative">
                <Input
                  label="Password"
                  register={register("password")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "Password" }}
                />
                <FaLock className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Confirm Password */}
              <div className="relative">
                <Input
                  label="Confirm Password"
                  register={register("confirmPassword")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "Confirm password" }}
                />
                <TbLockPassword className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <Button
              pattern="outline"
              content={isSubmitting ? "Registering..." : "Register"}
              className="w-60! mt-2 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
              buttonProps={{ type: "submit", disabled: isSubmitting }}
            />

            {/* Social */}
            <div>
              <div className="flex-1 h-px dark:bg-white bg-black" />
            </div>

            {/* SOCIAL ICON GOOGLE */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-3">
              {/* Google */}
              <Button
                pattern="outline"
                buttonProps={{
                  onClick: handleGoogleLogin,
                  type: "button",
                }}
                className="w-60! bg-white rounded-xl text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[2px_2px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[2px_2px_0_0_#fff]"
                content={
                  <span className="flex items-center justify-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                      alt="Google"
                      className="w-4 h-4"
                    />
                    <span className="whitespace-nowrap">
                      Continue with Google
                    </span>
                  </span>
                }
              />

              {/* Back Home */}
              <Button
                content="Back to 🏠"
                pattern="outline"
                className=" w-50!"
                icons={{ right: <FaArrowRight /> }}
                buttonProps={{
                  type: "button",
                  onClick: () => navigate("/"),
                }}
              />
            </div>

            {/* LOGIN  */}
            <div className="mt-3 flex justify-center">
              <div className="flex flex-col justify-center items-center gap-3 text-xs">
                <span className="text-black dark:text-gray-300">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="transition-all duration-300 hover:bg-gray-200 hover:rounded-full hover:shadow-2xl hover:shadow-blue-900 px-5 py-2 dark:text-white dark:hover:bg-gray-800 dark:hover:shadow-blue-400"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
