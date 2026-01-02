import type { IBaseAddress, QuillToolbar, TBaseProduct } from "../types";

export const navMapData = [
  { name: "Crazy Deals", value: "crazy_deals" },
  { name: "Shop All", value: "shop_all" },
  { name: "Bestsellers", value: "bestseller" },
  {
    name: "Perfumes",
    value: "perfumes",
    options: [
      { name: "All Perfumes", value: "all_perfumes" },
      { name: "Men", value: "men" },
      { name: "Women", value: "women" },
      { name: "Unisex", value: "unisex" },
      { name: "Oud Collection", value: "oud_collection" },
      { name: "Attars", value: "attars" },
      { name: "Little Luxuries", value: "little_luxuries" },
      { name: "Mood Collection", value: "mood_collection" },
      { name: "Zodiac Collection", value: "zodiac_collection" },
      { name: "Gourmet Collection", value: "gourmet_collection" },
    ],
  },
  {
    name: "Bath & Body",
    value: "bath_and_body",
    options: [
      { name: "All Bath & Body", value: "all_bath_and_body" },
      { name: "Shower Gel", value: "shower_gel" },
      { name: "Body Mist", value: "body_mist" },
      { name: "Body Perfume", value: "body_perfume" },
      { name: "Travel Kit", value: "travel_kit" },
      { name: "Body lotion", value: "body_lotion" },
    ],
  },
  {
    name: "Cosmetic",
    value: "cosmetic",
    options: [
      { name: "Flawless Base Range", value: "flawless_base_range" },
      { name: "Mood Range", value: "mood_range" },
      { name: "Pick Any 2", value: "pick_any_2" },
      { name: "Pick Any 3", value: "pick_any_3" },
      { name: "Lipstick", value: "lipstick" },
      { name: "Makeup Brushes", value: "makeup_brushes" },
      { name: "Face Blush", value: "face_blush" },
      { name: "Kajal", value: "kajal" },
      { name: "Airbrush Compact", value: "airbrush_compact" },
      { name: "Airbrush Foundation", value: "airbrush_foundation" },
      { name: "Nail Paints", value: "nail_paints" },
    ],
  },
  { name: "New Arrivals", value: "new_arrivals" },
  {
    name: "Skincare",
    value: "skincare",
    options: [
      { name: "All Skincare", value: "all_skincare" },
      { name: "Face Wash", value: "face_wash" },
      { name: "Lip Care", value: "lip_care" },
      { name: "Skin Essential Combos", value: "skin_essential_combos" },
      { name: "K-Beauty Secret", value: "k_beauty_secret" },
      { name: "Dry Skin", value: "dry_skin" },
      { name: "Sun-Kissed Summer", value: "su_kissed_summer" },
      { name: "Sunscreen", value: "sunscreen" },
      { name: "Underarm Roll On", value: "underarm_roll_on" },
      { name: "Wooden Comb", value: "wooden_comb" },
    ],
  },
  { name: "Gifting", value: "gifting" },
];

export const MB = 1024 ** 2;
export const MAX_IMAGE_FILE_SIZE = 2 * MB; // 2MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const CATEGORIES_DATA = navMapData.map(({ name, value }) => ({
  name,
  value,
}));

export const PRODUCT_INITIAL_VALUES: TBaseProduct = {
  title: "",
  brand: "",
  price: 0,
  sellingPrice: 0,
  description: "",
  category: {
    name: "",
    value: "",
  },
  subCategory: {
    name: "",
    value: "",
  },
  images: [],
};

export const carouselImages = [
  "https://bellavitaorganic.com/cdn/shop/files/1920-720_8af70e11-34be-4c94-b987-2299d747a5ee.jpg?v=1762235997&width=1920",
  "https://bellavitaorganic.com/cdn/shop/files/lip_sleeping_mask_1_1__11zon.webp?v=1762174363&width=1920",
];

export const mobileCarouselImages = [
  "https://bellavitaorganic.com/cdn/shop/files/860-1150_c8c7060a-c93e-47b1-b422-9643124604a4.jpg?v=1762235996&width=800",
  "https://bellavitaorganic.com/cdn/shop/files/lip_sleeping_mask_Mobile_1_1__11zon.webp?v=1762174363&width=800",
];

export const luxuryCategories = [
  {
    name: "COSMETIC",
    value: "cosmetic",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/cosmetics-category-card-web_a4ad6e4b-07bf-421e-8f23-fcac380118ff.webp?v=1725617238&width=800",
  },
  {
    name: "SKINCARE",
    value: "skincare",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Category-card-for-web-skincare2.webp?v=1725617237&width=800",
  },
  {
    name: "LUXURY PERFUMES",
    value: "perfumes",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/intense_1.webp?v=1725617238&width=800",
  },
  {
    name: "BATH & BODY",
    value: "bath_and_body",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Category-card-body-wash2.webp?v=1725617238&width=800",
  },
  {
    name: "New Arrivals",
    value: "new_arrivals",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_aa0adad6-f23f-47c3-85b2-f57edc95477d.jpg?v=1755846059&width=500",
  },
  {
    name: "GIFT SETS",
    value: "gifting",
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
  { name: "SORT BY", value: "" },
  { name: "Price: Low to High", value: "price_low_high" },
  { name: "Price: High to Low", value: "price_high_low" },
  { name: "Newest First", value: "newest_first" },
  { name: "Oldest First", value: "oldest_first" },
];

export const defaultToolbarOptions: QuillToolbar = [
  [{ header: [false, 6, 5, 4, 3, 2, 1] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  [{ direction: "rtl" }],
  ["link", "image", "video"],
  ["code", "clean"],
];

export const bestsellerLinks = [
  {
    label: "Mood Collection",
    slug: "products?category=perfumes&subCategory=mood_collection",
  },
  {
    label: "Perfume For Men",
    slug: "products?category=perfumes&subCategory=men",
  },
  {
    label: "Perfume For Women",
    slug: "products?category=perfumes&subCategory=women",
  },
  {
    label: "Skin Essential Combos",
    slug: "products?category=skincare&subCategory=skin_essential_combos",
  },
  {
    label: "Lipstick",
    slug: "products?category=cosmetic&subCategory=lipstick",
  },
  {
    label: "Face Wash",
    slug: "products?category=skincare&subCategory=face_wash",
  },
  {
    label: "Unisex Perfume",
    slug: "products?category=perfumes&subCategory=unisex",
  },
];

export const BLOG_INITIAL_VALUES = {
  images: [],
  title: "",
  date: "",
  description: "",
  blog: "",
};

export const ORDER_STEPS = ["pending", "confirmed", "delivered"];

export const USER_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
};
