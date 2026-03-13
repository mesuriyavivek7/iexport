import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

const GA_ID = "G-LPRQKYLNEL";

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
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Inter for admin panel */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
