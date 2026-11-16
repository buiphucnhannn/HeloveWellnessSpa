import { cn } from "@/lib/utils";
import SplitText from "@/components/fx/SplitText";

/**
 * Tiêu đề: nhãn nhỏ có vạch vàng → serif lớn, phần cuối in nghiêng màu đồng → mô tả.
 * Nhãn trồi lên, tiêu đề hiện TỪNG CHỮ blur-in, mô tả trồi lên sau.
 */
export default function SectionHeading({
  label,
  title,
  accent,
  desc,
  align = "left",
  light = false,
  size = "md",
  breakBeforeAccent = false,
  className = "",
}) {
  const sizes = {
    sm: "text-[2.3rem] sm:text-[2.8rem]",
    md: "text-[2.6rem] sm:text-[3.4rem] lg:text-[3.9rem]",
    lg: "text-[3rem] sm:text-[4rem] lg:text-[4.6rem]",
  };
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {label && (
        <p
          className={cn(
            "reveal mb-4 flex items-center gap-3 label",
            align === "center" && "justify-center",
            light && "text-gold/80",
          )}
        >
          <span className={cn("h-px w-8", light ? "bg-gold/60" : "bg-accent/60")} />
          {label}
          {align === "center" && (
            <span className={cn("h-px w-8", light ? "bg-gold/60" : "bg-accent/60")} />
          )}
        </p>
      )}
      <SplitText
        text={title}
        accent={accent}
        breakBeforeAccent={breakBeforeAccent}
        accentClass={cn("italic", light ? "text-gold" : "text-accent-deep")}
        className={cn("h-display", sizes[size], light && "text-cream")}
      />
      {desc && (
        <p
          className={cn(
            "reveal mt-5 text-[15px] leading-relaxed text-ink-soft",
            light && "text-cream/70",
          )}
          style={{ "--reveal-delay": "250ms" }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
