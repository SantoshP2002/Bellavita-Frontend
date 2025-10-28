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
    value: "bath and body",
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
  "http://bellavitaorganic.com/cdn/shop/files/gourmet_banner.webp?v=1758865399&width=1920",
  "https://bellavitaorganic.com/cdn/shop/files/1920x720New.webp?v=1756991147&width=1920",
];

export const luxuryCategories = [
  {
    name: "COSMETIC",
    category: "Cosmetic",
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

export const DEFAULT_QUILL_LINK_ID = "custom-link-btn" as const;
