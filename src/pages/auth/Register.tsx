import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import type { TBaseUser } from "../../types";
import { useRegisterUser } from "../../api/auth/service";
import { registerSchema } from "../../validations/auth";
import { ALLOWED_IMAGE_TYPES } from "../../constants";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import LoadingScreen from "../../components/LoadingScreen";

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
        <LoadingScreen />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;

  const profilePic = watch("profilePic") ?? null;

  return (
    <div className="min-h-dvh w-dvw flex items-center justify-center bg-gradient-to-tr px-4">
      {/* MAIN CARD */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-white animate-fade-in-up">
        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center">
          <img
            src="https://www.shutterstock.com/image-photo/cute-character-3d-image-ai-600nw-2574802489.jpg"
            alt="Robot"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 bg-slate-100">
          <form
            className="max-w-md mx-auto flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Create Account 🚀
            </h1>

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
                    className="w-full pl-8 border-b-4 rounded-lg px-4 py-3 focus:outline-none focus:ring-indigo-400 text-sm"
                    inputProps={{
                      type: "file",
                      accept: ALLOWED_IMAGE_TYPES.join(","),
                      onChange: (e) =>
                        field.onChange(e.target.files?.[0] || null),
                    }}
                  />
                )}
              />
              <FaRegUser className="absolute top-4 left-3 text-gray-500" />
              {errors.profilePic && (
                <p className="text-red-500 text-xs">
                  {String(errors.profilePic.message)}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="flex gap-4">
              <div className="relative w-full">
                <Input
                  label="First Name"
                  register={register("firstName")}
                  className="pl-8 w-full px-4 py-3 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                  inputProps={{ placeholder: "First name" }}
                />
                <FaRegUser className="absolute top-4 left-3 text-gray-500" />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="relative w-full">
                <Input
                  label="Last Name"
                  register={register("lastName")}
                  className="w-full px-4 py-3 pl-9 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                  inputProps={{ placeholder: "Last name" }}
                />
                <FaRegUser className="absolute top-4 left-3 text-gray-500" />
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
                className="w-full px-4 py-3 pl-9 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                inputProps={{ placeholder: "Email" }}
              />
              <FaRegUser className="absolute top-4 left-3 text-gray-500" />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex gap-4">
              <div className="relative w-full">
                <Input
                  label="Password"
                  register={register("password")}
                  className="w-full px-4 py-3 pl-9 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                  inputProps={{ placeholder: "Password" }}
                />
                <FaLock className="absolute top-4 left-3 text-gray-500" />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="relative w-full">
                <Input
                  label="Confirm Password"
                  register={register("confirmPassword")}
                  className="w-full px-4 py-3 pl-9 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                  inputProps={{ placeholder: "Confirm password" }}
                />
                <FaLock className="absolute top-4 left-3 text-gray-500" />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <Button
              pattern="outline"
              content={isSubmitting ? "Registering..." : "Register"}
              className="w-60! mt-4 bg-white text-black border-2 border-black text-xs sm:text-sm 
              py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
              buttonProps={{ type: "submit", disabled: isSubmitting }}
            />

            {/* Social */}
            <div className="text-center text-gray-600 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-black/30" />
                OR
                <div className="flex-1 h-px bg-black/30" />
              </div>
            </div>

            <div className="flex justify-center gap-4 text-xl">
              <FaGoogle className="text-red-500 hover:scale-110 transition" />
              <FaFacebookF className="text-blue-600 hover:scale-110 transition" />
              <FaGithub className="text-gray-800 hover:scale-110 transition" />
              <FaLinkedin className="text-blue-500 hover:scale-110 transition" />
            </div>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold">
                Login <FaArrowRight className="inline-block ml-1" />
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Back Home */}
      <Button
        content="🏠 Back to Home"
        pattern="secondary"
        className="fixed bottom-4 right-4 !h-10 w-50!"
        icons={{ right: <FaArrowRight /> }}
        buttonProps={{ onClick: () => navigate("/") }}
      />
    </div>
  );
};

export default Register;
