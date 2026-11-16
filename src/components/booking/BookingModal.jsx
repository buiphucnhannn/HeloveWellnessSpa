"use client";

import { useCallback, useEffect, useState } from "react";
import Pic from "@/components/ui/Pic";
import Logo from "@/components/ui/Logo";
import BookingForm from "./BookingForm";
import { img } from "@/data/images";
import { Check, Close } from "@/components/ui/Icons";
import { lockScroll } from "@/lib/utils";

const bullets = [
  "Gần 7 năm kinh nghiệm chăm sóc",
  "Thảo dược, tinh dầu thiên nhiên",
  "Phòng riêng ấm áp, khăn riêng từng khách",
];

/**
 * Popup đặt lịch dùng chung. Mở bằng bất kỳ phần tử nào có data-booking (giá trị = slug dịch vụ để chọn sẵn).
 */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState("");
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest("[data-booking]");
      if (!el) return;
      e.preventDefault();
      setPreset(el.getAttribute("data-booking") || "");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Đặt lịch hẹn"
    >
      <div
        className="absolute inset-0 [animation:fadeIn_.4s_ease-out_both] bg-cocoa-900/75 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative grid max-h-[calc(100svh-1.5rem)] w-full max-w-[980px] [animation:popIn_.55s_cubic-bezier(.22,1,.36,1)_both] overflow-hidden rounded-[1.75rem] bg-cream shadow-soft sm:rounded-[2rem] lg:grid-cols-[0.42fr_0.58fr]">
        <div className="relative hidden bg-cocoa-deep lg:block">
          <Pic
            src={img("050").src}
            alt=""
            fill
            sizes="420px"
            className="object-cover opacity-80"
            style={{ objectPosition: "35% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/55 to-cocoa-deep/10" />
          <div className="absolute inset-x-0 bottom-0 px-8 pt-8 pb-10 text-cream">
            <Logo className="h-12 text-[17px]" />
            <p className="mt-4 font-display text-[1.9rem] leading-tight">
              Dành cho mình một khoảng lặng.
            </p>
            <ul className="mt-4 space-y-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-cream/85">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-lenis-prevent
          className="relative no-scrollbar overflow-y-auto overscroll-contain px-5 pt-6 pb-5 sm:px-9 sm:py-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="absolute top-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition hover:bg-cocoa/5 hover:text-ink sm:top-4 sm:right-4"
          >
            <Close className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="label">Đặt lịch hẹn</p>
            <h3 className="mt-3 font-display text-[1.8rem] leading-tight text-ink sm:mt-4 sm:text-[2.5rem]">
              Bạn muốn ghé Helove
              <br />
              <em className="text-accent-deep">khi nào?</em>
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
              Để lại thông tin, Helove sẽ giữ phòng và kỹ thuật viên phù hợp, xác nhận lại với bạn
              qua điện thoại hoặc Zalo.
            </p>
          </div>
          <div className="mt-5 sm:mt-6">
            <BookingForm key={preset} preset={preset} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
