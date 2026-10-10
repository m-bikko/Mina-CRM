import { absoluteUrl } from "@/lib/site";

export const LOCALES = ["ru", "kk", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

export const HREFLANG: Record<Locale, string> = { ru: "ru-KZ", kk: "kk-KZ", en: "en" };

export const OG_LOCALE: Record<Locale, string> = { ru: "ru_KZ", kk: "kk_KZ", en: "en_US" };

export const LOCALE_LABEL: Record<Locale, string> = { ru: "РУС", kk: "ҚАЗ", en: "ENG" };

export const LOCALE_NAME: Record<Locale, string> = { ru: "Русский", kk: "Қазақша", en: "English" };

export const localePrefix = (locale: Locale): string => (locale === DEFAULT_LOCALE ? "" : `/${locale}`);

export const localePath = (locale: Locale, path = "/"): string => {
  const suffix = path === "/" ? "" : path;
  const full = `${localePrefix(locale)}${suffix}`;
  return full === "" ? "/" : full;
};

export const alternateLanguages = (path: string): Record<string, string> => ({
  [HREFLANG.ru]: absoluteUrl(localePath("ru", path)),
  [HREFLANG.kk]: absoluteUrl(localePath("kk", path)),
  [HREFLANG.en]: absoluteUrl(localePath("en", path)),
  "x-default": absoluteUrl(localePath("ru", path)),
});

export const formatTenge = (value: number): string =>
  `${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`;

const pluralRu = (n: number, one: string, few: string, many: string): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

export interface FaqEntry {
  q: string;
  a: string;
}

export interface ProductTextInput {
  name: string;
  price: string;
  oldPrice: string | null;
  saving: string | null;
  sizes: string[];
  categoryName: string | null;
}

export interface CategoryTextInput {
  name: string;
  count: number;
  minPrice: string;
  maxPrice: string;
  sizes: string[];
  colors: string[];
  hasDiscounts: boolean;
}

const ru = {
  productPage: "Страница товара",
  sizeLabel: "Размер",
  writeInWhatsApp: "Написать в WhatsApp",
  alsoLike: "Также может заинтересовать",
  close: "Закрыть",
  prevPhoto: "Предыдущее фото",
  nextPhoto: "Следующее фото",
  openCart: "Открыть корзину",
  decrease: "Уменьшить",
  increase: "Увеличить",
  remove: "Удалить",
  clearSearch: "Очистить поиск",
  brandTagline: "Изысканная женская одежда",
  homeH1: "Женская одежда с доставкой по Казахстану",
  homeTitle: "Женская одежда с доставкой по Казахстану — Minawear",
  homeDescription: (minPrice: string): string =>
    `Атласные рубашки, кардиганы, топы, джинсы, юбки и брюки от ${minPrice}. Размеры и цены на сайте, заказ в WhatsApp, доставка курьером по городу и почтой по Казахстану.`,
  catalog: "Каталог",
  collection: "Коллекция",
  categories: "Категории",
  allProducts: "Все товары",
  searchPlaceholder: "Поиск...",
  nothingFound: "Ничего не найдено",
  comingSoon: "Товары скоро появятся",
  noPhoto: "Нет фото",
  outOfStock: "Нет в наличии",
  chooseSize: "Выберите размер",
  sizesInStock: "Размеры в наличии",
  addToCart: "Добавить в корзину",
  addedToCart: "Добавлено в корзину",
  askInWhatsApp: "Спросить в WhatsApp",
  orderInWhatsApp: "Заказать в WhatsApp",
  orderCartInWhatsApp: "Оформить заказ в WhatsApp",
  cart: "Корзина",
  cartEmpty: "Корзина пуста",
  total: "Итого",
  pcs: "шт.",
  related: "С этим сочетается",
  sameCategory: "Ещё в этой категории",
  backToCatalog: "Вернуться в каталог",
  home: "Главная",
  price: "Цена",
  wasPrice: "Было",
  saving: "Выгода",
  delivery: "Доставка курьером по городу и почтой по всему Казахстану",
  orderHow: "Заказ в WhatsApp — отвечаем и подтверждаем детали",
  language: "Язык",
  photo: "фото",
  rights: "Все права защищены.",
  aboutTitle: "О магазине",
  about: (categories: string): string =>
    `Minawear — интернет-магазин женской одежды в Казахстане. В каталоге: ${categories}. Цены и размеры указаны на сайте, заказ оформляется в WhatsApp, доставка — курьером по городу и почтой по всему Казахстану.`,
  faqTitle: "Частые вопросы",
  faq: [
    { q: "Как сделать заказ?", a: "Выберите товар и размер, добавьте его в корзину и отправьте заказ в WhatsApp. Мы ответим и подтвердим детали." },
    { q: "Есть ли доставка по Казахстану?", a: "Да. Доставляем курьером по городу и почтой по всему Казахстану. Стоимость и сроки уточняйте в WhatsApp." },
    { q: "Как выбрать размер?", a: "Доступные размеры указаны в карточке каждого товара. Если сомневаетесь, напишите нам в WhatsApp, подскажем." },
    { q: "Где следить за Minawear?", a: "В Instagram @minawear.kz и здесь, на сайте." },
  ] as FaqEntry[],
  waOrderIntro: "Здравствуйте! Хочу заказать:",
  waInterested: "Здравствуйте! Меня интересует товар:",
  waSize: "размер",
  categoryTitle: (name: string): string => `${name}: купить в Казахстане | Minawear`,
  categoryDescription: (input: CategoryTextInput): string =>
    `${input.name} Minawear: ${input.count} ${pluralRu(input.count, "модель", "модели", "моделей")} от ${input.minPrice}. Размеры и фото на сайте, заказ в WhatsApp, доставка по Казахстану.`,
  categoryIntro: (input: CategoryTextInput): string => {
    const parts = [
      `${input.count} ${pluralRu(input.count, "модель", "модели", "моделей")}`,
      input.colors.length > 0 ? `цвета: ${input.colors.join(", ")}` : "",
      input.sizes.length > 0 ? `размеры: ${input.sizes.join(", ")}` : "",
      input.minPrice === input.maxPrice ? `цена ${input.minPrice}` : `цены от ${input.minPrice} до ${input.maxPrice}`,
    ].filter(Boolean);
    return `${parts.join("; ")}.${input.hasDiscounts ? " На часть моделей цены снижены." : ""}`;
  },
  productTitle: (name: string, price: string): string => `${name} — ${price} | Minawear`,
  productDescription: (input: ProductTextInput): string =>
    `${input.name} от Minawear за ${input.price}${input.oldPrice ? ` вместо ${input.oldPrice}` : ""}.${input.sizes.length > 0 ? ` В наличии размеры: ${input.sizes.join(", ")}.` : ""} Заказ в WhatsApp, доставка по Казахстану.`,
};

export type Dictionary = typeof ru;

const kk: Dictionary = {
  productPage: "Тауар беті",
  sizeLabel: "Өлшем",
  writeInWhatsApp: "WhatsApp-қа жазу",
  alsoLike: "Сізге ұнауы мүмкін",
  close: "Жабу",
  prevPhoto: "Алдыңғы фото",
  nextPhoto: "Келесі фото",
  openCart: "Себетті ашу",
  decrease: "Азайту",
  increase: "Көбейту",
  remove: "Жою",
  clearSearch: "Іздеуді тазарту",
  brandTagline: "Талғампаз әйелдер киімі",
  homeH1: "Қазақстан бойынша жеткізумен әйелдер киімі",
  homeTitle: "Қазақстан бойынша жеткізумен әйелдер киімі — Minawear",
  homeDescription: (minPrice: string): string =>
    `Атлас жейделер, кардигандар, топтар, джинсы, юбкалар мен шалбарлар. Ең төмен баға — ${minPrice}. Өлшемдер мен бағалар сайтта, тапсырыс WhatsApp арқылы, қала ішінде курьермен және Қазақстан бойынша поштамен жеткіземіз.`,
  catalog: "Каталог",
  collection: "Коллекция",
  categories: "Санаттар",
  allProducts: "Барлық тауарлар",
  searchPlaceholder: "Іздеу...",
  nothingFound: "Ештеңе табылмады",
  comingSoon: "Тауарлар жақында пайда болады",
  noPhoto: "Фото жоқ",
  outOfStock: "Қолда жоқ",
  chooseSize: "Өлшемді таңдаңыз",
  sizesInStock: "Қолда бар өлшемдер",
  addToCart: "Себетке салу",
  addedToCart: "Себетке салынды",
  askInWhatsApp: "WhatsApp-та сұрау",
  orderInWhatsApp: "WhatsApp арқылы тапсырыс беру",
  orderCartInWhatsApp: "WhatsApp арқылы тапсырыс рәсімдеу",
  cart: "Себет",
  cartEmpty: "Себет бос",
  total: "Барлығы",
  pcs: "дана",
  related: "Бұған жарасады",
  sameCategory: "Осы санаттағы басқа тауарлар",
  backToCatalog: "Каталогқа оралу",
  home: "Басты бет",
  price: "Бағасы",
  wasPrice: "Бұрын",
  saving: "Үнем",
  delivery: "Қала ішінде курьермен және бүкіл Қазақстан бойынша поштамен жеткізу",
  orderHow: "Тапсырыс WhatsApp арқылы — жауап беріп, мәліметтерді нақтылаймыз",
  language: "Тіл",
  photo: "фото",
  rights: "Барлық құқықтар қорғалған.",
  aboutTitle: "Дүкен туралы",
  about: (categories: string): string =>
    `Minawear — Қазақстандағы әйелдер киімінің интернет-дүкені. Каталогта: ${categories}. Бағалар мен өлшемдер сайтта көрсетілген, тапсырыс WhatsApp арқылы рәсімделеді, жеткізу — қала ішінде курьермен және бүкіл Қазақстан бойынша поштамен.`,
  faqTitle: "Жиі қойылатын сұрақтар",
  faq: [
    { q: "Тапсырысты қалай беруге болады?", a: "Тауар мен өлшемді таңдап, себетке салыңыз да, тапсырысты WhatsApp арқылы жіберіңіз. Біз жауап беріп, мәліметтерді растаймыз." },
    { q: "Қазақстан бойынша жеткізу бар ма?", a: "Иә. Қала ішінде курьермен және бүкіл Қазақстан бойынша поштамен жеткіземіз. Құны мен мерзімін WhatsApp арқылы нақтылаңыз." },
    { q: "Өлшемді қалай таңдауға болады?", a: "Қолда бар өлшемдер әр тауардың карточкасында көрсетілген. Күмәндансаңыз, WhatsApp-қа жазыңыз, көмектесеміз." },
    { q: "Minawear-ды қайдан бақылауға болады?", a: "Instagram-да @minawear.kz және осы сайтта." },
  ],
  waOrderIntro: "Сәлеметсіз бе! Тапсырыс бергім келеді:",
  waInterested: "Сәлеметсіз бе! Мені мына тауар қызықтырады:",
  waSize: "өлшем",
  categoryTitle: (name: string): string => `${name}: Қазақстанда сатып алу | Minawear`,
  categoryDescription: (input: CategoryTextInput): string =>
    `Minawear: ${input.name} — ${input.count} модель, ең төмен баға ${input.minPrice}. Өлшемдер мен фото сайтта, тапсырыс WhatsApp арқылы, Қазақстан бойынша жеткізу.`,
  categoryIntro: (input: CategoryTextInput): string => {
    const parts = [
      `${input.count} модель`,
      input.colors.length > 0 ? `түстері: ${input.colors.join(", ")}` : "",
      input.sizes.length > 0 ? `өлшемдері: ${input.sizes.join(", ")}` : "",
      input.minPrice === input.maxPrice ? `бағасы ${input.minPrice}` : `бағасы ${input.minPrice} – ${input.maxPrice}`,
    ].filter(Boolean);
    return `${parts.join("; ")}.${input.hasDiscounts ? " Кейбір модельдердің бағасы төмендетілді." : ""}`;
  },
  productTitle: (name: string, price: string): string => `${name} — ${price} | Minawear`,
  productDescription: (input: ProductTextInput): string =>
    `Minawear: ${input.name}, бағасы ${input.price}${input.oldPrice ? ` (бұрын ${input.oldPrice})` : ""}.${input.sizes.length > 0 ? ` Қолда бар өлшемдер: ${input.sizes.join(", ")}.` : ""} Тапсырыс WhatsApp арқылы, Қазақстан бойынша жеткізу.`,
};

const en: Dictionary = {
  productPage: "Product page",
  sizeLabel: "Size",
  writeInWhatsApp: "Message on WhatsApp",
  alsoLike: "You may also like",
  close: "Close",
  prevPhoto: "Previous photo",
  nextPhoto: "Next photo",
  openCart: "Open cart",
  decrease: "Decrease",
  increase: "Increase",
  remove: "Remove",
  clearSearch: "Clear search",
  brandTagline: "Refined women's clothing",
  homeH1: "Women's clothing with delivery across Kazakhstan",
  homeTitle: "Women's Clothing with Delivery Across Kazakhstan — Minawear",
  homeDescription: (minPrice: string): string =>
    `Satin shirts, cardigans, tops, jeans, skirts and trousers from ${minPrice}. Sizes and prices on the site, order on WhatsApp, courier delivery in the city and post across Kazakhstan.`,
  catalog: "Catalog",
  collection: "Collection",
  categories: "Categories",
  allProducts: "All products",
  searchPlaceholder: "Search...",
  nothingFound: "Nothing found",
  comingSoon: "Products coming soon",
  noPhoto: "No photo",
  outOfStock: "Out of stock",
  chooseSize: "Choose a size",
  sizesInStock: "Sizes in stock",
  addToCart: "Add to cart",
  addedToCart: "Added to cart",
  askInWhatsApp: "Ask on WhatsApp",
  orderInWhatsApp: "Order on WhatsApp",
  orderCartInWhatsApp: "Place the order on WhatsApp",
  cart: "Cart",
  cartEmpty: "Your cart is empty",
  total: "Total",
  pcs: "pcs",
  related: "Pairs well with",
  sameCategory: "More in this category",
  backToCatalog: "Back to catalog",
  home: "Home",
  price: "Price",
  wasPrice: "Was",
  saving: "You save",
  delivery: "Courier delivery in the city and post across Kazakhstan",
  orderHow: "Order on WhatsApp — we reply and confirm the details",
  language: "Language",
  photo: "photo",
  rights: "All rights reserved.",
  aboutTitle: "About the store",
  about: (categories: string): string =>
    `Minawear is an online women's clothing store in Kazakhstan. In the catalog: ${categories}. Prices and sizes are listed on the site, orders are placed on WhatsApp, delivery is by courier in the city and by post across Kazakhstan.`,
  faqTitle: "FAQ",
  faq: [
    { q: "How do I place an order?", a: "Pick an item and a size, add it to the cart and send the order on WhatsApp. We will reply and confirm the details." },
    { q: "Do you deliver across Kazakhstan?", a: "Yes. We deliver by courier in the city and by post across Kazakhstan. Ask about cost and timing on WhatsApp." },
    { q: "How do I choose my size?", a: "Available sizes are shown on every product. Not sure? Message us on WhatsApp and we will help." },
    { q: "Where can I follow Minawear?", a: "On Instagram @minawear.kz and here on the site." },
  ],
  waOrderIntro: "Hello! I would like to order:",
  waInterested: "Hello! I'm interested in:",
  waSize: "size",
  categoryTitle: (name: string): string => `${name}: Buy in Kazakhstan | Minawear`,
  categoryDescription: (input: CategoryTextInput): string =>
    `Minawear ${input.name.toLowerCase()}: ${input.count} ${input.count === 1 ? "model" : "models"} from ${input.minPrice}. Sizes and photos on the site, order on WhatsApp, delivery across Kazakhstan.`,
  categoryIntro: (input: CategoryTextInput): string => {
    const parts = [
      `${input.count} ${input.count === 1 ? "model" : "models"}`,
      input.colors.length > 0 ? `colors: ${input.colors.join(", ")}` : "",
      input.sizes.length > 0 ? `sizes: ${input.sizes.join(", ")}` : "",
      input.minPrice === input.maxPrice ? `price ${input.minPrice}` : `prices from ${input.minPrice} to ${input.maxPrice}`,
    ].filter(Boolean);
    return `${parts.join("; ")}.${input.hasDiscounts ? " Some models are reduced." : ""}`;
  },
  productTitle: (name: string, price: string): string => `${name} — ${price} | Minawear`,
  productDescription: (input: ProductTextInput): string =>
    `${input.name} by Minawear for ${input.price}${input.oldPrice ? ` (was ${input.oldPrice})` : ""}.${input.sizes.length > 0 ? ` Sizes in stock: ${input.sizes.join(", ")}.` : ""} Order on WhatsApp, delivery across Kazakhstan.`,
};

const DICTIONARIES: Record<Locale, Dictionary> = { ru, kk, en };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];

interface CategoryDef {
  slug: string;
  match: RegExp;
  name: Record<Locale, string>;
  blurb: Record<Locale, string>;
}

export const CATEGORIES: readonly CategoryDef[] = [
  {
    slug: "atlasnye-rubashki",
    match: /атлас/,
    name: { ru: "Атласные рубашки", kk: "Атлас жейделер", en: "Satin shirts" },
    blurb: {
      ru: "Атласные рубашки с мягким блеском — для работы, вечера и выходных.",
      kk: "Жұмсақ жылтыры бар атлас жейделер — жұмысқа, кешке және демалысқа.",
      en: "Satin shirts with a soft sheen — for work, evenings and weekends.",
    },
  },
  {
    slug: "kardigany",
    match: /кардиган/,
    name: { ru: "Кардиганы", kk: "Кардигандар", en: "Cardigans" },
    blurb: {
      ru: "Кардиганы для многослойных образов в любое время года.",
      kk: "Кез келген маусымға арналған қабатты образдарға кардигандар.",
      en: "Cardigans for easy layering in any season.",
    },
  },
  {
    slug: "amerikanki",
    match: /американк/,
    name: { ru: "Американки (топы)", kk: "Американкалар (топтар)", en: "Fitted tops" },
    blurb: {
      ru: "Облегающие топы-американки — база под джинсы, юбки и брюки.",
      kk: "Қонымды американка топтар — джинсыға, юбкаға және шалбарға негіз.",
      en: "Fitted tops — an easy base for jeans, skirts and trousers.",
    },
  },
  {
    slug: "longslivy",
    match: /лонгслив/,
    name: { ru: "Лонгсливы", kk: "Лонгсливтер", en: "Long-sleeve tops" },
    blurb: {
      ru: "Лонгсливы — лёгкая база для повседневных образов.",
      kk: "Лонгсливтер — күнделікті образға жеңіл негіз.",
      en: "Long-sleeve tops — a light base for everyday outfits.",
    },
  },
  {
    slug: "dzhinsy",
    match: /джинс/,
    name: { ru: "Джинсы", kk: "Джинсы", en: "Jeans" },
    blurb: {
      ru: "Женские джинсы на каждый день — подберите фасон и размер.",
      kk: "Күнделікті киюге арналған әйелдер джинсысы — үлгі мен өлшемді таңдаңыз.",
      en: "Everyday women's jeans — pick your fit and size.",
    },
  },
  {
    slug: "yubki",
    match: /юбк/,
    name: { ru: "Юбки", kk: "Юбкалар", en: "Skirts" },
    blurb: {
      ru: "Юбки для повседневных и вечерних образов.",
      kk: "Күнделікті және кешкі образдарға арналған юбкалар.",
      en: "Skirts for everyday and evening looks.",
    },
  },
  {
    slug: "bryuki",
    match: /брюк/,
    name: { ru: "Брюки", kk: "Шалбарлар", en: "Trousers" },
    blurb: {
      ru: "Брюки на каждый день и для офиса.",
      kk: "Күнделікті киюге және кеңсеге арналған шалбарлар.",
      en: "Trousers for every day and the office.",
    },
  },
  {
    slug: "sportivnye-shtany",
    match: /штан/,
    name: { ru: "Спортивные штаны", kk: "Спорттық шалбарлар", en: "Joggers" },
    blurb: {
      ru: "Удобные спортивные штаны для дома, прогулок и поездок.",
      kk: "Үйге, серуенге және сапарға арналған ыңғайлы спорттық шалбарлар.",
      en: "Comfy joggers for home, walks and travel.",
    },
  },
  {
    slug: "leggingsy",
    match: /леггинс/,
    name: { ru: "Леггинсы", kk: "Леггинстер", en: "Leggings" },
    blurb: {
      ru: "Леггинсы — комфортная база для повседневных образов.",
      kk: "Леггинстер — күнделікті образға ыңғайлы негіз.",
      en: "Leggings — a comfortable base for everyday outfits.",
    },
  },
];

export type Category = CategoryDef;

const LOOKALIKES: Record<string, string> = {
  A: "А", a: "а", B: "В", C: "С", c: "с", E: "Е", e: "е", H: "Н", K: "К", M: "М",
  O: "О", o: "о", P: "Р", p: "р", T: "Т", X: "Х", x: "х", y: "у",
};

export const normalizeRuName = (name: string): string =>
  name
    .split(/(\s+)/)
    .map((word) => (/[А-Яа-яЁё]/.test(word) ? word.replace(/[ABCEHKMOPTXaceopxy]/g, (ch) => LOOKALIKES[ch] ?? ch) : word))
    .join("");

export const categoryForName = (name: string): Category | null => {
  const lower = normalizeRuName(name).toLowerCase();
  return CATEGORIES.find((category) => category.match.test(lower)) ?? null;
};

export const getCategory = (slug: string): Category | null => CATEGORIES.find((category) => category.slug === slug) ?? null;

interface ColorDef {
  stem: RegExp;
  ru: string;
  kk: string;
  en: string;
}

const COLORS: readonly ColorDef[] = [
  { stem: /^молочн/, ru: "молочный", kk: "сүт түсті", en: "milk" },
  { stem: /^красн/, ru: "красный", kk: "қызыл", en: "red" },
  { stem: /^розов/, ru: "розовый", kk: "қызғылт", en: "pink" },
  { stem: /^голуб/, ru: "голубой", kk: "көгілдір", en: "light blue" },
  { stem: /^сер(ый|ая|ое|ые)$/, ru: "серый", kk: "сұр", en: "grey" },
  { stem: /^коричнев/, ru: "коричневый", kk: "қоңыр", en: "brown" },
  { stem: /^бел(ый|ая|ое|ые)$/, ru: "белый", kk: "ақ", en: "white" },
  { stem: /^син/, ru: "синий", kk: "көк", en: "navy" },
  { stem: /^(черн|чёрн)/, ru: "чёрный", kk: "қара", en: "black" },
  { stem: /^бежев/, ru: "бежевый", kk: "құба", en: "beige" },
  { stem: /^светл/, ru: "светлый", kk: "ашық түсті", en: "light" },
];

interface NounDef {
  stem: RegExp;
  kk: string;
  en: string;
}

const NOUNS: readonly NounDef[] = [
  { stem: /^рубашк/, kk: "жейде", en: "shirt" },
  { stem: /^американк/, kk: "американка", en: "fitted top" },
  { stem: /^кардиган/, kk: "кардиган", en: "cardigan" },
  { stem: /^лонгслив/, kk: "лонгслив", en: "long-sleeve top" },
  { stem: /^джинс/, kk: "джинсы", en: "jeans" },
  { stem: /^юбк/, kk: "юбка", en: "skirt" },
  { stem: /^брюк/, kk: "шалбар", en: "trousers" },
  { stem: /^штан/, kk: "шалбар", en: "pants" },
  { stem: /^леггинс/, kk: "леггинс", en: "leggings" },
];

interface ModifierDef {
  stem: RegExp;
  kk: string;
  en: string;
}

const MODIFIERS: readonly ModifierDef[] = [
  { stem: /^атлас/, kk: "атлас", en: "satin" },
  { stem: /^обтягивающ/, kk: "қонымды", en: "fitted" },
  { stem: /^мини$/, kk: "мини", en: "mini" },
  { stem: /^драп/, kk: "драп", en: "drape" },
  { stem: /^флис/, kk: "флис", en: "fleece" },
  { stem: /^спортивн/, kk: "спорттық", en: "sport" },
];

const SKIP_WORDS = /^(с|темно|тёмно)$/;

export interface ParsedName {
  colors: ColorDef[];
  dark: boolean;
  modifiers: ModifierDef[];
  extras: string[];
  noun: NounDef | null;
  withStrap: boolean;
  unknown: boolean;
}

const parseName = (name: string): ParsedName => {
  const tokens = normalizeRuName(name).toLowerCase().replace(/[()]/g, " ").split(/[\s,.-]+/).filter(Boolean);
  const parsed: ParsedName = { colors: [], dark: false, modifiers: [], extras: [], noun: null, withStrap: false, unknown: false };
  tokens.forEach((token) => {
    if (token === "темно" || token === "тёмно") {
      parsed.dark = true;
      return;
    }
    if (/^ремешк/.test(token)) {
      parsed.withStrap = true;
      return;
    }
    if (SKIP_WORDS.test(token)) return;
    const color = COLORS.find((c) => c.stem.test(token));
    if (color) {
      parsed.colors.push(color);
      return;
    }
    const noun = NOUNS.find((n) => n.stem.test(token));
    if (noun) {
      parsed.noun = noun;
      return;
    }
    const modifier = MODIFIERS.find((m) => m.stem.test(token));
    if (modifier) {
      parsed.modifiers.push(modifier);
      return;
    }
    if (/^[a-z0-9]+$/.test(token)) {
      parsed.extras.push(token);
      return;
    }
    parsed.unknown = true;
  });
  return parsed;
};

const capitalize = (value: string): string => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value);

export const colorsOf = (name: string, locale: Locale): string[] => {
  const parsed = parseName(name);
  return parsed.colors
    .filter((c) => c.stem.source !== "^светл")
    .map((c) => {
      if (parsed.dark && c.stem.source === "^син") return locale === "ru" ? "тёмно-синий" : locale === "kk" ? "қою көк" : "dark blue";
      return c[locale];
    });
};

export const localizeProductName = (name: string, locale: Locale): string => {
  const ruName = normalizeRuName(name).trim();
  if (locale === "ru") return ruName;
  const parsed = parseName(name);
  if (parsed.unknown || !parsed.noun) return ruName;
  const sport = parsed.modifiers.some((m) => m.en === "sport");
  const colorWords = parsed.colors.map((c) => {
    if (parsed.dark && c.stem.source === "^син") return locale === "kk" ? "қою көк" : "dark blue";
    return locale === "kk" ? c.kk : c.en;
  });
  if (locale === "en") {
    const mods = parsed.modifiers.filter((m) => m.en !== "sport").map((m) => m.en);
    const noun = sport && parsed.noun.en === "pants" ? "joggers" : parsed.noun.en;
    const words = [...colorWords, ...mods, ...parsed.extras, noun];
    return capitalize(`${words.join(" ")}${parsed.withStrap ? " with strap" : ""}`);
  }
  const mods = parsed.modifiers.map((m) => m.kk);
  const words = [parsed.withStrap ? "белбеулі" : "", ...colorWords, ...parsed.extras, ...mods, parsed.noun.kk].filter(Boolean);
  return capitalize(words.join(" "));
};

export const localizeSizeLabel = (label: string, locale: Locale): string =>
  /^стандарт$/i.test(label.trim()) ? (locale === "en" ? "One size" : locale === "kk" ? "Стандарт" : "Стандарт") : label;

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m",
  н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "",
  ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export const slugify = (value: string): string =>
  normalizeRuName(value)
    .toLowerCase()
    .split("")
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
