import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaLock, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { TBaseUser } from "../../types";
import { loginSchema } from "../../validations/auth";
import type z from "zod";
import { useLoginUser } from "../../api/auth/service";
import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { VITE_BACKEND_URI } from "../../env";

const Login = () => {
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
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]">
      {/* MAIN CARD */}
      <div className="flex w-full max-w-5xl overflow-hidden shadow-md dark:shadow-white shadow-blue-400 rounded-4xl">
        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://assets-v2.lottiefiles.com/a/6beb774c-1166-11ee-a6f1-4788c8724adf/E9TtaYgKZu.gif"
            alt="Login visual"
            className="object-cover rounded-xl"
          />
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex items-center">
          <form
            className="w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-700 text-transparent bg-clip-text">
              LOGIN
            </h1>

            {/* Email */}
            <div className="relative mb-4">
              <Input
                label="Email"
                className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                register={register("email")}
                inputProps={{ placeholder: "Enter your email", name: "email" }}
              />
              <FaRegUser className="absolute size-3 lg:size-4 top-3 lg:top-4 left-3 text-gray-500" />
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
                className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                register={register("password")}
                inputProps={{ placeholder: "Enter password", name: "password" }}
              />
              <FaLock className="absolute size-3 lg:size-4 top-3 lg:top-4 left-3 text-gray-500" />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-4">
              <Link
                to="/"
                className="relative w-fit cursor-pointer text-black dark:text-white after:content-[''] after:absolute after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-blue-400 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              content={isPending ? "Logging in..." : "Login"}
              pattern="outline"
              className="w-60! mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[4px_4px_0_0_#fff]"
              buttonProps={{ disabled: isPending, type: "submit" }}
            />

            {/* Divider */}
            <div className="h-px dark:bg-white bg-black mt-7" />

            {/* Social Icons GOOGLE */}
            <div className="flex justify-center gap-5 mt-4 text-xl">
              <Button
                pattern="outline"
                buttonProps={{
                  onClick: handleGoogleLogin,
                  type: "button",
                }}
                className="w-60! mt-8 bg-white rounded-xl text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[2px_2px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[2px_2px_0_0_#fff]"
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
                <span className="text-black dark:text-gray-300">
                  Don’t have an account?
                </span>

                <Link
                  to="/register"
                  className="transition-all duration-300 hover:bg-gray-200 hover:rounded-full hover:shadow-2xl hover:shadow-blue-900 px-5 py-2 dark:text-white dark:hover:bg-gray-800 dark:hover:shadow-blue-400"
                >
                  REGISTER
                </Link>
                {/* Back to Home */}
                <Link
                  to="/"
                  className="mt-2 w-50! bg-black text-white border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white  dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
                >
                  🏠 Back to Home
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
