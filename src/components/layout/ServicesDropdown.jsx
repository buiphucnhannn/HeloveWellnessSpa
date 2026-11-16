"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { img } from "@/data/images";
import { cn, vnd } from "@/lib/utils";
import Pic from "@/components/ui/Pic";

/**
 * Nút "Dịch vụ" + bảng chọn thả xuống, căn giữa dưới nút (chạm mép màn hình thì đẩy vào trong, mũi nhọn vẫn trỏ đúng nút).
 * Mở khi rê chuột / focus; đóng trễ 150ms khi rời chuột; Esc để đóng. Lưới 3×2 thẻ: ảnh + tên + mô tả + giá từ.
 */
const PANEL_W = 720;
const EDGE = 16;

export default function ServicesDropdown({ item, linkClass, underlineClass, active }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const wrapRef = useRef(null);
  const [shift, setShift] = useState(0);
  const show = () => {
    clearTimeout(timer.current);
    const r = wrapRef.current?.getBoundingClientRect();
    if (r) {
      const half = PANEL_W / 2;
      const center = r.left + r.width / 2;
      const max = window.innerWidth - EDGE;
      setShift(
        center + half > max
          ? max - (center + half)
          : center - half < EDGE
            ? EDGE - (center - half)
            : 0,
      );
    }
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 150);
  };
  const close = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hide()}
    >
      <Link
        href={item.href}
        onClick={close}
        className={cn(linkClass, "inline-flex items-center gap-1.5")}
        aria-haspopup="true"
        aria-expanded={open}
        aria-current={active ? "true" : undefined}
      >
        {item.label}
        <svg
          viewBox="0 0 12 12"
          className={cn("h-2.5 w-2.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        >
          <path
            d="M2 4.5 6 8l4-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={cn(underlineClass, (active || open) && "scale-x-100")} />
      </Link>

      <div
        className={cn(
          "absolute top-full left-1/2 z-50 pt-5 transition-[opacity,translate,visibility] duration-300 ease-out",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
        style={{ width: PANEL_W, marginLeft: -PANEL_W / 2 + shift }}
      >
        <div className="relative rounded-2xl border border-gold/20 bg-cream p-3 text-ink shadow-[0_30px_70px_-20px_rgba(26,15,9,0.6)]">
          <span
            aria-hidden
            className="absolute -top-1.5 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] border-t border-l border-gold/20 bg-cream"
            style={{ left: PANEL_W / 2 - shift }}
          />
          <ul className="relative grid grid-cols-3 gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/dich-vu/${s.slug}`}
                  onClick={close}
                  className="group flex flex-col rounded-xl p-2 transition-colors hover:bg-sand/60"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-t-[999px] rounded-b-lg bg-cream-200">
                    <Pic
                      src={img(s.cover).src}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: s.pos }}
                    />
                  </span>
                  <span className="mt-2.5 px-0.5 font-display text-[1.12rem] leading-tight text-ink transition-colors group-hover:text-accent-deep">
                    {s.title}
                  </span>
                  <span className="mt-0.5 flex items-baseline justify-between gap-2 px-0.5 text-[11.5px] text-ink-muted">
                    <span>{s.short}</span>
                    <span className="shrink-0 font-medium text-accent-deep">
                      {s.from ? `từ ${vnd(s.from)}` : "Liên hệ"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
