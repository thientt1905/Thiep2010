# 💐 HƯỚNG DẪN SỬ DỤNG & TÙY BIẾN THIỆP 20/10 GỬI CRUSH ✨

Chúc mừng bạn đã có bộ mã nguồn thiệp tương tác 20/10 siêu xịn xò dành riêng cho crush!
Toàn bộ source code nằm tại thư mục:
`C:\Users\ASUS\.gemini\antigravity\scratch\thiep-20-10\`

---

## 🚀 1. Cách Mở & Xem Thử Ngay Lập Tức
- Chỉ cần nhấp đúp chuột vào file `index.html` để mở trực tiếp trên trình duyệt (Chrome, Cốc Cốc, Edge, Safari,...).
- Muốn tạo thiệp mã QR riêng: Mở file `qr-creator.html`.

---

## 📸 2. Cách Thay 6 Tấm Ảnh Của Crush (Siêu Dễ)
Trong thư mục `assets/images/`, hiện tại đã có sẵn 6 tấm ảnh mẫu từ `photo1.jpg` đến `photo6.jpg`.
Để thay ảnh thật của crush hoặc ảnh kỷ niệm của hai bạn:
1. Chọn 6 bức ảnh đẹp nhất của bạn ấy (tỷ lệ đứng 4:5 hoặc 1:1 hình vuông là đẹp nhất).
2. Đổi tên 6 bức ảnh đó thành:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
   - `photo5.jpg`
   - `photo6.jpg`
3. Chép đè vào thư mục: `assets/images/`.
4. F5 tải lại trang web là toàn bộ khung ảnh Polaroid sẽ tự động cập nhật!

---

## ✍️ 3. Cách Đổi Lời Chúc Hoặc Chú Thích Ảnh
- Mở file `index.html` bằng Notepad hoặc VS Code / trình soạn thảo văn bản.
- **Đổi lời chúc**: Tìm đoạn `<div class="wishes-grid">`, bạn sẽ thấy 6 thẻ lời chúc. Bạn có thể sửa câu chữ theo cách xưng hô riêng của hai người (ví dụ: đổi "cậu" thành "em", "bé", tên riêng của bạn ấy,...).
- **Đổi chữ dưới khung ảnh Polaroid**: Tìm đoạn `<div class="polaroid-gallery">`, chỉnh sửa dòng `<div class="photo-caption">...</div>` theo kỷ niệm của hai bạn (ví dụ: *"Ngày đầu tiên gặp nhau"*, *"Lúc em cười xinh nhất"*,...).

---

## 🎵 4. Thêm Nhạc Nền Crush Thích
- Nếu bạn không thêm nhạc, trang web đã **tự động phát giai điệu piano acoustic lãng mạn** du dương bằng âm thanh kỹ thuật số (Web Audio API) hoàn toàn không lo lỗi.
- Nếu muốn bài hát cụ thể mà crush thích (ví dụ: một bài hát của Vũ, Amee, Hoàng Dũng,...):
  1. Tải file nhạc định dạng `.mp3`.
  2. Đổi tên thành `bgm.mp3`.
  3. Bỏ vào thư mục `assets/music/bgm.mp3`.
  Trang web sẽ tự động ưu tiên phát bài hát này khi người ấy chạm vào bó hoa!

---

## 🌐 5. Cách Lấy Link Online Miễn Phí Để Crush Quét Mã QR

Để người ấy có thể quét mã QR bằng điện thoại ở bất kỳ đâu (dùng 4G hoặc WiFi), bạn cần đưa thư mục web này lên mạng. Có 3 cách **hoàn toàn miễn phí, chỉ mất 1 phút**:

### Cách nhanh nhất: Dùng Netlify Drop (Không cần tạo tài khoản rườm rà - 15 giây)
1. Truy cập vào trang: `https://app.netlify.com/drop`
2. Kéo thả nguyên thư mục `thiep-20-10` vào ô upload trên trang web.
3. Chờ 5 giây, Netlify sẽ cấp ngay cho bạn một đường link online (ví dụ: `https://thiep-20-10-xinh.netlify.app`).

### Cách 2: Dùng Vercel
1. Đăng ký/đăng nhập `https://vercel.com` (bằng tài khoản GitHub hoặc Google).
2. Tải CLI hoặc kéo thả project lên Vercel để nhận link tên miền `.vercel.app`.

### Cách 3: Dùng GitHub Pages
1. Tạo 1 repository trên GitHub (ví dụ: `thiep-20-10`).
2. Tải toàn bộ file trong thư mục này lên repository.
3. Vào **Settings** -> **Pages** -> chọn nhánh `main` và bấm **Save**.
4. Bạn sẽ có link dạng: `https://<ten-github-cua-ban>.github.io/thiep-20-10/`.

---

## 💌 6. Cách Tạo Bưu Thiếp Mã QR Đẹp Mắt Gửi Cho Crush
1. Mở file `qr-creator.html` (hoặc bấm nút **"Tạo Mã QR"** ở góc trên trang thiệp chính).
2. Dán đường link online bạn vừa tạo được ở bước 5 vào ô **URL**.
3. Điền tên người ấy (ví dụ: *"Gửi Linh Bé Bỏng 🌸"*).
4. Chọn tông màu thiệp yêu thích (Hồng Rose, Cam Đào, Tím Lavender).
5. Bấm nút **"Làm Mới Bưu Thiếp ✨"**.
6. Bấm **"Tải Ảnh Thiệp QR Về Máy 📥"**.
7. Bạn sẽ có một file ảnh `.png` bưu thiếp sang trọng, tinh tế. Bạn có thể:
   - Gửi ảnh qua Zalo, Messenger, Instagram kèm lời nhắn: *"Tớ có gửi cậu một bức thư bí mật, quét mã nhé!"*.
   - Hoặc in tấm ảnh ra giấy cứng, kẹp vào bó hoa hoặc hộp quà thật để tặng trực tiếp!

Chúc bạn có một ngày 20/10 thật hạnh phúc và ghi điểm trọn vẹn trong mắt người ấy nhé! 🌸💖
