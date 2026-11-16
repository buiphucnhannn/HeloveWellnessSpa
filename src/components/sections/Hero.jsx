"use client";

import { useEffect, useRef, useState } from "react";
import { cn, vndShort } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Pic from "@/components/ui/Pic";
import { siteConfig } from "@/config/site";
import { offers } from "@/data/offers";
import { img } from "@/data/images";
import { ArrowRight, Sparkle } from "@/components/ui/Icons";

const golden = offers.find((o) => o.id === "gio-vang");

/**
 * Hero: MỘT ảnh full-bleed chiếm trọn màn hình đầu, ảnh trôi chậm khi cuộn (parallax), chữ mờ dần.
 * Dưới trái: nhãn + tiêu đề serif 2 dòng (dòng 2 nghiêng ánh kim) + slogan + dòng thông tin.
 * Trên phải: mô tả + nút. Dưới phải: thẻ kính "Ưu đãi Giờ vàng". Mép phải: slogan dọc. Giữa đáy: chỉ dẫn cuộn.
 */
export default function Hero() {
  const [ready, setReady] = useState(false);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const on = () => setReady(true);
    const already = document.documentElement.classList.contains("is-ready");
    const fallback = setTimeout(on, already ? 0 : 4000);
    window.addEventListener("helove:ready", on);
    return () => {
      window.removeEventListener("helove:ready", on);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = Math.min(window.scrollY, vh * 1.2);
      if (imgRef.current)
        imgRef.current.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0)`;
      if (textRef.current) textRef.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.6)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const settle = [setTimeout(update, 120), setTimeout(update, 600)];
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("helove:ready", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("helove:ready", update);
      settle.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const anim = (cls) => (ready ? cls : "opacity-0");

  return (
    <section
      id="top"
      data-scroll-offset="0"
      className="relative flex min-h-screen-cap flex-col overflow-hidden bg-cocoa-deep"
    >
      <div
        ref={imgRef}
        className={cn(
          "absolute inset-0 will-change-transform",
          ready ? "[animation:heroIn_1.4s_cubic-bezier(.22,1,.36,1)_both]" : "opacity-0",
        )}
      >
        <Pic
          src={img("148").src}
          alt="Khách hàng thư giãn với liệu trình massage lưng tại Helove Wellness Spa"
          fill
          preload
          sizes="100vw"
          className="animate-kenburns object-cover"
          style={{ objectPosition: "72% 40%" }}
        />
      </div>
      {/* phủ chocolate: đậm ở đáy và bên trái (cột chữ), giữ vùng mặt khách sáng */}
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/85 via-cocoa-deep/15 to-cocoa-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep/70 via-cocoa-deep/10 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[620px] rounded-full bg-cocoa-deep/70 blur-[90px]" />

      <div
        ref={textRef}
        className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-28 pb-10 sm:px-8 md:justify-end md:pt-[min(20rem,42svh)] md:pb-12 lg:px-12 lg:pb-14"
      >
        {/* Trên phải: mô tả + nút */}
        <div
          className={cn(
            "absolute top-28 right-5 hidden max-w-[270px] text-right sm:right-8 md:block lg:top-32 lg:right-12 lg:max-w-[310px]",
            anim("[animation:fadeUp_.9s_.77s_both]"),
          )}
        >
          <p className="text-[14px] leading-relaxed text-cream/90 text-legible">
            Massage body, trị liệu cổ vai gáy, mặt ngọc diện chẩn — chăm sóc cơ thể bằng đôi tay tận
            tâm ngay tại Thới An.
          </p>
          <Button data-booking variant="light" className="mt-5">
            Đặt lịch ngay
          </Button>
        </div>

        {/* Dưới phải: thẻ kính ưu đãi Giờ vàng → cuộn tới Ưu đãi */}
        <a
          href="#uu-dai"
          className={cn(
            "group absolute right-5 bottom-10 hidden w-[310px] overflow-hidden rounded-[1.4rem] border border-gold/30 bg-cocoa-deep/35 p-5 text-cream backdrop-blur-md transition hover:border-gold/60 hover:bg-cocoa-deep/45 sm:right-8 sm:bottom-12 md:block lg:right-12 lg:bottom-14",
            anim("[animation:fadeUp_.9s_.95s_both]"),
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-gold/15 to-transparent"
          />
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
              <Sparkle className="h-3 w-3" /> Ưu đãi giờ vàng
            </p>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-cocoa-deep transition-transform group-hover:-rotate-45">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-3 font-display text-[1.35rem] leading-tight">{golden.title}</p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-gilded font-display text-[2.6rem] leading-none">
              {vndShort(golden.price)}
            </span>
            <span className="text-sm text-cream/55 line-through">{vndShort(golden.original)}</span>
          </div>
          <p className="mt-2 text-[12px] text-cream/70">{golden.note}</p>
        </a>

        {/* Dưới trái: tiêu đề */}
        <div className="max-w-3xl">
          <p
            className={cn(
              "mb-5 flex items-center gap-3 text-[11px] font-medium tracking-[0.25em] text-gold-soft/90 uppercase text-legible",
              anim("[animation:fadeUp_.9s_.3s_both]"),
            )}
          >
            <span className="h-px w-10 bg-gold/70" />
            Massage & Wellness · Thới An
          </p>
          <h1
            className={cn(
              "h-display text-[3.3rem] leading-[0.98] text-cream sm:text-[4.6rem] lg:text-[clamp(4rem,9.5vh,6.2rem)]",
              anim("[animation:fadeUp_1s_.42s_both]"),
            )}
          >
            Chạm thư thái,
            <br />
            <em className="text-gilded pr-2 italic">nuôi dưỡng an yên</em>
          </h1>
          <p
            className={cn(
              "mt-4 font-display text-lg text-cream/85 italic text-legible sm:text-xl",
              anim("[animation:fadeUp_.9s_.66s_both]"),
            )}
          >
            {siteConfig.slogan}.
          </p>
          <div
            className={cn(
              "mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-cream/85 text-legible",
              anim("[animation:fadeUp_.9s_.8s_both]"),
            )}
          >
            <span className="flex items-center gap-2">
              <span className="font-display text-2xl leading-none text-gold">
                {siteConfig.experienceYears}+
              </span>
              năm kinh nghiệm chăm sóc
            </span>
            <span className="hidden h-4 w-px bg-cream/30 sm:block" />
            <span>{siteConfig.hoursShort}</span>
          </div>
          <div
            className={cn(
              "mt-7 flex flex-wrap gap-3 md:hidden",
              anim("[animation:fadeUp_.9s_.9s_both]"),
            )}
          >
            <Button data-booking variant="gold">
              Đặt lịch ngay
            </Button>
            <Button href="#uu-dai" variant="light">
              Ưu đãi
            </Button>
          </div>
        </div>
      </div>

      {/* slogan dọc mép phải (desktop rộng) */}
      <p
        aria-hidden
        className={cn(
          "absolute top-1/2 right-4 hidden -translate-y-1/2 items-center gap-4 font-display text-sm tracking-[0.3em] text-cream/55 italic [writing-mode:vertical-rl] xl:flex",
          anim("[animation:fadeIn_.9s_1.2s_both]"),
        )}
      >
        <span className="h-12 w-px bg-gold/50" />
        {siteConfig.slogan}
        <span className="h-12 w-px bg-gold/50" />
      </p>

      <a
        href="#gioi-thieu"
        aria-label="Cuộn xuống"
        className={cn(
          "absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-cream/70 uppercase lg:flex",
          anim("[animation:fadeIn_.9s_1.1s_both]"),
        )}
      >
        Cuộn xuống
        <span className="relative h-10 w-px overflow-hidden bg-cream/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_1.8s_ease-in-out_infinite] bg-gold" />
        </span>
      </a>
    </section>
  );
}
