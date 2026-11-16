import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Nút viên thuốc + vòng mũi tên ở đuôi; hover có vệt sáng ánh kim lướt qua.
 * variant: outline (nền sáng) | light (trên ảnh / nền tối) | solid (chocolate, vòng vàng) | gold (vàng đồng) | ghost (chữ gạch chân)
 */
export default function Button({
  children,
  href,
  variant = "outline",
  className = "",
  external = false,
  arrow = true,
  ...rest
}) {
  const base =
    "group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full py-1.5 pr-1.5 pl-5 font-sans text-[13px] font-medium whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles = {
    outline: "border border-ink/20 text-ink hover:border-accent hover:text-accent-deep",
    light: "border border-white/55 text-white hover:border-gold hover:text-gold-soft",
    solid: "bg-cocoa text-cream shadow-[0_12px_30px_-14px_rgba(36,21,13,0.8)] hover:bg-cocoa-deep",
    gold: "bg-gradient-to-r from-accent to-[#c4955c] text-white shadow-[0_12px_30px_-14px_rgba(168,115,63,0.9)] hover:from-accent-deep hover:to-accent",
    ghost:
      "!gap-2 !overflow-visible !py-0 !pr-0 !pl-0 text-ink underline-offset-[6px] hover:underline",
  };
  const circle = {
    outline: "bg-cocoa text-gold",
    light: "bg-cream text-cocoa",
    solid: "bg-gold text-cocoa-deep",
    gold: "bg-white/20 text-white",
    ghost: "",
  };
  const cls = cn(base, styles[variant], className);
  const content = (
    <>
      {variant !== "ghost" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]"
        />
      )}
      <span>{children}</span>
      {arrow &&
        (variant === "ghost" ? (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        ) : (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45",
              circle[variant],
            )}
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        ))}
    </>
  );

  if (!href)
    return (
      <button type="button" className={cls} {...rest}>
        {content}
      </button>
    );
  if (/^(tel:|mailto:|sms:)/.test(href))
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {content}
      </a>
    );
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
