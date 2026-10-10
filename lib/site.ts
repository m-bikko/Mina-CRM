export const SITE_URL = (process.env.NEXT_PUBLIC_CANONICAL_URL || "https://mina-wear.vercel.app").replace(/\/+$/, "");

export const BRAND_NAME = "Minawear";

export const WHATSAPP_NUMBER = "77783536898";

export const WHATSAPP_DISPLAY = "+7 778 353 68 98";

export const PHONE_E164 = "+77783536898";

export const INSTAGRAM_URL = "https://www.instagram.com/minawear.kz/";

export const absoluteUrl = (path: string): string => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
