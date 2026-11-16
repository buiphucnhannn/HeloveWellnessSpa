import { vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Clock } from "@/components/ui/Icons";
import SplitText from "@/components/fx/SplitText";

/**
 * Bảng giá riêng của dịch vụ: trái (sticky) tiêu đề + "Lưu ý nhỏ"; phải danh sách typographic tên · ghi chú · thời lượng · giá.
 */
export default function DetailMenu({ service: s }) {
  return (
    <section id="bang-gia-dich-vu" className="scroll-mt-20 bg-cream-100 py-20 lg:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <p className="reveal flex items-center gap-3 label">
            <span className="h-px w-8 bg-accent/60" /> Bảng giá
          </p>
          <SplitText
            text="Chọn gói"
            accent="phù hợp"
            className="mt-4 h-display text-[2.6rem] sm:text-[3.4rem]"
          />
          <p
            className="reveal mt-5 max-w-sm text-[14px] leading-relaxed text-ink-soft"
            style={{ "--reveal-delay": "140ms" }}
          >
            Giá niêm yết đã bao gồm tinh dầu, khăn sạch và trà thảo mộc sau liệu trình.
          </p>

          <div
            className="reveal mt-10 rounded-2xl border-l-2 border-gold bg-cream/70 p-5"
            style={{ "--reveal-delay": "200ms" }}
          >
            <p className="font-display text-xl text-ink italic">Lưu ý nhỏ</p>
            <ul className="mt-3 space-y-2.5">
              {s.goodToKnow.map((tip) => (
                <li key={tip} className="text-[13.5px] leading-relaxed text-ink-soft">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal" data-reveal="right">
          <ul className="border-t border-cocoa/15">
            {s.menu.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-6 border-b border-cocoa/10 py-6"
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[1.6rem] leading-tight text-ink">
                    {item.name}
                    {item.featured && (
                      <span className="inline-flex items-center rounded-full bg-cocoa px-3 pt-[5px] pb-1 font-sans text-[10.5px] leading-[1.5] font-semibold tracking-[0.14em] text-gold uppercase">
                        Nổi bật
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-muted">
                    {item.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {item.duration}
                      </span>
                    )}
                    {item.note && <span>{item.note}</span>}
                  </p>
                </div>
                <p className="shrink-0 font-display text-[1.9rem] text-ink tabular-nums">
                  {vnd(item.price)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Button data-booking={s.slug} variant="solid">
              Đặt lịch {s.title.toLowerCase()}
            </Button>
            <Button href="/#bang-gia" variant="ghost">
              Bảng giá đầy đủ
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
