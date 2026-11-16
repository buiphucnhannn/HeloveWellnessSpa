"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Cuộn mượt toàn trang (Lenis) — chậm, có quán tính. Touch giữ cuộn native để không khựng trên điện thoại.
 * Bấm link "#section" (cùng trang) → cuộn êm tới section, chừa chỗ cho header.
 */
const CLEAR = 80; // header thu gọn 72px + khoảng thở
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const pageTop = (el) => {
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
};

function scrollToTarget(lenis, el, force = false) {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const offset = Number(el.dataset.scrollOffset ?? CLEAR);
  const s = Math.max(0, Math.min(pageTop(el) - offset, max));
  lenis.scrollTo(s, { duration: 1.8, easing: easeOutExpo, force });
}

export default function SmoothScroll() {
  const pathname = usePathname();
  const firstRoute = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 0.8,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
      easing: easeOutExpo,
      duration: 1.6,
      respectReducedMotion: false,
    });
    window.__lenis = lenis;

    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank") return;
      const href = a.getAttribute("href");
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      const path = href.slice(0, hashIdx) || window.location.pathname;
      if (path.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) return;
      const hash = href.slice(hashIdx);
      const target =
        hash === "#" || hash === "#top" ? document.body : document.querySelector(decodeURI(hash));
      if (!target) return;
      e.preventDefault();
      history.pushState(
        null,
        "",
        hash === "#" || hash === "#top" ? window.location.pathname : hash,
      );
      // menu mobile đang khoá cuộn → chờ menu đóng rồi mới cuộn
      setTimeout(() => {
        if (target === document.body)
          lenis.scrollTo(0, { duration: 1.6, easing: easeOutExpo, force: true });
        else scrollToTarget(lenis, target, true);
      }, 60);
    };
    document.addEventListener("click", onClick, true);

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true, force: true });
    let t;
    const hash = window.location.hash;
    if (hash === "#top") history.replaceState(null, "", window.location.pathname);
    else if (hash) {
      const target = document.querySelector(decodeURI(hash));
      if (target) t = setTimeout(() => scrollToTarget(lenis, target), 1500);
    }

    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Đổi trang (vd. /thu-vien → /#bang-gia): nhảy thẳng tới section khi trang mới đang mờ, không có hash → về đầu.
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    const lenis = window.__lenis;
    const jump = (y) => {
      window.scrollTo(0, y);
      lenis?.scrollTo(y, { immediate: true, force: true });
    };
    if (window.location.hash === "#top") history.replaceState(null, "", window.location.pathname);
    if (!window.location.hash) return jump(0);
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        const target = document.querySelector(decodeURI(window.location.hash));
        if (!target) return jump(0);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const offset = Number(target.dataset.scrollOffset ?? CLEAR);
        jump(Math.max(0, Math.min(pageTop(target) - offset, max)));
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
