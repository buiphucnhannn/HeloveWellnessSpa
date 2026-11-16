import { img } from "@/data/images";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Button from "@/components/ui/Button";
import SplitText from "@/components/fx/SplitText";

/**
 * Ảnh thực tế của dịch vụ: lưới 4 cột × 2 hàng lấp kín — ảnh lớn 2×2 bo vòm, 2 ảnh vuông + 1 ảnh ngang.
 */
export default function DetailGallery({ service: s }) {
  const [a, b, c, d, e] = s.photos;
  const tiles = [
    {
      id: e,
      cls: "col-span-2 row-span-2 rounded-t-[999px]",
      sizes: "(min-width: 1024px) 50vw, 100vw",
    },
    { id: c, cls: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
    { id: d, cls: "", sizes: "(min-width: 1024px) 25vw, 50vw" },
    { id: b ?? a, cls: "col-span-2", sizes: "(min-width: 1024px) 50vw, 100vw" },
  ];
  return (
    <section className="bg-cream py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SplitText
            text="Hình ảnh"
            accent="thực tế"
            className="h-display text-[2.6rem] sm:text-[3.4rem]"
          />
          <div
            className="reveal flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            style={{ "--reveal-delay": "250ms" }}
          >
            <p className="max-w-xs text-[14px] leading-relaxed text-ink-soft">
              Khoảnh khắc thật trong các buổi {s.title.toLowerCase()} tại Helove.
            </p>
            <Button href="/thu-vien">Xem thư viện</Button>
          </div>
        </div>
        <ul className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[230px] lg:mt-12 lg:auto-rows-[min(26vh,260px)] lg:grid-cols-4">
          {tiles.map((t, i) => (
            <li
              key={t.id + i}
              className={`reveal relative overflow-hidden rounded-2xl bg-cream-200 ${t.cls}`}
              data-reveal="scale"
              style={{ "--reveal-delay": `${i * 80}ms` }}
            >
              <Pic
                src={img(t.id).src}
                alt={`${s.title} tại Helove Wellness Spa`}
                fill
                sizes={t.sizes}
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
