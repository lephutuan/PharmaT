# PharmaT - Hệ Thống Quản Lý Tiệm Thuốc

## 📋 Tổng quan

PharmaT là một ứng dụng quản lý tiệm thuốc **full-stack** được xây dựng với:
- **Frontend**: HTML, CSS, JavaScript thuần túy
- **Backend**: Supabase (PostgreSQL + RESTful API)
- **Hosting**: Static hosting cho frontend, Supabase cloud cho backend

## 🎯 Tính năng chính

- **🏠 Trang chủ**: Dashboard tổng quan với thống kê
- **📦 Quản lý kho**: Thêm, sửa, xóa thuốc
- **💊 Sản phẩm**: Danh sách và tìm kiếm thuốc
- **👥 Nhân viên**: Quản lý thông tin nhân viên
- **🧾 Báo cáo**: Thống kê và biểu đồ doanh thu
- **⚠️ Cảnh báo**: Thông báo thuốc sắp hết hạn, tồn kho thấp
- **🛒 Thanh toán**: Giao diện checkout đơn giản

## 🚀 Cách chạy

### Yêu cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet (để kết nối Supabase)
- HTTP server (không thể chạy qua file://)

### Phương pháp 1: Live Server (Khuyến nghị)
1. Cài đặt extension "Live Server" trong VS Code
2. Click chuột phải vào file `frontend/src/views/home.html`
3. Chọn "Open with Live Server"
4. Trình duyệt sẽ tự động mở với địa chỉ local

### Phương pháp 2: HTTP Server
```bash
cd PharmaT
npx http-server . -p 8080 -o
```

### Phương pháp 3: Python
```bash
cd PharmaT
# Python 3
python -m http.server 8000
# Truy cập: http://localhost:8000/frontend/src/views/home.html
```

## 📁 Cấu trúc thư mục

```
PharmaT/
├── frontend/            # Toàn bộ mã nguồn giao diện
│   └── src/
│       ├── views/       # Các trang HTML
│       │   ├── home.html     # Trang chủ
│       │   ├── warehouse.html # Quản lý kho
│       │   ├── products.html  # Sản phẩm
│       │   ├── employees.html # Nhân viên
│       │   ├── reports.html   # Báo cáo
│       │   ├── checkout.html  # Thanh toán
│       │   └── warning.html   # Cảnh báo
│       ├── assets/
│       │   ├── css/     # Stylesheets
│       │   │   ├── home.css
│       │   │   ├── warehouse.css
│       │   │   ├── products.css
│       │   │   ├── employees.css
│       │   │   ├── reports.css
│       │   │   ├── checkout.css
│       │   │   ├── warning.css
│       │   │   ├── common-responsive.css
│       │   │   └── api-styles.css
│       │   ├── js/      # JavaScript files
│       │   │   ├── home.js
│       │   │   ├── navbar.js
│       │   │   ├── sidebar.js
│       │   │   └── reports.js
│       │   └── images/  # Hình ảnh
│       │       ├── paracetamol.png
│       │       ├── amoxicillin.jpg
│       │       ├── vitamin_c.jpg
│       │       ├── omeprazole.jpg
│       │       ├── betadine.jpg
│       │       └── ...
│       └── config/
│           └── app.js   # Cấu hình ứng dụng
├── backend/             # Mã nguồn backend (sẽ được phát triển)
│   ├── controllers/     # API Controllers
│   ├── models/         # Database Models
│   ├── routes/         # API Routes
│   ├── middlewares/    # Middleware functions
│   ├── services/       # Business Logic
│   ├── config/         # Backend Configuration
│   ├── app.js          # Entry point
│   └── package.json    # Backend dependencies
├── package.json        # Thông tin dự án chính
├── deploy.md          # Hướng dẫn deploy
└── README.md          # Tài liệu dự án
```

## 🎨 Giao diện

- **Responsive Design**: Tương thích với mọi thiết bị
- **Modern UI**: Thiết kế hiện đại với màu sắc hài hòa
- **Interactive Charts**: Biểu đồ tương tác sử dụng Chart.js
- **Auto-complete**: Tìm kiếm thông minh với Awesomplete
- **Modal Dialogs**: Popup thân thiện cho các thao tác

## 📊 Database & Backend

### Supabase Backend
- **Project**: PharmaT (esoksuiwnedmfrxyizlg)
- **Region**: Singapore (ap-southeast-1)
- **Database**: PostgreSQL với 8 bảng
- **API**: RESTful API tự động
- **Security**: Row Level Security (RLS) enabled

### Dữ liệu mẫu
Database đã được thiết lập với dữ liệu mẫu:
- ✅ **14 loại thuốc** đa dạng
- ✅ **3 nhân viên** với các vai trò khác nhau
- ✅ **4 khách hàng** mẫu
- ✅ Dữ liệu đầy đủ để test tất cả chức năng

### API Functions
Xem chi tiết trong file `SUPABASE_GUIDE.md`

## 🔧 Tính năng kỹ thuật

### Frontend
- **Pure JavaScript**: Không sử dụng framework
- **Responsive Design**: Mobile-first approach
- **Chart.js**: Biểu đồ tương tác
- **Awesomplete**: Auto-complete cho tìm kiếm
- **Modern ES6+**: Async/await, arrow functions

### Backend (Supabase)
- **PostgreSQL**: Database mạnh mẽ và tin cậy
- **RESTful API**: Auto-generated từ database schema
- **Real-time**: WebSocket subscriptions (ready to use)
- **Row Level Security**: Bảo mật cấp dòng dữ liệu
- **Auto Backup**: Tự động backup định kỳ
- **Scalable**: Tự động scale theo nhu cầu

## 📱 Tương thích

- **Trình duyệt**: Chrome, Firefox, Safari, Edge (phiên bản mới)
- **Thiết bị**: Desktop, Tablet, Mobile
- **Hệ điều hành**: Windows, macOS, Linux

## 🎯 Mục đích sử dụng

- **Demo/Prototype**: Trình diễn ý tưởng ứng dụng
- **Portfolio**: Showcase kỹ năng frontend
- **Learning**: Học tập HTML/CSS/JavaScript
- **Template**: Cơ sở cho dự án thực tế

## ⚠️ Lưu ý quan trọng

- ✅ **Backend hoạt động**: Tất cả thao tác CRUD được lưu vào database thực
- ✅ **Dữ liệu persistent**: Dữ liệu được lưu trữ trên Supabase cloud
- ⚠️ **Internet required**: Cần kết nối internet để truy cập database
- ⚠️ **HTTP Server**: Phải chạy qua HTTP server (không thể dùng file://)

## 🏗️ Cấu trúc dự án

### Frontend (Hiện tại)
- **Vị trí**: `frontend/src/`
- **Công nghệ**: HTML, CSS, JavaScript thuần
- **Tính năng**: Giao diện người dùng hoàn chỉnh
- **Dữ liệu**: Sử dụng dữ liệu mẫu tĩnh

### Backend (Sẽ phát triển)
- **Vị trí**: `backend/`
- **Cấu trúc chuẩn**: Controllers, Models, Routes, Middlewares, Services
- **Lợi ích**: Tách biệt rõ ràng, dễ deploy, dễ test, dễ mở rộng

### 🎯 Lợi ích của cấu trúc mới
- **Deploy độc lập**: Frontend → Vercel/Netlify, Backend → Render/Heroku
- **Team collaboration**: Frontend và backend teams làm việc song song
- **Testing riêng biệt**: Unit tests cho từng layer
- **CI/CD workflow**: Pipeline riêng cho từng phần
- **Scalability**: Dễ dàng mở rộng và bảo trì

## 🚀 Các tính năng đã hoàn thành

- ✅ **Database Schema**: 8 bảng với relationships đầy đủ
- ✅ **CRUD Operations**: Tạo, đọc, cập nhật, xóa cho tất cả entities
- ✅ **Real-time Stats**: Thống kê tự động cập nhật
- ✅ **Auto Alerts**: Hệ thống cảnh báo tự động
- ✅ **Search & Filter**: Tìm kiếm và lọc dữ liệu
- ✅ **Data Validation**: Kiểm tra dữ liệu đầu vào

## 🔜 Tính năng tiếp theo

1. **Authentication**: Hệ thống đăng nhập/đăng ký với Supabase Auth
2. **Image Upload**: Upload ảnh thuốc lên Supabase Storage
3. **Real-time Updates**: WebSocket cho cập nhật realtime
4. **Export/Import**: Xuất nhập dữ liệu Excel/CSV
5. **Print Invoice**: In hóa đơn PDF
6. **Email Notifications**: Gửi email thông báo

## 📞 Hỗ trợ

Nếu có vấn đề hoặc câu hỏi:
- Kiểm tra console browser (F12) để xem lỗi
- Đảm bảo mở qua HTTP server (không phải file://)
- Kiểm tra tương thích trình duyệt

---

**PharmaT Frontend Only** - Một ứng dụng quản lý tiệm thuốc đơn giản và hiệu quả! 🏥💊

