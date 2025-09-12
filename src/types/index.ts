import type { InputHTMLAttributes, ReactNode, SVGProps } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export type IconProps = SVGProps<SVGSVGElement>;

export type TUserRole = "ADMIN" | "USER";

export type TBaseUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  profilePic?: File;
};

export type TBaseProduct = {
  title: string;
  brand: string;
  price: number;
  sellingPrice: number;
  description: string;
  category: string;
  productImages: File[];
};

export interface TGetAllProducts extends Omit<TBaseProduct, "productImages"> {
  _id: string;
  productImages: string[];
  discount: number;
  rating: number;
  reviews: number;
  isBestseller: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Omit<TBaseUser, "profilePic"> {
  _id: string;
  role: TUserRole;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserStore {
  user: IUser | null;
  isLoggedIn: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export interface ClassName {
  className?: string;
}

interface TBaseInput extends ClassName {
  containerClassName?: string;
  icons?: { left?: TInputIcon; right?: Omit<TInputIcon, "text"> };
  register?: UseFormRegisterReturn;
  label?: string;
  error?: string;
}

type TInputIcon = { text?: string; icon?: ReactNode; onClick?: () => void };

export interface IInput extends TBaseInput {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

export interface ISelectProps {
  label?: string;
  register?: UseFormRegisterReturn;
  name: string;
  error?: string;
  options: { label: string; value: string }[];
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  value?: string;
}
