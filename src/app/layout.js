import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Preloader from "@/components/fx/Preloader";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Reveal from "@/components/fx/Reveal";
import PageTransition from "@/components/fx/PageTransition";
import BookingModal from "@/components/booking/BookingModal";
import "./globals.css";

// Cormorant Garamond (serif thanh lịch, nghiêng làm điểm nhấn) + Be Vietnam Pro — cả hai hỗ trợ tiếng Việt.
const display = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Massage & chăm sóc sức khỏe tại Thới An, TP.HCM`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }) {
  const { address, maps } = siteConfig;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.slogan,
    url: siteConfig.url,
    telephone: siteConfig.phoneRaw,
    image: `${siteConfig.url}/opengraph-image.jpg`,
    logo: `${siteConfig.url}/brand/logo-gold.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.ward,
      addressRegion: address.city,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: maps.geo.lat, longitude: maps.geo.lng },
    hasMap: maps.link,
    openingHours: siteConfig.hoursSchema,
    sameAs: siteConfig.socials.map((s) => s.href),
    priceRange: "99.000đ – 498.000đ",
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
      ...(s.from ? { price: s.from, priceCurrency: "VND" } : {}),
    })),
  };

  return (
    <html lang="vi" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <SmoothScroll />
        <PageTransition />
        <Reveal />
        <Header />
        {/* khung trang tối đa 1920px, căn giữa (page-frame trong globals.css) */}
        <div className="page-frame bg-cocoa-deep shadow-[0_0_80px_rgba(0,0,0,0.35)]">
          <main className="bg-cream">{children}</main>
          <Footer />
        </div>
        <FloatingActions />
        <BookingModal />
      </body>
    </html>
  );
}
