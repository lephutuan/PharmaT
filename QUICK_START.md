# ⚡ Quick Start - PharmaT

## 🚀 Chạy Ngay (3 Bước)

### Bước 1: Mở Terminal
```bash
cd PharmaT
```

### Bước 2: Chạy Server
Chọn một trong các cách:

**Cách 1: VS Code Live Server (Dễ nhất)**
1. Cài extension "Live Server" trong VS Code
2. Right-click vào `frontend/src/views/home.html`
3. Chọn "Open with Live Server"

**Cách 2: NPM**
```bash
npx http-server . -p 8080 -o
```

**Cách 3: Python**
```bash
python -m http.server 8000
# Mở: http://localhost:8000/frontend/src/views/home.html
```

### Bước 3: Test Thử
1. Mở `home.html` - Xem dashboard với thống kê
2. Mở `warehouse.html` - Xem 14 thuốc từ database
3. Thử thêm thuốc mới → Click "Thêm mới" → Điền form → Lưu
4. Thử sửa thuốc → Right-click vào thuốc → Sửa
5. Thử xóa thuốc → Right-click → Xóa

## ✅ Đã Có Sẵn

- ✅ **Database**: PostgreSQL trên Supabase cloud
- ✅ **14 thuốc** mẫu sẵn sàng test
- ✅ **3 nhân viên** và **4 khách hàng**
- ✅ **API hoạt động**: Tất cả CRUD operations
- ✅ **Thống kê tự động**: Dashboard real-time

## 📱 Các Trang Chính

| Trang | File | Chức năng |
|-------|------|-----------|
| 🏠 Trang chủ | `home.html` | Dashboard & thống kê |
| 📦 Kho thuốc | `warehouse.html` | **Quản lý thuốc (CRUD đầy đủ)** |
| 👥 Nhân viên | `employees.html` | Quản lý nhân viên |
| 📝 Đơn thuốc | `prescriptions.html` | Tạo đơn thuốc |
| 💳 Thanh toán | `checkout.html` | Xử lý thanh toán |
| 📊 Báo cáo | `reports.html` | Thống kê & biểu đồ |
| 🤖 Chatbox | `chatbox.html` | Cảnh báo hệ thống |

## 🎯 Test Scenarios

### 1️⃣ Test Quản Lý Kho (warehouse.html)
```
✅ Xem danh sách thuốc
✅ Tìm kiếm thuốc (gõ trong search box)
✅ Thêm thuốc mới
   - Click "Thêm mới"
   - Điền: Tên thuốc, Đơn vị, Giá nhập, Giá bán
   - Click "Lưu"
✅ Sửa thuốc
   - Right-click vào thuốc
   - Chọn "Sửa"
   - Thay đổi thông tin
   - Click "Lưu"
✅ Xóa thuốc
   - Right-click vào thuốc
   - Chọn "Xóa"
   - Confirm
```

### 2️⃣ Test Dashboard (home.html)
```
✅ Xem thống kê tự động:
   - Tổng số thuốc (từ database)
   - Đơn hàng hôm nay
   - Doanh thu tháng
   - Số cảnh báo
✅ Cảnh báo tự động được tạo khi:
   - Thuốc sắp hết hạn (< 30 ngày)
   - Tồn kho thấp (< số lượng tối thiểu)
```

### 3️⃣ Test Nhân Viên (employees.html)
```
✅ Xem danh sách nhân viên
✅ Thêm nhân viên mới
✅ Sửa thông tin nhân viên
✅ Xóa nhân viên
```

## 🔧 Nếu Có Lỗi

### Lỗi: "Failed to fetch" hoặc CORS error
**Nguyên nhân**: Chạy qua `file://` thay vì HTTP server  
**Giải pháp**: Phải chạy qua HTTP server (xem Bước 2 ở trên)

### Lỗi: "supabaseClient is not defined"
**Nguyên nhân**: Chưa load Supabase JS  
**Giải pháp**: Check internet connection, reload trang

### Lỗi: Console hiển thị error về database
**Nguyên nhân**: Internet connection issue  
**Giải pháp**: 
1. Check internet connection
2. F12 → Console → Xem chi tiết lỗi
3. Reload trang

## 📊 Database Info

**Supabase Project**: PharmaT  
**URL**: https://esoksuiwnedmfrxyizlg.supabase.co  
**Region**: Singapore  
**Status**: ✅ Active  

**Dữ liệu sẵn có**:
- 14 loại thuốc
- 3 nhân viên
- 4 khách hàng

## 🎓 Tài Liệu

Nếu cần thêm thông tin:
- **README.md** - Tổng quan project
- **SUPABASE_GUIDE.md** - Hướng dẫn chi tiết Supabase
- **DEPLOYMENT_SUMMARY.md** - Tóm tắt triển khai

## 💡 Pro Tips

1. **Mở F12** để xem Console → Dễ debug
2. **Supabase Dashboard** để xem/edit data trực tiếp: https://supabase.com/dashboard
3. **Test CRUD đầy đủ** ở trang `warehouse.html` trước
4. **Check thống kê** ở `home.html` sau mỗi thao tác

## 🎉 Xong!

**Bây giờ bạn có một hệ thống quản lý tiệm thuốc full-stack hoạt động!**

Hãy thử:
1. Thêm vài thuốc mới
2. Xem thống kê cập nhật
3. Tạo đơn thuốc
4. Explore các trang khác

**Chúc vui vẻ! 🚀**

---

*Có câu hỏi? Check README.md hoặc SUPABASE_GUIDE.md*

