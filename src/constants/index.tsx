import CrazyDealsIcon from "../assets/icons/crazy-deals_sticky.svg";
import ShopAllIcon from "../assets/icons/shop-all_sticky.svg";
import BestsellerIcon from "../assets/icons/bestsellers_sticky.svg";
import PerfumeIcon from "../assets/icons/perfumes_sticky.svg";
import BathAndBodyIcon from "../assets/icons/bath-body_sticky.svg";
import CosmeticIcon from "../assets/icons/cosmetics_sticky.svg";
import NewArrivalsIcon from "../assets/icons/new-arrivals_sticky.svg";
import SkinCareIcon from "../assets/icons/skincare_sticky.svg";

import type { IBaseAddress, QuillToolbar, TBaseProduct } from "../types";
import { ImGift } from "react-icons/im";
import type { JSX } from "react";

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
  "https://bellavitaorganic.com/cdn/shop/files/1920-720_7__11zon.webp?v=1765021204&width=1920",
  "https://bellavitaorganic.com/cdn/shop/files/1920-720_11.webp?v=1767200968&width=1920",
];

export const mobileCarouselImages = [
  "https://bellavitaorganic.com/cdn/shop/files/Mobile_3.webp?v=1767012883&width=800",
  "https://bellavitaorganic.com/cdn/shop/files/860-1150_15.webp?v=1767891845&width=800",
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

export const categoryVideoMap: Record<
  string,
  Record<
    string,
    {
      mobile: string;
      desktop: string;
    }
  >
> = {
  cosmetic: {
    flawless_base_range: {
      mobile:
        "https://cdn.shopify.com/videos/c/o/v/e49d6a8ef8234201a79a90be4ca39eda.mp4",
      desktop:
        "https://cdn.shopify.com/videos/c/o/v/a0256e76c2a24e6ab1d42d2d7ca153c0.mp4",
    },
    makeup_brushes: {
      mobile:
        "https://cdn.shopify.com/videos/c/o/v/e0bed43876af486386a3dbea61910890.mp4",
      desktop:
        "https://cdn.shopify.com/videos/c/o/v/2df0125f451e413faea6116085fd022e.mp4",
    },
    face_blush: {
      mobile:
        "https://cdn.shopify.com/videos/c/o/v/4cfa980361824a39bd3a92167f6ad9b6.mp4",
      desktop:
        "https://cdn.shopify.com/videos/c/o/v/291319ecfa6c4fbf913a21c67e4f4d20.mp4",
    },
    airbrush_compact: {
      mobile:
        "https://cdn.shopify.com/videos/c/o/v/334b0d41279a449782cff51999f40fa9.mp4",
      desktop:
        "https://cdn.shopify.com/videos/c/o/v/be008f0d52bb4664937ef7afad10a527.mp4",
    },
  },
  skincare: {
    lip_care: {
      mobile:
        "https://cdn.shopify.com/videos/c/o/v/f6d57d919ae84bf0bcf6037a0b984106.mp4",
      desktop:
        "https://cdn.shopify.com/videos/c/o/v/2b1cf44df9714e7487d3a1ff7a9ee3c9.mp4",
    },
  },
};

export const categoryIconMap: Record<string, JSX.Element> = {
  perfumes: <img src={PerfumeIcon} alt="Perfumes" width={16} height={16} />,
  crazy_deals: (
    <img src={CrazyDealsIcon} alt="Crazy Deals" width={16} height={16} />
  ),
  shop_all: <img src={ShopAllIcon} alt="Shop All" width={16} height={16} />,
  bestseller: (
    <img src={BestsellerIcon} alt="Shop All" width={16} height={16} />
  ),
  bath_and_body: (
    <img src={BathAndBodyIcon} alt="Bath and Body" width={16} height={16} />
  ),
  cosmetic: (
    <img src={CosmeticIcon} alt="Cosmetic icon" width={16} height={16} />
  ),
  new_arrivals: (
    <img src={NewArrivalsIcon} alt="New Arrivals" width={16} height={16} />
  ),
  skincare: <img src={SkinCareIcon} alt="Skin Care" width={16} height={16} />,
  gifting: <ImGift size={16} />,
};

export const customers = [
  {
    id: 1,
    name: "Sannna Thakur",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-1.webp?v=1725617641&width=150",
    review:
      "Bellavita perfumes are simply amazing! The fragrance lasts all day and feels truly luxurious. Totally worth every penny.",
  },
  {
    id: 2,
    name: "Pulkit Bangia",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-3.webp?v=1725617640&width=150",
    review:
      "Affordable yet premium quality! I love how every product feels natural incredible. Bellavita never disappoints!",
  },
  {
    id: 3,
    name: "Avantika",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-4.webp?v=1725617641&width=150",
    review:
      "I’ve tried many brands but Bellavita is my favorite. Their fragrances are elegant, long-lasting, and cruelty-free!",
  },
  {
    id: 4,
    name: "Gunveet",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-5.webp?v=1725617641&width=150",
    review:
      "Best perfumes ever! I get so many compliments every time I wear them. Bellavita has my heart forever!",
  },
  {
    id: 5,
    name: "Simran Narang",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/t-2.webp?v=1725617641&width=150",
    review:
      "Bellavita products define luxury with simplicity. Every scent is unique and perfectly balanced. Highly recommend!",
  },
];

export const whyBellavitaData = [
  {
    title: "CRUELTY FREE",
    description:
      "Kindness in every bottle: Our commitment to cruelty-free Products.",
    image:
      "https://static.vecteezy.com/system/resources/previews/036/363/698/non_2x/cruelty-free-icon-eco-friendly-natural-cruelty-free-and-gentle-on-skin-icon-free-vector.jpg",
  },
  {
    title: "FRAGRANCE FORWARD",
    description: "Luxurious & imported perfume oils in every product.",
    image:
      "https://c8.alamy.com/comp/2PP9RTK/fragrance-free-vector-line-circle-stamp-no-fragrances-for-cosmetics-packaging-label-2PP9RTK.jpg",
  },
  {
    title: "AFFORDABLE LUXURY",
    description: "Offering Premium Quality and Elegance at a Reasonable Price.",
    image:
      "https://static.vecteezy.com/system/resources/previews/028/307/994/non_2x/wallet-icon-simple-outline-style-affordable-investment-money-cash-dollar-bill-payment-business-finance-concept-thin-line-symbol-isolated-on-white-background-svg-vector.jpg",
  },
  {
    title: "GENDER NEUTRAL",
    description:
      "Elevate your self-care routine with bath, body and personal care for all.",
    image:
      "https://www.shutterstock.com/image-vector/gender-neutral-symbol-thin-line-260nw-1614585991.jpg",
  },
];
