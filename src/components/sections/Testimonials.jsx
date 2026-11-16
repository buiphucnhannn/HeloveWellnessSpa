"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronLeft, ChevronRight, Quote, Star } from "@/components/ui/Icons";

const INTERVAL = 6500;

/**
 * Cảm nhận khách hàng, gọn một màn hình:
 * - Trái: ảnh vòm (co theo chiều cao màn hình) đổi theo từng cảm nhận, chuyển mờ dần; viền vòm vàng lệch phía sau.
 *   Ảnh do spa tự chụp, không dùng ảnh stock và không lộ mặt khách.
 * - Phải: tiêu đề → trích dẫn serif nghiêng → tên · dịch vụ · sao → một hàng điều khiển (trước/sau · vạch tiến độ · số).
 * Tự chuyển mỗi 6.5s, dừng khi rê chuột.
 */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const barRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % total), INTERVAL);
    const anim = barRef.current?.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: INTERVAL,
      easing: "linear",
      fill: "forwards",
    });
    return () => {
      clearTimeout(t);
      anim?.cancel();
    };
  }, [i, paused, total]);

  const go = (n) => setI((n + total) % total);
  const t = testimonials[i];

  return (
    <section id="cam-nhan" className="overflow-hidden bg-cream py-16 lg:py-[min(8vh,5rem)]">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        {/* Ảnh đổi theo cảm nhận */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[400px] lg:h-[min(60svh,540px)] lg:w-auto lg:max-w-full">
          <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-t-full border border-accent/35" />
          <div
            className="reveal relative h-full overflow-hidden rounded-t-full bg-cream-200 shadow-soft"
            data-reveal="arch"
          >
            {testimonials.map((x, k) => (
              <Pic
                key={x.name}
                src={img(x.photo).src}
                alt={k === i ? `Liệu trình ${x.meta.split("·").pop().trim()} tại Helove` : ""}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)]",
                  k === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                )}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/60 via-transparent to-transparent" />
            <p
              key={i}
              className="absolute inset-x-0 bottom-5 [animation:quoteIn_.7s_cubic-bezier(.22,1,.36,1)_both] text-center font-display text-lg text-cream italic"
            >
              {t.meta.split("·").pop().trim()}
            </p>
          </div>
        </div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <SectionHeading
            label="Cảm nhận"
            title="Khách hàng"
            accent="nói về Helove"
            className="lg:[&_h2]:text-[clamp(2.6rem,6.2vh,3.4rem)]"
          />

          <figure className="mt-7 min-h-[230px] sm:min-h-[200px]">
            <Quote className="h-8 w-8 text-gold" />
            <blockquote
              key={i}
              className="mt-4 [animation:quoteIn_.7s_cubic-bezier(.22,1,.36,1)_both] font-display text-[1.45rem] leading-[1.4] text-ink italic sm:text-[1.7rem]"
              aria-live="polite"
            >
              {t.quote}
            </blockquote>
            <figcaption
              key={`c${i}`}
              className="mt-5 flex [animation:quoteIn_.7s_.1s_cubic-bezier(.22,1,.36,1)_both] flex-wrap items-center gap-x-4 gap-y-1"
            >
              <span className="text-[15px] font-semibold text-ink">{t.name}</span>
              <span className="h-3.5 w-px bg-cocoa/20" />
              <span className="text-[13px] text-ink-muted">{t.meta}</span>
              <span className="flex text-gold">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5" />
                ))}
              </span>
            </figcaption>
          </figure>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Cảm nhận trước"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 text-ink transition hover:border-cocoa hover:bg-cocoa hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Cảm nhận tiếp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 text-ink transition hover:border-cocoa hover:bg-cocoa hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="relative mx-2 h-px flex-1 bg-cocoa/15">
              <span ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-accent" />
            </span>
            <span className="font-display text-lg text-ink tabular-nums">
              {String(i + 1).padStart(2, "0")}
              <span className="text-ink-muted"> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
