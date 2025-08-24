import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";

interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

// Zod Schema
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Submit Handler

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post<RegisterResponse>(
        `${import.meta.env.VITE_BACKEND_URI}/api/auth/register`,
        data
      );
      console.log(response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Register error", error);
    }
  };

  return (
    <div className="w-dvw h-dvh overflow-y-scroll flex justify-center items-center bg-gradient-to-tr px-4">
      <div className="w-fit p-8 animate-fade-in-up mx-auto bg-slate-100 rounded-xl shadow-lg">
        <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in-scale">
            Register
          </h1>

          {/* Name */}
          <div className="relative mb-4">
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name..."
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
