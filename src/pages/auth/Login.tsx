import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FaArrowRight,
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaLinkedin,
  FaLock,
  FaRegUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import type { TBaseUser } from "../../types";
import { loginSchema } from "../../validations/auth";
import type z from "zod";
import { useLoginUser } from "../../api/auth/service";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { VITE_BACKEND_URI } from "../../env";

const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: Pick<TBaseUser, "email" | "password">) => {
    mutateAsync(data);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${VITE_BACKEND_URI}/api/google`;
  };

  return (
    <div className="min-h-dvh w-dvw flex flex-col gap-5 items-center justify-center bg-gradient-to-tr px-4">
      {/* MAIN CARD */}
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-xl bg-white animate-fade-in-up">
        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://www.shutterstock.com/image-photo/cute-character-3d-image-ai-600nw-2574802489.jpg"
            alt="Login visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 bg-slate-100 flex items-center">
          <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Please Login 👋
            </h1>

            {/* Email */}
            <div className="relative mb-4">
              <Input
                label="Email"
                className="w-full px-4 py-3 pl-9 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                register={register("email")}
                inputProps={{ placeholder: "Enter your email", name: "email" }}
              />
              <FaRegUser className="absolute top-4 left-3 text-gray-500" />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <Input
                label="Password"
                className="w-full px-4 py-3 pl-9 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
                register={register("password")}
                inputProps={{ placeholder: "Enter password", name: "password" }}
              />
              <FaLock className="absolute top-4 left-3 text-gray-500" />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <Link to="/" className="text-sm text-indigo-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              pattern="secondary"
              content={isPending ? "Logging in..." : "Login"}
              buttonProps={{ disabled: isPending, type: "submit" }}
            />

            {/* Divider */}
            <div className="text-center mt-4 text-gray-600">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-px bg-black/30" />
                <span className="text-sm">OR</span>
                <div className="flex-1 h-px bg-black/30" />
              </div>
              <span className="text-xs">Login with social platform</span>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-5 mt-4 text-xl">
              <FaGoogle
                className="text-red-500 hover:scale-150 transition"
                onClick={handleGoogleLogin}
              />
              <FaFacebookF className="text-blue-600 hover:scale-150 transition" />
              <FaGithub className="text-gray-800 hover:scale-150 transition" />
              <FaLinkedin className="text-blue-500 hover:scale-150 transition" />
            </div>

            {/* Register */}
            <p className="text-center mt-6 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-semibold">
                Register <FaArrowRight className="inline-block ml-1" />
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Back to Home */}
      <Button
        content="🏠 Back to Home"
        pattern="outline"
        className="h-10! w-50! mt-4 bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all
                     duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000]"
        icons={{ right: <FaArrowRight /> }}
        buttonProps={{ onClick: () => navigate("/") }}
      />
    </div>
  );
};

export default Login;
