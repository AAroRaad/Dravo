import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/ui/SkipLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dravo | 6-Hour Consistency Engine",
  description: "Complete your 6-hour action, earn a unique token, and build unbreakable habits with Dravo.",
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <SkipLink />
        <Providers>
          <div id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </div>
        </Providers>
        <ToastContainer theme="dark" position="top-center" autoClose={2000} />
      </body>
    </html>
  );
}
