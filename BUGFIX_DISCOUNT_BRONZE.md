# 🐛 BUG FIX: Giảm Giá Hội Viên + Thêm Cấp Bronze

## 🔍 Vấn Đề

### Bug 1: Giảm giá không hoạt động ở `checkout.html`
**Nguyên nhân:** API `getDonThuoc()` không fetch thông tin `loai_kh`, `cap_thanh_vien`, `tong_tien_da_mua` từ relation `khach_hang`.

**Triệu chứng:**
- Trang thanh toán không hiển thị cấp hội viên
- Không có giảm giá được áp dụng
- Dù code logic giảm giá đã đúng

### Yêu Cầu 2: Thêm cấp Bronze
- Khách hàng có tổng tiền < 50,000đ → Bronze
- Bronze không được giảm giá (0%)

---

## ✅ Giải Pháp

### 1. Sửa API `getDonThuoc()` ✅

**File:** `frontend/src/config/api.js`

**Trước:**
```javascript
khach_hang (ma_kh, ten_kh, sdt, di_ung),
```

**Sau:**
```javascript
khach_hang (ma_kh, ten_kh, sdt, di_ung, loai_kh, cap_thanh_vien, tong_tien_da_mua),
```

➡️ Bây giờ tất cả thông tin hội viên được fetch đầy đủ!

---

### 2. Cập Nhật Database: Thêm Cấp Bronze ✅

**Migration:** `add_bronze_tier`

**Cấu trúc mới:**
```
< 50,000đ        → Bronze (0%)
50,000đ - 19.9M  → Silver (10%)
20M - 49.9M      → Gold (15%)
≥ 50M            → VIP (20%)
```

**Trigger đã cập nhật:**
```sql
CREATE OR REPLACE FUNCTION update_cap_thanh_vien()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.loai_kh = 'Hội viên' THEN
        IF NEW.tong_tien_da_mua >= 50000000 THEN
            NEW.cap_thanh_vien = 'VIP';
        ELSIF NEW.tong_tien_da_mua >= 20000000 THEN
            NEW.cap_thanh_vien = 'Gold';
        ELSIF NEW.tong_tien_da_mua >= 50000 THEN
            NEW.cap_thanh_vien = 'Silver';
        ELSE
            NEW.cap_thanh_vien = 'Bronze';
        END IF;
    ELSE
        NEW.cap_thanh_vien = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

### 3. Cập Nhật UI: Hiển Thị Bronze ✅

#### A. `prescriptions.html`

**Icon mapping:**
```javascript
const capIcon = cap === 'VIP' ? '👑' : 
                cap === 'Gold' ? '🥇' : 
                cap === 'Silver' ? '🥈' : '🥉';
```

**Discount mapping:**
```javascript
const discount = cap === 'VIP' ? '20%' : 
                 cap === 'Gold' ? '15%' : 
                 cap === 'Silver' ? '10%' : '0%';
```

**Default value:**
```javascript
const cap = customer.cap_thanh_vien || 'Bronze';
```

#### B. `checkout.html`

**Hiển thị cấp:**
```javascript
const cap = khachHang.cap_thanh_vien || 'Bronze';
const capIcon = cap === 'VIP' ? '👑' : 
                cap === 'Gold' ? '🥇' : 
                cap === 'Silver' ? '🥈' : '🥉';
const discount = cap === 'VIP' ? '20%' : 
                 cap === 'Gold' ? '15%' : 
                 cap === 'Silver' ? '10%' : '0%';
```

**Text hiển thị:**
```javascript
const discountColor = cap === 'Bronze' ? '#6b7280' : '#10b981';
memberInfo = `
  <p><strong>Cấp hội viên:</strong> ${capIcon} ${cap} 
    <span style="color: ${discountColor}; font-weight: bold;">
      (${cap === 'Bronze' ? 'Chưa được' : 'Giảm'} ${discount})
    </span>
  </p>
`;
```

**Tính giảm giá:**
```javascript
const discountPercent = cap === 'VIP' ? 0.2 : 
                        cap === 'Gold' ? 0.15 : 
                        cap === 'Silver' ? 0.1 : 0;
discount = totalAmount * discountPercent;

// Chỉ hiển thị giảm giá nếu > 0
if (discount > 0) {
  discountText = `
    <div style="text-align: right; color: #10b981; font-size: 1.1em; margin-top: 10px;">
      Giảm giá (${cap}): -${formatCurrency(discount)}
    </div>
  `;
}
```

#### C. `members.html`

**Statistics Cards:**
```html
<div class="stat-card" style="background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);">
  <div style="font-size: 2em;">🥉</div>
  <div style="font-size: 0.9em;">Bronze (0%)</div>
  <div id="bronzeCount">0</div>
</div>
```

**Filter dropdown:**
```html
<option value="Bronze">🥉 Bronze</option>
```

**Table display:**
```javascript
const cap = member.cap_thanh_vien || 'Bronze';
const capIcon = cap === 'VIP' ? '👑' : 
                cap === 'Gold' ? '🥇' : 
                cap === 'Silver' ? '🥈' : '🥉';
const discount = cap === 'VIP' ? '20%' : 
                 cap === 'Gold' ? '15%' : 
                 cap === 'Silver' ? '10%' : '0%';
```

---

## 🧪 TEST CASES

### ✅ Test 1: Khách Vãng Lai
1. Tạo đơn cho khách vãng lai
2. Nhập dị ứng: "Aspirin"
3. Tổng: 1,500đ
4. Thanh toán → **Không có giảm giá** ✅
5. Kết quả: 1,500đ

### ✅ Test 2: Hội Viên Bronze (< 50k)
1. Đăng ký hội viên mới: "Võ Đình Nam"
2. Tạo đơn 1,500đ (như ảnh)
3. Vào `checkout.html`:
   - ✅ Thấy: "🥉 Bronze (Chưa được 0%)"
   - ✅ Không có giảm giá
   - ✅ Tổng cộng: 1,500đ
4. Thanh toán
5. `members.html`:
   - ✅ Tổng đã mua: 1,500đ
   - ✅ Cấp: 🥉 Bronze

### ✅ Test 3: Nâng Bronze → Silver
1. Tiếp tục mua cho "Võ Đình Nam"
2. Khi tổng đạt 50,000đ
3. ✅ Auto lên 🥈 Silver
4. Đơn tiếp theo được giảm 10%

### ✅ Test 4: Silver → Gold → VIP
- 20,000,000đ → 🥇 Gold (15%)
- 50,000,000đ → 👑 VIP (20%)

---

## 📂 Files Đã Thay Đổi

### Modified:
1. ✅ `frontend/src/config/api.js` - Fix getDonThuoc()
2. ✅ `frontend/src/views/prescriptions.html` - Thêm Bronze logic
3. ✅ `frontend/src/views/checkout.html` - Thêm Bronze + fix discount
4. ✅ `frontend/src/views/members.html` - Thêm Bronze stats
5. ✅ `MEMBERSHIP_SYSTEM_GUIDE.md` - Cập nhật docs

### Created:
- ✨ `BUGFIX_DISCOUNT_BRONZE.md` - File này

### Database:
- 🗄️ Migration: `add_bronze_tier`

---

## 🎯 Kết Quả

| Cấp | Điều kiện | Giảm giá | Icon | Màu |
|-----|-----------|----------|------|-----|
| 👑 VIP | ≥ 50M | 20% | 👑 | Tím |
| 🥇 Gold | ≥ 20M | 15% | 🥇 | Hồng |
| 🥈 Silver | ≥ 50k | 10% | 🥈 | Xanh dương |
| 🥉 Bronze | < 50k | 0% | 🥉 | Cam |

---

## ✨ Highlights

### Trước khi fix:
❌ Không thấy cấp hội viên  
❌ Không có giảm giá  
❌ Không có cấp Bronze  

### Sau khi fix:
✅ Hiển thị đầy đủ cấp hội viên  
✅ Giảm giá tự động chính xác  
✅ Có cấp Bronze cho hội viên mới  
✅ "Chưa được 0%" thay vì "Giảm 0%" (UX tốt hơn)  
✅ Auto nâng cấp khi đủ điều kiện  

---

## 🚀 Lưu Ý Quan Trọng

### ⚠️ Cache Browser
Sau khi update code, **phải clear cache** hoặc hard refresh:
- Chrome: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
- Hoặc: F12 → Network → Disable cache → Reload

### 🔄 Reload Trang Members
Sau mỗi lần thanh toán, reload `members.html` để thấy:
- Tổng tiền đã mua cập nhật
- Cấp hội viên tự động nâng (nếu đủ điều kiện)

### 💾 Database
Tất cả hội viên hiện tại đã được auto cập nhật cấp đúng theo migration.

---

**Enjoy! 🎉**

