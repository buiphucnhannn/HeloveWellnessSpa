import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Logo thật của khách (tách nền từ ảnh 186 → PNG trong suốt, vàng đồng):
 * - variant "full": logo đứng (vòm HL + HELOVE + slogan) — màn chào, popup, footer.
 * - variant "inline": vòm HL + chữ "HELOVE / Wellness Spa" dàn ngang — header (chữ dựng bằng font nên luôn sắc nét).
 */
export default function Logo({
  variant = "inline",
  className = "",
  sizes = "240px",
  tone = "gold",
}) {
  if (variant === "full") {
    return (
      <span className={cn("relative block aspect-[1420/1439]", className)}>
        <Image
          src="/brand/logo-gold.png"
          alt={siteConfig.name}
          fill
          sizes={sizes}
          quality={90}
          loading="eager"
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative block aspect-[756/935] h-full">
        <Image
          src="/brand/logo-mark.png"
          alt=""
          fill
          sizes="64px"
          quality={90}
          loading="eager"
          className="object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35em] font-medium tracking-[0.32em]",
            tone === "gold" ? "text-gilded" : "text-ink",
          )}
        >
          HELOVE
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5em] font-medium tracking-[0.42em] uppercase",
            tone === "gold" ? "text-gold/85" : "text-ink-muted",
          )}
        >
          Wellness Spa
        </span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </span>
  );
}
