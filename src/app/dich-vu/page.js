import Link from "next/link";
import { services } from "@/data/services";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import { vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageBanner from "@/components/ui/PageBanner";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaStrip from "@/components/ui/CtaStrip";
import ServiceRow from "@/components/services/ServiceRow";
import SplitText from "@/components/fx/SplitText";
import { ArrowRight } from "@/components/ui/Icons";
import ServicePromise from "@/components/services/ServicePromise";

export const metadata = {
  title: "Dịch vụ",
  description: `Massage body thư giãn, trị liệu cổ vai gáy, mặt ngọc diện chẩn, massage trị liệu chuyên sâu, combo toàn thân 90 phút tại ${siteConfig.name} — Thới An, TP.HCM.`,
  alternates: { canonical: "/dich-vu" },
};

/**
 * Trang tổng dịch vụ: 1) Banner một màn hình — tiêu đề trái, "mục lục" dịch vụ phải.
 * 2) Các hàng dịch vụ xen kẽ trái/phải. 3) Cam kết (ServicePromise — ảnh + danh sách, nền kem). 4) Dải CTA.
 */
export default function ServicesPage() {
  return (
    <>
      <PageBanner image={img("183").src} pos="50% 55%">
        <Container className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <div>
            <Breadcrumb
              items={[{ label: "Trang chủ", href: "/" }, { label: "Dịch vụ" }]}
              className="intro"
              style={{ "--d": "100ms" }}
            />
            <h1
              className="intro mt-6 h-display text-[3.4rem] leading-[1] text-cream sm:text-[4.6rem] lg:text-[5.6rem]"
              style={{ "--d": "250ms" }}
            >
              Dịch vụ <em className="text-gilded italic">tại Helove</em>
            </h1>
            <p
              className="intro mt-6 max-w-md text-[15px] leading-relaxed text-cream/75"
              style={{ "--d": "400ms" }}
            >
              Sáu nhóm liệu trình, một không gian bình yên. Chọn một dịch vụ hoặc kết hợp vài liệu
              trình — kỹ thuật viên sẽ gợi ý thứ tự phù hợp nhất cho cơ thể bạn.
            </p>
            <div
              className="intro mt-8 flex flex-wrap items-center gap-5"
              style={{ "--d": "550ms" }}
            >
              <Button data-booking variant="gold">
                Đặt lịch ngay
              </Button>
              <Button
                href="/#bang-gia"
                variant="ghost"
                className="!text-cream/85 hover:!text-cream"
              >
                Xem bảng giá
              </Button>
            </div>
          </div>

          <ol className="hidden border-t border-cream/15 lg:block">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className="intro border-b border-cream/15"
                style={{ "--d": `${350 + i * 80}ms` }}
              >
                <Link href={`/dich-vu/${s.slug}`} className="group flex items-center gap-5 py-4">
                  <span className="w-7 text-[11px] font-medium tracking-[0.2em] text-gold tabular-nums">
                    {s.n}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.7rem] leading-tight transition-colors group-hover:text-gold-soft">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-cream/55">{s.short}</span>
                  </span>
                  <span className="text-[13px] text-cream/65 tabular-nums">
                    {s.from ? `từ ${vnd(s.from)}` : "Liên hệ"}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-cocoa-deep">
                    <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </PageBanner>

      <section id="danh-sach" className="bg-cream py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <SplitText
              text="Chọn liệu trình"
              accent="dành cho bạn"
              className="h-display text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]"
            />
            <p
              className="reveal max-w-sm text-[14px] leading-relaxed text-ink-soft"
              style={{ "--reveal-delay": "250ms" }}
            >
              Bấm vào từng dịch vụ để xem chi tiết quy trình, bảng giá, hình ảnh thực tế và giải đáp
              thắc mắc.
            </p>
          </div>
          <div className="mt-12 space-y-20 lg:mt-16 lg:space-y-28">
            {services.map((s, i) => (
              <ServiceRow key={s.slug} service={s} reverse={i % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      <ServicePromise />

      <CtaStrip
        title="Chưa biết chọn liệu trình nào?"
        accent="Helove tư vấn giúp bạn."
        secondary={{ label: "Gọi tư vấn", href: `tel:${siteConfig.phoneRaw}` }}
      />
    </>
  );
}
