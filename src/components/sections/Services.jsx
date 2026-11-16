"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { img } from "@/data/images";
import { cn, vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Check, Clock } from "@/components/ui/Icons";

const INTERVAL = 7000;

/**
 * Dịch vụ dạng "showcase": hàng tab 6 dịch vụ (số thứ tự + tên, vạch tiến độ vàng chạy ở tab đang chọn,
 * tự chuyển sau 7s, dừng khi rê chuột); bên dưới khung trình bày — trái ảnh lớn bo góc chuyển mờ dần
 * + ảnh vòm nhỏ đè góc + nhãn giá; phải số lớn, tên, tagline nghiêng, mô tả, 4 điểm nổi bật, nút.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const barRef = useRef(null);
  const tabsRef = useRef(null);
  const s = services[active];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((v) => (v + 1) % services.length), INTERVAL);
    const anim = barRef.current?.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: INTERVAL,
      easing: "linear",
      fill: "forwards",
    });
    return () => {
      clearTimeout(t);
      anim?.cancel();
    };
  }, [active, paused]);

  // mobile: giữ tab đang chọn trong tầm nhìn của thanh cuộn ngang
  useEffect(() => {
    const bar = tabsRef.current;
    const tab = bar?.children[active];
    if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return;
    bar.scrollTo({ left: tab.offsetLeft - 20, behavior: "smooth" });
  }, [active]);

  return (
    <section id="dich-vu" className="bg-cream-100 py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading label="Liệu trình" title="Dịch vụ" accent="tại Helove" />
          <div
            className="reveal flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            style={{ "--reveal-delay": "120ms" }}
          >
            <p className="max-w-xs text-[14px] leading-relaxed text-ink-soft">
              Từ thư giãn nhẹ nhàng đến trị liệu chuyên sâu — mỗi liệu trình được điều chỉnh theo cơ
              thể của bạn.
            </p>
            <Button href="/dich-vu">Tất cả dịch vụ</Button>
          </div>
        </div>

        <div
          className="reveal mt-10 lg:mt-12"
          style={{ "--reveal-delay": "200ms" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tabs */}
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Chọn dịch vụ"
            className="-mx-5 no-scrollbar flex gap-1 overflow-x-auto border-b border-cocoa/12 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0"
          >
            {services.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="service-panel"
                  onClick={() => setActive(i)}
                  className="group relative shrink-0 pt-2 pr-6 pb-4 text-left lg:pr-4"
                >
                  <span
                    className={cn(
                      "block font-display text-sm italic transition-colors",
                      on ? "text-accent" : "text-ink-muted/70",
                    )}
                  >
                    {x.n}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-display text-[1.15rem] leading-tight whitespace-nowrap transition-colors lg:text-[1.2rem] lg:whitespace-normal",
                      on ? "text-ink" : "text-ink-muted group-hover:text-ink-soft",
                    )}
                  >
                    {x.title}
                  </span>
                  <span className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden lg:right-4">
                    {on && (
                      <span
                        ref={barRef}
                        className={cn(
                          "absolute inset-0 origin-left bg-gradient-to-r from-accent to-gold",
                          paused && "!scale-x-100",
                        )}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            id="service-panel"
            role="tabpanel"
            className="mt-10 grid items-center gap-12 lg:mt-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16"
          >
            <div className="relative pr-8 pb-10 sm:pr-14 sm:pb-12">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-cream-200 shadow-soft lg:aspect-auto lg:h-[min(46vh,500px)]">
                {services.map((x, i) => (
                  <Pic
                    key={x.slug}
                    src={img(x.cover).src}
                    alt={i === active ? x.title : ""}
                    fill
                    sizes="(min-width: 1024px) 50vw, 92vw"
                    className={cn(
                      "object-cover transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                    )}
                    style={{ objectPosition: x.pos }}
                  />
                ))}
                <span className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/45 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full bg-cream/95 px-4 py-2 text-[12.5px] text-ink shadow-card backdrop-blur">
                  {s.from ? "từ " : ""}
                  <span className="font-display text-lg text-accent-deep">{vnd(s.from)}</span>
                  <span className="mx-2 text-ink-muted">·</span>
                  {s.duration}
                </span>
              </div>
              <div className="absolute right-0 bottom-0 h-[48%] w-[32%] overflow-hidden rounded-t-full bg-cream-200 ring-8 ring-cream-100">
                {services.map((x, i) => (
                  <Pic
                    key={x.slug}
                    src={img(x.photos[1]).src}
                    alt=""
                    fill
                    sizes="260px"
                    className={cn(
                      "object-cover transition-opacity duration-700",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
            </div>

            <div key={s.slug} className="[animation:quoteIn_.7s_cubic-bezier(.22,1,.36,1)_both]">
              <p className="font-display text-[4.5rem] leading-none text-accent/25 italic">{s.n}</p>
              <h3 className="mt-2 h-display text-[2.4rem] sm:text-[3rem]">
                {s.title}
                <span className="mt-1 block text-[1.45rem] text-accent-deep italic sm:text-[1.65rem]">
                  {s.tagline}
                </span>
              </h3>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">{s.desc}</p>
              <ul className="mt-6 grid max-w-lg gap-x-6 gap-y-3 sm:grid-cols-2">
                {s.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[13.5px] text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cocoa text-gold">
                      <Check className="h-3 w-3" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cocoa/10 pt-6">
                <Button href={`/dich-vu/${s.slug}`} variant="solid">
                  Xem chi tiết
                </Button>
                <Button data-booking={s.slug} variant="ghost">
                  Đặt lịch
                </Button>
                <span className="ml-auto hidden items-center gap-1.5 text-[13px] text-ink-muted sm:flex">
                  <Clock className="h-4 w-4 text-accent" /> {s.menu.length} lựa chọn
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
