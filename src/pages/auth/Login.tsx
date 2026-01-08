import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaLock, FaRegUser } from "react-icons/fa";
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
    <div className="min-h-dvh w-dvw flex flex-col gap-5 items-center justify-center px-4">
      {/* MAIN CARD */}
      <div className="flex w-full max-w-5xl overflow-hidden">
        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://www.shutterstock.com/image-photo/cute-character-3d-image-ai-600nw-2574802489.jpg"
            alt="Login visual"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex items-center">
          <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1
              className="text-3xl font-bold text-center mb-6 
               bg-gradient-to-r from-blue-400 to-purple-700 
               text-transparent bg-clip-text"
            >
              LOGIN
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
              content={isPending ? "Logging in..." : "Login"}
              pattern="outline"
              className="w-50! mt-4 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3
               shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
              buttonProps={{ disabled: isPending, type: "submit" }}
            />

            {/* Divider */}
            <div className="text-center mt-7">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-px bg-black/30" />
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-5 mt-4 text-xl">
              <Button
                pattern="outline"
                buttonProps={{
                  onClick: handleGoogleLogin,
                  type: "button",
                }}
                className=" w-60! bg-white text-gray-800 border border-gray-300 
                rounded-lg text-sm shadow-[2px_2px_0_0_#000]"
                content={
                  <span className="flex items-center gap-2">
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
            </div>

            {/* Register */}
            <div className="mt-6 flex justify-center">
              <div className="flex flex-col justify-center items-center text-xs">
                <span>Don’t have an account?</span>

                <Button
                  content="REGISTER"
                  className="transition-all duration-300 hover:bg-gray-200 hover:rounded-full hover:shadow-2xl hover:shadow-blue-900 px-5 py-2"
                  icons={{
                    right: <FaArrowRight className="ml-1" />,
                  }}
                  buttonProps={{
                    type:"button",
                    onClick: () => navigate("/register"),
                  }}
                />
              </div>
            </div>
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
        buttonProps={{
          type:"button",
          onClick: () => navigate("/")
        }}
      />
    </div>
  );
};

export default Login;
