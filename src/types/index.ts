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
  profilePic?: File | string;
};

export type TBaseProduct = {
  title: string;
  brand: string;
  price: number;
  sellingPrice: number;
  description: string;
  category: string;
  images: (File | string)[];
};

export interface TProduct extends Omit<TBaseProduct, "images"> {
  _id: string;
  images: string[];
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

export interface ISelect extends TBaseInput {
  options: { label: string; value: string }[];
  selectProps: InputHTMLAttributes<HTMLSelectElement>;
  placeholder?: string;
}

export type TPageParams = {
  page?: number;
  limit?: number;
};

export type TProductCart = {
  _id: string;
  product: Pick<TProduct, "_id" | "title" | "brand" | "price" | "sellingPrice" | "images">;
  quantity: number;
};

export interface ICart {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  products: TProductCart[];
}

