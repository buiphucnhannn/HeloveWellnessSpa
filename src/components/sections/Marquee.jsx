import { Sparkle } from "@/components/ui/Icons";

// Dải chữ chạy dưới hero: nền chocolate, chữ xen kẽ serif nghiêng / sans viết hoa, ngăn cách bằng ✦ vàng.
const items = [
  "Massage body",
  "Trị liệu cổ vai gáy",
  "Mặt ngọc diện chẩn",
  "Trị liệu chuyên sâu",
  "Chườm thảo dược",
  "Đá nóng",
  "Giác hơi",
  "Good health in loving hands",
];

export default function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee overflow-hidden border-y border-gold/15 bg-cocoa py-4" aria-hidden>
      <div className="marquee-track items-center" style={{ "--marquee-duration": "60s" }}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span
              className={
                i % 2
                  ? "font-display text-[1.35rem] text-gold-soft/90 italic sm:text-[1.5rem]"
                  : "text-[13px] font-medium tracking-[0.24em] text-cream/75 uppercase sm:text-sm"
              }
            >
              {item}
            </span>
            <Sparkle className="mx-7 h-3 w-3 text-gold sm:mx-10" />
          </span>
        ))}
      </div>
    </div>
  );
}
