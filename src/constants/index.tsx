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
      "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?cs=srgb&dl=pexels-shiny-diamond-3373739.jpg&fm=jpg",
  },
  {
    name: "LUXURY PERFUMES",
    value: "perfumes",
    image:
      "https://media.istockphoto.com/id/1399637805/photo/top-view-flat-lay-of-a-set-of-perfume-bottles-on-a-beige-blank-background.jpg?s=612x612&w=0&k=20&c=q3SEujgJ4J92jMkoldhx2HJUIBdle08uo21xyI0jSIM=",
  },
  {
    name: "SKINCARE",
    value: "skincare",
    image:
      "https://t3.ftcdn.net/jpg/03/60/94/16/360_F_360941651_Vm8ut6asUMp5nfzyPZnyLnI9OLOHIyle.jpg",
  },
  {
    name: "New Arrivals",
    value: "new_arrivals",
    image:
      "https://t3.ftcdn.net/jpg/05/75/66/88/360_F_575668898_05nhhqdSNoUtbnNcupJyRcDONlibzSHr.jpg",
  },
  {
    name: "GIFT SETS",
    value: "gifting",
    image:
      "https://img.freepik.com/free-photo/paper-near-set-gift-boxes-wraps_23-2148015284.jpg",
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
      "https://static.vecteezy.com/system/resources/previews/022/690/470/non_2x/fragrance-free-black-circle-stamp-no-fragrance-for-cosmetics-packaging-instructions-black-label-badge-icon-vector.jpg",
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
      "https://static.vecteezy.com/system/resources/thumbnails/075/351/223/small/modern-flat-transgender-symbol-gender-identity-inclusivity-icon-graphic-vector.jpg",
  },
];

export const perfumes = [
  {
    id: 1,
    name: "OCEAN Man Perfume - 100 mL",
    brand: "BELLAVITA (Perfume Gift Set for Men)",
    price: 2345,
    sellingPrice: 1000,
    image:
      "http://bellavitaorganic.com/cdn/shop/files/download_5bea8eae-fa1f-45d3-95bc-81ced6860f9d.jpg?v=1732892381&width=500",
  },
  {
    id: 2,
    name: "Luxury Collection Gift Set - 4 x 20ml",
    brand: "BELLAVITA (EAU DE PARFUM)",
    price: 5432,
    sellingPrice: 1000,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_7e6fb342-20d2-42be-8b82-ca93a466d61f.jpg?v=1732892400&width=500",
  },
  {
    id: 3,
    name: "Luxury Perfume Gift Set For Men - 4 x 20ml",
    brand: "BELLAVITA (Pack of 10 x 5ml perfumes.)",
    price: 1234,
    sellingPrice: 1000,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_05e5f4e5-e803-430c-9b8e-2280519f4977.jpg?v=1732892512&width=500",
  },
];

export const crazyDealsData = [
  {
    id: 1,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548-01_eea37bd3-72d6-4d36-be25-1f2a754829d3.webp?v=1729493571&width=800",
    name: "SELF CARE KIT",
  },
  {
    id: 2,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548-01_69ed5841-67fb-420d-a671-e48ce7508e78.jpg?v=1752841390&width=800",
    name: "SELF LOVE KIT",
  },
  {
    id: 3,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548_eb6ded9c-5f74-4726-baa0-fb6a86472da3.webp?v=1727433124&width=800",
    name: "BADE MIYA CHHOTE MIYA",
  },
];

export const mappedData = [
  { id: 1, title: "Extra 10% Off" },
  { id: 2, title: "Buy 1 Get 1 Free" },
  { id: 3, title: "Limited Time Offer" },
];

// SHOP BY NOTES DATA
export const shopNotesData = [
  {
    id: 1,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_616_34fc5435-b516-44d1-bdeb-7ac8103c5c792.webp?v=1725617393&width=800",
    name: "ROSE",
  },
  {
    id: 2,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_6172.webp?v=1725617393&width=800",
    name: "CITRUSY",
  },
  {
    id: 3,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_618.webp?v=1725617393&width=800",
    name: "WHITE FLORAL",
  },
  {
    id: 4,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_619.webp?v=1725617393&width=800",
    name: "AQUATIC",
  },
  {
    id: 5,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_620.webp?v=1725617394&width=800",
    name: "MUSK",
  },
  {
    id: 6,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_621.webp?v=1725617393&width=800",
    name: "SPICY",
  },
  {
    id: 7,
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Mask_Group_622.webp?v=1725617393&width=800",
    name: "SWEET",
  },
];

// Auto Scroll Strip Images
export const images = [
  "https://bellavitaorganic.com/cdn/shop/files/HT_4a741228-3740-4f84-97bc-3c093ceec75a.jpg?height=80&v=1716360141",
  "https://bellavitaorganic.com/cdn/shop/files/Elle_480x_db18e8ef-2f25-4299-9c39-73af4c300969.jpg?height=80&v=1716878217",
  "https://bellavitaorganic.com/cdn/shop/files/Ani_480x_14446b4e-c91a-46df-a133-a95092fe484e.jpg?height=80&v=1716878217",
  "https://bellavitaorganic.com/cdn/shop/files/IDiva_480x_1617c636-c0ed-4ed2-bb06-36e1906728ff.jpg?height=80&v=1716878216",
  "https://bellavitaorganic.com/cdn/shop/files/Pinkvilla_480x_a664ac7e-bd4f-45ae-b43a-b5ce25e0b530.jpg?height=80&v=1716878216",
  "https://bellavitaorganic.com/cdn/shop/files/BW_460x460_dcd6c999-6863-4ea2-ae4a-5621f5a51507.png?height=80&v=1717310549",
];

export const deals = [
  {
    id: 1,
    title: "CEO Man Eau De Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/678-548_542dde38-342b-49d4-bf4c-f86dee62e128.webp?v=1727432858&width=500",
    mrp: 1999,
    price: 999,
  },
  {
    id: 2,
    title: "Honey Oud Eau De Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://bellavitaluxury.co.in/cdn/shop/files/678-548_3_d5b47fb5-bb3a-42f1-9b0c-b4d7e04c028a.jpg?v=1723227640&width=800",
    mrp: 2499,
    price: 1249,
  },
  {
    id: 3,
    title: "Ska Aquatic Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://bellavitaluxury.co.in/cdn/shop/files/678-548_d5851e69-7017-4462-87fb-235bfdd98df9.jpg?v=1724311893&width=800",
    mrp: 1799,
    price: 899,
  },
  {
    id: 4,
    title: "White Oud Perfume",
    brand: "Bella Vita Luxury",
    image:
      "data:image/jpeg;base64,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",
    mrp: 2199,
    price: 1099,
  },
  {
    id: 5,
    title: "Fresh Unisex Perfume",
    brand: "Bella Vita Luxury",
    image:
      "data:image/jpeg;base64,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",
    mrp: 1499,
    price: 749,
  },
  {
    id: 6,
    title: "Impact Man Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoSKdkaycZYuIfLlK5Zs6YZQgOuoQEqc7mA&s",
    mrp: 1999,
    price: 999,
  },
  {
    id: 7,
    title: "Rose Woman Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/Offer-Mobile-_1_UPB-mobile.webp?v=1727436765&width=800",
    mrp: 1599,
    price: 799,
  },
  {
    id: 8,
    title: "Oud Gold Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://ifuzefvpmposztzwzxmh.supabase.co/storage/v1/object/public/coupons/Top%20Bella%20Vita%20Organic%20Coupon%20Codes,%20Bellavita%20Discount%20Codes%20&%20Promo%20Codes%20For%20Natural%20Beauty.webp1735960184897",
    mrp: 2999,
    price: 1499,
  },
  {
    id: 9,
    title: "CEO Woman Eau De Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://bellavitaorganic.com/cdn/shop/products/2ndImage_2.png?v=1716015146&width=3840",
    mrp: 1999,
    price: 999,
  },
  {
    id: 10,
    title: "Date Woman Perfume",
    brand: "Bella Vita Luxury",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/download_9dcacb36-00df-4168-9598-850c78c32959.jpg?v=1732892369&width=1000",
    mrp: 1699,
    price: 849,
  },
];

export const CATEGORY_IMAGES: Record<string, string> = {
  kajal:
    "https://www.sugarcosmetics.com/cdn/shop/collections/8e09dfee-3536-44c4-b325-d3aad9a1fc5c.jpg?v=1734358078&width=1600",
  perfume: "https://example.com/perfume.jpg",
  lipstick:
    "https://www.sugarcosmetics.com/cdn/shop/collections/Partner-in-Shine-Transferproof-Lip-Gloss-LP1600x400_e5970f90-cfa5-4348-9b8e-16a778a6bc44.jpg?v=1734367222&width=1600",
  face_blush:
    "https://www.sugarcosmetics.com/cdn/shop/collections/66c5e687-a4be-414e-ae0a-fc9e77747197.jpg?v=1734358631&width=1600",
  airbrush_compact:
    "https://www.sugarcosmetics.com/cdn/shop/collections/LP-1600x400_59b0cc05-1f02-43d4-998f-b9960f4f36cb.jpg?v=1734499222&width=1600",
};
