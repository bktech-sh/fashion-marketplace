import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartFab from "@/components/cart/CartFab";
import WhatsAppFab from "@/components/WhatsAppFab";
import Toaster from "@/components/Toaster";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://fashion.bktech.id/";
const title = "Atelier N1oire — Garments of Rare Distinction";
const description =
  "A maison of high craftsmanship. Shop limited artisanal collections — tailored coats, evening gowns, and atelier couture, handmade in Florence with complimentary shipping and easy returns.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Atelier N1oire",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Atelier N1oire — artisanal collections on a garment rack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
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
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ToastProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CartFab />
            <WhatsAppFab />
          </CartProvider>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
