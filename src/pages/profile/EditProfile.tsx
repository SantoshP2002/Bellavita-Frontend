import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { useUserStore } from "../../store/user";
import { useUpdateUser } from "../../api/user/service";
import type { IUser } from "../../types";
import { USER_VALUE } from "../../constants";
import { FaRegUser } from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { mutateAsync } = useUpdateUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<IUser>({
    defaultValues: USER_VALUE,
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  if (!user) return null;

  const onSubmit = async (data: IUser) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        setUser(res.user);
        setTimeout(() => navigate("/profile"), 500);
      },
    });
  };

  return (
    <div
      className="
        min-h-[500px] flex items-center justify-center
        px-4 sm:px-6 bg-gray-100
      "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-sm sm:max-w-md  bg-white/90 backdrop-blur-xl p-6 sm:p-8 shadow-2x space-y-4 sm:space-y-5
          animate-[scaleIn_0.4s_ease-out]  rounded-tl-full rounded-br-full
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-start mb-8 uppercase">
          Edit Profile ✏️
        </h2>

        {/* FULL NAME  */}
        <div className="relative w-full">
          <Input
            label="First Name"
            className="w-full px-4 py-3 pl-7 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            register={register("firstName")}
            inputProps={{
              placeholder: "Enter First Name",
            }}
          />
          <FaRegUser className="absolute top-4 left-3 text-gray-500" />
        </div>

        {/* LAST NAME  */}
        <div className="relative w-full">
          <Input
            label="Last Name"
            className="w-full px-4 py-3 pl-7 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            register={register("lastName")}
            inputProps={{
              placeholder: "Enter Last Name",
            }}
          />
          <FaRegUser className="absolute top-4 left-3 text-gray-500" />
        </div>

        {/* EMAIL  */}
        <div className="relative w-full">
          <Input
            label="Email"
            className="w-full px-4 py-3 pl-7 border-b-4 rounded-lg focus:outline-none focus:ring-indigo-400 text-sm"
            register={register("email")}
            inputProps={{
              placeholder: "Enter Email",
              type: "email",
            }}
          />
          <FaRegUser className="absolute top-4 left-3 text-gray-500" />
        </div>

        <Button
          content={isSubmitting ? "Saving..." : "Save Changes"}
          pattern="outline"
          buttonProps={{
            type: "submit",
            disabled: isSubmitting,
            className: `
              w-full py-2.5 sm:py-3
              text-base sm:text-lg
              font-semibold
              rounded-xl
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-lg
              active:scale-95
              ${isSubmitting ? "animate-pulse" : ""}
            `,
          }}
        />
      </form>
    </div>
  );
};

export default EditProfile;
