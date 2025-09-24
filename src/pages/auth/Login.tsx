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

  return (
    <div className="w-dvw h-dvh overflow-y-scroll flex justify-center items-center bg-gradient-to-tr px-4">
      <div className="w-fit p-8 animate-fade-in-up mx-auto bg-slate-100 rounded-xl shadow-lg">
        <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in-scale">
            Login
          </h1>

          {/* Email Input */}
          <div className="relative mb-4">
            <Input
              label="Email"
              className="w-full px-4 py-3 pl-12 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
              register={register("email")}
              inputProps={{ placeholder: "Enter Your Email...", name: "email" }}
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <Input
              label="Password"
              className="w-full px-4 py-3 pl-12 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
              register={register("password")}
              inputProps={{ placeholder: "Enter Password", name: "password" }}
            />
            <FaLock className="absolute top-3.5 left-3 text-gray-500" />
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

          {/* Submit Button */}

          <Button
            pattern="secondary"
            content={isPending ? "Logging in..." : "Login"}
            buttonProps={{ disabled: isPending, type: "submit" }}
          />

          {/* Divider */}
          <div className="text-center mt-3 text-gray-600 flex flex-col">
            <div className="flex items-center w-full gap-3">
              <div className="border border-black/30 w-full" />
              <span>OR</span>
              <div className="border border-black/30 w-full" />
            </div>
            <span className="text-sm">Login with social platform</span>
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

          {/* Switch to Register */}
          <p className="text-center mt-5 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register{" "}
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

export default Login;
