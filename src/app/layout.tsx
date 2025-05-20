import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google'
import ProviderLayout from "@/components/ProviderLayout";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Web Chat",
  description: "Chat with different people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased`}
      >
        <ProviderLayout>
          {children}
        </ProviderLayout>
      </body>
    </html>
  );
}
