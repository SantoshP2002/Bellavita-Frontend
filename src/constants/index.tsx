import type { TBaseProduct } from "../types";

export const navMapData = [
  { title: "Crazy Deals" },
  { title: "Shop All" },
  { title: "Bestsellers" },
  {
    title: "Perfumes",
    options: [
      { title: "All Perfumes" },
      { title: "Men" },
      { title: "Women" },
      { title: "Unisex" },
      { title: "Oud Collection" },
      { title: "Attars" },
      { title: "Little Luxuries" },
      { title: "Mood Collection" },
      { title: "Zodiac Collection" },
      { title: "Gourmet Collection" },
    ],
  },
  {
    title: "Bath & Body",
    options: [
      { title: "All Bath & Body" },
      { title: "Shower Gel" },
      { title: "Body Mist" },
      { title: "Body Perfume (No Gas Deo)" },
      { title: "Travel Kit" },
      { title: "Body lotion" },
    ],
  },
  { title: "Little Luxuries" },
  { title: "New Arrivals" },
  { title: "Gifting" },
];

export const MB = 1024 ** 2;
export const MAX_IMAGE_FILE_SIZE = 2 * MB; // 2MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const CATEGORIES_DATA = [
  { label: "Shop All", value: "Shop All" },
  { label: "Crazy Deals", value: "Crazy Deals" },
  { label: "Bestsellers", value: "Bestsellers" },
  { label: "Perfumes", value: "Perfumes" },
  { label: "Bath & Body", value: "Bath & Body" },
  { label: "Cosmetics", value: "Cosmetics" },
  { label: "New Arrivals", value: "New Arrivals" },
  { label: "Skincare", value: "Skincare" },
  { label: "Gifting", value: "Gifting" },
];


export const PRODUCT_INITIAL_VALUES: TBaseProduct = {
  title: "",
  brand: "",
  price: 0,
  sellingPrice: 0,
  description: "",
  category: "",
  images: [],
};