import type { ReactElement } from "react";
import type { Metadata } from "next";
import { ProductPage, productMetadata } from "@/components/storefront/ProductPage";

export const revalidate = 300;

export const generateStaticParams = (): Array<{ slug: string }> => [];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => productMetadata("kk", (await params).slug);

export default async function Page({ params }: PageProps): Promise<ReactElement> {
  return <ProductPage locale="kk" slug={(await params).slug} />;
}
