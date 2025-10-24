# 🎯 HỆ THỐNG HỘI VIÊN - HƯỚNG DẪN ĐẦY ĐỦ

## 📊 Tổng Quan

Đã triển khai hệ thống phân loại khách hàng thành **Khách vãng lai** và **Hội viên** với 4 cấp độ:

| Cấp       | Icon | Điều kiện     | Giảm giá |
| --------- | ---- | ------------- | -------- |
| 👑 VIP    | Vàng | ≥ 50,000,000đ | 20%      |
| 🥇 Gold   | Vàng | ≥ 20,000,000đ | 15%      |
| 🥈 Silver | Bạc  | ≥ 50,000đ     | 10%      |
| 🥉 Bronze | Đồng | < 50,000đ     | 0%       |

---

## ✅ Những Gì Đã Implement

### 1️⃣ **Database Schema**

```sql
-- Thêm trường vào bảng khach_hang
loai_kh VARCHAR(20) DEFAULT 'Hội viên'
cap_thanh_vien VARCHAR(20) DEFAULT 'Silver'
tong_tien_da_mua DECIMAL(15, 2) DEFAULT 0
ngay_tham_gia DATE

-- Thêm trường vào bảng don_thuoc
di_ung_khach TEXT  -- Lưu dị ứng cho khách vãng lai
```

**Auto Trigger:** Tự động nâng cấp khi `tong_tien_da_mua` thay đổi

- < 50,000đ → Bronze (0%)
- 50,000đ - 19,999,999đ → Silver (10%)
- 20,000,000đ - 49,999,999đ → Gold (15%)
- ≥ 50,000,000đ → VIP (20%)

### 2️⃣ **Trang Đơn Thuốc (`prescriptions.html`)**

#### Radio Buttons

```
○ Khách vãng lai    ● Hội viên
```

#### Form Khách Vãng Lai

- Tên (tùy chọn)
- Dị ứng (nếu có)
- **KHÔNG** lưu vào bảng `khach_hang`
- Chỉ lưu `di_ung_khach` vào bảng `don_thuoc`

#### Form Hội Viên

- Dropdown chọn hội viên (hiển thị cấp + icon)
- Nút "Đăng ký hội viên mới"
- Hiển thị thông tin đầy đủ:
  - Tên, SĐT, Dị ứng
  - Cấp hội viên + % giảm giá
  - Tổng đã mua

### 3️⃣ **Trang Thanh Toán (`checkout.html`)**

#### Hiển thị thông tin

- ✅ Phân biệt "Khách vãng lai" vs Tên hội viên
- ✅ Hiển thị cấp + % giảm giá cho hội viên
- ⚠️ Cảnh báo dị ứng (background vàng) cho cả 2 loại

#### Tính toán giảm giá

```javascript
Tổng tiền gốc: 100,000đ
Giảm giá (VIP): -20,000đ
─────────────────────────
TỔNG CỘNG: 80,000đ
```

#### Auto Update sau thanh toán

- Cập nhật `tong_tien_da_mua` cho hội viên
- Trigger tự động nâng cấp nếu đủ điều kiện
- Ví dụ: Silver mua 20tr → Auto lên Gold

### 4️⃣ **Trang Quản Lý Hội Viên (`members.html`)** ✨ MỚI

#### Statistics Cards

- 👑 VIP (20%): Số lượng hội viên VIP
- 🥇 Gold (15%): Số lượng hội viên Gold
- 🥈 Silver (10%): Số lượng hội viên Silver
- 🥉 Bronze (0%): Số lượng hội viên Bronze
- 💎 Tổng hội viên

#### Bảng danh sách

- Mã hội viên
- Cấp (icon)
- Tên, SĐT, Dị ứng
- Tổng đã mua (màu xanh)
- % Giảm giá (màu cam)
- Ngày tham gia

#### Tính năng lọc

- 🔍 Tìm kiếm theo tên/SĐT
- Filter theo cấp (All/VIP/Gold/Silver/Bronze)

---

## 🧪 HƯỚNG DẪN TEST

### Test Case 1: Khách Vãng Lai

**Trang Đơn Thuốc:**

1. ✅ Chọn "Khách vãng lai"
2. ✅ Nhập dị ứng: "Penicillin"
3. ✅ Chọn nhân viên, thêm thuốc
4. ✅ Lưu đơn thuốc

**Trang Thanh Toán:**

1. ✅ Chọn đơn vừa tạo
2. ✅ Thấy "Khách hàng: Khách vãng lai"
3. ⚠️ Thấy cảnh báo: "Dị ứng: Penicillin" (background vàng)
4. ✅ Không có giảm giá
5. ✅ Thanh toán thành công

### Test Case 2: Hội Viên Mới (Bronze)

**Trang Đơn Thuốc:**

1. ✅ Chọn "Hội viên"
2. ✅ Click "+ Đăng ký hội viên mới"
3. ✅ Nhập: Nguyễn Văn A, 0901234567, "Aspirin"
4. ✅ Lưu → Tự động là Bronze
5. ✅ Thấy: "🥉 Bronze (Chưa được 0%)"
6. ✅ Tổng đã mua: 0đ
7. ✅ Lưu đơn thuốc

**Trang Thanh Toán:**

1. ✅ Chọn đơn của Nguyễn Văn A
2. ✅ Thấy: "Cấp hội viên: 🥉 Bronze (Chưa được 0%)"
3. ⚠️ Thấy: "Dị ứng: Aspirin"
4. ✅ Tổng gốc: 1,500đ
5. ✅ Không có giảm giá
6. ✅ Tổng cộng: 1,500đ
7. ✅ Thanh toán

**Trang Hội Viên:**

1. ✅ Refresh trang `members.html`
2. ✅ Thấy Nguyễn Văn A
3. ✅ Tổng đã mua: 1,500đ
4. ✅ Vẫn là 🥉 Bronze (< 50,000đ)

### Test Case 3: Nâng Cấp Hội Viên

**Mục tiêu:** Nâng Bronze → Silver

1. Mua thêm cho Nguyễn Văn A cho đến khi đạt ≥ 50,000đ
2. ✅ Auto lên 🥈 Silver (Giảm 10%)!

**Mục tiêu:** Nâng Silver → Gold

1. Tiếp tục mua cho đến khi đạt ≥ 20,000,000đ
2. ✅ Auto lên 🥇 Gold (Giảm 15%)!

**Mục tiêu:** Nâng Gold → VIP

1. Tiếp tục mua thêm cho đến khi đạt ≥ 50,000,000đ
2. ✅ Auto lên 👑 VIP (Giảm 20%)

---

## 📂 Files Đã Thay Đổi

### Modified:

- ✅ `frontend/src/views/prescriptions.html` - Radio buttons, form động
- ✅ `frontend/src/views/checkout.html` - Hiển thị giảm giá, cảnh báo dị ứng
- ✅ `frontend/src/config/api.js` - Cập nhật `tong_tien_da_mua`

### Created:

- ✨ `frontend/src/views/members.html` - Trang quản lý hội viên
- 📄 `MEMBERSHIP_SYSTEM_GUIDE.md` - File này

### Database:

- 🗄️ Migration: `add_membership_system`

---

## 🔧 TODO: Cần Thêm Link Vào Sidebar

Các trang sau **chưa** có link đến `members.html`:

```html
<!-- Cần thêm vào các file: -->
- index.html - warehouse.html - prescriptions.html - employees.html -
checkout.html - reports.html - chatbox.html
```

**Thêm dòng này vào sidebar:**

```html
<li><a href="members.html" onclick="setActive(this)">💎 Hội viên</a></li>
```

**Vị trí:** Giữa "👥 Nhân viên" và "💳 Thanh toán"

---

## 💡 Câu Hỏi Thường Gặp

### Q: Khách vãng lai có được lưu vào database không?

**A:** KHÔNG. Chỉ lưu `di_ung_khach` vào bảng `don_thuoc` (nếu có). Không tạo record trong `khach_hang`.

### Q: Tổng tiền đã mua tính trước hay sau giảm giá?

**A:** SAU giảm giá. Ví dụ: Mua 100,000đ, giảm 10% → Cộng 90,000đ vào tổng.

### Q: Có thể hạ cấp hội viên không?

**A:** KHÔNG. Chỉ có nâng cấp. `tong_tien_da_mua` luôn tăng.

### Q: Dị ứng của hội viên lưu ở đâu?

**A:** Lưu ở bảng `khach_hang`. Hiển thị ở cả Đơn thuốc và Thanh toán.

### Q: Dị ứng của khách vãng lai lưu ở đâu?

**A:** Lưu ở `don_thuoc.di_ung_khach`. Chỉ dùng cho đơn đó.

---

## 🎨 UI/UX Highlights

### Icons & Colors

- 👑 VIP: Gradient tím (#667eea → #764ba2)
- 🥇 Gold: Gradient hồng (#f093fb → #f5576c)
- 🥈 Silver: Gradient xanh dương (#4facfe → #00f2fe)
- 🥉 Bronze: Gradient cam (#fb923c → #f97316)
- 💎 Total: Gradient xanh lá (#43e97b → #38f9d7)
- ⚠️ Dị ứng: Background vàng (#fef3c7)
- ✅ Giảm giá: Màu xanh (#10b981)

### Responsive

- ✅ Mobile-friendly
- ✅ Grid auto-fit cho statistics cards
- ✅ Table responsive với horizontal scroll

---

## 🚀 Next Features (Có thể mở rộng)

1. **SMS/Email Notification**

   - Thông báo khi nâng cấp
   - Chúc mừng sinh nhật hội viên

2. **Loyalty Points**

   - Tích điểm mỗi đơn hàng
   - Đổi điểm lấy quà

3. **Member Card**

   - In thẻ hội viên có QR code
   - Scan QR để tra cứu

4. **Promotions**

   - Ngày hội viên: Giảm thêm 5%
   - Flash sale cho VIP

5. **Referral Program**
   - Giới thiệu bạn bè → Được thưởng

---

## 📞 Support

Nếu có vấn đề, check:

1. Console logs (F12)
2. Supabase logs (get_logs API)
3. Database constraints

**Enjoy! 🎉**
