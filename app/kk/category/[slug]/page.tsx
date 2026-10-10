import type { ReactElement } from "react";
import type { Metadata } from "next";
import { CategoryPage, categoryMetadata } from "@/components/storefront/CategoryPage";

export const revalidate = 300;

export const generateStaticParams = (): Array<{ slug: string }> => [];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => categoryMetadata("kk", (await params).slug);

export default async function Page({ params }: PageProps): Promise<ReactElement> {
  return <CategoryPage locale="kk" slug={(await params).slug} />;
}
