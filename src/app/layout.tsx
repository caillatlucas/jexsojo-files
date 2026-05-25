import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-merriweather" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Les JexSoJo files",
  description: "Portail officiel de consultation des documents sous le Epstein Files Transparency Act (Factice)",
  icons: {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Seal_of_the_United_States_Department_of_Justice.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans bg-doj-gray text-doj-darkGray min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
