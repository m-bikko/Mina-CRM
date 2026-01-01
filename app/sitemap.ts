import { MetadataRoute } from "next";
import { connectDB } from "@/lib/db/mongodb";
import Product from "@/models/Product";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mina-crm.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Dynamic product pages (if you add individual product pages in the future)
  try {
    await connectDB();
    const products = await Product.find({ isActive: true })
      .select("_id updatedAt")
      .lean();

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${siteUrl}/product/${product._id}`,
      lastModified: product.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...productPages];
  } catch {
    return staticPages;
  }
}
