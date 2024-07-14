import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context";
import { Toaster } from "@/components/ui/toaster";
import Header from "./_components/_header";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <ContextProvider>
        <Toaster/>
         <body className={inter.className}>
          <Header/>
          {children}
          </body>
      </ContextProvider>
     
    </html>
  );
}
