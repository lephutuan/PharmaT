// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page loaded');
    
    // Initialize dashboard
    initializeDashboard();
    
    // Add click handlers for quick actions
    setupQuickActions();
    
    // Simulate real-time updates
    startRealTimeUpdates();
});

function initializeDashboard() {
    // Add any dashboard initialization code here
    console.log('Dashboard initialized');
    
    // Update current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
}

function setupQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add loading effect
            this.style.opacity = '0.7';
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function startRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        updateStats();
        updateRecentActivity();
    }, 30000); // Update every 30 seconds
}

function updateStats() {
    // Simulate updating stats with random variations
    const statCards = document.querySelectorAll('.stat-card h3');
    statCards.forEach(card => {
        const currentValue = parseInt(card.textContent.replace(/[^\d]/g, ''));
        if (currentValue && Math.random() > 0.7) { // 30% chance to update
            const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
            const newValue = Math.max(0, currentValue + variation);
            
            // Animate the change
            card.style.color = variation > 0 ? '#10b981' : '#ef4444';
            card.textContent = card.textContent.replace(/\d+/, newValue.toLocaleString());
            
            setTimeout(() => {
                card.style.color = '';
            }, 1000);
        }
    });
}

function updateRecentActivity() {
    // Simulate adding new activity items
    const activityList = document.querySelector('.activity-list');
    if (activityList && Math.random() > 0.8) { // 20% chance to add new activity
        const activities = [
            { icon: '➕', title: 'Thêm thuốc mới', desc: 'Vitamin D3 1000IU - ' + getCurrentTime() },
            { icon: '💳', title: 'Thanh toán đơn hàng', desc: 'Đơn #' + Math.floor(Math.random() * 9999) + ' - ' + Math.floor(Math.random() * 500000).toLocaleString() + ' VNĐ - ' + getCurrentTime() },
            { icon: '⚠️', title: 'Cảnh báo tồn kho', desc: 'Thuốc sắp hết hàng - ' + getCurrentTime() },
            { icon: '👥', title: 'Thêm nhân viên', desc: 'Nhân viên mới được thêm - ' + getCurrentTime() }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">${randomActivity.icon}</div>
            <div class="activity-content">
                <h4>${randomActivity.title}</h4>
                <p>${randomActivity.desc}</p>
            </div>
        `;
        
        // Add to top of list
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Remove oldest item if more than 5
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 5) {
            activityList.removeChild(items[items.length - 1]);
        }
        
        // Add animation
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            activityItem.style.transition = 'all 0.3s ease';
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateY(0)';
        }, 100);
    }
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Update time in any time displays
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(element => {
        element.textContent = timeString;
    });
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Export functions for use in other files
window.HomePage = {
    updateStats,
    updateRecentActivity,
    updateCurrentTime
};
