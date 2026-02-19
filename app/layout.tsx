import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procure Export - International trade",
  description: "Procure Export is a trusted partner in delivering the finest quality agricultural and food products to markets worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router: font loaded in root layout for all routes */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500;700&display=swap"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
