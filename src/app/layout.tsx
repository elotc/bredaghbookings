import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserSelectorContextProvider } from "@/components/auth/UserOrgContext";
import SiteHeader from "@/components/general/SiteHeader";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });

export const metadata: Metadata = {
  title: "Bredagh Bookings App",
  description: "Demo app for Bredagh Bookings",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <SiteHeader />
        <div className="flex min-h-screen min-w-full flex-col">
          <UserSelectorContextProvider>
            {children}
          </UserSelectorContextProvider>
        </div>
      </body>
    </html>
  );
}
