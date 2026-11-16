import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import Parallax from "@/components/fx/Parallax";
import { img } from "@/data/images";
import { Sparkle } from "@/components/ui/Icons";

const promises = [
  "Gần 7 năm kinh nghiệm",
  "Liệu trình cá nhân hoá",
  "Thảo dược tự nhiên",
  "Phòng riêng ấm áp",
];

/**
 * Dải ảnh full-bleed: ảnh phòng trị liệu trôi parallax phủ chocolate, khung viền vàng lồng trong,
 * câu tuyên ngôn serif lớn có từ nghiêng ánh kim + hàng cam kết, nút đặt lịch.
 */
export default function Band() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-cocoa-deep py-24 text-center text-cream lg:min-h-[min(72svh,740px)]">
      <Parallax speed={0.14} className="absolute inset-x-0 -inset-y-[14%]">
        <Pic
          src={img("180").src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 55%" }}
        />
      </Parallax>
      <div className="absolute inset-0 bg-cocoa-deep/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(26,15,9,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-gold/25 sm:inset-8" />

      <div className="reveal relative mx-auto max-w-5xl px-6">
        <p className="flex items-center justify-center gap-3 label text-gold/80">
          <Sparkle className="h-3 w-3" /> Lời hứa của Helove <Sparkle className="h-3 w-3" />
        </p>
        <p className="mt-6 font-display text-[2rem] leading-[1.28] text-legible sm:text-[2.8rem] lg:text-[3.3rem]">
          Mỗi liệu trình là một <em className="text-gilded italic">khoảng lặng</em> để cơ thể được{" "}
          nghỉ ngơi và <em className="text-gilded italic">tinh thần an yên</em>
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {promises.map((p) => (
            <li
              key={p}
              className="rounded-full border border-gold/30 bg-cocoa-deep/40 px-4 py-2 text-[12.5px] text-cream/85 backdrop-blur-sm"
            >
              {p}
            </li>
          ))}
        </ul>
        <Button data-booking variant="gold" className="mt-9">
          Đặt lịch trải nghiệm
        </Button>
      </div>
    </section>
  );
}
