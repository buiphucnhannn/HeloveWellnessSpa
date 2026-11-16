import { about } from "@/data/about";
import { img } from "@/data/images";
import { siteConfig } from "@/config/site";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import Parallax from "@/components/fx/Parallax";
import SplitText from "@/components/fx/SplitText";

/**
 * Giới thiệu, gọn một màn hình, ít khung — dựa vào chữ, đường kẻ mảnh và khoảng trắng:
 * - Trái: ảnh vòm (chiều cao co theo màn hình) + viền vòm vàng lệch phía sau, ảnh tròn nhỏ đè góc,
 *   chú thích "7+ năm" dạng chữ dọc theo mép ảnh.
 * - Phải: nhãn → tiêu đề → đoạn ngắn → 4 giá trị 2 cột ngăn bằng đường kẻ → câu trích · nút.
 */
export default function About() {
  return (
    <section id="gioi-thieu" className="overflow-hidden bg-cream py-16 lg:py-[min(8vh,5rem)]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 xl:gap-24">
        {/* Cụm ảnh */}
        <div className="relative mx-auto aspect-[5/6] w-full max-w-[440px] lg:h-[min(64svh,580px)] lg:w-auto lg:max-w-full">
          <div className="absolute top-0 right-0 h-[90%] w-[80%]">
            <div className="absolute inset-0 translate-x-4 -translate-y-4 rounded-t-full border border-accent/35" />
            <div
              className="reveal relative h-full overflow-hidden rounded-t-full bg-cream-200 shadow-soft"
              data-reveal="arch"
            >
              <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[8%]">
                <Pic
                  src={img("178").src}
                  alt="Phòng trị liệu riêng tư tại Helove Wellness Spa"
                  fill
                  sizes="(min-width: 1024px) 400px, 80vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 55%" }}
                />
              </Parallax>
            </div>
          </div>
          <div
            className="reveal absolute bottom-0 left-0 aspect-square w-[38%] overflow-hidden rounded-full ring-8 ring-cream"
            data-reveal="circle"
            style={{ "--reveal-delay": "300ms" }}
          >
            <Pic
              src={img("136").src}
              alt="Trà thảo mộc mời khách sau liệu trình"
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
          {/* chú thích chữ ở khoảng trống bên trái ảnh (không khung) */}
          <div className="reveal absolute top-[10%] left-0" style={{ "--reveal-delay": "450ms" }}>
            <p className="font-display text-[3.2rem] leading-none text-accent-deep">
              {siteConfig.experienceYears}+
            </p>
            <p className="mt-2 label text-[10px] leading-relaxed">
              năm
              <br />
              đồng hành
            </p>
            <span className="mt-3 block h-px w-10 bg-accent/50" />
          </div>
        </div>

        {/* Nội dung */}
        <div>
          <p className="reveal mb-4 flex items-center gap-3 label">
            <span className="h-px w-8 bg-accent/60" /> Về Helove
          </p>
          <SplitText
            text="Đôi tay yêu thương,"
            accent="sức khỏe trọn vẹn"
            breakBeforeAccent
            className="h-display text-[2.5rem] sm:text-[3rem] lg:text-[clamp(2.6rem,6.2vh,3.4rem)]"
          />
          <p
            className="reveal mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft"
            style={{ "--reveal-delay": "120ms" }}
          >
            {about.desc}
          </p>

          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {about.values.map((v, i) => (
              <li
                key={v.title}
                className="reveal flex gap-4 border-t border-cocoa/10 py-3.5"
                style={{ "--reveal-delay": `${200 + i * 70}ms` }}
              >
                <span className="pt-0.5 font-display text-[1.05rem] text-accent italic tabular-nums">
                  0{i + 1}
                </span>
                <span>
                  <span className="block font-display text-[1.2rem] leading-tight text-ink">
                    {v.title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">
                    {v.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div
            className="reveal mt-4 flex flex-col gap-5 border-t border-cocoa/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
            style={{ "--reveal-delay": "480ms" }}
          >
            <p className="font-display text-[1.3rem] leading-snug text-ink-soft italic">
              “{about.quote}”
            </p>
            <Button href="/dich-vu" variant="solid" className="shrink-0 self-start sm:self-auto">
              Khám phá liệu trình
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
