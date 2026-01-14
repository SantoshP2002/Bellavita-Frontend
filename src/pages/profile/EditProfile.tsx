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
    <div className="min-h-[500px] flex flex-col items-center justify-center px-4 sm:px-6 bg-gray-100 dark:bg-black dark:text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-sm sm:max-w-md   bg-white/90 dark:bg-black/60 shadow-md dark:shadow-white backdrop-blur-xl p-6 sm:p-8 shadow-2x space-y-4 sm:space-y-5
          animate-[scaleIn_0.4s_ease-out]  rounded-tl-full rounded-br-full
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-start mb-8 uppercase">
          Edit Profile ✏️
        </h2>

        {/* FULL NAME  */}
        <div className="relative w-full">
          <Input
            label="First Name"
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
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
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
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
            className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
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
            className: `w-full py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale text-black bg-white hover:bg-black hover:text-white dark:text-black! dark:bg-white! dark:border-white! dark:hover:bg-black! dark:hover:text-white!
              ${isSubmitting ? "animate-pulse" : ""}
            `,
          }}
        />
      </form>
      <Button
        content="BACK"
        pattern="outline"
        buttonProps={{
          onClick: () => navigate("/profile"),
          className:
            "w-40! py-2.5 sm:py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale text-black bg-white hover:bg-black hover:text-white dark:text-black! dark:bg-white! dark:border-white! dark:hover:bg-black! dark:hover:text-white!",
        }}
      />
    </div>
  );
};

export default EditProfile;
