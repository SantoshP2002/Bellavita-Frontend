import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";

interface LoginResponse {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    token: string;
  };
}

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/login`,
        data
      );
      const respData = response.data;
      if (respData) {
        localStorage.setItem("user", JSON.stringify(respData.data));
        toast.success(respData.message);

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 600);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.error("Login error:", error);
    }
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
            <input
              {...register("email")}
              type="text"
              placeholder="Enter your Email..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
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

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <Link to="/" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 text-sm rounded-lg transition duration-300 cursor-pointer`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

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
        </form>
      </div>
    </div>
  );
};

export default Login;
