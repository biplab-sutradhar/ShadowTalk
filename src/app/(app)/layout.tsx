'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvier";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClosed, setIsClosed] = useState(false);
  console.log(setIsClosed);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <Sidebar setIsClosed={setIsClosed} />
          <div className={`${isClosed ? "ml-[224px]" : "ml-[80px]"}`}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}