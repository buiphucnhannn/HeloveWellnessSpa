import { about } from "@/data/about";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import { Leaf, Sparkle } from "@/components/ui/Icons";

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};
const Shield = ({ className }) => (
  <svg {...svg} className={className}>
    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const Home = ({ className }) => (
  <svg {...svg} className={className}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.5z" />
  </svg>
);
const icons = [Shield, Sparkle, Leaf, Home];

/**
 * ServicePromise — Cam kết của Helove (trang /dich-vu): nền kem thoáng.
 * Trái: ảnh sảnh thật bo góc lớn + ảnh vòm nhỏ đè góc + chú thích "7+ năm".
 * Phải: tiêu đề, đoạn ngắn, 4 cam kết dạng danh sách — icon viền vàng mảnh, tên serif, mô tả, đường kẻ ngăn.
 */
export default function ServicePromise() {
  return (
    <section className="overflow-hidden bg-cream-100 py-20 lg:py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="relative pr-10 pb-12 sm:pr-16">
          <div
            className="reveal relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream-200 shadow-soft"
            data-reveal="wipe"
          >
            <Pic
              src={img("157").src}
              alt="Sảnh đón khách tại Helove Wellness Spa"
              fill
              sizes="(min-width: 1024px) 44vw, 90vw"
              className="object-cover"
            />
          </div>
          <div
            className="reveal absolute right-0 bottom-0 h-[52%] w-[34%] overflow-hidden rounded-t-full ring-8 ring-cream-100"
            data-reveal="arch"
            style={{ "--reveal-delay": "250ms" }}
          >
            <Pic src={img("166").src} alt="" fill sizes="240px" className="object-cover" />
          </div>
          <div
            className="reveal absolute top-5 left-5 rounded-2xl bg-cocoa-deep/85 px-5 py-3 text-cream backdrop-blur-md"
            style={{ "--reveal-delay": "400ms" }}
          >
            <span className="text-gilded font-display text-[2rem] leading-none">
              {siteConfig.experienceYears}+
            </span>
            <span className="ml-2 text-[12px] text-cream/75">năm chăm sóc tận tâm</span>
          </div>
        </div>

        <div>
          <p className="reveal mb-4 flex items-center gap-3 label">
            <span className="h-px w-8 bg-accent/60" /> Cam kết
          </p>
          <SplitText
            text="Điều Helove"
            accent="luôn giữ vững"
            className="h-display text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem]"
          />
          <p
            className="reveal mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft"
            style={{ "--reveal-delay": "120ms" }}
          >
            Mỗi lần bạn ghé, chúng tôi đều giữ những nguyên tắc nhỏ này — để sự thư giãn trọn vẹn và
            an tâm.
          </p>

          <ul className="mt-8 border-t border-cocoa/10">
            {about.values.map((p, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={p.title}
                  className="reveal flex items-start gap-5 border-b border-cocoa/10 py-5"
                  style={{ "--reveal-delay": `${180 + i * 80}ms` }}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/60 text-accent-deep">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-[1.4rem] leading-tight text-ink">
                        {p.title}
                      </span>
                      <span className="font-display text-sm text-accent/70 italic">0{i + 1}</span>
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-ink-muted">
                      {p.desc}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
