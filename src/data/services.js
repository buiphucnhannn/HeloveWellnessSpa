// NGUỒN DỮ LIỆU DUY NHẤT cho dịch vụ: trang chủ, dropdown header, /dich-vu và /dich-vu/[slug].
// Thêm dịch vụ = thêm 1 object cùng cấu trúc → trang chi tiết tự sinh.
// Giá lấy từ poster Fanpage (ảnh 112: bảng giá, 069: combo 90 phút, 128: diện chẩn).
// TODO: FAQ, quy trình là nội dung mẫu soạn theo dịch vụ — khách xác nhận.
//
// Cấu trúc: n, slug, title, tagline, short, desc, cover (ảnh thẻ), pos, from (VNĐ, null = Liên hệ), duration,
//   intro, highlights[4], menu[{ name, price, duration?, note?, featured? }], steps[4]{title, desc},
//   goodToKnow[3], faqs[{q, a}], photos[5] (id ảnh: [0] banner, [1] giới thiệu, [2..4] thư viện)

export const services = [
  {
    n: "01",
    slug: "massage-body-thu-gian",
    title: "Massage body thư giãn",
    tagline: "thả lỏng từng thớ cơ",
    short: "Toàn thân 90 phút",
    desc: "Liệu trình toàn thân với tinh dầu ấm, nhịp tay đều và sâu — giải toả mệt mỏi, giúp cơ thể nhẹ nhõm và ngủ ngon hơn.",
    cover: "044",
    pos: "50% 40%",
    from: 398000,
    duration: "90 phút",
    intro:
      "Massage body tại Helove bắt đầu bằng vài phút trò chuyện để kỹ thuật viên hiểu vùng cơ đang mỏi và lực tay bạn thích. Sau đó là chuỗi động tác xoa, miết, day ấn trên lưng, vai, tay và chân với tinh dầu thiên nhiên — chậm rãi, đều đặn, để cơ thể thật sự được nghỉ ngơi.",
    highlights: [
      "Tinh dầu thiên nhiên, khăn sạch riêng từng khách",
      "Lực tay điều chỉnh theo cảm nhận của bạn",
      "Phòng riêng ấm, ánh sáng dịu, nhạc thư giãn",
      "Trà nóng thảo mộc sau liệu trình",
    ],
    menu: [
      {
        name: "Massage toàn thân",
        price: 398000,
        duration: "90 phút",
        note: "Lưng · vai · tay · chân",
        featured: true,
      },
      {
        name: "Combo chăm sóc toàn thân 5 bước",
        price: 399000,
        duration: "90 phút",
        note: "Kèm chườm thảo dược & đá nóng",
      },
    ],
    steps: [
      { title: "Lắng nghe", desc: "Hỏi nhanh về vùng đau mỏi, lực tay và tình trạng sức khoẻ." },
      { title: "Làm ấm cơ thể", desc: "Xoa dầu ấm, miết dài giúp cơ mềm và máu lưu thông." },
      {
        title: "Day ấn chuyên sâu",
        desc: "Tập trung lưng, vai gáy và bắp chân — nơi tích tụ căng cứng.",
      },
      {
        title: "Thả lỏng & thư giãn",
        desc: "Động tác nhẹ để kết thúc, nghỉ ngơi cùng tách trà ấm.",
      },
    ],
    goodToKnow: [
      "Nên đến trước 5–10 phút để thay đồ và thư giãn.",
      "Báo kỹ thuật viên nếu bạn đang mang thai, có bệnh lý hoặc chấn thương.",
      "Hạn chế ăn quá no ngay trước khi massage.",
    ],
    faqs: [
      {
        q: "Massage body có đau không?",
        a: "Không. Lực tay được điều chỉnh liên tục theo cảm nhận của bạn — từ nhẹ nhàng thư giãn đến sâu hơn ở vùng cơ căng.",
      },
      {
        q: "Bao lâu nên massage một lần?",
        a: "Để duy trì cơ thể nhẹ nhõm, nhiều khách chọn 1–2 lần mỗi tuần hoặc theo liệu trình định kỳ.",
      },
      {
        q: "Tôi có cần đặt lịch trước không?",
        a: "Nên đặt trước để Helove giữ phòng và kỹ thuật viên phù hợp cho bạn, nhất là buổi tối và cuối tuần.",
      },
    ],
    photos: ["045", "050", "026", "014", "117"],
  },
  {
    n: "02",
    slug: "tri-lieu-co-vai-gay",
    title: "Trị liệu cổ vai gáy",
    tagline: "gỡ rối những ngày căng",
    short: "Chăm sóc cơ thể 60 phút",
    desc: "Dành cho dân văn phòng, người ngồi nhiều: day ấn huyệt và kéo giãn nhẹ nhàng vùng cổ – vai – gáy, giảm cảm giác nặng mỏi.",
    cover: "060",
    pos: "50% 45%",
    from: 299000,
    duration: "60 phút",
    intro:
      "Ngồi máy tính nhiều giờ khiến cổ vai gáy co cứng, kéo theo đau đầu và mất ngủ. Liệu trình tập trung xử lý các điểm tắc nghẽn bằng kỹ thuật day ấn huyệt, miết cơ và kéo giãn nhẹ, kết hợp chườm ấm để cơ thư giãn sâu.",
    highlights: [
      "Tập trung vùng cổ, vai, gáy và bả vai",
      "Day ấn huyệt kết hợp kéo giãn nhẹ nhàng",
      "Chườm ấm giúp cơ mềm, dễ chịu",
      "Phù hợp người ngồi văn phòng, lái xe nhiều",
    ],
    menu: [
      { name: "Massage cổ vai gáy", price: 299000, duration: "60 phút", featured: true },
      {
        name: "Diện chẩn khuôn mặt (gói ưu đãi)",
        price: 99000,
        duration: "60 phút",
        note: "Cổ vai gáy · tay · diện chẩn · đầu mặt",
      },
    ],
    steps: [
      { title: "Kiểm tra vùng mỏi", desc: "Xác định điểm co cứng ở cổ, vai và bả vai." },
      { title: "Làm ấm & mềm cơ", desc: "Xoa dầu ấm, miết nhẹ để cơ sẵn sàng." },
      { title: "Day ấn huyệt", desc: "Tác động các huyệt vùng cổ gáy, kéo giãn nhẹ nhàng." },
      { title: "Chườm ấm thư giãn", desc: "Chườm ấm và massage đầu nhẹ để kết thúc." },
    ],
    goodToKnow: [
      "Mặc áo thoải mái để dễ thao tác vùng cổ vai.",
      "Uống một ly nước ấm sau liệu trình.",
      "Có thể kết hợp với mặt ngọc diện chẩn trong cùng buổi.",
    ],
    faqs: [
      {
        q: "Một buổi có giảm mỏi ngay không?",
        a: "Đa số khách cảm thấy cổ vai nhẹ hơn ngay sau buổi đầu. Với tình trạng lâu ngày, nên duy trì theo liệu trình.",
      },
      {
        q: "Trị liệu có phù hợp người lớn tuổi?",
        a: "Có. Kỹ thuật viên sẽ điều chỉnh lực tay nhẹ nhàng, phù hợp thể trạng từng người.",
      },
      {
        q: "Có thay thế điều trị y khoa không?",
        a: "Không. Liệu trình mang tính thư giãn, hỗ trợ — nếu đau kéo dài, bạn nên thăm khám bác sĩ.",
      },
    ],
    photos: ["060", "002", "096", "119", "118"],
  },
  {
    n: "03",
    slug: "mat-ngoc-dien-chan",
    title: "Mặt ngọc diện chẩn",
    tagline: "đánh thức khả năng tự cân bằng",
    short: "Diện chẩn khuôn mặt 60 phút",
    desc: "Tác động lên các điểm phản chiếu trên khuôn mặt bằng dụng cụ chuyên dụng, kết hợp massage đầu – mặt giúp thư thái và tỉnh táo.",
    cover: "009",
    pos: "50% 35%",
    from: 299000,
    duration: "60 phút",
    intro:
      "Diện chẩn là phương pháp tác động lên các huyệt trên khuôn mặt bằng cây lăn, que dò chuyên dụng. Tại Helove, liệu trình được kết hợp massage cổ vai gáy, massage tay và massage đầu mặt chuyên sâu — mang lại cảm giác nhẹ đầu, thư thái và dễ ngủ.",
    highlights: [
      "Dụng cụ diện chẩn chuyên dụng, vệ sinh kỹ",
      "Kết hợp massage đầu – mặt chuyên sâu",
      "Massage cổ vai gáy và tay đi kèm",
      "Giúp thư thái, tinh thần nhẹ nhõm",
    ],
    menu: [
      { name: "Mặt ngọc diện chẩn", price: 299000, duration: "60 phút", featured: true },
      {
        name: "Diện chẩn khuôn mặt (gói ưu đãi)",
        price: 99000,
        duration: "60 phút",
        note: "Áp dụng theo chương trình ưu đãi",
      },
    ],
    steps: [
      {
        title: "Làm sạch & thư giãn",
        desc: "Làm sạch khuôn mặt, massage nhẹ vùng trán và thái dương.",
      },
      { title: "Diện chẩn", desc: "Dùng cây lăn, que dò tác động các điểm trên khuôn mặt." },
      { title: "Massage đầu – mặt", desc: "Day ấn chuyên sâu vùng đầu, mặt giúp nhẹ đầu." },
      { title: "Cổ vai & tay", desc: "Kết thúc bằng massage cổ vai gáy và tay." },
    ],
    goodToKnow: [
      "Nên tẩy trang trước hoặc báo để kỹ thuật viên hỗ trợ.",
      "Phù hợp người hay đau đầu, khó ngủ, căng thẳng.",
      "Báo trước nếu da mặt đang kích ứng.",
    ],
    faqs: [
      {
        q: "Diện chẩn có đau không?",
        a: "Cảm giác hơi tê nhẹ ở một số điểm, kỹ thuật viên luôn điều chỉnh lực theo phản hồi của bạn.",
      },
      {
        q: "Bao lâu nên làm một lần?",
        a: "Có thể làm 1–2 lần mỗi tuần để duy trì cảm giác thư thái.",
      },
      {
        q: "Có kết hợp với massage body được không?",
        a: "Được — bạn có thể đặt liên tiếp hai dịch vụ trong một lần ghé.",
      },
    ],
    photos: ["009", "033", "037", "114", "177"],
  },
  {
    n: "04",
    slug: "massage-tri-lieu-chuyen-sau",
    title: "Massage trị liệu chuyên sâu",
    tagline: "chạm đúng nơi cơ thể cần",
    short: "Liệu trình 120 phút",
    desc: "120 phút tập trung vào các nhóm cơ căng cứng với kỹ thuật ép cơ, kéo giãn và đi tay lực đầm — dành cho người mệt mỏi kéo dài.",
    cover: "046",
    pos: "50% 30%",
    from: 498000,
    duration: "120 phút",
    intro:
      "Khi cơ thể mệt mỏi lâu ngày, một buổi massage thông thường chưa đủ. Liệu trình chuyên sâu dành nhiều thời gian hơn cho từng vùng: tìm điểm tắc nghẽn, ép cơ, kéo giãn nhẹ nhàng và đi tay với lực đầm được điều chỉnh phù hợp từng người.",
    highlights: [
      "Thời lượng 120 phút, không vội vàng",
      "Kỹ thuật ép cơ, kéo giãn nhẹ nhàng",
      "Tập trung lưng, hông, bắp chân và vai",
      "Kỹ thuật viên nhiều kinh nghiệm thực hiện",
    ],
    menu: [
      { name: "Massage trị liệu chuyên sâu", price: 498000, duration: "120 phút", featured: true },
    ],
    steps: [
      {
        title: "Đánh giá thể trạng",
        desc: "Trao đổi về vùng đau mỏi, thói quen sinh hoạt và mong muốn.",
      },
      { title: "Khởi động làm nóng", desc: "Làm ấm toàn thân để cơ sẵn sàng cho kỹ thuật sâu." },
      { title: "Xử lý vùng tắc nghẽn", desc: "Ép cơ, kéo giãn và day ấn tập trung từng nhóm cơ." },
      { title: "Cân bằng & phục hồi", desc: "Động tác nhẹ nhàng giúp cơ thể thả lỏng, phục hồi." },
    ],
    goodToKnow: [
      "Dành trọn 2 giờ để không phải vội vàng.",
      "Uống nhiều nước sau liệu trình.",
      "Báo kỹ thuật viên nếu có chấn thương cũ.",
    ],
    faqs: [
      {
        q: "Khác gì massage body thông thường?",
        a: "Thời lượng dài hơn và tập trung xử lý vùng cơ căng cứng bằng kỹ thuật chuyên sâu, thay vì chỉ thư giãn toàn thân.",
      },
      {
        q: "Sau buổi có bị đau cơ không?",
        a: "Có thể hơi ê nhẹ ở vùng được xử lý sâu, thường hết sau 1 ngày.",
      },
      {
        q: "Ai không nên làm?",
        a: "Phụ nữ mang thai, người có bệnh lý tim mạch, huyết áp chưa ổn định nên hỏi ý kiến bác sĩ trước.",
      },
    ],
    photos: ["046", "121", "058", "053", "048"],
  },
  {
    n: "05",
    slug: "combo-cham-soc-toan-than-90-phut",
    title: "Combo toàn thân 90 phút",
    tagline: "năm bước chuyên sâu",
    short: "Thảo dược & đá nóng",
    desc: "Năm bước liền mạch: làm nóng cơ thể, massage vùng căng mỏi, ép cơ kéo giãn, đi tay lực đầm và kết thúc bằng chườm thảo dược, đá nóng.",
    cover: "094",
    pos: "40% 50%",
    from: 399000,
    duration: "90 phút",
    intro:
      "Combo được thiết kế cho người muốn chăm sóc toàn diện trong một lần ghé. Năm bước nối tiếp nhau giúp cơ thể ấm dần, các nhóm cơ được xử lý kỹ và kết thúc bằng chườm thảo dược, đá nóng — ấm áp và thư thái.",
    highlights: [
      "5 bước chuyên sâu trong 90 phút",
      "Chườm túi thảo dược ấm",
      "Đá nóng (hot stone) làm ấm cơ sâu",
      "Ưu đãi Giờ vàng cho khách lần đầu",
    ],
    menu: [
      {
        name: "Combo chăm sóc toàn thân 5 bước",
        price: 399000,
        duration: "90 phút",
        featured: true,
      },
      {
        name: "Giờ vàng — khách lần đầu",
        price: 269000,
        duration: "90 phút",
        note: "9h–15h · Thứ 2 – Thứ 6",
      },
    ],
    steps: [
      { title: "Khởi động làm nóng", desc: "Làm nóng cơ thể, giúp máu lưu thông." },
      { title: "Massage vùng căng mỏi", desc: "Tập trung các vùng cơ đang căng mỏi." },
      {
        title: "Ép cơ, kéo giãn",
        desc: "Xử lý vùng tắc nghẽn với kỹ thuật ép cơ, kéo giãn nhẹ nhàng.",
      },
      {
        title: "Chườm thảo dược & đá nóng",
        desc: "Đi tay lực đầm, kết thúc bằng chườm ấm thảo dược và đá nóng.",
      },
    ],
    goodToKnow: [
      "Giờ vàng 269.000đ áp dụng 9h–15h, Thứ 2 – Thứ 6, cho khách trải nghiệm lần đầu.",
      "Thảo dược được chuẩn bị mới mỗi ngày.",
      "Báo trước nếu da nhạy cảm với nhiệt.",
    ],
    faqs: [
      {
        q: "Combo khác massage toàn thân thế nào?",
        a: "Combo có thêm chườm thảo dược và đá nóng, đi theo 5 bước chuyên sâu nên cơ thể được làm ấm và thư giãn sâu hơn.",
      },
      {
        q: "Ưu đãi Giờ vàng áp dụng thế nào?",
        a: "Giá 269.000đ (gốc 399.000đ) cho khách lần đầu, khung 9h–15h từ Thứ 2 đến Thứ 6.",
      },
      {
        q: "Đá nóng có an toàn không?",
        a: "Đá được làm nóng ở nhiệt độ vừa phải và kiểm tra trước khi đặt lên cơ thể.",
      },
    ],
    photos: ["094", "109", "166", "115", "051"],
  },
  {
    n: "06",
    slug: "goi-cham-soc-suc-khoe",
    title: "Gói chăm sóc sức khỏe",
    tagline: "liệu pháp cổ truyền bổ trợ",
    short: "Giác hơi · ấn huyệt chân",
    desc: "Các liệu pháp bổ trợ theo nhu cầu: giác hơi, bấm huyệt bàn chân, chườm thảo dược, gội đầu dưỡng sinh — tư vấn gói phù hợp cho bạn.",
    cover: "030",
    pos: "50% 35%",
    from: null,
    duration: "Theo gói",
    intro:
      "Bên cạnh các liệu trình chính, Helove có những liệu pháp cổ truyền bổ trợ giúp cơ thể cân bằng: giác hơi, bấm huyệt bàn chân, chườm thảo dược, gội đầu dưỡng sinh. Kỹ thuật viên sẽ tư vấn kết hợp phù hợp với thể trạng và thời gian của bạn.",
    highlights: [
      "Giác hơi theo phương pháp cổ truyền",
      "Bấm huyệt bàn chân thư giãn",
      "Gội đầu dưỡng sinh thảo dược",
      "Tư vấn gói theo nhu cầu từng người",
    ],
    // TODO: khách chưa công bố giá các gói bổ trợ
    menu: [
      { name: "Giác hơi", price: null, note: "Kết hợp cùng massage body" },
      { name: "Bấm huyệt bàn chân", price: null },
      { name: "Gội đầu dưỡng sinh", price: null },
      { name: "Chườm thảo dược", price: null },
    ],
    steps: [
      { title: "Tư vấn", desc: "Lắng nghe nhu cầu và thể trạng để chọn liệu pháp." },
      { title: "Chuẩn bị", desc: "Chuẩn bị thảo dược, dụng cụ sạch riêng cho bạn." },
      { title: "Thực hiện", desc: "Kỹ thuật viên thực hiện nhẹ nhàng, đúng kỹ thuật." },
      { title: "Hướng dẫn", desc: "Gợi ý cách chăm sóc tại nhà sau liệu trình." },
    ],
    goodToKnow: [
      "Giác hơi có thể để lại vết hồng tạm thời, tự mờ sau vài ngày.",
      "Không nên tắm nước lạnh ngay sau giác hơi.",
      "Gọi hoặc nhắn Zalo để được báo giá gói phù hợp.",
    ],
    faqs: [
      {
        q: "Giác hơi có để lại vết không?",
        a: "Có thể để lại vết hồng tạm thời, thường mờ sau 3–7 ngày tuỳ cơ địa.",
      },
      {
        q: "Có thể kết hợp nhiều liệu pháp?",
        a: "Được. Kỹ thuật viên sẽ gợi ý thứ tự hợp lý trong một buổi.",
      },
      {
        q: "Giá các gói bao nhiêu?",
        a: "Tuỳ liệu pháp và thời lượng — vui lòng gọi hoặc nhắn Zalo để được tư vấn chi tiết.",
      },
    ],
    photos: ["030", "095", "083", "097", "061"],
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
