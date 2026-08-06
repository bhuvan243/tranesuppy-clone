import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "HVACDirect",
  description: "Shop HVAC parts, equipment, and supplies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="section-shell flex-1">
            <div className="section-inner py-6">{children}</div>
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
