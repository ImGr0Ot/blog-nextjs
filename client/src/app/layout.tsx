import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BlogProvider } from "./context/BlogContext";
import { NextAuthProvider } from "./NextAuthProvider";
import { Metadata } from "next/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "Blog App for personal use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <BlogProvider>
            <Navbar />
            {children}

            <Footer />
          </BlogProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
