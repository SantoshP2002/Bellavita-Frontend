import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validations/auth";
import { useForm } from "react-hook-form";
import type z from "zod";
import Input from "../Input";
import type { TBaseUser } from "../../types";
import { useLoginUser } from "../../api/auth/service";
import { FaAngleDoubleRight, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import GoogleLogin from "../GoogleLogin";
import { AiOutlineMail } from "react-icons/ai";

const LoginForm = () => {
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

  return (
    <div>
      <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-700 text-transparent bg-clip-text">
          LOGIN
        </h1>
        {/* MAIN CARD */}
        <div className="flex w-75 lg:w-90  overflow-hidden">
          {/* RIGHT FORM SECTION */}
          <div className="w-full md:w-full p-8 sm:p-10 flex items-center">
            <form
              className="w-full max-w-md mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email */}
              <div className="relative mb-4">
                <Input
                  label="Email"
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  register={register("email")}
                  inputProps={{
                    placeholder: "Enter your email",
                    name: "email",
                  }}
                />
                <AiOutlineMail className="absolute size-3 lg:size-4 top-3 lg:top-4 left-3 text-gray-500" />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative mb-2">
                <Input
                  label="Password"
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  register={register("password")}
                  inputProps={{
                    placeholder: "Enter password",
                    name: "password",
                  }}
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
                buttonProps={{ disabled: isPending, type: "submit" }}
              />

              {/* NEEDLE LINE */}
              <span className="mx-auto my-5 block h-[2px] w-[100%] bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500" />

              <GoogleLogin />

              {/* Register */}
              <div className="mt-3 flex justify-center">
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
                    className="mt-2 w-20! lg:w-30! bg-black text-white border-2 border-black text-xs lg:text-lg py-1 sm:py-2 px-3 transition-all duration-200 ease-out hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] dark:bg-white dark:text-black dark:border-white  dark:hover:bg-black dark:hover:text-white dark:hover:shadow-[4px_4px_0_0_#fff]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Home <FaAngleDoubleRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
