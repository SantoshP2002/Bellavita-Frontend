import { VITE_BACKEND_URI } from "../env";
import { Button } from "./Button";

const GoogleLogin = () => {
     const handleGoogleLogin = () => {
       window.location.href = `${VITE_BACKEND_URI}/api/google`;
     };
  return (
    <div>
      {/* Social Icons GOOGLE */}
      <div className="flex justify-center gap-5 text-xl">
        <Button
          pattern="outline"
          buttonProps={{
            onClick: handleGoogleLogin,
            type: "button",
          }}
          className="w-60! bg-white rounded-xl text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[2px_2px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white! dark:border-white dark:shadow-[2px_2px_0_0_#fff]"
          content={
            <span className="flex items-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="Google"
                className="w-4 h-4"
              />
              <span className="whitespace-nowrap">Continue with Google</span>
            </span>
          }
        />
      </div>
    </div>
  );
}

export default GoogleLogin
