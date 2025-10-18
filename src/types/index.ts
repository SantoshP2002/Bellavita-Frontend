import type {
  InputHTMLAttributes,
  JSX,
  ReactNode,
  SVGProps,
} from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { ALLOW_COUNTRIES } from "../constants";

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

export interface ISelect extends Omit<TBaseInput, "register"> {
  selectProps: {
    onChange?: (value: string) => void;
    options: Record<"name" | "value", string>[];
    value?: string;
    placeholder?: string;
  };
}

export interface TQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
}

export type TProductCart = {
  _id: string;
  product: Pick<
    TProduct,
    "_id" | "title" | "brand" | "price" | "sellingPrice" | "images"
  >;
  quantity: number;
};

export interface ICart {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  products: TProductCart[];
}

export interface IQueryParams {
  [key: string]: string;
}

export interface IBaseAddress {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  altPhoneNumber?: string; // optional
  email: string;
  address: string;
  landmark?: string; // optional
  city: string;
  state: string;
  pinCode: string; // length = 6
  country: (typeof ALLOW_COUNTRIES)[number]; // default: "India"
}

export interface IAddress extends IBaseAddress {
  _id: string;
}

// modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  containerProps?: JSX.IntrinsicElements["div"];
  heading?: string;
  className?: string;
}

export interface IOrder {
  _id: string;
  user: string;
  address: {
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pinCode: string;
    phone?: string;
    name?: string;
  };
  products: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      title: string;
      brand: string;
      price: number;
      sellingPrice: number;
      quantity: number
      images: string[];
    };
  }[];
  totalPrice: number | string;
  order_result: {
    order_status: "PENDING" | "PAID" | "FAILED";
    amount: number;
    order_receipt: string;
    discount?: number;
    charges?: number;
  };
  razorpay_payment_result: {
    payment_mode: "ONLINE" | "COD";
    rzp_payment_status: "UNPAID" | "PAID" | "FAILED";
    currency: "INR";
  };
  payment_details?: {
    fee?: number;
    tax?: number;
  };
  status?: "paid" | "pending" | "failed"; // Optional frontend-friendly alias
  createdAt: string;
  updatedAt: string;
}

