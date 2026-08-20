import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criado com a Lasy",
  description: "Projeto criado com Lasy AI",
};

export default function NorthAmericaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
