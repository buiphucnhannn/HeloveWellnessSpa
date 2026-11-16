import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <section className="bg-cocoa-deep pt-24">
      <Container className="flex min-h-[80vh] flex-col items-center justify-center py-16 text-center text-cream">
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={756}
          height={935}
          sizes="80px"
          className="w-16 opacity-80"
        />
        <p className="mt-6 text-gilded font-display text-[7rem] leading-none italic">404</p>
        <h1 className="mt-2 font-display text-3xl">Không tìm thấy trang</h1>
        <p className="mt-3 max-w-sm text-sm text-cream/65">
          Đường dẫn có thể đã thay đổi. Cùng quay về trang chủ để tiếp tục thư giãn nhé.
        </p>
        <Button href="/" variant="gold" className="mt-8">
          Về trang chủ
        </Button>
      </Container>
    </section>
  );
}
