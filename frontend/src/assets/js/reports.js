// Reports JavaScript functionality
let revenueChart, medicineGroupChart, inventoryChart;
let currentPage = 1;
let totalPages = 5;
let currentData = null;

// API Base URL - Disabled for frontend-only version
// const API_BASE_URL = './backend/api';

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    updateDateTime();
    loadStaticData(); // Load static data instead of API
    setInterval(updateDateTime, 60000); // Update every minute
});

// Load reports data from API
async function loadReportsData() {
    try {
        const timeFilter = document.getElementById('timeFilter').value;
        const reportType = document.getElementById('reportType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        let url = `${API_BASE_URL}/reports/stats.php?timeFilter=${timeFilter}&reportType=${reportType}`;
        
        if (timeFilter === 'custom' && startDate && endDate) {
            url += `&startDate=${startDate}&endDate=${endDate}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error('API Error:', data.message);
            return;
        }
        
        currentData = data;
        updateUIWithData(data);
        
    } catch (error) {
        console.error('Error loading reports data:', error);
        // Fallback to static data if API fails
        loadStaticData();
    }
}

// Update UI with data from API
function updateUIWithData(data) {
    // Update stats cards
    if (data.stats) {
        document.getElementById('totalRevenue').textContent = data.stats.totalRevenue;
        document.getElementById('totalOrders').textContent = data.stats.totalOrders;
        document.getElementById('totalInventory').textContent = data.stats.totalInventory;
        document.getElementById('expiringMeds').textContent = data.stats.expiringMeds;
    }
    
    // Update charts
    updateChartsWithData(data);
    
    // Update top medicines list
    updateTopMedicinesList(data.topMedicines || []);
    
    // Update detail table
    updateDetailTable(data.detailTable || []);
    
    // Update alerts
    updateAlerts(data.alerts || {});
}

// Fallback to static data
function loadStaticData() {
    const timeFilter = document.getElementById('timeFilter').value;
    updateStats(timeFilter, document.getElementById('reportType').value);
    updateCharts(timeFilter, document.getElementById('reportType').value);
}

// Update date and time filter based on selection
function updateReports() {
    const timeFilter = document.getElementById('timeFilter').value;
    const reportType = document.getElementById('reportType').value;
    const customDateRange = document.getElementById('customDateRange');
    
    // Show/hide custom date range
    if (timeFilter === 'custom') {
        customDateRange.style.display = 'flex';
    } else {
        customDateRange.style.display = 'none';
    }
    
    // Load new static data
    loadStaticData();
}

// Apply custom date range
function applyCustomDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
        alert('Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc');
        return;
    }
    
    // Load new static data with custom date range
    loadStaticData();
}

// Update stats cards
function updateStats(timeFilter, reportType) {
    // Sample data - in real app, this would come from API
    const statsData = {
        today: { revenue: '450K', orders: 23, inventory: 1234, expiring: 5 },
        week: { revenue: '3.2M', orders: 156, inventory: 1234, expiring: 12 },
        month: { revenue: '12.5M', orders: 567, inventory: 1234, expiring: 23 },
        quarter: { revenue: '35.8M', orders: 1678, inventory: 1234, expiring: 45 },
        year: { revenue: '125.6M', orders: 6234, inventory: 1234, expiring: 89 }
    };
    
    const data = statsData[timeFilter] || statsData.month;
    
    document.getElementById('totalRevenue').textContent = data.revenue;
    document.getElementById('totalOrders').textContent = data.orders;
    document.getElementById('totalInventory').textContent = data.inventory;
    document.getElementById('expiringMeds').textContent = data.expiring;
}

// Initialize all charts
function initializeCharts() {
    initRevenueChart();
    initMedicineGroupChart();
    initInventoryChart();
}

// Initialize revenue chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: [1200000, 1900000, 800000, 1500000, 2000000, 1800000, 1300000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000).toFixed(1) + 'M';
                        }
                    },
                    grid: {
                        color: '#f3f4f6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

// Initialize medicine group pie chart
function initMedicineGroupChart() {
    const ctx = document.getElementById('medicineGroupChart').getContext('2d');
    
    medicineGroupChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Thuốc kê đơn', 'Thuốc không kê đơn', 'Thực phẩm chức năng', 'Dụng cụ y tế'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Initialize inventory bar chart
function initInventoryChart() {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    
    inventoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'],
            datasets: [{
                label: 'Số lượng nhập',
                data: [120, 190, 80, 150, 200, 180, 130, 170, 160, 220],
                backgroundColor: '#10b981',
                borderRadius: 4,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Update charts based on filters
function updateCharts(timeFilter, reportType) {
    // Sample data updates - in real app, this would fetch from API
    const revenueData = {
        daily: {
            labels: ['6h', '9h', '12h', '15h', '18h', '21h'],
            data: [200000, 450000, 800000, 600000, 900000, 300000]
        },
        weekly: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            data: [1200000, 1900000, 800000, 1500000, 2000000, 1800000, 1300000]
        },
        monthly: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
            data: [12000000, 19000000, 8000000, 15000000, 20000000, 18000000]
        }
    };
    
    // Update revenue chart with sample data
    if (revenueChart) {
        const data = revenueData.weekly; // Default to weekly
        revenueChart.data.labels = data.labels;
        revenueChart.data.datasets[0].data = data.data;
        revenueChart.update();
    }
}

// Switch revenue chart view
function switchRevenueChart(period) {
    // Update button states
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const revenueData = {
        daily: {
            labels: ['6h', '9h', '12h', '15h', '18h', '21h'],
            data: [200000, 450000, 800000, 600000, 900000, 300000]
        },
        weekly: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            data: [1200000, 1900000, 800000, 1500000, 2000000, 1800000, 1300000]
        },
        monthly: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
            data: [12000000, 19000000, 8000000, 15000000, 20000000, 18000000]
        }
    };
    
    const data = revenueData[period];
    if (revenueChart && data) {
        revenueChart.data.labels = data.labels;
        revenueChart.data.datasets[0].data = data.data;
        revenueChart.update();
    }
}

// Switch top medicines view
function switchTopMeds(type) {
    // Update button states
    const buttons = event.target.parentElement.querySelectorAll('.chart-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In real app, this would update the medicine list based on type
    console.log('Switching top medicines view to:', type);
}

// Table functionality
function filterTable() {
    const searchTerm = document.getElementById('searchTable').value.toLowerCase();
    const filterValue = document.getElementById('tableFilter').value;
    const table = document.getElementById('detailTable');
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let showRow = true;
        
        // Search filter
        if (searchTerm) {
            let found = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                    break;
                }
            }
            if (!found) showRow = false;
        }
        
        // Category filter
        if (filterValue !== 'all' && showRow) {
            const revenue = parseInt(cells[1].textContent.replace(/[^\d]/g, ''));
            if (filterValue === 'high' && revenue < 1000000) showRow = false;
            if (filterValue === 'medium' && (revenue < 500000 || revenue >= 1000000)) showRow = false;
            if (filterValue === 'low' && revenue >= 500000) showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    }
}

// Sort table
function sortTable(columnIndex) {
    const table = document.getElementById('detailTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));
    
    // Determine sort direction
    const header = table.getElementsByTagName('th')[columnIndex];
    const isAscending = !header.classList.contains('sort-desc');
    
    // Clear all sort classes
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });
    
    // Add sort class to current header
    header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
    
    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName('td')[columnIndex].textContent;
        const bValue = b.getElementsByTagName('td')[columnIndex].textContent;
        
        // Handle different data types
        let comparison = 0;
        if (columnIndex === 1) { // Revenue column
            const aNum = parseInt(aValue.replace(/[^\d]/g, ''));
            const bNum = parseInt(bValue.replace(/[^\d]/g, ''));
            comparison = aNum - bNum;
        } else if (columnIndex === 2) { // Orders column
            comparison = parseInt(aValue) - parseInt(bValue);
        } else {
            comparison = aValue.localeCompare(bValue);
        }
        
        return isAscending ? comparison : -comparison;
    });
    
    // Reorder rows in table
    rows.forEach(row => tbody.appendChild(row));
}

// Export table to Excel
function exportTable() {
    const table = document.getElementById('detailTable');
    const rows = table.getElementsByTagName('tr');
    let csvContent = '';
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName(i === 0 ? 'th' : 'td');
        const rowData = [];
        
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }
        
        csvContent += rowData.join(',') + '\n';
    }
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bao-cao-chi-tiet.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Pagination
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePageInfo();
        // In real app, this would fetch new data
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePageInfo();
        // In real app, this would fetch new data
    }
}

function updatePageInfo() {
    document.getElementById('pageInfo').textContent = `Trang ${currentPage} / ${totalPages}`;
    
    // Update button states
    const prevBtn = document.querySelector('.table-pagination button:first-child');
    const nextBtn = document.querySelector('.table-pagination button:last-child');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Alert functions
function viewAllExpiring() {
    alert('Chức năng xem tất cả thuốc sắp hết hạn sẽ được triển khai');
}

function viewAllLowStock() {
    alert('Chức năng xem tất cả thuốc tồn kho thấp sẽ được triển khai');
}

// Update current date time
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    // Set default dates for custom range
    const today = now.toISOString().split('T')[0];
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if (startDateInput && !startDateInput.value) {
        startDateInput.value = lastWeek;
    }
    if (endDateInput && !endDateInput.value) {
        endDateInput.value = today;
    }
}

// Update table based on filters
function updateTable(timeFilter, reportType) {
    // In real app, this would fetch data from API based on filters
    console.log('Updating table for:', timeFilter, reportType);
}

// Update charts with data from API
function updateChartsWithData(data) {
    // Update revenue chart
    if (data.revenueChart && revenueChart) {
        revenueChart.data.labels = data.revenueChart.labels;
        revenueChart.data.datasets[0].data = data.revenueChart.data;
        revenueChart.update();
    }
    
    // Update medicine group chart
    if (data.medicineGroups && medicineGroupChart) {
        const labels = data.medicineGroups.map(item => item.label);
        const values = data.medicineGroups.map(item => item.value);
        
        // Define colors for different medicine groups
        const colorMap = {
            'Thuốc kê đơn': '#3b82f6',
            'Thuốc không kê đơn': '#10b981', 
            'Thực phẩm chức năng': '#f59e0b',
            'Dụng cụ y tế': '#ef4444'
        };
        
        const colors = labels.map(label => colorMap[label] || '#6b7280');
        
        medicineGroupChart.data.labels = labels;
        medicineGroupChart.data.datasets[0].data = values;
        medicineGroupChart.data.datasets[0].backgroundColor = colors;
        medicineGroupChart.update();
    }
    
    // Update inventory chart
    if (data.inventoryChart && inventoryChart) {
        inventoryChart.data.labels = data.inventoryChart.labels;
        inventoryChart.data.datasets[0].data = data.inventoryChart.data;
        inventoryChart.update();
    }
}

// Update top medicines list
function updateTopMedicinesList(medicines) {
    const container = document.querySelector('.top-medicines-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    medicines.forEach(medicine => {
        const medicineItem = document.createElement('div');
        medicineItem.className = 'medicine-item';
        medicineItem.innerHTML = `
            <div class="medicine-info">
                <img src="${medicine.image}" alt="${medicine.name}" />
                <div>
                    <h4>${medicine.name}</h4>
                    <p>${medicine.quantity}</p>
                </div>
            </div>
            <div class="medicine-revenue">${medicine.revenue} VNĐ</div>
        `;
        container.appendChild(medicineItem);
    });
}

// Update detail table
function updateDetailTable(tableData) {
    const tbody = document.querySelector('#detailTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    tableData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.ngay}</td>
            <td>${row.doanh_thu} VNĐ</td>
            <td>${row.so_hoa_don}</td>
            <td>${row.nhan_vien}</td>
            <td>${row.ghi_chu}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Update alerts
function updateAlerts(alerts) {
    // Update expiring medicines
    if (alerts.expiring) {
        const expiringContainer = document.querySelector('.expiring-alert .alert-list');
        const expiringCount = document.querySelector('.expiring-alert .alert-count');
        
        if (expiringContainer) {
            expiringContainer.innerHTML = '';
            alerts.expiring.slice(0, 3).forEach(item => {
                const alertItem = document.createElement('div');
                alertItem.className = `alert-item ${item.status}`;
                alertItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="alert-info">
                        <h4>${item.name}</h4>
                        <p>Hết hạn: ${item.expiry_date} (${item.days_left} ngày)</p>
                        <span class="alert-quantity">Số lượng: ${item.quantity}</span>
                    </div>
                    <div class="alert-status ${item.status}">
                        ${item.status === 'critical' ? 'Khẩn cấp' : 'Cảnh báo'}
                    </div>
                `;
                expiringContainer.appendChild(alertItem);
            });
        }
        
        if (expiringCount) {
            expiringCount.textContent = `${alerts.expiring.length} sản phẩm`;
        }
    }
    
    // Update low stock medicines
    if (alerts.lowStock) {
        const lowStockContainer = document.querySelector('.stock-alert .alert-list');
        const lowStockCount = document.querySelector('.stock-alert .alert-count');
        
        if (lowStockContainer) {
            lowStockContainer.innerHTML = '';
            alerts.lowStock.slice(0, 3).forEach(item => {
                const alertItem = document.createElement('div');
                alertItem.className = `alert-item ${item.status}`;
                alertItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" />
                    <div class="alert-info">
                        <h4>${item.name}</h4>
                        <p>Tồn kho: ${item.current_stock} hộp</p>
                        <span class="alert-quantity">Mức tối thiểu: ${item.min_stock} hộp</span>
                    </div>
                    <div class="alert-status ${item.status}">
                        ${item.status === 'critical' ? 'Hết hàng' : 'Sắp hết'}
                    </div>
                `;
                lowStockContainer.appendChild(alertItem);
            });
        }
        
        if (lowStockCount) {
            lowStockCount.textContent = `${alerts.lowStock.length} sản phẩm`;
        }
    }
}

// Update switch revenue chart to use API data
function switchRevenueChart(period) {
    // Update button states
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // If we have current data, use it to update chart based on period
    if (currentData && currentData.revenueChart) {
        // For now, use the same data - in a real app, you'd make another API call
        // with the specific period parameter
        if (revenueChart) {
            revenueChart.data.labels = currentData.revenueChart.labels;
            revenueChart.data.datasets[0].data = currentData.revenueChart.data;
            revenueChart.update();
        }
    } else {
        // Fallback to static data
        const revenueData = {
            daily: {
                labels: ['6h', '9h', '12h', '15h', '18h', '21h'],
                data: [200000, 450000, 800000, 600000, 900000, 300000]
            },
            weekly: {
                labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
                data: [1200000, 1900000, 800000, 1500000, 2000000, 1800000, 1300000]
            },
            monthly: {
                labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
                data: [12000000, 19000000, 8000000, 15000000, 20000000, 18000000]
            }
        };
        
        const data = revenueData[period];
        if (revenueChart && data) {
            revenueChart.data.labels = data.labels;
            revenueChart.data.datasets[0].data = data.data;
            revenueChart.update();
        }
    }
}

// Initialize page info
updatePageInfo();
