"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { img } from "@/data/images";
import { cn, lockScroll } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import Pic from "@/components/ui/Pic";
import ServicesDropdown from "@/components/layout/ServicesDropdown";
import { ArrowRight, Close, Phone } from "@/components/ui/Icons";

/**
 * Header LUÔN HIỆN (fixed): logo trái · menu giữa-phải · nút Đặt lịch.
 * - Trên banner: trong suốt, cao 96px. Rời banner: thu gọn 72px, nền chocolate đặc, viền vàng mảnh đáy.
 * - Scroll-spy trên trang chủ (link "/#id"); trang riêng tô theo đường dẫn.
 * - Vạch tiến độ cuộn ánh kim ở mép dưới.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const progressRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      setScrolled(y > 80);
      let cur = "";
      if (pathname === "/") {
        for (const item of mainNav) {
          const hash = item.href.split("#")[1];
          const el = hash && document.getElementById(hash);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          const line = window.innerHeight * 0.4;
          if (r.top <= line && r.bottom > line) cur = item.href;
        }
      } else {
        cur =
          mainNav.find((item) => !item.href.includes("#") && pathname.startsWith(item.href))
            ?.href || "";
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  const link =
    "group relative py-2 text-[13px] font-medium text-cream/80 transition-colors hover:text-cream";
  const underline =
    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100";

  return (
    <header className="fixed inset-x-0 top-0 z-50 page-frame">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 border-b border-gold/15 bg-cocoa-deep shadow-[0_10px_30px_-12px_rgba(26,15,9,0.6)] transition-opacity duration-500",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      />
      <span
        ref={progressRef}
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold to-gold-soft transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "relative mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 lg:px-12",
          scrolled ? "h-[72px]" : "h-20 lg:h-24",
        )}
      >
        <Link href="/#top" aria-label={`${siteConfig.name} — về đầu trang`} className="block">
          <Logo
            className={cn(
              "logo-glow transition-[height,font-size] duration-500",
              scrolled ? "h-10 text-[15px]" : "h-11 text-[16px] lg:h-[52px] lg:text-[18px]",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Menu chính">
          {mainNav.map((item) =>
            item.dropdown ? (
              <ServicesDropdown
                key={item.href}
                item={item}
                linkClass={cn(link, active === item.href && "text-gold-soft")}
                underlineClass={underline}
                active={active === item.href}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(link, active === item.href && "text-gold-soft")}
                aria-current={active === item.href ? "true" : undefined}
              >
                {item.label}
                <span className={cn(underline, active === item.href && "scale-x-100")} />
              </Link>
            ),
          )}
          <button
            type="button"
            data-booking
            className="group ml-2 inline-flex items-center gap-3 rounded-full border border-gold/50 py-1.5 pr-1.5 pl-5 text-[13px] font-medium text-cream transition hover:border-gold hover:bg-gold/10"
          >
            Đặt lịch
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-cocoa-deep transition-transform group-hover:-rotate-45">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            data-booking
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full bg-gold px-4 text-[12px] font-semibold text-cocoa-deep transition-opacity duration-300",
              open && "pointer-events-none opacity-0",
            )}
          >
            Đặt lịch <ArrowRight className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full text-cream"
          >
            {open ? (
              <Close />
            ) : (
              <span className="flex flex-col items-end gap-[5px]">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-4 bg-gold" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          "fixed inset-0 -z-10 bg-cocoa-deep transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav
          className="relative flex h-full flex-col overflow-y-auto px-7 pt-24 pb-6"
          aria-label="Menu di động"
          data-lenis-prevent
        >
          {mainNav.map((item, i) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-gold/10 py-3 font-display text-[1.75rem] text-cream transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              >
                {item.label}
                <span className="font-sans text-xs tracking-[0.2em] text-gold/60">0{i + 1}</span>
              </Link>
              {item.dropdown && (
                <ul
                  className={cn(
                    "grid grid-cols-2 gap-x-4 gap-y-2.5 border-b border-gold/10 py-3 transition-opacity duration-500",
                    open ? "opacity-100" : "opacity-0",
                  )}
                >
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/dich-vu/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 text-[12.5px] leading-tight text-cream/75 hover:text-cream"
                      >
                        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                          <Pic
                            src={img(s.cover).src}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button
            type="button"
            data-booking
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-cocoa-deep"
          >
            Đặt lịch ngay <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-auto pt-6 text-center text-xs text-cream/55">
            {siteConfig.hoursShort}
            <br />
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="mt-1 inline-flex items-center gap-2 py-1 font-display text-2xl text-gold"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phone}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
