import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { Plus } from "@/components/ui/Icons";
import SplitText from "@/components/fx/SplitText";

/**
 * Câu hỏi thường gặp: trái tiêu đề + liên hệ nhanh, phải accordion <details> (mục đầu mở sẵn).
 */
export default function DetailFaq({ service: s }) {
  return (
    <section className="bg-cream-100 py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <div>
          <p className="reveal flex items-center gap-3 label">
            <span className="h-px w-8 bg-accent/60" /> Hỏi đáp
          </p>
          <SplitText
            text="Có thể bạn"
            accent="đang thắc mắc"
            className="mt-4 h-display text-[2.6rem] sm:text-[3.4rem]"
          />
          <p
            className="reveal mt-5 max-w-sm text-[14px] leading-relaxed text-ink-soft"
            style={{ "--reveal-delay": "250ms" }}
          >
            Chưa tìm thấy câu trả lời? Gọi hoặc nhắn Zalo cho Helove qua số{" "}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>

        <div className="reveal border-t border-cocoa/15" data-reveal="right">
          {s.faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-cocoa/10" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.4rem] text-ink">{f.q}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa/15 text-ink transition-all duration-300 group-open:rotate-45 group-open:border-cocoa group-open:bg-cocoa group-open:text-gold">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[14.5px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
