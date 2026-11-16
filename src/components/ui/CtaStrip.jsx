import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SplitText from "@/components/fx/SplitText";
import { siteConfig } from "@/config/site";

/**
 * Dải mời đặt lịch cuối trang con: nền chocolate, vòm logo chìm làm hoạ tiết, tiêu đề hiện từng chữ, nút trồi lên.
 * preset = slug dịch vụ chọn sẵn trong popup. secondary: { label, href } nút phụ dạng chữ.
 */
export default function CtaStrip({ title, accent, preset = "", secondary }) {
  return (
    <section className="relative overflow-hidden bg-cocoa py-16 text-cream lg:py-20">
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={756}
        height={935}
        sizes="320px"
        className="pointer-events-none absolute top-1/2 -right-10 w-[260px] -translate-y-1/2 opacity-[0.07] lg:right-24"
      />
      <Container className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="reveal mb-3 label text-gold/75">{siteConfig.slogan}</p>
          <SplitText
            text={title}
            accent={accent}
            accentClass="italic text-gold"
            className="h-display text-[2.3rem] text-cream sm:text-[3rem]"
            step={40}
          />
        </div>
        <div
          className="reveal flex shrink-0 flex-wrap items-center gap-5"
          data-reveal="right"
          style={{ "--reveal-delay": "300ms" }}
        >
          <Button data-booking={preset} variant="gold">
            Đặt lịch ngay
          </Button>
          {secondary && (
            <Button
              href={secondary.href}
              variant="ghost"
              className="!text-cream/85 hover:!text-cream"
            >
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
