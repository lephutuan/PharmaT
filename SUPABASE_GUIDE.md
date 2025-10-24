# Hướng Dẫn Sử Dụng PharmaT với Supabase Backend

## 📋 Tổng Quan

PharmaT đã được tích hợp hoàn chỉnh với Supabase backend, cung cấp:

- ✅ Database PostgreSQL mạnh mẽ
- ✅ RESTful API tự động
- ✅ Real-time subscriptions
- ✅ Row Level Security (RLS)
- ✅ Tự động backup và scaling

## 🎯 Thông Tin Dự Án

- **Project Name**: PharmaT
- **Project ID**: esoksuiwnedmfrxyizlg
- **Region**: Singapore (ap-southeast-1)
- **URL**: https://esoksuiwnedmfrxyizlg.supabase.co
- **Plan**: Free Tier (miễn phí)

## 🗄️ Database Schema

### Bảng `thuoc` (Medicines)

Quản lý thông tin thuốc trong kho

```sql
- ma_thuoc (PK): Mã thuốc tự động
- ten_thuoc: Tên thuốc
- don_vi: Đơn vị tính (viên, chai, gói, v.v.)
- gia_nhap: Giá nhập
- gia_ban: Giá bán
- so_luong: Số lượng tồn kho
- sl_toi_thieu: Số lượng tồn kho tối thiểu
- ngay_them: Ngày thêm vào hệ thống
- han_su_dung: Hạn sử dụng
- trang_thai: Trạng thái (Còn hạn, Hết hạn)
- nhom_thuoc: Nhóm thuốc
- anh: Đường dẫn ảnh
```

### Bảng `nhan_vien` (Employees)

Quản lý thông tin nhân viên

```sql
- ma_nv (PK): Mã nhân viên tự động
- ten_nv: Tên nhân viên
- chuc_vu: Chức vụ
- sdt: Số điện thoại
- dia_chi: Địa chỉ
- mat_khau: Mật khẩu
- trang_thai: Trạng thái làm việc
```

### Bảng `khach_hang` (Customers)

Quản lý thông tin khách hàng

```sql
- ma_kh (PK): Mã khách hàng tự động
- ten_kh: Tên khách hàng
- sdt: Số điện thoại
- dia_chi: Địa chỉ
- di_ung: Thông tin dị ứng
```

### Bảng `don_thuoc` (Prescriptions)

Quản lý đơn thuốc

```sql
- ma_don (PK): Mã đơn tự động
- ma_kh (FK): Mã khách hàng
- ma_nv (FK): Mã nhân viên
- ngay_lap: Ngày lập đơn
- trang_thai: Trạng thái đơn
- ghi_chu: Ghi chú
```

### Bảng `chi_tiet_don_thuoc` (Prescription Details)

Chi tiết thuốc trong đơn

```sql
- id (PK): ID tự động
- ma_don (FK): Mã đơn thuốc
- ma_thuoc (FK): Mã thuốc
- lieu_dung: Liều dùng
- so_ngay: Số ngày sử dụng
- so_luong: Số lượng
```

### Bảng `hoa_don` (Invoices)

Quản lý hóa đơn thanh toán

```sql
- ma_hd (PK): Mã hóa đơn tự động
- ma_kh (FK): Mã khách hàng
- ma_nv (FK): Mã nhân viên
- ma_don (FK): Mã đơn thuốc
- ngay_lap: Ngày lập hóa đơn
- tong_tien: Tổng tiền
- phuong_thuc_thanh_toan: Phương thức thanh toán
- trang_thai: Trạng thái thanh toán
- ghi_chu: Ghi chú
```

### Bảng `chi_tiet_hoa_don` (Invoice Details)

Chi tiết thuốc trong hóa đơn

```sql
- id (PK): ID tự động
- ma_hd (FK): Mã hóa đơn
- ma_thuoc (FK): Mã thuốc
- so_luong: Số lượng
- don_gia: Đơn giá
- thanh_tien: Thành tiền
```

### Bảng `canh_bao` (Alerts)

Quản lý cảnh báo hệ thống

```sql
- ma_cb (PK): Mã cảnh báo tự động
- loai_cb: Loại cảnh báo
- noi_dung: Nội dung cảnh báo
- muc_do: Mức độ (Cao, Trung bình, Thấp)
- ma_thuoc (FK): Mã thuốc liên quan
- ngay_tao: Ngày tạo
- trang_thai: Trạng thái xử lý
```

## 🔐 Row Level Security (RLS)

Tất cả các bảng đều đã được bật RLS với policies cho phép:

- ✅ SELECT (đọc dữ liệu)
- ✅ INSERT (thêm dữ liệu)
- ✅ UPDATE (cập nhật dữ liệu)
- ✅ DELETE (xóa dữ liệu)

**Lưu ý**: Hiện tại policies đang ở chế độ demo (cho phép tất cả). Trong production, cần cấu hình authentication và giới hạn quyền truy cập.

## 🚀 API Functions

### Thuốc (Medicines)

```javascript
// Lấy tất cả thuốc
await API.getThuoc();

// Thêm thuốc mới
await API.createThuoc(thuocData);

// Cập nhật thuốc
await API.updateThuoc(maThuoc, thuocData);

// Xóa thuốc
await API.deleteThuoc(maThuoc);

// Tìm kiếm thuốc
await API.searchThuoc(keyword);
```

### Nhân Viên (Employees)

```javascript
// Lấy tất cả nhân viên
await API.getNhanVien();

// Thêm nhân viên mới
await API.createNhanVien(nhanVienData);

// Cập nhật nhân viên
await API.updateNhanVien(maNV, nhanVienData);

// Xóa nhân viên
await API.deleteNhanVien(maNV);
```

### Khách Hàng (Customers)

```javascript
// Lấy tất cả khách hàng
await API.getKhachHang();

// Thêm khách hàng mới
await API.createKhachHang(khachHangData);

// Cập nhật khách hàng
await API.updateKhachHang(maKH, khachHangData);

// Xóa khách hàng
await API.deleteKhachHang(maKH);
```

### Đơn Thuốc (Prescriptions)

```javascript
// Lấy tất cả đơn thuốc
await API.getDonThuoc();

// Lấy chi tiết đơn thuốc
await API.getChiTietDonThuoc(maDon);

// Tạo đơn thuốc mới
await API.createDonThuoc(donThuocData, chiTietList);
```

### Hóa Đơn (Invoices)

```javascript
// Lấy tất cả hóa đơn
await API.getHoaDon();

// Lấy chi tiết hóa đơn
await API.getChiTietHoaDon(maHD);

// Tạo hóa đơn mới (tự động giảm tồn kho)
await API.createHoaDon(hoaDonData, chiTietList);
```

### Cảnh Báo (Alerts)

```javascript
// Lấy tất cả cảnh báo
await API.getCanhBao();

// Tạo cảnh báo mới
await API.createCanhBao(canhBaoData);

// Cập nhật trạng thái cảnh báo
await API.updateCanhBao(maCB, trangThai);

// Kiểm tra và tạo cảnh báo tự động
await API.checkAndCreateAlerts();
```

### Thống Kê (Statistics)

```javascript
// Lấy thống kê tổng quan
await API.getStatistics();
// Returns: {totalMedicines, todayOrders, monthRevenue, alerts}

// Lấy dữ liệu biểu đồ doanh thu
await API.getRevenueChart("month"); // 'week', 'month', 'year'
```

## 📊 Dữ Liệu Mẫu

Database đã được thêm sẵn dữ liệu mẫu:

- ✅ 14 loại thuốc đa dạng
- ✅ 3 nhân viên
- ✅ 4 khách hàng
- ✅ Dữ liệu đầy đủ để test các chức năng

## 🛠️ Cách Sử Dụng

### 1. Chạy Ứng Dụng

**Phương pháp 1: Live Server (Khuyến nghị)**

```bash
# Cài extension Live Server trong VS Code
# Click chuột phải vào file index.html
# Chọn "Open with Live Server"
```

**Phương pháp 2: HTTP Server**

```bash
cd PharmaT
npx http-server . -p 8080 -o
```

**Phương pháp 3: Python**

```bash
cd PharmaT
python -m http.server 8000
# Truy cập: http://localhost:8000/index.html
```

### 2. Truy Cập Các Trang

- **Trang chủ**: `index.html` - Dashboard với thống kê tự động
- **Kho thuốc**: `warehouse.html` - Quản lý CRUD thuốc đầy đủ
- **Nhân viên**: `employees.html` - Quản lý nhân viên
- **Đơn thuốc**: `prescriptions.html` - Tạo và quản lý đơn thuốc
- **Thanh toán**: `checkout.html` - Xử lý thanh toán
- **Báo cáo**: `reports.html` - Thống kê và biểu đồ
- **Chatbox**: `chatbox.html` - Cảnh báo hệ thống

### 3. Test Các Chức Năng

#### Quản Lý Kho (warehouse.html)

1. Xem danh sách thuốc từ database
2. Thêm thuốc mới (click "Thêm mới")
3. Sửa thuốc (click chuột phải vào thuốc → Sửa)
4. Xóa thuốc (click chuột phải → Xóa)
5. Tìm kiếm thuốc
6. Sắp xếp theo các cột

#### Quản Lý Nhân Viên (employees.html)

1. Xem danh sách nhân viên
2. Thêm nhân viên mới
3. Sửa thông tin nhân viên
4. Xóa nhân viên

#### Trang Chủ (index.html)

1. Xem thống kê tự động cập nhật:
   - Tổng số thuốc
   - Đơn hàng hôm nay
   - Doanh thu tháng
   - Số cảnh báo
2. Hệ thống tự động kiểm tra và tạo cảnh báo

## 🔧 Troubleshooting

### Lỗi CORS

Nếu gặp lỗi CORS, hãy chắc chắn chạy qua HTTP server (không phải file://)

### Không tải được dữ liệu

1. Kiểm tra console (F12) để xem lỗi
2. Xác nhận internet connection
3. Kiểm tra Supabase project có đang hoạt động

### Lỗi khi thêm/sửa/xóa dữ liệu

1. Kiểm tra console để xem chi tiết lỗi
2. Xác nhận dữ liệu nhập đúng định dạng
3. Kiểm tra RLS policies trong Supabase Dashboard

## 📱 Truy Cập Supabase Dashboard

1. Truy cập: https://supabase.com/dashboard
2. Đăng nhập với tài khoản của bạn
3. Chọn project "PharmaT"
4. Các tab quan trọng:
   - **Table Editor**: Xem và chỉnh sửa dữ liệu
   - **SQL Editor**: Chạy SQL queries
   - **API**: Xem API documentation
   - **Logs**: Xem logs và debug

## 🔒 Bảo Mật

### Lưu Ý Quan Trọng

⚠️ **Anon Key** đang được lưu trong file `supabase.js`. Đây là OK cho development nhưng:

- Key này chỉ có quyền public (do RLS policies)
- Trong production, nên:
  - Sử dụng environment variables
  - Cấu hình authentication
  - Giới hạn RLS policies theo user role

### Cấu Hình Authentication (Tùy Chọn)

Để thêm authentication:

```javascript
// Đăng ký
await supabase.auth.signUp({
  email: "user@example.com",
  password: "password",
});

// Đăng nhập
await supabase.auth.signIn({
  email: "user@example.com",
  password: "password",
});

// Đăng xuất
await supabase.auth.signOut();
```

## 📈 Monitoring & Analytics

### Kiểm Tra Performance

1. Supabase Dashboard → Settings → Usage
2. Xem:
   - Database size
   - API requests
   - Bandwidth usage

### Giới Hạn Free Tier

- Database: 500 MB
- Storage: 1 GB
- Bandwidth: 2 GB/month
- API requests: Không giới hạn

## 🚀 Nâng Cấp & Mở Rộng

### Các Tính Năng Có Thể Thêm

1. **Authentication**: Đăng nhập/đăng ký
2. **Real-time**: Cập nhật realtime khi có thay đổi
3. **Storage**: Upload ảnh thuốc lên Supabase Storage
4. **Email**: Gửi email thông báo
5. **Reports**: Tạo báo cáo PDF
6. **Export**: Xuất dữ liệu Excel/CSV

### Ví Dụ Real-time Subscription

```javascript
// Listen for changes in thuoc table
const channel = supabase
  .channel("thuoc-changes")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "thuoc" },
    (payload) => {
      console.log("Change detected:", payload);
      loadMedicineData(); // Reload data
    }
  )
  .subscribe();
```

## 📞 Hỗ Trợ

Nếu có vấn đề:

1. Kiểm tra Supabase Dashboard → Logs
2. Kiểm tra Browser Console (F12)
3. Xem Supabase Documentation: https://supabase.com/docs

---

**🎉 PharmaT với Supabase Backend - Sẵn sàng sử dụng!**
