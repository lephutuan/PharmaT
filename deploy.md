# 🚀 Hướng dẫn Deploy PharmaT

## 📋 Tổng quan

PharmaT là một ứng dụng frontend thuần túy, có thể deploy lên nhiều platform khác nhau một cách dễ dàng.

## 🌐 Các phương pháp Deploy

### 1. GitHub Pages (Miễn phí)

**Bước 1:** Tạo repository trên GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/pharmat.git
git push -u origin main
```

**Bước 2:** Kích hoạt GitHub Pages
- Vào Settings > Pages
- Chọn Source: Deploy from a branch
- Chọn Branch: main
- Chọn Folder: / (root)
- Click Save

**Bước 3:** Truy cập ứng dụng
- URL: `https://your-username.github.io/pharmat`

### 2. Netlify (Miễn phí)

**Bước 1:** Kéo thả folder project lên Netlify
- Truy cập: https://netlify.com
- Kéo thả folder `PharmaT` vào vùng deploy

**Bước 2:** Cấu hình
- Site name: `pharmat-demo`
- Build command: (để trống)
- Publish directory: `.` (root)

**Bước 3:** Truy cập ứng dụng
- URL: `https://pharmat-demo.netlify.app`

### 3. Vercel (Miễn phí)

**Bước 1:** Cài đặt Vercel CLI
```bash
npm i -g vercel
```

**Bước 2:** Deploy
```bash
vercel
```

**Bước 3:** Truy cập ứng dụng
- URL được cung cấp bởi Vercel

### 4. Firebase Hosting (Miễn phí)

**Bước 1:** Cài đặt Firebase CLI
```bash
npm install -g firebase-tools
```

**Bước 2:** Khởi tạo project
```bash
firebase login
firebase init hosting
```

**Bước 3:** Deploy
```bash
firebase deploy
```

### 5. Surge.sh (Miễn phí)

**Bước 1:** Cài đặt Surge
```bash
npm install -g surge
```

**Bước 2:** Deploy
```bash
surge
```

### 6. Apache/Nginx Server

**Bước 1:** Upload files lên server
```bash
scp -r . user@server:/var/www/html/pharmat/
```

**Bước 2:** Cấu hình virtual host
```apache
<VirtualHost *:80>
    ServerName pharmat.yourdomain.com
    DocumentRoot /var/www/html/pharmat
    DirectoryIndex index.html
</VirtualHost>
```

## 🔧 Cấu hình cho Production

### 1. Tối ưu hóa

**Minify CSS/JS:**
```bash
# Cài đặt tools
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o src/assets/css/home.min.css src/assets/css/home.css

# Minify JS
uglifyjs src/assets/js/home.js -o src/assets/js/home.min.js
```

**Compress Images:**
```bash
# Cài đặt imagemin
npm install -g imagemin-cli

# Compress images
imagemin src/assets/images/* --out-dir=src/assets/images/compressed
```

### 2. Cache Headers

**Apache (.htaccess):**
```apache
# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

**Nginx:**
```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. HTTPS

**Let's Encrypt (Free SSL):**
```bash
# Cài đặt Certbot
sudo apt install certbot python3-certbot-apache

# Tạo SSL certificate
sudo certbot --apache -d pharmat.yourdomain.com
```

## 📱 PWA (Progressive Web App)

### 1. Tạo manifest.json
```json
{
  "name": "PharmaT",
  "short_name": "PharmaT",
  "description": "Hệ thống quản lý tiệm thuốc",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "src/assets/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "src/assets/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker
```javascript
// sw.js
const CACHE_NAME = 'pharmat-v1';
const urlsToCache = [
  '/',
  '/src/assets/css/common-responsive.css',
  '/src/assets/js/navbar.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

## 🔍 Monitoring & Analytics

### 1. Google Analytics
```html
<!-- Thêm vào <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking
```javascript
// Thêm vào main.js
window.addEventListener('error', function(e) {
  console.error('Error:', e.error);
  // Gửi lỗi đến service tracking
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📊 Performance Tips

1. **Lazy Loading:** Tải hình ảnh khi cần
2. **CDN:** Sử dụng CDN cho các thư viện
3. **Compression:** Nén files trước khi deploy
4. **Caching:** Cấu hình cache headers
5. **Minification:** Minify CSS/JS files

## 🔒 Security

1. **HTTPS:** Luôn sử dụng HTTPS
2. **CSP:** Content Security Policy
3. **Headers:** Security headers
4. **Validation:** Validate input data

---

**Lưu ý:** Đây là ứng dụng frontend-only, không cần cấu hình database hay backend server.
