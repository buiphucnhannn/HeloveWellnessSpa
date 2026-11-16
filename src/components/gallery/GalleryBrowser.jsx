"use client";

import { useMemo, useState } from "react";
import { galleryCategories, galleryPhotos } from "@/data/gallery";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Lightbox from "@/components/ui/Lightbox";
import { Plus } from "@/components/ui/Icons";

const labelOf = Object.fromEntries(galleryCategories.map((c) => [c.id, c.label]));

/**
 * Bộ lọc + lưới masonry cho /thu-vien.
 * - Thanh lọc pill (kèm số ảnh mỗi nhóm). Masonry bằng CSS columns, ảnh giữ đúng tỉ lệ thật (width/height) → không nhảy layout.
 * - Hover: phủ chocolate + nhãn nhóm + tên ảnh + nút phóng to. Bấm mở lightbox theo danh sách đang lọc.
 */
export default function GalleryBrowser() {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(null);

  const counts = useMemo(() => {
    const c = { all: galleryPhotos.length };
    for (const p of galleryPhotos) c[p.category] = (c[p.category] || 0) + 1;
    return c;
  }, []);
  const shown =
    filter === "all" ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);

  return (
    <section id="anh" className="bg-cream pb-20 lg:pb-24">
      <div className="border-b border-cocoa/10 bg-cream">
        <Container className="reveal flex items-center justify-between gap-6 py-4">
          <div
            className="-mx-1 no-scrollbar flex gap-2 overflow-x-auto px-1"
            role="tablist"
            aria-label="Lọc ảnh"
          >
            {galleryCategories.map((c) => {
              const on = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300",
                    on
                      ? "border-cocoa bg-cocoa text-cream"
                      : "border-ink/15 text-ink/75 hover:border-accent hover:text-ink",
                  )}
                >
                  {c.label}
                  <span
                    className={cn("text-[11px] tabular-nums", on ? "text-gold" : "text-ink-muted")}
                  >
                    {counts[c.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="hidden shrink-0 text-[13px] text-ink-muted md:block">
            Đang xem <span className="text-ink">{shown.length}</span> ảnh
          </p>
        </Container>
      </div>

      <Container className="pt-10 lg:pt-12">
        <ul key={filter} className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3">
          {shown.map((p, i) => (
            <li
              key={p.src}
              className="[animation:fadeUp_.6s_cubic-bezier(.22,1,.36,1)_both] break-inside-avoid"
              style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Xem ảnh: ${p.alt}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-cream-200"
              >
                <Pic
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1440px) 340px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/80 via-cocoa-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-3 p-4 text-left text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span>
                    <span className="block text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                      {labelOf[p.category]}
                    </span>
                    <span className="mt-1 block font-display text-lg leading-tight italic">
                      {p.alt}
                    </span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-cocoa-deep">
                    <Plus className="h-4 w-4" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <Lightbox images={shown} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </section>
  );
}
