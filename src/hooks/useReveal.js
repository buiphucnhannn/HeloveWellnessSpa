"use client";

import { useEffect } from "react";

/**
 * Hiệu ứng hiện khi cuộn tới cho mọi phần tử .reveal và .split (tiêu đề hiện từng chữ):
 * trồi lên + nhoè (blur) → rõ, easing expo. Chạy bằng Web Animations API → không đổi DOM, không lệch hydration.
 *
 * data-reveal: (mặc định) trồi lên | left | right | scale | wipe (lau từ trái) | arch (vòm mọc lên) | circle | none
 * --reveal-delay: trễ (ms)
 */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SHOWN = { opacity: 1, transform: "none", filter: "blur(0)" };
const FRAMES = {
  default: [{ opacity: 0, transform: "translateY(26px)", filter: "blur(6px)" }, SHOWN],
  left: [{ opacity: 0, transform: "translateX(-32px)", filter: "blur(6px)" }, SHOWN],
  right: [{ opacity: 0, transform: "translateX(32px)", filter: "blur(6px)" }, SHOWN],
  scale: [{ opacity: 0, transform: "scale(0.94)", filter: "blur(6px)" }, SHOWN],
  wipe: [
    { opacity: 1, clipPath: "inset(0 100% 0 0)" },
    { opacity: 1, clipPath: "inset(0 0 0 0)" },
  ],
  arch: [
    { opacity: 1, clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" },
    { opacity: 1, clipPath: "inset(0 0 0 0 round 999px 999px 0 0)" },
  ],
  circle: [
    { opacity: 1, clipPath: "circle(0% at 50% 50%)" },
    { opacity: 1, clipPath: "circle(75% at 50% 50%)" },
  ],
};
const DURATION = { wipe: 1100, arch: 1300, circle: 1200 };
const SPLIT_FRAMES = [
  { opacity: 0, transform: "translateY(0.35em)", filter: "blur(8px)" },
  { opacity: 1, transform: "none", filter: "blur(0)" },
];

const SELECTOR = ".reveal, .split";
const ms = (cs, name, fallback = 0) => parseFloat(cs.getPropertyValue(name)) || fallback;

function reveal(el) {
  if (el.__revealed) return;
  el.__revealed = true;
  const cs = getComputedStyle(el);

  if (el.classList.contains("split")) {
    const base = ms(cs, "--base");
    const step = ms(cs, "--step", 45);
    el.querySelectorAll(".split-unit").forEach((u, i) =>
      u.animate(SPLIT_FRAMES, {
        duration: 700,
        delay: base + i * step,
        easing: EASE,
        fill: "both",
      }),
    );
    return;
  }

  const variant = el.dataset.reveal;
  if (variant === "none") return;
  el.animate(FRAMES[variant] || FRAMES.default, {
    duration: DURATION[variant] || 1000,
    delay: ms(cs, "--reveal-delay"),
    easing: EASE,
    fill: "both",
  });
}

export default function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll(SELECTOR)].filter((el) => !el.__revealed);
    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    const watched = new WeakSet();
    const watch = (el) => {
      if (el.__revealed || watched.has(el)) return;
      watched.add(el);
      io.observe(el);
    };
    els.forEach(watch);

    // phần tử mới gắn vào DOM (chuyển trang, đổi bộ lọc…) cũng được theo dõi
    const mo = new MutationObserver((records) => {
      for (const r of records)
        for (const node of r.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches(SELECTOR)) watch(node);
          node.querySelectorAll(SELECTOR).forEach(watch);
        }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let t;
    const sweep = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.__revealed) return;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) {
          reveal(el);
          io.unobserve(el);
        }
      });
    };
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(sweep, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
