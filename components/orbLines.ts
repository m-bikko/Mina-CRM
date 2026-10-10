export type OrbLocale = "ru" | "kk" | "en";

export interface OrbLineSize {
  label: string;
  quantity: number;
}

export interface OrbLineProduct {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  sizes: ReadonlyArray<OrbLineSize>;
  relatedProducts?: ReadonlyArray<{ _id: string }>;
}

export type OrbLineAction = "open" | "focus" | "next";

export type OrbDevice = "touch" | "mouse";

export interface OrbLine {
  text: string;
  action: OrbLineAction;
  productId: string | null;
  cta: string | null;
}

export interface OrbLineGenerator {
  locale: OrbLocale;
  greeting: (device: OrbDevice) => OrbLine;
  idle: (products: ReadonlyArray<OrbLineProduct>, visibleIds: ReadonlySet<string>) => OrbLine | null;
  comment: (product: OrbLineProduct, products: ReadonlyArray<OrbLineProduct>) => OrbLine;
  followUp: (product: OrbLineProduct, products: ReadonlyArray<OrbLineProduct>) => OrbLine;
  flick: () => OrbLine;
}

type Part = "top" | "bottom" | "other";

type FactId =
  | "satin1"
  | "satin2"
  | "fitted"
  | "fleece1"
  | "fleece2"
  | "drape"
  | "baggy"
  | "mini"
  | "strap"
  | "sport"
  | "shirt"
  | "americanka"
  | "cardigan"
  | "jeans"
  | "leggings";

interface CategoryWords {
  plural: string;
  near: string;
  subject: string;
  pronoun: string;
}

interface CategorySpec {
  part: Part;
  many: boolean;
  stems: readonly string[];
  exact: readonly string[];
  phrases: readonly string[];
  fact: FactId | null;
  words: Readonly<Record<OrbLocale, CategoryWords>>;
}

interface ColourSpec {
  id: string;
  ru: readonly string[];
  kk: readonly string[];
  en: readonly string[];
  show: Readonly<Record<OrbLocale, string>>;
}

interface PriceArgs {
  q: string;
  p: string;
}

interface SaleArgs {
  q: string;
  now: string;
  old: string;
  save: string;
}

interface SizeArgs {
  q: string;
  s: string;
}

interface ColourArgs {
  subject: string;
  many: boolean;
  c: string;
}

interface PairingArgs {
  w: CategoryWords;
  part: Part;
  q: string;
  qp: string;
}

interface OutfitArgs {
  t: string;
  b: string;
  total: string;
}

interface SoldOutArgs {
  q: string;
  alt: string;
  ap: string;
}

interface Dictionary {
  quote: (name: string) => string;
  ctaOpen: string;
  ctaShow: string;
  ctaGreeting: string;
  orbLabel: string;
  greetingTouch: string;
  greetingMouse: string;
  flick: readonly string[];
  generic: readonly string[];
  categories: (a: CategoryWords, b: CategoryWords) => string;
  outfit: string;
  discountAsk: string;
  conjunction: string;
  sizeOne: (label: string) => string;
  sizeRange: (from: string, to: string) => string;
  sizeSpan: (from: string, to: string) => string;
  price: ReadonlyArray<(args: PriceArgs) => string>;
  discount: ReadonlyArray<(args: SaleArgs) => string>;
  sizesMany: ReadonlyArray<(args: SizeArgs) => string>;
  sizesOne: ReadonlyArray<(args: SizeArgs) => string>;
  colours: ReadonlyArray<(args: ColourArgs) => string>;
  pairing: ReadonlyArray<(args: PairingArgs) => string>;
  tip: ReadonlyArray<(args: PriceArgs) => string>;
  tipSizes: (args: SizeArgs) => string;
  tipColours: (args: ColourArgs) => string;
  sale: ReadonlyArray<(args: SaleArgs) => string>;
  pair: ReadonlyArray<(args: OutfitArgs) => string>;
  soldOut: ReadonlyArray<(q: string) => string>;
  soldOutAlt: ReadonlyArray<(args: SoldOutArgs) => string>;
  follow: (q: string) => string;
  followSizes: (args: SizeArgs) => string;
  followColours: (args: ColourArgs) => string;
  followSale: (q: string, now: string) => string;
  followPair: (args: PairingArgs) => string;
  facts: Readonly<Record<FactId, (w: CategoryWords | null, many: boolean) => string>>;
}

interface ProductFacts {
  id: string;
  quoted: string;
  price: string;
  priceValue: number;
  oldPrice: string | null;
  saving: string | null;
  inStock: boolean;
  sizes: string | null;
  manySizes: boolean;
  colours: string | null;
  category: CategorySpec | null;
  features: ReadonlyArray<{ id: FactId; text: string }>;
  relatedIds: readonly string[];
}

interface Candidate {
  line: OrbLine;
  key: string | null;
}

type CommentKind = "price" | "discount" | "sizes" | "colours" | "feature" | "pairing";

type IdleKind = "question" | "tip" | "discount" | "pairing";

const MAX_LENGTH = 70;
const MEMORY = 10;
const COMMENT_ORDER: readonly CommentKind[] = ["feature", "sizes", "discount", "colours", "pairing", "price"];
const IDLE_ORDER: readonly IdleKind[] = ["question", "tip", "discount", "pairing", "tip", "pairing", "question", "discount"];
const SUBJECT_FACTS: ReadonlySet<FactId> = new Set<FactId>(["fitted"]);
const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const ONE_SIZE_LABELS = ["стандарт", "standard", "one size", "onesize", "бір өлшем", "универсальный"];
const ADJECTIVE_END = /(ый|ий|ой|ая|яя|ое|ее|ые|ие)$/;
const NOT_COLOURS = ["синтет"];
const CYRILLIC = /[Ѐ-ӿ]/;
const LATIN_LOOKALIKES: Readonly<Record<string, string>> = {
  a: "а",
  b: "в",
  c: "с",
  e: "е",
  h: "н",
  k: "к",
  m: "м",
  o: "о",
  p: "р",
  t: "т",
  x: "х",
  y: "у",
};

const cap = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

const lowerFirst = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1);

const words = (ru: CategoryWords, kk: CategoryWords, en: CategoryWords): Readonly<Record<OrbLocale, CategoryWords>> => ({
  ru,
  kk,
  en,
});

const cw = (plural: string, near: string, subject: string, pronoun: string): CategoryWords => ({
  plural,
  near,
  subject,
  pronoun,
});

const CATEGORIES: readonly CategorySpec[] = [
  {
    part: "top",
    many: false,
    stems: ["свитшот", "sweatshirt"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("свитшоты", "этому свитшоту", "Этот свитшот", "нему"),
      cw("свитшоттар ма", "Бұл свитшотқа", "Бұл свитшот", "Оған"),
      cw("sweatshirts", "this sweatshirt", "This sweatshirt", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["футболк", "tshirt"],
    exact: ["tee"],
    phrases: ["t-shirt", "t shirt"],
    fact: null,
    words: words(
      cw("футболки", "этой футболке", "Эта футболка", "ней"),
      cw("футболкалар ма", "Бұл футболкаға", "Бұл футболка", "Оған"),
      cw("T-shirts", "this T-shirt", "This T-shirt", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["рубашк", "жейде", "shirt"],
    exact: [],
    phrases: [],
    fact: "shirt",
    words: words(
      cw("рубашки", "этой рубашке", "Эта рубашка", "ней"),
      cw("жейделер ме", "Бұл жейдеге", "Бұл жейде", "Оған"),
      cw("shirts", "this shirt", "This shirt", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["американк", "americank", "american"],
    exact: [],
    phrases: [],
    fact: "americanka",
    words: words(
      cw("американки", "этой американке", "Эта американка", "ней"),
      cw("американкалар ма", "Бұл американкаға", "Бұл американка", "Оған"),
      cw("americanka tops", "this top", "This top", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["кардиган", "cardigan"],
    exact: [],
    phrases: [],
    fact: "cardigan",
    words: words(
      cw("кардиганы", "этому кардигану", "Этот кардиган", "нему"),
      cw("кардигандар ма", "Бұл кардиганға", "Бұл кардиган", "Оған"),
      cw("cardigans", "this cardigan", "This cardigan", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["лонгслив", "longsleeve"],
    exact: [],
    phrases: ["long sleeve", "long-sleeve"],
    fact: null,
    words: words(
      cw("лонгсливы", "этому лонгсливу", "Этот лонгслив", "нему"),
      cw("лонгсливтер ме", "Бұл лонгсливке", "Бұл лонгслив", "Оған"),
      cw("long sleeves", "this long sleeve", "This long sleeve", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["блузк", "блуз", "blouse"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("блузки", "этой блузке", "Эта блузка", "ней"),
      cw("блузкалар ма", "Бұл блузкаға", "Бұл блузка", "Оған"),
      cw("blouses", "this blouse", "This blouse", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["водолазк", "turtleneck"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("водолазки", "этой водолазке", "Эта водолазка", "ней"),
      cw("водолазкалар ма", "Бұл водолазкаға", "Бұл водолазка", "Оған"),
      cw("turtlenecks", "this turtleneck", "This turtleneck", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["свитер", "sweater"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("свитеры", "этому свитеру", "Этот свитер", "нему"),
      cw("свитерлер ме", "Бұл свитерге", "Бұл свитер", "Оған"),
      cw("sweaters", "this sweater", "This sweater", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["джемпер", "jumper"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("джемперы", "этому джемперу", "Этот джемпер", "нему"),
      cw("джемперлер ме", "Бұл джемперге", "Бұл джемпер", "Оған"),
      cw("jumpers", "this jumper", "This jumper", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["жакет", "jacket"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("жакеты", "этому жакету", "Этот жакет", "нему"),
      cw("жакеттер ме", "Бұл жакетке", "Бұл жакет", "Оған"),
      cw("jackets", "this jacket", "This jacket", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: ["пиджак", "blazer"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("пиджаки", "этому пиджаку", "Этот пиджак", "нему"),
      cw("пиджактар ма", "Бұл пиджакқа", "Бұл пиджак", "Оған"),
      cw("blazers", "this blazer", "This blazer", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: [],
    exact: ["худи", "hoodie"],
    phrases: [],
    fact: null,
    words: words(
      cw("худи", "этому худи", "Это худи", "нему"),
      cw("худилер ме", "Бұл худиге", "Бұл худи", "Оған"),
      cw("hoodies", "this hoodie", "This hoodie", "it"),
    ),
  },
  {
    part: "top",
    many: false,
    stems: [],
    exact: ["топ", "топик", "top"],
    phrases: [],
    fact: null,
    words: words(
      cw("топы", "этому топу", "Этот топ", "нему"),
      cw("топтар ма", "Бұл топқа", "Бұл топ", "Оған"),
      cw("tops", "this top", "This top", "it"),
    ),
  },
  {
    part: "bottom",
    many: true,
    stems: ["джинс", "jean"],
    exact: [],
    phrases: [],
    fact: "jeans",
    words: words(
      cw("джинсы", "этим джинсам", "Эти джинсы", "ним"),
      cw("джинсылар ма", "Бұл джинсыға", "Бұл джинсы", "Оған"),
      cw("jeans", "these jeans", "These jeans", "them"),
    ),
  },
  {
    part: "bottom",
    many: false,
    stems: ["юбк", "белдемше", "skirt"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("юбки", "этой юбке", "Эта юбка", "ней"),
      cw("юбкалар ма", "Бұл юбкаға", "Бұл юбка", "Оған"),
      cw("skirts", "this skirt", "This skirt", "it"),
    ),
  },
  {
    part: "bottom",
    many: true,
    stems: ["леггинс", "лосин", "legging"],
    exact: [],
    phrases: [],
    fact: "leggings",
    words: words(
      cw("леггинсы", "этим леггинсам", "Эти леггинсы", "ним"),
      cw("леггинстер ме", "Бұл леггинске", "Бұл леггинс", "Оған"),
      cw("leggings", "these leggings", "These leggings", "them"),
    ),
  },
  {
    part: "bottom",
    many: true,
    stems: ["шорт"],
    exact: ["shorts"],
    phrases: [],
    fact: null,
    words: words(
      cw("шорты", "этим шортам", "Эти шорты", "ним"),
      cw("шорттар ма", "Бұл шортқа", "Бұл шорт", "Оған"),
      cw("shorts", "these shorts", "These shorts", "them"),
    ),
  },
  {
    part: "bottom",
    many: true,
    stems: ["брюк", "шалбар", "trouser"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("брюки", "этим брюкам", "Эти брюки", "ним"),
      cw("шалбарлар ма", "Бұл шалбарға", "Бұл шалбар", "Оған"),
      cw("trousers", "these trousers", "These trousers", "them"),
    ),
  },
  {
    part: "bottom",
    many: true,
    stems: ["штан", "sweatpant", "jogger"],
    exact: ["pants"],
    phrases: [],
    fact: null,
    words: words(
      cw("штаны", "этим штанам", "Эти штаны", "ним"),
      cw("шалбарлар ма", "Бұл шалбарға", "Бұл шалбар", "Оған"),
      cw("pants", "these pants", "These pants", "them"),
    ),
  },
  {
    part: "other",
    many: false,
    stems: ["плать", "көйлек", "dress"],
    exact: [],
    phrases: [],
    fact: null,
    words: words(
      cw("платья", "этому платью", "Это платье", "нему"),
      cw("көйлектер ме", "Бұл көйлекке", "Бұл көйлек", "Оған"),
      cw("dresses", "this dress", "This dress", "it"),
    ),
  },
];

const FEATURE_RULES: ReadonlyArray<{ facts: readonly FactId[]; stems: readonly string[]; exact: readonly string[] }> = [
  { facts: ["satin1", "satin2"], stems: ["атлас", "satin"], exact: [] },
  { facts: ["fitted"], stems: ["обтягив", "fitted", "bodycon", "жабысат"], exact: ["тар"] },
  { facts: ["fleece1", "fleece2"], stems: ["флис", "fleece"], exact: [] },
  { facts: ["drape"], stems: ["драп", "drape"], exact: [] },
  { facts: ["baggy"], stems: ["baggy", "багги"], exact: [] },
  { facts: ["mini"], stems: [], exact: ["мини", "mini"] },
  { facts: ["strap"], stems: ["ремеш", "strap", "белдік"], exact: [] },
  { facts: ["sport"], stems: ["спорт", "sport", "sweatpant", "jogger"], exact: [] },
];

const colour = (
  id: string,
  ru: readonly string[],
  kk: readonly string[],
  en: readonly string[],
  show: Readonly<Record<OrbLocale, string>>,
): ColourSpec => ({ id, ru, kk, en, show });

const LIGHT_BLUE: ColourSpec = colour("lightblue", ["голуб"], ["көгілдір"], [], {
  ru: "голубом",
  kk: "көгілдір",
  en: "light blue",
});

const COLOURS: readonly ColourSpec[] = [
  colour("silver", ["серебрист"], ["күміс"], ["silver"], { ru: "серебристом", kk: "күміс", en: "silver" }),
  colour("milk", ["молочн"], ["сүт"], ["milk", "milky"], { ru: "молочном", kk: "сүт", en: "milk" }),
  colour("red", ["красн"], ["қызыл"], ["red"], { ru: "красном", kk: "қызыл", en: "red" }),
  colour("pink", ["розов"], ["қызғылт"], ["pink"], { ru: "розовом", kk: "қызғылт", en: "pink" }),
  LIGHT_BLUE,
  colour("white", ["бел"], ["ақ"], ["white"], { ru: "белом", kk: "ақ", en: "white" }),
  colour("navy", ["син"], ["көк"], ["navy", "blue"], { ru: "синем", kk: "көк", en: "navy" }),
  colour("grey", ["сер"], ["сұр"], ["grey", "gray"], { ru: "сером", kk: "сұр", en: "grey" }),
  colour("black", ["черн"], ["қара"], ["black"], { ru: "чёрном", kk: "қара", en: "black" }),
  colour("brown", ["коричнев"], ["қоңыр"], ["brown"], { ru: "коричневом", kk: "қоңыр", en: "brown" }),
  colour("beige", ["бежев"], ["бежевый", "беж"], ["beige"], { ru: "бежевом", kk: "бежевый", en: "beige" }),
  colour("cream", ["кремов"], ["крем"], ["cream"], { ru: "кремовом", kk: "крем", en: "cream" }),
  colour("burgundy", ["бордов"], ["бордо"], ["burgundy"], { ru: "бордовом", kk: "бордо", en: "burgundy" }),
  colour("green", ["зелен"], ["жасыл"], ["green"], { ru: "зелёном", kk: "жасыл", en: "green" }),
  colour("yellow", ["желт"], ["сары"], ["yellow"], { ru: "жёлтом", kk: "сары", en: "yellow" }),
  colour("purple", ["фиолетов"], ["күлгін"], ["purple"], { ru: "фиолетовом", kk: "күлгін", en: "purple" }),
  colour("olive", ["оливков"], ["зәйтүн"], ["olive"], { ru: "оливковом", kk: "зәйтүн", en: "olive" }),
  colour("light", ["светл"], ["ашық"], ["light"], { ru: "светлом", kk: "ашық", en: "light" }),
  colour("dark", ["темн"], ["қою"], ["dark"], { ru: "тёмном", kk: "қою", en: "dark" }),
];

const MODIFIERS: Readonly<Record<string, "dark" | "light">> = {
  темно: "dark",
  светло: "light",
  қою: "dark",
  ашық: "light",
  dark: "dark",
  light: "light",
};

const MODIFIER_SHOW: Readonly<Record<"dark" | "light", Readonly<Record<OrbLocale, (base: string) => string>>>> = {
  dark: { ru: (base) => `тёмно-${base}`, kk: (base) => `қою ${base}`, en: (base) => `dark ${base}` },
  light: { ru: (base) => `светло-${base}`, kk: (base) => `ашық ${base}`, en: (base) => `light ${base}` },
};

const RU: Dictionary = {
  quote: (name) => `«${name}»`,
  ctaOpen: "нажми, чтобы открыть",
  ctaShow: "нажми — покажу",
  ctaGreeting: "нажми на меня — покажу образы",
  orbLabel: "Помощник: показать следующий товар",
  greetingTouch: "Привет! Води пальцем — я подскажу",
  greetingMouse: "Привет! Наведи на вещь — я подскажу",
  flick: ["Ух, как быстро листаешь!", "Притормози — тут красиво", "Вжух! Я еле успеваю", "Не так быстро — тут столько всего"],
  generic: ["Ищешь на каждый день или на вечер?", "Что ищем сегодня — что-то уютное или нарядное?"],
  categories: (a, b) => `Тебе ближе ${a.plural} или ${b.plural}?`,
  outfit: "Собираем образ? Начнём с верха или низа?",
  discountAsk: "Показать что-нибудь со скидкой?",
  conjunction: "и",
  sizeOne: (label) => `размер ${label}`,
  sizeRange: (from, to) => `размеры ${from}–${to}`,
  sizeSpan: (from, to) => `размеры от ${from} до ${to}`,
  price: [
    ({ q, p }) => `${q} — ${p}`,
    ({ q, p }) => `Как тебе ${q}? ${p}`,
    ({ q, p }) => `${q} за ${p} — присмотрись`,
    ({ q, p }) => `Смотри: ${q}, ${p}`,
  ],
  discount: [
    ({ now, old }) => `Было ${old}, сейчас ${now}`,
    ({ q, now, save }) => `Выгода ${save} — ${q} за ${now}`,
    ({ q, now, old }) => `${q}: ${now} вместо ${old}`,
    ({ now, old }) => `Сейчас ${now} вместо ${old}`,
  ],
  sizesMany: [({ s }) => `Есть ${s} — какой твой?`, ({ q, s }) => `${q}: есть ${s}`, ({ s }) => `В наличии ${s}`],
  sizesOne: [({ s }) => `Есть ${s}`, ({ q, s }) => `${q}: есть ${s}`],
  colours: [
    ({ subject, c }) => `${subject} есть ещё в ${c}`,
    ({ c }) => `А ещё есть в ${c}`,
    ({ c }) => `Есть ещё в ${c} — выбирай`,
  ],
  pairing: [
    ({ w, q, qp }) => `К ${w.near} — ${q} за ${qp}?`,
    ({ part, q, qp }) => `${part === "top" ? "А снизу" : "А сверху"} — ${q}? ${qp}`,
    ({ q }) => `Добавь ${q} — получится образ`,
  ],
  tip: [({ q, p }) => `Загляни: ${q} — ${p}`, ({ q, p }) => `Присмотрись: ${q} — ${p}`, ({ q, p }) => `Как тебе ${q}? ${p}`],
  tipSizes: ({ q, s }) => `${q}: есть ${s}`,
  tipColours: ({ subject, c }) => `${subject} есть ещё в ${c}`,
  sale: [
    ({ q, now, old }) => `${q} со скидкой: ${now} вместо ${old}`,
    ({ q, save }) => `${q}: выгода ${save}`,
    ({ q, now, old }) => `${q} сейчас за ${now}, было ${old}`,
  ],
  pair: [
    ({ t, b, total }) => `${t} + ${b} — образ за ${total}`,
    ({ t, b }) => `Образ: ${t} + ${b}`,
    ({ t, b }) => `Как тебе пара: ${t} + ${b}?`,
  ],
  soldOut: [(q) => `${q} сейчас нет в наличии`, (q) => `${q} уже разобрали`],
  soldOutAlt: [
    ({ q, alt }) => `${q} сейчас нет — глянь ${alt}`,
    ({ alt, ap }) => `Этого сейчас нет, но есть ${alt} — ${ap}`,
    ({ alt, ap }) => `Нет в наличии. Взамен — ${alt}, ${ap}`,
  ],
  follow: (q) => `Ну как тебе ${q}?`,
  followSizes: ({ q, s }) => `Ну как тебе ${q}? Есть ${s}`,
  followColours: ({ subject, c }) => `Кстати, ${lowerFirst(subject)} есть ещё в ${c}`,
  followSale: (q, now) => `Напомню: ${q} сейчас за ${now}`,
  followPair: ({ w, q, qp }) => `К ${w.pronoun} подойдёт ${q} за ${qp}`,
  facts: {
    satin1: () => "Атлас красиво блестит на свету",
    satin2: () => "Атлас мягко переливается на свету",
    fitted: (w, many) => `${w ? w.subject : "Вещь"} ${many ? "садятся" : "садится"} по фигуре`,
    fleece1: () => "Внутри флис — тепло и мягко",
    fleece2: () => "Флис — для прохладных дней",
    drape: () => "Драп — плотная и тёплая ткань",
    baggy: () => "Baggy — свободный, расслабленный крой",
    mini: () => "Мини — для смелого образа",
    strap: () => "Ремешок — заметная деталь образа",
    sport: () => "Для уютных дней и прогулок",
    shirt: () => "Рубашку можно заправить или носить навыпуск",
    americanka: () => "Американка — лаконичный топ на каждый день",
    cardigan: () => "Кардиган можно носить нараспашку или застегнуть",
    jeans: () => "Джинсы — база гардероба",
    leggings: () => "Леггинсы — база на каждый день",
  },
};

const KK: Dictionary = {
  quote: (name) => `«${name}»`,
  ctaOpen: "ашу үшін бас",
  ctaShow: "бас — көрсетемін",
  ctaGreeting: "мені бас — образдар көрсетемін",
  orbLabel: "Көмекші: келесі тауарды көрсету",
  greetingTouch: "Сәлем! Саусағыңды жүргіз — кеңес беремін",
  greetingMouse: "Сәлем! Курсорды затқа апар — кеңес беремін",
  flick: ["Ух, қандай жылдам айналдырасың!", "Баяула — мұнда әдемі", "Вжух! Әрең үлгеріп жүрмін", "Асықпа — мұнда қаншама нәрсе бар"],
  generic: ["Күнделікті киім іздейсің бе, әлде кешкі ме?", "Бүгін не іздейміз — жайлы ма, әлде сәнді ме?"],
  categories: (a, b) => `Саған қайсысы жақын: ${a.plural}, ${b.plural}?`,
  outfit: "Образ жинаймыз ба? Үстінен бе, астынан ба?",
  discountAsk: "Жеңілдіктегі бір нәрсе көрсетейін бе?",
  conjunction: "және",
  sizeOne: (label) => `${label} өлшемі`,
  sizeRange: (from, to) => `${from}–${to} өлшемдері`,
  sizeSpan: (from, to) => `${from}–${to} аралығындағы өлшемдер`,
  price: [
    ({ q, p }) => `${q} — ${p}`,
    ({ q, p }) => `${q} саған ұнай ма? ${p}`,
    ({ q, p }) => `${q} — ${p}, қарап көр`,
    ({ q, p }) => `Қарашы: ${q}, ${p}`,
  ],
  discount: [
    ({ now, old }) => `Бұрын ${old} еді, қазір ${now}`,
    ({ q, now, save }) => `${save} үнемдейсің — ${q} ${now}`,
    ({ q, now, old }) => `${q}: ${old} орнына ${now}`,
    ({ now, old }) => `Қазір ${old} орнына ${now}`,
  ],
  sizesMany: [({ s }) => `${cap(s)} бар — сенікі қайсы?`, ({ q, s }) => `${q}: ${s} бар`, ({ s }) => `${cap(s)} қолда бар`],
  sizesOne: [({ s }) => `${cap(s)} бар`, ({ q, s }) => `${q}: ${s} бар`],
  colours: [
    ({ subject, c }) => `${subject} ${c} түсте де бар`,
    ({ c }) => `${cap(c)} түсі де бар`,
    ({ c }) => `${cap(c)} түсте де бар — таңда`,
  ],
  pairing: [
    ({ w, q, qp }) => `${w.near} — ${q}, ${qp}?`,
    ({ part, q, qp }) => `${part === "top" ? "Ал астына" : "Ал үстіне"} — ${q}? ${qp}`,
    ({ q }) => `${q} қос — образ шығады`,
  ],
  tip: [({ q, p }) => `Қарап шық: ${q} — ${p}`, ({ q, p }) => `Назар аудар: ${q} — ${p}`, ({ q, p }) => `${q} саған ұнай ма? ${p}`],
  tipSizes: ({ q, s }) => `${q}: ${s} бар`,
  tipColours: ({ subject, c }) => `${subject} ${c} түсте де бар`,
  sale: [
    ({ q, now, old }) => `${q} жеңілдікпен: ${old} орнына ${now}`,
    ({ q, save }) => `${q}: ${save} үнемдейсің`,
    ({ q, now, old }) => `${q} қазір ${now}, бұрын ${old} еді`,
  ],
  pair: [
    ({ t, b, total }) => `${t} + ${b} — образ бағасы ${total}`,
    ({ t, b }) => `Образ: ${t} + ${b}`,
    ({ t, b }) => `Мына жұп қалай: ${t} + ${b}?`,
  ],
  soldOut: [(q) => `${q} қазір қолда жоқ`, (q) => `${q} таусылып қалды`],
  soldOutAlt: [
    ({ q, alt }) => `${q} қазір жоқ — орнына ${alt}`,
    ({ alt, ap }) => `Бұл қазір жоқ, бірақ ${alt} бар — ${ap}`,
    ({ alt, ap }) => `Қолда жоқ. Орнына — ${alt}, ${ap}`,
  ],
  follow: (q) => `Ал ${q} ұнады ма?`,
  followSizes: ({ q, s }) => `${q} ұнады ма? ${cap(s)} бар`,
  followColours: ({ subject, c }) => `Айтпақшы, ${lowerFirst(subject)} ${c} түсте де бар`,
  followSale: (q, now) => `Еске салайын: ${q} қазір ${now}`,
  followPair: ({ w, q, qp }) => `${w.pronoun} ${q} жарасады — ${qp}`,
  facts: {
    satin1: () => "Атлас жарықта әдемі жылтырайды",
    satin2: () => "Атлас жарықта нәзік құбылады",
    fitted: (w) => `${w ? w.subject : "Бұл зат"} денеге дәл қонады`,
    fleece1: () => "Іші флис — жылы әрі жұмсақ",
    fleece2: () => "Флис — салқын күндерге арналған",
    drape: () => "Драп — тығыз әрі жылы мата",
    baggy: () => "Baggy — кең, еркін пішім",
    mini: () => "Мини — батыл образ үшін",
    strap: () => "Белдікше — образдың көзге түсетін бөлшегі",
    sport: () => "Жайлы күндер мен серуенге арналған",
    shirt: () => "Жейдені ішке салып та, сыртынан да киюге болады",
    americanka: () => "Американка — күнделікті қарапайым топ",
    cardigan: () => "Кардиганды ашық та, түймелеп те киюге болады",
    jeans: () => "Джинсы — гардеробтың негізі",
    leggings: () => "Леггинс — күнделікті киімнің негізі",
  },
};

const EN: Dictionary = {
  quote: (name) => `“${name}”`,
  ctaOpen: "tap to open",
  ctaShow: "tap — I'll show you",
  ctaGreeting: "tap me — I'll show you outfits",
  orbLabel: "Assistant: show the next item",
  greetingTouch: "Hi! Move your finger — I'll give you tips",
  greetingMouse: "Hi! Hover over an item — I'll give you tips",
  flick: ["Whoa, you scroll fast!", "Slow down — it's pretty here", "Whoosh! I can barely keep up", "Not so fast — there's so much here"],
  generic: ["Looking for everyday or for an evening out?", "What are we after today — cosy or dressy?"],
  categories: (a, b) => `Are you more into ${a.plural} or ${b.plural}?`,
  outfit: "Shall we build an outfit? Top or bottom first?",
  discountAsk: "Want to see something on sale?",
  conjunction: "and",
  sizeOne: (label) => `size ${label}`,
  sizeRange: (from, to) => `sizes ${from}–${to}`,
  sizeSpan: (from, to) => `sizes ${from} to ${to}`,
  price: [
    ({ q, p }) => `${q} — ${p}`,
    ({ q, p }) => `How do you like ${q}? ${p}`,
    ({ q, p }) => `${q} for ${p} — take a look`,
    ({ q, p }) => `Look: ${q}, ${p}`,
  ],
  discount: [
    ({ now, old }) => `Was ${old}, now ${now}`,
    ({ q, now, save }) => `Save ${save} — ${q} for ${now}`,
    ({ q, now, old }) => `${q}: ${now} instead of ${old}`,
    ({ now, old }) => `Now ${now} instead of ${old}`,
  ],
  sizesMany: [
    ({ s }) => `${cap(s)} available — which is yours?`,
    ({ q, s }) => `${q}: ${s} available`,
    ({ s }) => `In stock: ${s}`,
  ],
  sizesOne: [({ s }) => `${cap(s)} available`, ({ q, s }) => `${q}: ${s} available`],
  colours: [
    ({ subject, many, c }) => `${subject} also ${many ? "come" : "comes"} in ${c}`,
    ({ c }) => `Also comes in ${c}`,
    ({ c }) => `Also in ${c} — take your pick`,
  ],
  pairing: [
    ({ w, q, qp }) => `With ${w.near} — ${q} for ${qp}?`,
    ({ part, q, qp }) => `${part === "top" ? "And for the bottom" : "And on top"} — ${q}? ${qp}`,
    ({ q }) => `Add ${q} — and you've got an outfit`,
  ],
  tip: [({ q, p }) => `Take a look: ${q} — ${p}`, ({ q, p }) => `Check this out: ${q} — ${p}`, ({ q, p }) => `How do you like ${q}? ${p}`],
  tipSizes: ({ q, s }) => `${q}: ${s} available`,
  tipColours: ({ subject, many, c }) => `${subject} also ${many ? "come" : "comes"} in ${c}`,
  sale: [
    ({ q, now, old }) => `${q} on sale: ${now} instead of ${old}`,
    ({ q, save }) => `${q}: save ${save}`,
    ({ q, now, old }) => `${q} is now ${now}, was ${old}`,
  ],
  pair: [
    ({ t, b, total }) => `${t} + ${b} — an outfit for ${total}`,
    ({ t, b }) => `Outfit: ${t} + ${b}`,
    ({ t, b }) => `How about this pair: ${t} + ${b}?`,
  ],
  soldOut: [(q) => `${q} is sold out right now`, (q) => `${q} has sold out`],
  soldOutAlt: [
    ({ q, alt }) => `${q} is sold out — try ${alt}`,
    ({ alt, ap }) => `This one's sold out, but there's ${alt} — ${ap}`,
    ({ alt, ap }) => `Sold out. Instead: ${alt}, ${ap}`,
  ],
  follow: (q) => `So, how do you like ${q}?`,
  followSizes: ({ q, s }) => `How do you like ${q}? ${cap(s)} available`,
  followColours: ({ subject, many, c }) => `By the way, ${lowerFirst(subject)} also ${many ? "come" : "comes"} in ${c}`,
  followSale: (q, now) => `Just a reminder: ${q} is now ${now}`,
  followPair: ({ w, q, qp }) => `${q} would go with ${w.pronoun} — ${qp}`,
  facts: {
    satin1: () => "Satin catches the light beautifully",
    satin2: () => "Satin softly shimmers in the light",
    fitted: (w, many) => `${w ? w.subject : "It"} ${many ? "hug" : "hugs"} the figure`,
    fleece1: () => "Fleece inside — warm and soft",
    fleece2: () => "Fleece — made for chilly days",
    drape: () => "Drape is a dense, warm fabric",
    baggy: () => "Baggy — a loose, relaxed fit",
    mini: () => "Mini — for a bold look",
    strap: () => "The strap is an eye-catching detail",
    sport: () => "Made for cosy days and walks",
    shirt: () => "Tuck the shirt in or wear it loose",
    americanka: () => "The americanka is a minimal everyday top",
    cardigan: () => "Wear the cardigan open or buttoned",
    jeans: () => "Jeans are a wardrobe staple",
    leggings: () => "Leggings are an everyday staple",
  },
};

const DICTIONARIES: Readonly<Record<OrbLocale, Dictionary>> = { ru: RU, kk: KK, en: EN };

export const orbButtonLabel = (locale: OrbLocale): string => DICTIONARIES[locale].orbLabel;

export const orbLineLabel = (line: OrbLine): string =>
  line.cta ? `${line.text}${/[.!?…]$/.test(line.text) ? " " : ". "}${cap(line.cta)}` : line.text;

const formatMoney = (value: number): string =>
  `${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₸`;

const joinList = (items: readonly string[], conjunction: string): string => {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
};

const normalizeToken = (token: string): string => {
  const lower = token.toLowerCase().replace(/ё/g, "е");
  if (!CYRILLIC.test(lower)) return lower;
  return lower.replace(/[a-z]/g, (char) => LATIN_LOOKALIKES[char] ?? char);
};

const tokenize = (name: string): string[] =>
  name
    .replace(/[()«»"“”/]/g, " ")
    .split(/[\s,-]+/)
    .filter((token) => token.length > 0)
    .map(normalizeToken);

const matchColour = (token: string): ColourSpec | null => {
  for (const spec of COLOURS) {
    if (spec.kk.includes(token) || spec.en.includes(token)) return spec;
    if (
      ADJECTIVE_END.test(token) &&
      !NOT_COLOURS.some((stem) => token.startsWith(stem)) &&
      spec.ru.some((stem) => token.startsWith(stem))
    ) {
      return spec;
    }
  }
  return null;
};

interface ParsedName {
  tokens: string[];
  baseKey: string;
  colour: { id: string; show: Readonly<Record<OrbLocale, string>> } | null;
}

const parseName = (name: string): ParsedName => {
  const tokens = tokenize(name);
  const rest: string[] = [];
  let found: ParsedName["colour"] = null;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const modifier = MODIFIERS[token];
    const next = index + 1 < tokens.length ? matchColour(tokens[index + 1]) : null;
    if (modifier && next && next.id !== "light" && next.id !== "dark") {
      if (found === null) {
        if (modifier === "light" && next.id === "navy") {
          found = { id: LIGHT_BLUE.id, show: LIGHT_BLUE.show };
        } else {
          const make = MODIFIER_SHOW[modifier];
          found = {
            id: `${modifier}-${next.id}`,
            show: { ru: make.ru(next.show.ru), kk: make.kk(next.show.kk), en: make.en(next.show.en) },
          };
        }
      }
      index += 1;
      if (tokens[index + 1] === "түсті") index += 1;
      continue;
    }
    const spec = matchColour(token);
    if (spec && found === null) {
      found = { id: spec.id, show: spec.show };
      if (tokens[index + 1] === "түсті") index += 1;
      continue;
    }
    rest.push(token);
  }
  return { tokens, baseKey: rest.join(" "), colour: found };
};

const categoryOf = (tokens: readonly string[]): CategorySpec | null => {
  const joined = tokens.join(" ");
  const byPhrase = CATEGORIES.find((spec) => spec.phrases.some((phrase) => joined.includes(phrase.replace(/-/g, " "))));
  if (byPhrase) return byPhrase;
  for (const token of tokens) {
    const found = CATEGORIES.find(
      (spec) => spec.exact.includes(token) || spec.stems.some((stem) => token.startsWith(stem)),
    );
    if (found) return found;
  }
  return null;
};

const featureIds = (tokens: readonly string[], category: CategorySpec | null): FactId[] => {
  const ids: FactId[] = [];
  for (const rule of FEATURE_RULES) {
    const hit = tokens.some((token) => rule.exact.includes(token) || rule.stems.some((stem) => token.startsWith(stem)));
    if (hit) ids.push(...rule.facts);
  }
  if (category?.fact) ids.push(category.fact);
  return ids;
};

const sortSizes = (labels: string[]): string[] => {
  if (labels.every((label) => /^\d+$/.test(label))) return [...labels].sort((a, b) => Number(a) - Number(b));
  if (labels.every((label) => SIZE_ORDER.includes(label.toUpperCase()))) {
    return [...labels].sort((a, b) => SIZE_ORDER.indexOf(a.toUpperCase()) - SIZE_ORDER.indexOf(b.toUpperCase()));
  }
  return labels;
};

const sizePhrase = (product: OrbLineProduct, dict: Dictionary): { text: string | null; many: boolean } => {
  const labels = sortSizes(
    Array.from(
      new Set(
        product.sizes
          .filter((size) => size.quantity > 0)
          .map((size) => size.label.trim())
          .filter((label) => label.length > 0 && !ONE_SIZE_LABELS.includes(label.toLowerCase())),
      ),
    ),
  );
  if (labels.length === 0) return { text: null, many: false };
  if (labels.length === 1) return { text: dict.sizeOne(labels[0]), many: false };
  const numeric = labels.every((label) => /^\d+$/.test(label));
  const contiguous =
    numeric && labels.every((label, index) => index === 0 || Number(label) - Number(labels[index - 1]) === 1);
  if (contiguous && labels.length >= 4) return { text: dict.sizeRange(labels[0], labels[labels.length - 1]), many: true };
  if (labels.length > 5) return { text: dict.sizeSpan(labels[0], labels[labels.length - 1]), many: true };
  return { text: joinList(labels, dict.conjunction), many: true };
};

const isInStock = (product: OrbLineProduct): boolean => product.sizes.some((size) => size.quantity > 0);

const effectivePrice = (product: OrbLineProduct): number => product.discountPrice || product.price;

const buildFacts = (products: ReadonlyArray<OrbLineProduct>, locale: OrbLocale): Map<string, ProductFacts> => {
  const dict = DICTIONARIES[locale];
  const parsed = products.map((product) => ({ product, parsed: parseName(product.name) }));
  const facts = new Map<string, ProductFacts>();
  for (const { product, parsed: name } of parsed) {
    const category = categoryOf(name.tokens);
    const categoryWords = category ? category.words[locale] : null;
    const discount = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : null;
    const size = sizePhrase(product, dict);
    const own = name.colour;
    const variants =
      own === null || name.baseKey.length === 0
        ? []
        : Array.from(
            new Map(
              parsed
                .filter(
                  (other) =>
                    other.product._id !== product._id &&
                    other.parsed.baseKey === name.baseKey &&
                    other.parsed.colour !== null &&
                    other.parsed.colour.id !== own.id &&
                    isInStock(other.product),
                )
                .flatMap((other) => (other.parsed.colour ? [[other.parsed.colour.id, other.parsed.colour.show[locale]] as const] : [])),
            ).values(),
          ).slice(0, 3);
    facts.set(product._id, {
      id: product._id,
      quoted: dict.quote(product.name.trim()),
      price: formatMoney(effectivePrice(product)),
      priceValue: effectivePrice(product),
      oldPrice: discount === null ? null : formatMoney(product.price),
      saving: discount === null ? null : formatMoney(product.price - discount),
      inStock: isInStock(product),
      sizes: size.text,
      manySizes: size.many,
      colours: variants.length > 0 ? joinList(variants, dict.conjunction) : null,
      category,
      features: featureIds(name.tokens, category).map((id) => ({
        id,
        text: dict.facts[id](categoryWords, category?.many ?? false),
      })),
      relatedIds: (product.relatedProducts ?? []).map((related) => related._id),
    });
  }
  return facts;
};

const partnersOf = (item: ProductFacts, facts: Map<string, ProductFacts>): ProductFacts[] => {
  const part = item.category?.part;
  if (part !== "top" && part !== "bottom") return [];
  const wanted: Part = part === "top" ? "bottom" : "top";
  const fits = (other: ProductFacts | undefined): other is ProductFacts =>
    other !== undefined && other.id !== item.id && other.inStock && other.category?.part === wanted;
  const related = item.relatedIds.map((id) => facts.get(id)).filter(fits);
  const others = Array.from(facts.values()).filter((other) => fits(other) && !related.includes(other));
  return [...related, ...others];
};

const alternativesOf = (item: ProductFacts, facts: Map<string, ProductFacts>): ProductFacts[] => {
  const stocked = Array.from(facts.values()).filter((other) => other.id !== item.id && other.inStock);
  const category = item.category;
  if (!category) return stocked;
  const same = stocked.filter((other) => other.category === category);
  const sameKind = stocked.filter((other) => other.category !== category && other.category?.part === category.part);
  const rest = stocked.filter((other) => other.category !== category && other.category?.part !== category.part);
  return [...same, ...sameKind, ...rest];
};

const shuffle = <T>(items: readonly T[], random: () => number): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
};

export const createOrbLineGenerator = (
  locale: OrbLocale = "ru",
  random: () => number = Math.random,
): OrbLineGenerator => {
  const dict = DICTIONARIES[locale];
  const recent: string[] = [];
  const recentFacts: string[] = [];
  let lastProductId: string | null = null;
  let factsSource: ReadonlyArray<OrbLineProduct> | null = null;
  let factsCache = new Map<string, ProductFacts>();
  const commentTurns = new Map<string, number>();
  const pairTurns = new Map<string, number>();
  const altTurns = new Map<string, number>();
  let idleTurn = Math.floor(random() * IDLE_ORDER.length);
  let questionTurn = Math.floor(random() * 5);
  let flickTurn = Math.floor(random() * dict.flick.length);
  let discountTurn = 0;

  const factsFor = (products: ReadonlyArray<OrbLineProduct>): Map<string, ProductFacts> => {
    if (factsSource !== products) {
      factsSource = products;
      factsCache = buildFacts(products, locale);
    }
    return factsCache;
  };

  const remember = (candidate: Candidate): OrbLine => {
    recent.push(candidate.line.text);
    if (recent.length > MEMORY) recent.shift();
    if (candidate.key !== null) {
      recentFacts.push(candidate.key);
      if (recentFacts.length > MEMORY) recentFacts.shift();
    }
    if (candidate.line.productId !== null) lastProductId = candidate.line.productId;
    return candidate.line;
  };

  const usable = (candidate: Candidate): boolean =>
    candidate.line.text.length <= MAX_LENGTH && candidate.line.text !== recent[recent.length - 1];

  const freshFact = (candidate: Candidate): boolean => candidate.key === null || !recentFacts.includes(candidate.key);

  const choose = (candidates: readonly Candidate[]): Candidate | null => {
    const valid = candidates.filter(usable);
    if (valid.length === 0) return null;
    const freshText = valid.filter((candidate) => !recent.includes(candidate.line.text));
    const freshBoth = freshText.filter(freshFact);
    const pool = freshBoth.length > 0 ? freshBoth : freshText.length > 0 ? freshText : valid;
    return pool[Math.floor(random() * pool.length)];
  };

  const productLine = (text: string, productId: string, key: string | null, action: OrbLineAction = "open"): Candidate => ({
    line: { text, action, productId, cta: action === "open" ? dict.ctaOpen : dict.ctaShow },
    key,
  });

  const plainLine = (text: string, action: OrbLineAction, productId: string | null = null): Candidate => ({
    line: { text, action, productId, cta: dict.ctaShow },
    key: null,
  });

  const subjectOf = (item: ProductFacts): { subject: string; many: boolean } =>
    item.category
      ? { subject: item.category.words[locale].subject, many: item.category.many }
      : { subject: item.quoted, many: false };

  const nextPartner = (item: ProductFacts, facts: Map<string, ProductFacts>): ProductFacts | null => {
    const partners = partnersOf(item, facts);
    if (partners.length === 0) return null;
    const turn = pairTurns.get(item.id) ?? 0;
    pairTurns.set(item.id, turn + 1);
    const shift = turn % partners.length;
    const ordered = partners.slice(shift).concat(partners.slice(0, shift));
    return ordered.find((partner) => partner.id !== lastProductId) ?? ordered[0];
  };

  const soldOutLine = (item: ProductFacts, facts: Map<string, ProductFacts>): Candidate => {
    const key = `${item.id}:soldout`;
    const plain = dict.soldOut.map((template) => productLine(template(item.quoted), item.id, key));
    const options = alternativesOf(item, facts);
    if (options.length === 0) return choose(plain) ?? plain[0];
    const turn = altTurns.get(item.id) ?? 0;
    altTurns.set(item.id, turn + 1);
    const alt = options[turn % options.length];
    const args: SoldOutArgs = { q: item.quoted, alt: alt.quoted, ap: alt.price };
    return choose(dict.soldOutAlt.map((template) => productLine(template(args), alt.id, key))) ?? choose(plain) ?? plain[0];
  };

  const commentCandidates =(item: ProductFacts, kind: CommentKind, facts: Map<string, ProductFacts>): Candidate[] => {
    const { id, quoted: q, price: p } = item;
    const key = `${id}:${kind}`;
    switch (kind) {
      case "price":
        return dict.price.map((template) => productLine(template({ q, p }), id, key));
      case "discount": {
        const old = item.oldPrice;
        const save = item.saving;
        if (!old || !save) return [];
        return dict.discount.map((template) => productLine(template({ q, now: p, old, save }), id, key));
      }
      case "sizes": {
        const s = item.sizes;
        if (!s) return [];
        return (item.manySizes ? dict.sizesMany : dict.sizesOne).map((template) => productLine(template({ q, s }), id, key));
      }
      case "colours": {
        const c = item.colours;
        if (!c) return [];
        const { subject, many } = subjectOf(item);
        return dict.colours.map((template) => productLine(template({ subject, many, c }), id, key));
      }
      case "feature":
        return item.features.flatMap((fact) =>
          SUBJECT_FACTS.has(fact.id)
            ? [productLine(fact.text, id, key)]
            : [productLine(fact.text, id, key), productLine(`${q}: ${lowerFirst(fact.text)}`, id, key)],
        );
      case "pairing": {
        const partner = nextPartner(item, facts);
        if (!partner || !item.category) return [];
        const args: PairingArgs = {
          w: item.category.words[locale],
          part: item.category.part,
          q: partner.quoted,
          qp: partner.price,
        };
        return dict.pairing.map((template) => productLine(template(args), partner.id, key));
      }
    }
  };

  const comment = (product: OrbLineProduct, products: ReadonlyArray<OrbLineProduct>): OrbLine => {
    const facts = factsFor(products);
    const item = facts.get(product._id) ?? buildFacts([product], locale).get(product._id);
    if (!item) return remember(productLine(dict.quote(product.name.trim()), product._id, null));
    if (!item.inStock) return remember(soldOutLine(item, facts));
    const turn = commentTurns.get(item.id) ?? Math.floor(random() * COMMENT_ORDER.length);
    for (const strict of [true, false]) {
      for (let step = 0; step < COMMENT_ORDER.length; step += 1) {
        const kind = COMMENT_ORDER[(turn + step) % COMMENT_ORDER.length];
        if (strict && recentFacts.includes(`${item.id}:${kind}`)) continue;
        const candidate = choose(commentCandidates(item, kind, facts));
        if (candidate) {
          commentTurns.set(item.id, turn + step + 1);
          return remember(candidate);
        }
      }
    }
    commentTurns.set(item.id, turn + 1);
    return remember(
      choose(commentCandidates(item, "price", facts)) ?? productLine(`${item.quoted} — ${item.price}`, item.id, `${item.id}:price`),
    );
  };

  const pickProduct = (pool: readonly ProductFacts[], visibleIds: ReadonlySet<string>): ProductFacts | null => {
    if (pool.length === 0) return null;
    const onScreen = pool.filter((item) => visibleIds.has(item.id));
    const candidates = shuffle(onScreen.length > 0 ? onScreen : pool, random);
    return candidates.find((item) => item.id !== lastProductId) ?? candidates[0];
  };

  const idleQuestion = (facts: Map<string, ProductFacts>): Candidate | null => {
    const stocked = Array.from(facts.values()).filter((item) => item.inStock);
    const kinds = Array.from(
      new Map(
        stocked.flatMap((item) => (item.category ? [[item.category.words[locale].plural, item.category.words[locale]] as const] : [])),
      ).values(),
    );
    const parts = new Set(stocked.map((item) => item.category?.part));
    const discounted = stocked.filter((item) => item.oldPrice !== null);
    const options: Candidate[] = dict.generic.map((text) => plainLine(text, "next"));
    if (kinds.length >= 2) {
      const first = kinds[questionTurn % kinds.length];
      const second = kinds[(questionTurn + 1 + Math.floor(random() * (kinds.length - 1))) % kinds.length];
      if (first.plural !== second.plural) options.push(plainLine(dict.categories(first, second), "next"));
    }
    if (parts.has("top") && parts.has("bottom")) options.push(plainLine(dict.outfit, "next"));
    if (discounted.length > 0) {
      const target = discounted[discountTurn % discounted.length];
      discountTurn += 1;
      options.push(plainLine(dict.discountAsk, "focus", target.id));
    }
    questionTurn += 1;
    return choose(options);
  };

  const idleTip = (facts: Map<string, ProductFacts>, visibleIds: ReadonlySet<string>): Candidate | null => {
    const item = pickProduct(Array.from(facts.values()).filter((entry) => entry.inStock), visibleIds);
    if (!item) return null;
    const { id, quoted: q, price: p } = item;
    const options = dict.tip.map((template) => productLine(template({ q, p }), id, `${id}:price`));
    if (item.sizes) options.push(productLine(dict.tipSizes({ q, s: item.sizes }), id, `${id}:sizes`));
    if (item.colours) {
      options.push(productLine(dict.tipColours({ subject: q, many: false, c: item.colours }), id, `${id}:colours`));
    }
    return choose(options);
  };

  const idleDiscount = (facts: Map<string, ProductFacts>, visibleIds: ReadonlySet<string>): Candidate | null => {
    const item = pickProduct(
      Array.from(facts.values()).filter((entry) => entry.inStock && entry.oldPrice !== null),
      visibleIds,
    );
    if (!item || !item.oldPrice || !item.saving) return null;
    const args: SaleArgs = { q: item.quoted, now: item.price, old: item.oldPrice, save: item.saving };
    return choose(dict.sale.map((template) => productLine(template(args), item.id, `${item.id}:discount`)));
  };

  const idlePairing = (facts: Map<string, ProductFacts>, visibleIds: ReadonlySet<string>): Candidate | null => {
    const tops = Array.from(facts.values()).filter(
      (entry) => entry.inStock && entry.category?.part === "top" && partnersOf(entry, facts).length > 0,
    );
    const top = pickProduct(tops, visibleIds);
    if (!top) return null;
    const bottom = nextPartner(top, facts);
    if (!bottom) return null;
    const args: OutfitArgs = { t: top.quoted, b: bottom.quoted, total: formatMoney(top.priceValue + bottom.priceValue) };
    return choose(dict.pair.map((template) => productLine(template(args), top.id, `${top.id}:pairing`)));
  };

  const idle = (products: ReadonlyArray<OrbLineProduct>, visibleIds: ReadonlySet<string>): OrbLine | null => {
    const facts = factsFor(products);
    if (facts.size === 0) return null;
    for (let step = 0; step < IDLE_ORDER.length; step += 1) {
      const kind = IDLE_ORDER[(idleTurn + step) % IDLE_ORDER.length];
      const candidate =
        kind === "question"
          ? idleQuestion(facts)
          : kind === "tip"
            ? idleTip(facts, visibleIds)
            : kind === "discount"
              ? idleDiscount(facts, visibleIds)
              : idlePairing(facts, visibleIds);
      if (candidate) {
        idleTurn += step + 1;
        return remember(candidate);
      }
    }
    idleTurn += 1;
    return null;
  };

  const followUp = (product: OrbLineProduct, products: ReadonlyArray<OrbLineProduct>): OrbLine => {
    const facts = factsFor(products);
    const item = facts.get(product._id);
    if (!item) return comment(product, products);
    if (!item.inStock) return remember(soldOutLine(item, facts));
    const { id, quoted: q } = item;
    const options: Candidate[] = [productLine(dict.follow(q), id, `${id}:followup`)];
    if (item.sizes) options.push(productLine(dict.followSizes({ q, s: item.sizes }), id, `${id}:sizes`));
    if (item.colours && item.category) {
      const { subject, many } = subjectOf(item);
      options.push(productLine(dict.followColours({ subject, many, c: item.colours }), id, `${id}:colours`));
    }
    if (item.oldPrice) options.push(productLine(dict.followSale(q, item.price), id, `${id}:discount`));
    const partner = nextPartner(item, facts);
    if (partner && item.category) {
      options.push(
        productLine(
          dict.followPair({ w: item.category.words[locale], part: item.category.part, q: partner.quoted, qp: partner.price }),
          partner.id,
          `${id}:pairing`,
        ),
      );
    }
    const chosen = choose(options);
    return chosen ? remember(chosen) : comment(product, products);
  };

  const greeting = (device: OrbDevice): OrbLine =>
    remember({
      line: {
        text: device === "touch" ? dict.greetingTouch : dict.greetingMouse,
        action: "next",
        productId: null,
        cta: dict.ctaGreeting,
      },
      key: null,
    });

  const flick = (): OrbLine => {
    const options = dict.flick.map((text): Candidate => ({ line: { text, action: "next", productId: null, cta: null }, key: null }));
    const shift = flickTurn % options.length;
    const ordered = options.slice(shift).concat(options.slice(0, shift));
    flickTurn += 1;
    return remember(ordered.find(usable) ?? ordered[0]);
  };

  return { locale, greeting, idle, comment, followUp, flick };
};
