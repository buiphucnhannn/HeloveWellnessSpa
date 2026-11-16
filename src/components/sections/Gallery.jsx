"use client";

import { useState } from "react";
import { galleryCategories, galleryHome } from "@/data/gallery";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import Button from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icons";

const labelOf = Object.fromEntries(galleryCategories.map((c) => [c.id, c.label]));

/**
 * Thư viện ảnh trang chủ: tiêu đề trái, mô tả + nút phải; lưới bento 6 cột × 4 hàng (ô lớn, ô ngang, ô dọc xen kẽ,
 * ô đầu bo vòm) — mobile 2 cột đều ô. Hover: phủ chocolate + nhãn nhóm + tên ảnh. Bấm mở lightbox.
 */
export default function Gallery() {
  const [index, setIndex] = useState(null);

  return (
    <section id="thu-vien" className="bg-cream-100 py-16 lg:py-20">
      <Container className="w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading label="Thư viện" title="Khoảnh khắc" accent="tại Helove" />
          <div
            className="reveal flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            style={{ "--reveal-delay": "120ms" }}
          >
            <p className="max-w-xs text-[14px] leading-relaxed text-ink-soft">
              Hình ảnh thật từ không gian, liệu trình và những vị khách thân quen của Helove.
            </p>
            <Button href="/thu-vien">Xem toàn bộ</Button>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:mt-12 lg:auto-rows-[min(21vh,220px)] lg:grid-cols-6 lg:gap-3">
          {galleryHome.map((p, i) => (
            <li
              key={p.src}
              className={cn("reveal", p.span)}
              data-reveal="scale"
              style={{ "--reveal-delay": `${(i % 6) * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Xem ảnh: ${p.alt}`}
                className={cn(
                  "group relative block aspect-square w-full overflow-hidden rounded-2xl bg-cream-200 lg:aspect-auto lg:h-full",
                  i === 0 && "lg:rounded-t-[999px]",
                )}
              >
                <Pic
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={
                    p.span.includes("col-span-2")
                      ? "(min-width: 1024px) 34vw, (min-width: 640px) 33vw, 50vw"
                      : "(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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

      <Lightbox
        images={galleryHome}
        index={index}
        onClose={() => setIndex(null)}
        onChange={setIndex}
      />
    </section>
  );
}
