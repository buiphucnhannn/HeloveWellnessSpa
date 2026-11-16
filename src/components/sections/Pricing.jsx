import Link from "next/link";
import { extraPackage, priceList, signatureCombo } from "@/data/pricing";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import { vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Bảng giá gọn, ít khung — dựa vào chữ và đường kẻ mảnh:
 * - Trái: lưới 2×2 ngăn bằng đường kẻ (ảnh tròn nhỏ · tên serif · thời lượng · giá lớn · mũi tên khi hover).
 * - Phải: khối chocolate "Combo signature" cao bằng lưới (ảnh đá nóng mờ làm nền, giá ánh kim, 5 bước đánh số nghiêng).
 * - Dưới: một dòng cho gói bổ trợ (liên hệ báo giá).
 */
export default function Pricing() {
  const c = signatureCombo;
  return (
    <section id="bang-gia" className="bg-cream py-16 lg:py-[min(8vh,5rem)]">
      <Container className="w-full">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            label="Bảng giá"
            title="Giá minh bạch,"
            accent="chăm sóc tận tâm"
            className="lg:[&_h2]:text-[clamp(2.6rem,6.2vh,3.4rem)]"
          />
          <p
            className="reveal max-w-sm text-[14px] leading-relaxed text-ink-soft"
            style={{ "--reveal-delay": "120ms" }}
          >
            Giá niêm yết đã gồm tinh dầu, khăn sạch và trà thảo mộc. Không phát sinh chi phí ngoài.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* 2×2 ngăn bằng đường kẻ */}
          <ul className="grid border-t border-cocoa/12 sm:grid-cols-2">
            {priceList.map((item, i) => (
              <li
                key={item.slug}
                className="reveal border-b border-cocoa/12 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                style={{ "--reveal-delay": `${i * 80}ms` }}
              >
                <Link
                  href={`/dich-vu/${item.slug}`}
                  className="group flex h-full flex-col justify-between gap-5 py-6"
                >
                  <span className="flex items-center gap-4">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Pic
                        src={img(item.image).src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <span className="block font-display text-[1.35rem] leading-tight text-ink transition-colors group-hover:text-accent-deep">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-ink-muted">
                        {item.duration}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center justify-between">
                    <span className="font-display text-[2rem] leading-none text-ink tabular-nums">
                      {vnd(item.price)}
                    </span>
                    <ArrowRight className="h-5 w-5 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Combo signature */}
          <div
            className="reveal relative overflow-hidden rounded-[1.75rem] bg-cocoa-deep p-7 text-cream sm:p-8"
            data-reveal="right"
            style={{ "--reveal-delay": "150ms" }}
          >
            <Pic
              src={img(c.image).src}
              alt=""
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover opacity-30"
              style={{ objectPosition: "30% 50%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-cocoa-deep via-cocoa-deep/85 to-cocoa-deep/40" />

            <div className="relative flex h-full flex-col">
              <p className="label text-gold/80">Signature · {c.duration}</p>
              <p className="mt-3 font-display text-[1.9rem] leading-tight">{c.name}</p>
              <p className="mt-1 text-gilded font-display text-[2.8rem] leading-none">
                {vnd(c.price)}
              </p>

              <ol className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {c.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-baseline gap-2.5 text-[13.5px] text-cream/80"
                  >
                    <span className="font-display text-base text-gold italic">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                <Button data-booking={c.slug} variant="gold">
                  Đặt combo
                </Button>
                <Button
                  href={`/dich-vu/${c.slug}`}
                  variant="ghost"
                  className="!text-cream/80 hover:!text-cream"
                >
                  Chi tiết
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gói bổ trợ — một dòng */}
        <p
          className="reveal mt-6 text-[13.5px] text-ink-muted"
          style={{ "--reveal-delay": "200ms" }}
        >
          <Link
            href={`/dich-vu/${extraPackage.slug}`}
            className="font-display text-[1.15rem] text-ink underline-offset-4 hover:underline"
          >
            {extraPackage.name}
          </Link>{" "}
          — {extraPackage.note}. Giá theo gói, gọi{" "}
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="font-medium text-accent-deep hover:underline"
          >
            {siteConfig.phone}
          </a>{" "}
          để được báo giá.
        </p>
      </Container>
    </section>
  );
}
