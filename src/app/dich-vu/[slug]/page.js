import { Suspense } from "react";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import DetailHero from "@/components/services/detail/DetailHero";
import DetailAbout from "@/components/services/detail/DetailAbout";
import DetailMenu from "@/components/services/detail/DetailMenu";
import DetailSteps from "@/components/services/detail/DetailSteps";
import DetailGallery from "@/components/services/detail/DetailGallery";
import DetailFaq from "@/components/services/detail/DetailFaq";
import OtherServices from "@/components/services/detail/OtherServices";
import CtaStrip from "@/components/ui/CtaStrip";

/**
 * TEMPLATE CHUNG cho mọi trang chi tiết liệu trình (/dich-vu/<slug>). Nội dung lấy từ src/data/services.js.
 * Thứ tự: Banner → Giới thiệu → Bảng giá → Quy trình → Ảnh → Hỏi đáp → Dịch vụ khác → CTA.
 * Phần đọc params nằm trong <Suspense> (yêu cầu khi bật cacheComponents) — fallback cùng màu banner để không chớp.
 */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: `${s.desc} ${s.from ? `Giá từ ${s.from.toLocaleString("vi-VN")}đ.` : ""} Đặt lịch tại ${siteConfig.name}, Thới An.`,
    alternates: { canonical: `/dich-vu/${s.slug}` },
    openGraph: { images: [{ url: img(s.photos[0]).src }] },
  };
}

export default function ServiceDetailPage({ params }) {
  return (
    <Suspense fallback={<section aria-hidden className="min-h-screen-cap bg-cocoa-deep" />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];
  const others = services.filter((x) => x.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.desc,
    provider: { "@type": "DaySpa", name: siteConfig.name, telephone: siteConfig.phoneRaw },
    areaServed: `${siteConfig.address.ward}, ${siteConfig.address.city}`,
    offers: s.menu
      .filter((m) => m.price)
      .map((m) => ({ "@type": "Offer", name: m.name, price: m.price, priceCurrency: "VND" })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DetailHero key={s.slug} service={s} next={next} />
      <DetailAbout service={s} />
      <DetailMenu service={s} />
      <DetailSteps service={s} />
      <DetailGallery service={s} />
      <DetailFaq service={s} />
      <OtherServices items={others} />
      <CtaStrip
        title={`Sẵn sàng cho buổi ${s.title.toLowerCase()}?`}
        accent="Helove đang chờ bạn."
        preset={s.slug}
        secondary={{ label: "Tất cả dịch vụ", href: "/dich-vu" }}
      />
    </>
  );
}
