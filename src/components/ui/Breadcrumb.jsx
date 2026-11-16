import Link from "next/link";
import { Fragment } from "react";

// Đường dẫn "Trang chủ / Dịch vụ / …" — mục cuối là trang hiện tại (không có href).
export default function Breadcrumb({ items, className = "", style }) {
  return (
    <nav aria-label="Breadcrumb" className={`label text-cream/55 ${className}`} style={style}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <span className="mx-2 text-gold/60">/</span>}
          {item.href ? (
            <Link href={item.href} className="transition hover:text-cream">
              {item.label}
            </Link>
          ) : (
            <span className="text-cream/90" aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
