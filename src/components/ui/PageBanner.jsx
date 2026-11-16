import Pic from "@/components/ui/Pic";
import Parallax from "@/components/fx/Parallax";
import { cn } from "@/lib/utils";

/**
 * Banner đầu trang con: tối thiểu một màn hình (trần 1080px), ảnh nền trôi parallax phủ chocolate
 * (đậm bên trái cho cột chữ), khung viền vàng mảnh lồng bên trong, chỉ dẫn cuộn giữa đáy.
 * - align: "center" | "end" (dồn xuống đáy)
 * - blur: làm mờ nhẹ ảnh nền (ảnh chỉ làm không khí)
 */
export default function PageBanner({
  image,
  pos = "50% 50%",
  align = "center",
  blur = false,
  cueHref,
  cueLabel = "Khám phá",
  children,
}) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen-cap overflow-hidden bg-cocoa-deep pt-28 text-cream",
        align === "end"
          ? "items-center pb-28 md:items-end md:pb-20 lg:pb-24"
          : "items-center pb-28",
      )}
    >
      <Parallax speed={0.18} className="absolute inset-x-0 -inset-y-[14%]">
        <Pic
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          className={cn("object-cover", blur && "scale-105 blur-[2px]")}
          style={{ objectPosition: pos }}
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep/95 via-cocoa-deep/75 to-cocoa-deep/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/90 via-transparent to-cocoa-deep/55" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[720px] rounded-full bg-gold/10 blur-[140px]" />
      {/* khung vàng mảnh lồng trong (desktop) */}
      <div className="pointer-events-none absolute inset-x-6 top-24 bottom-6 hidden rounded-[2rem] border border-gold/15 lg:block" />

      <div className="relative w-full">{children}</div>

      {cueHref && (
        <a
          href={cueHref}
          aria-label={cueLabel}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-cream/70 uppercase sm:flex"
        >
          {cueLabel}
          <span className="relative h-10 w-px overflow-hidden bg-cream/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_1.8s_ease-in-out_infinite] bg-gold" />
          </span>
        </a>
      )}
    </section>
  );
}
