import z from "zod";
import { ALLOW_COUNTRIES } from "../constants";

export const addressSchema = z.object({
  address: z
    .string("address must be a string")
    .min(3, "Address must be a required 3 Character")
    .nonempty("address must be required"),
  landmark: z
    .union([
      z
        .string("Landmark must be a string")
        .min(2, "landmark must be at least 2 characters"),
      z.literal(""),
    ])
    .optional(),
  city: z
    .string("city must be Required")
    .min(2, "City must be a required 2 Character")
    .nonempty("city must be required"),
  state: z
    .string("state must be a required")
    .min(2, "Atleaste 1 State is Required")
    .nonempty("state must be required"),
  pinCode: z
    .string("pincode must be a required")
    .min(6, "PIN-CODE must be a required 6 Digit")
    .max(6),
  country: z.enum(ALLOW_COUNTRIES),
  altPhoneNumber: z
    .union([
      z
        .string("Alternate phone number must be a string")
        .length(10, "Alternative number must be 10 digits"),
      z.literal(""),
    ])
    .optional(),
  phoneNumber: z
    .string("phone Number must be string")
    .min(10, "PhoneNumber must be a required 10 Digit ")
    .max(10, "Maximum 10 Digit number is allowed")
    .nonempty("Phone Number is required"),
  firstName: z
    .string("First Name must be a string")
    .min(2, "First Name must be a required minimum 2")
    .max(20, "First Name is less than 20 characters")
    .nonempty("First Name is required"),
  lastName: z
    .string("Last Name must be a string")
    .min(2, "Last Name must be a required minimum 2")
    .max(20, "Last Name is less than 20 characters")
    .nonempty("Last Name is required"),
  email: z
    .email("Email should be a valid email address")
    .nonempty("email is required")
    .trim()
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/,
      "please provide a valid email address, like example@domain.com",
    ),
});
