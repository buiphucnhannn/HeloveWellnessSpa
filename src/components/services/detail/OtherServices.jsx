import Link from "next/link";
import { img } from "@/data/images";
import { vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import { ArrowRight } from "@/components/ui/Icons";
import SplitText from "@/components/fx/SplitText";

/**
 * Các dịch vụ khác: thẻ ảnh dọc đầu bo vòm, số thứ tự nghiêng, tên + giá dưới, vòng mũi tên vàng.
 */
export default function OtherServices({ items }) {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <Container>
        <div className="flex items-center justify-between gap-6">
          <SplitText
            text="Kết hợp"
            accent="cùng"
            className="h-display text-[2.4rem] sm:text-[3rem]"
          />
          <Link
            href="/dich-vu"
            className="reveal group inline-flex items-center gap-2 text-[13px] font-medium text-ink"
            style={{ "--reveal-delay": "250ms" }}
          >
            Tất cả dịch vụ
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:mt-12 lg:grid-cols-5">
          {items.map((s, i) => (
            <li
              key={s.slug}
              className={`reveal ${i === 4 ? "hidden md:block" : ""}`}
              style={{ "--reveal-delay": `${i * 70}ms` }}
            >
              <Link
                href={`/dich-vu/${s.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-cream-200"
              >
                <Pic
                  src={img(s.cover).src}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: s.pos }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/85 via-transparent to-transparent" />
                <span className="absolute inset-x-4 bottom-4 pr-10 text-cream">
                  <span className="block font-display text-sm text-gold italic">{s.n}</span>
                  <span className="block font-display text-[1.3rem] leading-tight">{s.title}</span>
                  <span className="mt-1 block text-[12px] text-cream/75">
                    {s.from ? `từ ${vnd(s.from)}` : "Liên hệ"}
                  </span>
                </span>
                <span className="absolute right-3 bottom-4 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-cocoa-deep transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
