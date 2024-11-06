'use client' 
import { Inter } from "next/font/google"; 
import AuthProvider from "@/context/AuthProvier";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClosed, setIsClosed] = useState(false); 

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar isClosed={isClosed}/>
          <Sidebar setIsClosed={setIsClosed} />
          <div className={`${isClosed ? "ml-[224px]" : "ml-[80px]"}`}>
            {children}
            <ToastProvider>
          <Toaster />
        </ToastProvider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}