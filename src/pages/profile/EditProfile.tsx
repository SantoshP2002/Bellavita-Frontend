import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import Input from "../../components/Input";
import { useUserStore } from "../../store/user";
import { useUpdateUser } from "../../api/user/service";
import type { IUser } from "../../types";
import { USER_VALUE } from "../../constants";

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

  // 🔹 Prefill form when user loads
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  if (!user) return null;

  const onSubmit = async (data: IUser) => {
    console.log("data99999", data);

    await mutateAsync(data, {
      onSuccess: (data) => {
        setUser(data.user);
        setTimeout(() => navigate("/profile"), 500);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <Input
          label="First Name"
          register={register("firstName")}
          inputProps={{
            placeholder: "Enter First Name",
          }}
        />

        <Input
          label="Last Name"
          register={register("lastName")}
          inputProps={{
            placeholder: "Enter Last Name",
          }}
        />

        <Input
          label="Email"
          register={register("email")}
          inputProps={{
            placeholder: "Enter Email",
            type: "email",
          }}
        />

        <Button
          content={isSubmitting ? "Saving..." : "Save Changes"}
          pattern="primary"
          buttonProps={{
            type: "submit",
            disabled: isSubmitting,
          }}
        />
      </form>
    </div>
  );
};

export default EditProfile;
