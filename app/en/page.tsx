import type { ReactElement } from "react";
import type { Metadata } from "next";
import { StoreHome, homeMetadata } from "@/components/storefront/StoreHome";

export const revalidate = 300;

export const generateMetadata = (): Promise<Metadata> => homeMetadata("en");

export default function Page(): Promise<ReactElement> {
  return StoreHome({ locale: "en" });
}
