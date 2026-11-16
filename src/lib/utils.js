// Ghép className có điều kiện: cn("a", isActive && "b") => "a b"
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Khoá/mở cuộn toàn trang (popup, lightbox, menu mobile). Đếm lồng nhau để 2 lớp khoá không mở nhầm.
let lockCount = 0;
export function lockScroll(lock) {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const html = document.documentElement;
  if (lockCount > 0) {
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    window.__lenis?.stop();
  } else {
    html.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.__lenis?.start();
  }
}

// Giá VNĐ: 299000 → "299.000đ"; null → "Liên hệ"
export const vnd = (n) => (n == null ? "Liên hệ" : `${n.toLocaleString("vi-VN")}đ`);

// Giá rút gọn: 299000 → "299K"
export const vndShort = (n) => (n == null ? "Liên hệ" : `${Math.round(n / 1000)}K`);
