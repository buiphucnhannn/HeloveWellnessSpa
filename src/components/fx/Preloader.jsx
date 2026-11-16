"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/**
 * Màn chào: nền chocolate, logo vàng đồng hiện dần (mờ → rõ, nhích lên, quầng sáng toả), vạch vàng chạy dưới logo,
 * rồi cả màn mờ đi. Phát sự kiện "helove:ready" + class is-ready trên <html> để Hero mở màn đúng lúc.
 */
const SHOW_MS = 1200;
const LEAVE_MS = 600;

export default function Preloader() {
  const [state, setState] = useState("show");

  useEffect(() => {
    const t1 = setTimeout(() => {
      setState("leave");
      document.documentElement.classList.add("is-ready");
      window.dispatchEvent(new Event("helove:ready"));
    }, SHOW_MS);
    const t2 = setTimeout(() => setState("done"), SHOW_MS + LEAVE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-cocoa-deep transition-[opacity,transform] duration-[600ms] ease-out",
        state === "leave" ? "scale-[1.03] opacity-0" : "opacity-100",
      )}
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 [animation:glowIn_1s_ease-out_both] rounded-full bg-gold/15 blur-[120px]" />
      <div className="relative flex [animation:logoIn_.9s_cubic-bezier(.22,1,.36,1)_both] flex-col items-center">
        <Logo variant="full" className="w-44 sm:w-56" sizes="240px" />
        <span className="mt-6 h-px w-28 origin-left [animation:lineGrow_1s_.3s_cubic-bezier(.22,1,.36,1)_both] bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </div>
  );
}
