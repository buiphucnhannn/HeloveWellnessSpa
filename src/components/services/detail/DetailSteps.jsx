import Container from "@/components/ui/Container";
import SplitText from "@/components/fx/SplitText";

/**
 * Quy trình 4 bước: nền chocolate, số trong vòm (arch) viền vàng, đường nối giữa các bước.
 */
export default function DetailSteps({ service: s }) {
  return (
    <section className="relative overflow-hidden bg-cocoa-deep py-20 text-cream lg:py-24">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <Container className="relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SplitText
            text="Quy trình"
            accent="liệu trình"
            accentClass="italic text-gold"
            className="h-display text-[2.6rem] text-cream sm:text-[3.4rem]"
          />
          <p
            className="reveal max-w-sm text-[14px] leading-relaxed text-cream/65"
            style={{ "--reveal-delay": "250ms" }}
          >
            Bốn bước nhẹ nhàng, cẩn thận — đây là những gì diễn ra trong buổi chăm sóc của bạn.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          <span
            aria-hidden
            className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent lg:block"
          />
          {s.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal relative text-center"
              style={{ "--reveal-delay": `${i * 110}ms` }}
            >
              <span className="relative mx-auto flex h-20 w-16 items-center justify-center rounded-t-full rounded-b-lg border border-gold/35 bg-cocoa-deep font-display text-2xl text-gold italic">
                0{i + 1}
              </span>
              <p className="mt-6 label text-[10px] text-cream/45">Bước {i + 1}</p>
              <h3 className="mt-2 font-display text-[1.55rem] italic">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-[260px] text-[13.5px] leading-relaxed text-cream/65">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
