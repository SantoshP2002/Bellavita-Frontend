import {
  FaRegUser,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-dvw flex justify-center items-center min-h-screen bg-gradient-to-tr px-4">
      <div className="w-fit p-8 animate-fade-in-up mx-auto bg-slate-100 rounded-xl shadow-lg">
        <form className="max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in-scale">
            Login
          </h1>

          {/* Email Input */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter your Email..."
              required
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaRegUser className="absolute top-3.5 left-3 text-gray-500" />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter your password..."
              required
              className="w-full px-4 py-3 pl-12 border-b-2 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            />
            <FaLock className="absolute top-3.5 left-3 text-gray-500" />
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
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 text-sm rounded-lg transition duration-300"
          >
            Login
          </button>
          <p className="text-center mt-3 text-gray-600 flex flex-col">
            <div className="flex items-center w-full gap-3">
              <div className="border border-black/30 w-full" />
              <span>OR</span>
              <div className="border border-black/30 w-full" />
            </div>
            <span className="text-sm">Login with social platform</span>
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="text-red-500 hover:scale-110 transition text-xl">
              <FaGoogle />
            </div>
            <div
              div
              className="text-blue-600 hover:scale-110 transition text-xl"
            >
              <FaFacebookF />
            </div>
            <div className="text-gray-800 hover:scale-110 transition text-xl">
              <FaGithub />
            </div>
            <div
              div
              className="text-blue-500 hover:scale-110 transition text-xl"
            >
              <FaLinkedin />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
