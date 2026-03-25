import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Libertad PRO Digital | Agencia de Marketing enfocada en Resultados",
  description: "Ayudamos a escalar tu facturación implementando sistemas de captación predecibles y rentables. Expertos en SEO, Copywriting y Lead Generation.",
  keywords: ["SEO", "Marketing Digital", "Lead Generation", "Copywriting", "Estrategia de Ventas"],
  authors: [{ name: "Libertad PRO Digital" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
