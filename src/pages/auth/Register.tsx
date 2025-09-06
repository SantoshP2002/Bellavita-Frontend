import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
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
import { saveLocalToken } from "../../utils";
import { useUserStore } from "../../store/user";

const Register = () => {
  const { mutateAsync, isPending, isError } = useRegisterUser();
  const { setUser } = useUserStore();
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

    mutateAsync(formData, {
      onSuccess(data) {
        setUser(data?.user);
        saveLocalToken(data?.token);
      },
    });
  };

  if (isPending) {
    return <div className="">Loading......</div>;
  }
  if (isError) {
    return <div className="">Something went wrong</div>;
  }

  const profilePic = watch("profilePic") ?? null;

  return (
    <div className="w-dvw h-dvh overflow-y-scroll flex justify-center bg-gradient-to-tr px-4">
      <div className="w-fit p-8 animate-fade-in-up mx-auto bg-slate-100 rounded-xl shadow-lg">
        <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in-scale">
            Register
          </h1>
          {/* Profile Picture */}
          {profilePic && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile Pic"
                className="w-20 h-20 object-cover object-center aspect-square rounded-full mx-auto"
              />
            </div>
          )}
          <div className="relative mb-4">
            <Controller
              name="profilePic"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  multiple={false}
                  accept={ALLOWED_IMAGE_TYPES.join(",")}
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)} // pick File
                  className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
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
          <div className="relative mb-4">
            <input
              {...register("firstName")}
              type="text"
              placeholder="Enter your first name..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="relative mb-4">
            <input
              {...register("lastName")}
              type="text"
              placeholder="Enter your last name..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaLock className="absolute top-3.5 left-3 text-gray-500" />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="relative mb-4">
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaLock className="absolute top-3.5 left-3 text-gray-500" />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 text-sm rounded-lg transition duration-300 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {/* Divider */}
          <div className="text-center mt-3 text-gray-600 flex flex-col">
            <div className="flex items-center w-full gap-3">
              <div className="border border-black/30 w-full" />
              <span>OR</span>
              <div className="border border-black/30 w-full" />
            </div>
            <span className="text-sm">Register with social platform</span>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-4">
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
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login{" "}
              <span className="mt-0.5">
                <FaArrowRight className="inline-block" />
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
