import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { VisitorLogger } from "@/components/VisitorLogger";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TinyStrophic Web Studios | Premium South African Web Agency",
  description: "TinyStrophic Web Studios helps South African businesses establish a powerful online presence with premium web design and development services.",
  authors: [{ name: "Ntabiso Sola Nkomo" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "144x144" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/logo.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body 
        className="min-h-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed bg-black"
        style={{ backgroundImage: "url('/pricing_hero_bg.png')" }}
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18190127581"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18190127581');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <VisitorLogger />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
