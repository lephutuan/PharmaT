/**
 * Cấu hình ứng dụng PharmaT
 * File này chứa các cấu hình chung cho toàn bộ ứng dụng
 */

const AppConfig = {
    // Thông tin ứng dụng
    app: {
        name: 'PharmaT',
        version: '1.0.0',
        description: 'Hệ thống quản lý tiệm thuốc',
        author: 'PharmaT Team',
        mode: 'frontend-only' // 'frontend-only', 'full-stack'
    },

    // Cấu hình API (cho tương lai khi có backend)
    api: {
        baseUrl: '', // Sẽ được cấu hình khi có backend
        timeout: 10000,
        retryAttempts: 3
    },

    // Cấu hình UI
    ui: {
        theme: 'light', // 'light', 'dark'
        language: 'vi', // 'vi', 'en'
        itemsPerPage: 10,
        autoRefresh: true,
        refreshInterval: 30000 // 30 seconds
    },

    // Cấu hình dữ liệu mẫu
    sampleData: {
        medicines: [
            {
                id: 1,
                name: 'Paracetamol 500mg',
                unit: 'Viên',
                importPrice: 2000,
                exportPrice: 3000,
                quantity: 1000,
                minQuantity: 50,
                expiryDate: '2025-12-31',
                status: 'Còn hạn',
                category: 'Thuốc không kê đơn',
                image: 'paracetamol.png'
            },
            {
                id: 2,
                name: 'Amoxicillin 500mg',
                unit: 'Viên',
                importPrice: 2500,
                exportPrice: 4000,
                quantity: 500,
                minQuantity: 30,
                expiryDate: '2025-06-30',
                status: 'Còn hạn',
                category: 'Thuốc kê đơn',
                image: 'amoxicillin.jpg'
            },
            {
                id: 3,
                name: 'Vitamin C 1000mg',
                unit: 'Viên',
                importPrice: 1500,
                exportPrice: 2500,
                quantity: 800,
                minQuantity: 100,
                expiryDate: '2026-01-31',
                status: 'Còn hạn',
                category: 'Thực phẩm chức năng',
                image: 'vitamin_c.jpg'
            }
        ],
        employees: [
            {
                id: 1,
                name: 'Nguyễn Văn A',
                position: 'Dược sĩ',
                phone: '0123456789',
                email: 'nguyenvana@pharmat.com',
                status: 'Hoạt động'
            },
            {
                id: 2,
                name: 'Trần Thị B',
                position: 'Nhân viên bán hàng',
                phone: '0987654321',
                email: 'tranthib@pharmat.com',
                status: 'Hoạt động'
            }
        ],
        customers: [
            {
                id: 1,
                name: 'Phạm Văn C',
                phone: '0369852147',
                email: 'phamvanc@gmail.com',
                address: '123 Đường ABC, Quận 1, TP.HCM'
            }
        ]
    },

    // Cấu hình cảnh báo
    alerts: {
        expiryWarningDays: 30, // Cảnh báo trước 30 ngày hết hạn
        lowStockThreshold: 0.2, // Cảnh báo khi còn 20% tồn kho
        checkInterval: 60000 // Kiểm tra mỗi 1 phút
    },

    // Cấu hình báo cáo
    reports: {
        defaultTimeRange: 'month', // 'today', 'week', 'month', 'quarter', 'year'
        chartColors: {
            primary: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#06b6d4'
        }
    },

    // Cấu hình localStorage
    storage: {
        prefix: 'pharmat_',
        keys: {
            user: 'user',
            settings: 'settings',
            cart: 'cart',
            filters: 'filters'
        }
    },

    // Cấu hình validation
    validation: {
        medicine: {
            name: { required: true, minLength: 2, maxLength: 100 },
            price: { required: true, min: 0 },
            quantity: { required: true, min: 0 }
        },
        employee: {
            name: { required: true, minLength: 2, maxLength: 50 },
            phone: { required: true, pattern: /^[0-9]{10,11}$/ },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
        }
    },

    // Cấu hình debug
    debug: {
        enabled: false, // Bật/tắt debug mode
        logLevel: 'info', // 'error', 'warn', 'info', 'debug'
        showPerformance: false
    }
};

// Export cho sử dụng trong các module khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
} else if (typeof window !== 'undefined') {
    window.AppConfig = AppConfig;
}
