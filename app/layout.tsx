// filepath: c:\Users\Suvadeep\OneDrive\Desktop\react project\next-final-project\app\layout.tsx
"use client";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "../app/layout/Wrapper";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Wrapper>
            <Toaster />
            {children}
          </Wrapper>
        </QueryClientProvider>
      </body>
    </html>
  );
}
