# PharmaT - Frontend Version

## 📋 Tổng quan

PharmaT là một ứng dụng quản lý tiệm thuốc được thiết kế hoàn toàn bằng **frontend thuần túy** (HTML, CSS, JavaScript). Ứng dụng này chưa có backend server và có thể chạy trực tiếp trên trình duyệt web.

## 🎯 Tính năng chính

- **🏠 Trang chủ**: Dashboard tổng quan với thống kê
- **📦 Quản lý kho**: Thêm, sửa, xóa thuốc
- **💊 Sản phẩm**: Danh sách và tìm kiếm thuốc
- **👥 Nhân viên**: Quản lý thông tin nhân viên
- **🧾 Báo cáo**: Thống kê và biểu đồ doanh thu
- **⚠️ Cảnh báo**: Thông báo thuốc sắp hết hạn, tồn kho thấp
- **🛒 Thanh toán**: Giao diện checkout đơn giản

## 🚀 Cách chạy

### Phương pháp 1: Mở trực tiếp
1. Tải toàn bộ thư mục `PharmaT`
2. Mở file `frontend/src/views/home.html` bằng trình duyệt web
3. Hoặc mở bất kỳ file HTML nào khác trong thư mục `frontend/src/views/`

### Phương pháp 2: Sử dụng Live Server (Khuyến nghị)
1. Cài đặt extension "Live Server" trong VS Code
2. Click chuột phải vào file `frontend/src/views/home.html`
3. Chọn "Open with Live Server"
4. Trình duyệt sẽ tự động mở với địa chỉ local

### Phương pháp 3: Sử dụng Python (nếu có)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Sau đó truy cập: `http://localhost:8000`

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

## 📊 Dữ liệu mẫu

Ứng dụng sử dụng dữ liệu tĩnh mẫu bao gồm:
- **15 loại thuốc** với thông tin đầy đủ
- **Nhân viên** và **khách hàng** mẫu
- **Dữ liệu báo cáo** và **thống kê** giả lập
- **Hình ảnh sản phẩm** có sẵn

## 🔧 Tính năng kỹ thuật

- **Pure Frontend**: Không cần server backend
- **Local Storage**: Lưu trữ dữ liệu tạm thời
- **Chart.js**: Biểu đồ tương tác
- **Awesomplete**: Auto-complete cho tìm kiếm
- **Responsive CSS**: Tương thích mobile
- **Modern JavaScript**: ES6+ features

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

- **Dữ liệu tĩnh**: Tất cả dữ liệu là mẫu, không lưu trữ thực tế
- **Demo Mode**: Các thao tác chỉ là mô phỏng
- **Không có Backend**: Không có API server thực tế
- **Local Only**: Chạy hoàn toàn trên trình duyệt

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

## 🚀 Phát triển tiếp

Để chuyển đổi thành ứng dụng thực tế:
1. **Backend Development**: Xây dựng API server trong thư mục `backend/`
2. **Database Integration**: Kết nối database thực (MySQL, PostgreSQL, MongoDB)
3. **API Endpoints**: Implement RESTful API cho các tính năng
4. **Authentication**: Thêm hệ thống đăng nhập/đăng ký
5. **Deployment**: Deploy frontend và backend riêng biệt

## 📞 Hỗ trợ

Nếu có vấn đề hoặc câu hỏi:
- Kiểm tra console browser (F12) để xem lỗi
- Đảm bảo mở qua HTTP server (không phải file://)
- Kiểm tra tương thích trình duyệt

---

**PharmaT Frontend Only** - Một ứng dụng quản lý tiệm thuốc đơn giản và hiệu quả! 🏥💊

