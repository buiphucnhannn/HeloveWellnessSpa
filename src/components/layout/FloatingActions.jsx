"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowUp, Calendar, Phone } from "@/components/ui/Icons";

// Logo Zalo: nền xanh thương hiệu + chữ "Zalo" trắng (nhận diện đúng kênh)
function ZaloLogo({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="24" fill="#0068FF" />
      <text
        x="24"
        y="29.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="14.5"
        fontWeight="800"
        fontFamily="Arial, Helvetica, sans-serif"
        letterSpacing="-0.3"
      >
        Zalo
      </text>
    </svg>
  );
}

// Logo Messenger chính thức (bong bóng gradient + tia chớp trắng)
function MessengerLogo({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="msg-grad" cx="19%" cy="99%" r="108%">
          <stop offset="0" stopColor="#0099FF" />
          <stop offset="0.6" stopColor="#A033FF" />
          <stop offset="0.9" stopColor="#FF5280" />
          <stop offset="1" stopColor="#FF7061" />
        </radialGradient>
      </defs>
      <rect width="48" height="48" rx="24" fill="url(#msg-grad)" />
      <path
        fill="#fff"
        d="M24 10.5c-7.6 0-13.5 5.57-13.5 13.09 0 3.93 1.61 7.33 4.24 9.68.22.2.35.47.36.77l.07 2.4c.03.76.82 1.26 1.52.95l2.68-1.18c.23-.1.48-.12.72-.06 1.23.34 2.54.52 3.91.52 7.6 0 13.5-5.57 13.5-13.09S31.6 10.5 24 10.5zm8.1 10.08-3.96 6.29c-.63 1-1.98 1.25-2.93.54l-3.15-2.36a.81.81 0 0 0-.97 0l-4.26 3.23c-.57.43-1.31-.25-.93-.85l3.96-6.29c.63-1 1.98-1.25 2.93-.54l3.15 2.36c.29.22.69.22.97 0l4.26-3.23c.57-.43 1.31.25.93.85z"
      />
    </svg>
  );
}

// Icon nút chính: bong bóng chat có 3 chấm
function ChatIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3.5 20.5l1.45-4.6A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.6" />
    </svg>
  );
}

/**
 * Nút liên hệ nổi DUY NHẤT (góc phải dưới, mọi kích thước màn hình) — hiện sau khi cuộn qua nửa banner.
 * Phía trên là nút "Lên đầu trang" đứng riêng. Bấm nút chính → bung danh sách: Zalo · Messenger · Gọi · Đặt lịch, kèm nhãn chữ.
 * Bấm bất kỳ đâu (kể cả lớp phủ mờ) hoặc phím Esc để đóng.
 */
export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const visible = window.scrollY > window.innerHeight * 0.5;
      setShow(visible);
      if (!visible) setOpen(false); // widget ẩn (về lại banner) → đóng menu
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // đóng khi bấm bất kỳ đâu ngoài nút chính / Esc / khi ẩn widget
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.querySelector("[data-fab-toggle]")?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const items = [
    {
      key: "zalo",
      label: "Nhắn Zalo",
      as: "a",
      props: { href: siteConfig.zalo, target: "_blank", rel: "noopener noreferrer" },
      icon: <ZaloLogo className="h-full w-full" />,
    },
    {
      key: "messenger",
      label: "Nhắn Messenger",
      as: "a",
      props: { href: siteConfig.messenger, target: "_blank", rel: "noopener noreferrer" },
      icon: <MessengerLogo className="h-full w-full" />,
    },
    {
      key: "call",
      label: `Gọi ${siteConfig.phone}`,
      as: "a",
      props: { href: `tel:${siteConfig.phoneRaw}` },
      icon: (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-[#2fb45a] text-white">
          <Phone className="h-5 w-5" />
        </span>
      ),
    },
    {
      key: "book",
      label: "Đặt lịch hẹn",
      as: "button",
      props: { type: "button", "data-booking": "" },
      icon: (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-cocoa text-gold">
          <Calendar className="h-5 w-5" />
        </span>
      ),
    },
  ];

  return (
    <>
      {/* lớp phủ mờ khi mở — bấm vào là đóng */}
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-cocoa-900/30 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        ref={rootRef}
        className={cn(
          "fixed edge-right bottom-4 z-40 flex flex-col items-end transition-all duration-500 sm:bottom-5",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        {/* Nút lên đầu trang — đứng riêng, chỉ hiện khi không ở đầu trang; ẩn đi khi menu đang mở */}
        <button
          type="button"
          onClick={toTop}
          aria-label="Lên đầu trang"
          tabIndex={open ? -1 : 0}
          className={cn(
            "mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cocoa/10 bg-cream/90 text-cocoa shadow-card backdrop-blur-md transition-all duration-300 hover:bg-cocoa hover:text-gold",
            open && "pointer-events-none scale-90 opacity-0",
          )}
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        <div className="relative">
          <ul
            className={cn(
              "absolute right-0 bottom-full mb-3 flex flex-col items-end gap-2.5",
              !open && "pointer-events-none",
            )}
            aria-hidden={!open}
          >
            {items.map((it, i) => {
              const Tag = it.as;
              // mục trên cùng xuất hiện sau cùng khi mở (bung từ dưới lên), đóng thì ngược lại
              const delay = open ? (items.length - 1 - i) * 45 : i * 25;
              return (
                <li
                  key={it.key}
                  className={cn(
                    "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                    open
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-4 scale-90 opacity-0",
                  )}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <Tag
                    {...it.props}
                    tabIndex={open ? 0 : -1}
                    onClick={(e) => {
                      it.props.onClick?.(e);
                      setOpen(false);
                    }}
                    className="group flex items-center gap-3"
                  >
                    <span className="rounded-full bg-cream px-3.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap text-ink shadow-card transition group-hover:bg-white">
                      {it.label}
                    </span>
                    <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-soft transition-transform duration-300 group-hover:scale-105">
                      {it.icon}
                    </span>
                  </Tag>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            data-fab-toggle
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-accent text-cocoa-deep shadow-[0_14px_34px_-10px_rgba(168,115,63,0.8)] transition hover:brightness-105"
          >
            {!open && (
              <span
                className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/50"
                aria-hidden
              />
            )}
            <span className={cn("relative transition-transform duration-300", open && "rotate-90")}>
              {open ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <ChatIcon className="h-6 w-6" />
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
