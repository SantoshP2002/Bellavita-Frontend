import type { IBaseAddress, TBaseProduct } from "../types";

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
      { title: "Body Perfume" },
      { title: "Travel Kit" },
      { title: "Body lotion" },
    ],
  },
  {
    title: "Cosmetic",
    options: [
      { title: "Flawless Base Range" },
      { title: "Mood Range" },
      { title: "Pick Any 2" },
      { title: "Pick Any 3" },
      { title: "Lipstick" },
      { title: "Makeup Brushes" },
      { title: "Face Blush" },
      { title: "Kajal" },
      { title: "Airbrush Compact" },
      { title: "Airbrush Foundation" },
      { title: "Nail Paints" },
    ],
  },
  { title: "New Arrivals" },
  {
    title: "Skincare", options: [
    {title: "All Skincare"},
    {title: "Face Wash"},
    {title: "Lip Care"},
    {title: "Skin Essential Combos"},
    {title: "K-Beauty Secret"},
    {title: "Dry Skin"},
    {title: "Sun-Kissed Summer"},
    {title: "Sunscreen"},
    {title: "Underarm Roll On"},
    {title: "Wooden Comb"},
  ] },
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

export const carouselImages = [
  "https://bellavitaorganic.com/cdn/shop/files/Web.webp?v=1757920399&width=1920",
  "https://bellavitaorganic.com/cdn/shop/files/1920x720New.webp?v=1756991147&width=1920",
];

export const luxuryCategories = [
  {
    name: "COSMETICS",
    category: "Cosmetics",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/cosmetics-category-card-web_a4ad6e4b-07bf-421e-8f23-fcac380118ff.webp?v=1725617238&width=800",
  },
  {
    name: "SKINCARE",
    category: "Skincare",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Category-card-for-web-skincare2.webp?v=1725617237&width=800",
  },
  {
    name: "LUXURY PERFUMES",
    category: "Perfumes",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/intense_1.webp?v=1725617238&width=800",
  },
  {
    name: "BATH & BODY",
    category: "Bath & Body",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Category-card-body-wash2.webp?v=1725617238&width=800",
  },
  {
    name: "New Arrivals",
    category: "New Arrivals",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_aa0adad6-f23f-47c3-85b2-f57edc95477d.jpg?v=1755846059&width=500",
  },
  {
    name: "GIFT SETS",
    category: "Gifting",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Artboard_4_copy_05b3b2ed-5440-4463-b119-bedcd60ed5c1.webp?v=1725617237&width=800",
  },
];

export const ALLOW_COUNTRIES = ["India"];

export const ADDRESS_INITIAL_VALUES: IBaseAddress = {
  address: "",
  city: "",
  country: "India",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  pinCode: "",
  state: "",
};


export const SORT_DATA = [
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Newest First", value: "newest_first" },
  { label: "Oldest First", value: "oldest_first" },
];