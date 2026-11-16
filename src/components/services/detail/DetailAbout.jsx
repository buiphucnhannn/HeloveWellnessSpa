import { img } from "@/data/images";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import { Check } from "@/components/ui/Icons";
import SplitText from "@/components/fx/SplitText";

/**
 * Giới thiệu dịch vụ: trái cụm ảnh (ảnh dọc bo góc lớn + ảnh vòm nhỏ đè góc), phải tiêu đề + đoạn giới thiệu + 4 điểm nổi bật.
 */
export default function DetailAbout({ service: s }) {
  return (
    <section id="gioi-thieu-dich-vu" className="scroll-mt-20 bg-cream py-16 lg:py-[min(8vh,5rem)]">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative pr-10 pb-10 sm:pr-16">
          <div
            className="reveal relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream-200 lg:aspect-auto lg:h-[min(58svh,520px)]"
            data-reveal="wipe"
          >
            <Pic
              src={img(s.photos[1]).src}
              alt={`${s.title} tại Helove`}
              fill
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="object-cover"
            />
          </div>
          <div
            className="reveal absolute right-0 bottom-0 h-[46%] w-[34%] overflow-hidden rounded-t-full ring-8 ring-cream"
            data-reveal="arch"
            style={{ "--reveal-delay": "250ms" }}
          >
            <Pic src={img(s.photos[3]).src} alt="" fill sizes="240px" className="object-cover" />
          </div>
        </div>

        <div>
          <p className="reveal flex items-center gap-3 label">
            <span className="h-px w-8 bg-accent/60" /> Về liệu trình
          </p>
          <SplitText
            text="Vì sao bạn sẽ"
            accent="yêu thích"
            className="mt-4 h-display text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]"
          />
          <p
            className="reveal mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft"
            style={{ "--reveal-delay": "160ms" }}
          >
            {s.intro}
          </p>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {s.highlights.map((h, i) => (
              <li
                key={h}
                className="reveal flex gap-3 border-t border-cocoa/10 pt-4"
                style={{ "--reveal-delay": `${220 + i * 70}ms` }}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cocoa text-gold">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-[14px] text-ink">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
