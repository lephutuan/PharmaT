document.addEventListener('DOMContentLoaded', () => {
    // Check if AppConfig and sample data exist
    if (typeof AppConfig === 'undefined' || !AppConfig.sampleData || !AppConfig.sampleData.medicines) {
        console.error('AppConfig or sample data is not defined.');
        return;
    }

    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) {
        console.error('Chat messages container not found.');
        return;
    }

    const medicines = AppConfig.sampleData.medicines;
    const lowStockThreshold = AppConfig.alerts.lowStockThreshold || 0.2; // Default to 20%
    const expiryWarningDays = AppConfig.alerts.expiryWarningDays || 30; // Default to 30 days

    // Clear any existing hardcoded messages
    chatContainer.innerHTML = '';

    /**
     * Creates and appends a bot message to the chat container.
     * @param {string} title - The title of the alert.
     * @param {string} content - The HTML content of the alert message.
     */
    function createAlertMessage(title, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot');

        messageElement.innerHTML = `
            <img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Robot-3d-icon.png" alt="Bot" class="chat-avatar" />
            <div class="chat-content">
                <p class="alert-title">${title}</p>
                <p>${content}</p>
            </div>
        `;
        chatContainer.appendChild(messageElement);
    }

    /**
     * Generates a timestamp for the alert.
     * @returns {string} - Formatted date and time string.
     */
    function getTimestamp() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    // --- Check for low stock items ---
    medicines.forEach(med => {
        if (med.quantity <= med.minQuantity) {
            const title = '[CẢNH BÁO - HÀNG SẮP HẾT]';
            const content = `
                Tên thuốc: ${med.name} <br />
                Mã thuốc: T${String(med.id).padStart(3, '0')} <br />
                Số lượng còn: ${med.quantity} ${med.unit} <br />
                Ngưỡng tồn kho: ${med.minQuantity} ${med.unit} <br />
                Thời gian cảnh báo: ${getTimestamp()} <br />
                👉 Vui lòng kiểm tra và nhập hàng bổ sung.
            `;
            createAlertMessage(title, content);
        }
    });

    // --- Check for expiring items ---
    const today = new Date();
    const warningDate = new Date(today);
    warningDate.setDate(today.getDate() + expiryWarningDays);

    medicines.forEach(med => {
        const expiryDate = new Date(med.expiryDate);
        if (expiryDate <= warningDate) {
            const title = '[CẢNH BÁO - THUỐC SẮP HẾT HẠN]';
            const content = `
                Tên thuốc: ${med.name} <br />
                Mã thuốc: T${String(med.id).padStart(3, '0')} <br />
                Hạn sử dụng: ${new Date(med.expiryDate).toLocaleDateString('vi-VN')} <br />
                Thời gian cảnh báo: ${getTimestamp()} <br />
                👉 Vui lòng kiểm tra và tiêu thụ trước khi hết hạn.
            `;
            createAlertMessage(title, content);
        }
    });

    // If no alerts were generated, show a message
    if (chatContainer.children.length === 0) {
        const title = '[TRẠNG THÁI HỆ THỐNG]';
        const content = `
            Không có cảnh báo nào về hàng tồn kho hoặc thuốc sắp hết hạn. <br />
            Hệ thống đang hoạt động bình thường. <br />
            Thời gian kiểm tra: ${getTimestamp()}
        `;
        createAlertMessage(title, content);
    }
});
