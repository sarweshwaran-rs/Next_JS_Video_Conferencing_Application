import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPEAK RRT",
  description: "Video Conferencing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
          signInUrl='/sign-in'
          signUpUrl='/sign-up'
          appearance={{
            layout: {
              logoImageUrl: '/icons/yoom-logo.svg',
              socialButtonsVariant: 'iconButton'
            },
            variables: {
              colorText: "#fff",
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorInputBackground: "#252A41",
              colorInputText: "#fff",
            }
          }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
