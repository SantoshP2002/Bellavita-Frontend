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

  // Submit Handler

  const onSubmit = async (data: TBaseUser) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    const file = data.profilePic;
    if (file) {
      formData.append("profilePic", file);
    }

    mutateAsync(formData);
  };

  if (isPending) {
    return <div className="">Loading......</div>;
  }
  if (isError) {
    return <div className="">Something went wrong</div>;
  }

  const profilePic = watch("profilePic") ?? null;

  return (
    <div className="w-dvw min-h-dvh flex justify-center items-center bg-gradient-to-tr px-4">
      <div className="w-fit p-8 animate-fade-in-up mx-auto bg-slate-100 rounded-xl shadow-lg">
        <form
          className="max-w-md flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 animate-fade-in-scale">
            Register
          </h1>
          {/* Profile Picture */}
          {profilePic && (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="Profile Pic"
              className="w-20 h-20 object-cover object-center aspect-square rounded-full mx-auto"
            />
          )}
          <div className="relative">
            <Controller
              name="profilePic"
              control={control}
              render={({ field }) => (
                // <input
                //   type="file"
                //   multiple={false}
                //   accept={ALLOWED_IMAGE_TYPES.join(",")}
                //   onChange={(e) => field.onChange(e.target.files?.[0] || null)} // pick File
                //   className="w-full px-4 py-3 pl-6 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                // />
                <Input
                  label="Upload Image"
                  className="w-full px-4 py-3 pl-6 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                  inputProps={{
                    placeholder: "Enter first name...",
                    name: "firstName",
                    type: "file",
                    multiple: false,
                    accept: ALLOWED_IMAGE_TYPES.join(","),
                    onChange: (e) =>
                      field.onChange(e.target.files?.[0] || null),
                  }}
                />
              )}
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.profilePic?.message && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.profilePic.message)}
              </p>
            )}
          </div>
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              {/* FirstName */}
              <Input
                label="First Name"
                className="w-full px-4 py-3 pl-6 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                register={register("firstName")}
                inputProps={{
                  placeholder: "Enter first name...",
                  name: "firstName",
                }}
              />
              <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="relative">
              {/* LastName */}
              <Input
                label="Last Name"
                className="w-full px-4 py-3 pl-6 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                register={register("lastName")}
                inputProps={{
                  placeholder: "Enter last name...",
                  name: "lastName",
                }}
              />
              <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <Input
              label="Email"
              className="w-full px-4 py-3 pl-6 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
              register={register("email")}
              inputProps={{
                placeholder: "Enter Your Email...",
                name: "email",
              }}
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Input
                label="Password"
                className="w-full px-4 py-3 pl-6 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                register={register("password")}
                inputProps={{
                  placeholder: "Enter Your Password...",
                  name: "password",
                }}
              />
              <FaLock className="absolute top-3.5 left-3 text-gray-500" />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                className="w-full px-4 py-3 pl-6 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                register={register("confirmPassword")}
                inputProps={{
                  placeholder: "Enter Confirm Password...",
                  name: "confirmPassword",
                }}
              />
              <FaLock className="absolute top-3.5 left-3 text-gray-500" />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            pattern="secondary"
            content={isSubmitting ? "Registering..." : "Register"}
            buttonProps={{
              disabled: isSubmitting,
              type: "submit",
            }}
          />

          {/* Divider */}
          <div className="text-center text-gray-600 flex flex-col">
            <div className="flex items-center w-full gap-3">
              <div className="border border-black/30 w-full" />
              <span>OR</span>
              <div className="border border-black/30 w-full" />
            </div>
            <span className="text-sm">Register with social platform</span>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <div className="text-red-500 hover:scale-110 transition text-xl">
              <FaGoogle />
            </div>
            <div className="text-blue-600 hover:scale-110 transition text-xl">
              <FaFacebookF />
            </div>
            <div className="text-gray-800 hover:scale-110 transition text-xl">
              <FaGithub />
            </div>
            <div className="text-blue-500 hover:scale-110 transition text-xl">
              <FaLinkedin />
            </div>
          </div>

          {/* Switch to Login */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login{" "}
              <span className="mt-0.5">
                <FaArrowRight className="inline-block" />
              </span>
            </Link>
          </p>

          <Button
            content="🏠 Back to Home"
            pattern="secondary"
            className="!w-42 !h-14  fixed bottom-4 right-4"
            icons={{
              right: <FaArrowRight />,
            }}
            buttonProps={{
              onClick: () => navigate("/"),
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
