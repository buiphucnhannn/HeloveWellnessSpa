import { offers } from "@/data/offers";
import { cn, vnd } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { ArrowRight, Gift, Phone } from "@/components/ui/Icons";

/**
 * Chương trình ưu đãi: nền chocolate, 4 "vé voucher" — phần trên (nhãn, tên, điều kiện), đường xé răng cưa
 * có khía tròn hai bên, phần dưới (giá ánh kim, giá gốc gạch, nút nhận ưu đãi). Vé nổi bật nền vàng đồng.
 */
export default function Offers() {
  return (
    <section
      id="uu-dai"
      data-scroll-offset="40"
      className="relative overflow-hidden bg-cocoa-deep py-20 text-cream lg:py-24"
    >
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[460px] w-[760px] rounded-full bg-gold/10 blur-[140px]" />
      <Container className="relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading light label="Ưu đãi" title="Quà nhỏ cho" accent="lần ghé đầu tiên" />
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="reveal inline-flex items-center gap-3 text-[13px] text-cream/75 transition hover:text-cream"
            style={{ "--reveal-delay": "150ms" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Phone className="h-4 w-4" />
            </span>
            <span>
              Hỏi nhanh ưu đãi hôm nay
              <span className="block font-display text-xl text-cream">{siteConfig.phone}</span>
            </span>
          </a>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {offers.map((o, i) => {
            const hot = o.featured;
            const save = Math.round((1 - o.price / o.original) * 100);
            return (
              <li key={o.id} className="reveal" style={{ "--reveal-delay": `${i * 90}ms` }}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.5rem] transition-transform duration-500 hover:-translate-y-1.5",
                    hot
                      ? "bg-gradient-to-br from-[#e6c78a] via-gold to-accent text-cocoa-deep shadow-[0_30px_60px_-25px_rgba(214,177,110,0.6)]"
                      : "border border-gold/20 bg-cocoa/60 text-cream",
                  )}
                >
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-3 pt-[5px] pb-1 text-[10.5px] leading-[1.5] font-semibold tracking-[0.14em] uppercase",
                          hot ? "bg-cocoa-deep text-gold" : "bg-gold/15 text-gold",
                        )}
                      >
                        {o.badge}
                      </span>
                      <span
                        className={cn(
                          "font-display text-lg italic",
                          hot ? "text-cocoa" : "text-gold/80",
                        )}
                      >
                        -{save}%
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.65rem] leading-tight">{o.title}</h3>
                    <p
                      className={cn(
                        "mt-2 text-[13px] leading-relaxed",
                        hot ? "text-cocoa/80" : "text-cream/65",
                      )}
                    >
                      {o.note}
                    </p>
                  </div>

                  {/* đường xé: vạch đứt + 2 khía tròn cùng màu nền section */}
                  <div className="relative h-0">
                    <span className="absolute top-1/2 -left-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-cocoa-deep" />
                    <span className="absolute top-1/2 -right-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-cocoa-deep" />
                    <span
                      className={cn(
                        "absolute inset-x-5 top-0 border-t border-dashed",
                        hot ? "border-cocoa/35" : "border-gold/30",
                      )}
                    />
                  </div>

                  <div className="p-6 pt-5">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={cn(
                          "font-display text-[2.6rem] leading-none",
                          hot ? "text-cocoa-deep" : "text-gilded",
                        )}
                      >
                        {vnd(o.price)}
                      </span>
                    </div>
                    <p className={cn("mt-1 text-[12px]", hot ? "text-cocoa/70" : "text-cream/50")}>
                      Giá gốc <span className="line-through">{vnd(o.original)}</span> {o.unit}
                    </p>
                    <p
                      className={cn(
                        "mt-3 flex items-center gap-2 text-[12px]",
                        hot ? "text-cocoa/80" : "text-cream/60",
                      )}
                    >
                      <Gift className="h-3.5 w-3.5 shrink-0" /> {o.terms}
                    </p>
                    <button
                      type="button"
                      data-booking={o.service}
                      className={cn(
                        "group mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[13px] font-semibold transition",
                        hot
                          ? "bg-cocoa-deep text-gold hover:bg-cocoa"
                          : "border border-gold/40 text-gold hover:bg-gold hover:text-cocoa-deep",
                      )}
                    >
                      Nhận ưu đãi
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="reveal mt-8 text-center text-[12px] text-cream/45">
          Ưu đãi có thể thay đổi theo từng thời điểm — vui lòng liên hệ để được xác nhận trước khi
          đến.
        </p>
      </Container>
    </section>
  );
}
