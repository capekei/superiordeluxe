'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased bg-white dark:bg-slate-900`}>
        <Providers>
          <div className="flex flex-col min-h-screen pt-20">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <FloatingCart />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
