import { CATEGORIES, getDictionary, localePath } from "@/lib/i18n";
import { getCatalog, localizeProduct } from "@/lib/catalog";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const dict = getDictionary("ru");
  const catalog = await getCatalog().catch(() => []);
  const lines: string[] = [
    "# Minawear",
    "",
    `> ${dict.about("атласные рубашки, кардиганы, топы, джинсы, юбки, брюки, спортивные штаны и леггинсы")}`,
    "",
    "## Контакты",
    `- WhatsApp: ${WHATSAPP_DISPLAY}`,
    `- Instagram: ${INSTAGRAM_URL}`,
    `- Сайт: ${absoluteUrl("/")} (русский), ${absoluteUrl("/kk")} (қазақша), ${absoluteUrl("/en")} (English)`,
    "",
    "## Категории",
    ...CATEGORIES.filter((c) => catalog.some((p) => p.categorySlug === c.slug)).map(
      (c) => `- [${c.name.ru}](${absoluteUrl(localePath("ru", `/category/${c.slug}`))}): ${c.blurb.ru}`,
    ),
    "",
    "## Товары",
    ...catalog.map((p) => {
      const item = localizeProduct(p, "ru");
      const sizes = item.sizesInStock.length > 0 ? `; размеры: ${item.sizesInStock.join(", ")}` : `; ${dict.outOfStock.toLowerCase()}`;
      return `- [${item.name}](${absoluteUrl(item.href)}): ${item.priceText}${item.oldPriceText ? ` (было ${item.oldPriceText})` : ""}${sizes}`;
    }),
    "",
    "## Заказ и доставка",
    `- ${dict.orderHow}`,
    `- ${dict.delivery}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
