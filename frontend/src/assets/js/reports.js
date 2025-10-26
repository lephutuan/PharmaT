// Reports JavaScript functionality
let revenueChart, medicineGroupChart;
let currentPage = 1;
let totalPages = 5;
let currentData = null;

// API Base URL - Disabled for frontend-only version
// const API_BASE_URL = './backend/api';

// Initialize charts when page loads
document.addEventListener("DOMContentLoaded", async function () {
  try {
    initializeCharts();
    updateDateTime();
    await loadReportsData(); // Load real data from API
    setInterval(updateDateTime, 60000); // Update every minute
  } catch (error) {
    console.error("Error initializing reports:", error);
    loadStaticData(); // Fallback to static data
  }
});

// Load reports data from API
async function loadReportsData() {
  try {
    const timeFilter = document.getElementById("timeFilter").value;

    // Get reports data from API
    const data = await window.API.getReportsData(timeFilter);

    currentData = data;
    updateUIWithData(data);
  } catch (error) {
    console.error("Error loading reports data:", error);
    // Fallback to static data if API fails
    loadStaticData();
  }
}

// Update UI with data from API
function updateUIWithData(data) {
  // Update stats cards
  if (data.stats) {
    const revenueEl = document.getElementById("totalRevenue");
    const ordersEl = document.getElementById("totalOrders");
    const inventoryEl = document.getElementById("totalInventory");
    const expiringEl = document.getElementById("expiringMeds");

    if (revenueEl) revenueEl.textContent = data.stats.totalRevenue || "0";
    if (ordersEl) ordersEl.textContent = data.stats.totalOrders || "0";
    if (inventoryEl) inventoryEl.textContent = data.stats.totalInventory || "0";
    if (expiringEl) expiringEl.textContent = data.stats.expiringMeds || "0";
  }

  // Update detail table
  updateDetailTable(data.detailTable || []);

  // Update alerts
  updateAlerts(data.alerts || {});
}

// Fallback to static data
async function loadStaticData() {
  const timeFilter = document.getElementById("timeFilter").value;
  updateStats(timeFilter);
  updateCharts(timeFilter);

  // Try to get data from API if available
  try {
    const data = await window.API.getStatistics();
    document.getElementById("totalInventory").textContent =
      data.totalMedicines || 0;
    document.getElementById("totalOrders").textContent = data.todayOrders || 0;
  } catch (error) {
    console.error("Failed to load API data:", error);
  }
}

// Update date and time filter based on selection
async function updateReports() {
  const timeFilter = document.getElementById("timeFilter").value;

  // Load new data from API
  try {
    await loadReportsData();
  } catch (error) {
    console.error("Error updating reports:", error);
    loadStaticData();
  }
}

// Update stats cards
function updateStats(timeFilter) {
  // Sample data - in real app, this would come from API
  const statsData = {
    today: { revenue: "450K", orders: 23, inventory: 1234, expiring: 5 },
    week: { revenue: "3.2M", orders: 156, inventory: 1234, expiring: 12 },
    month: { revenue: "12.5M", orders: 567, inventory: 1234, expiring: 23 },
  };

  const data = statsData[timeFilter] || statsData.month;

  document.getElementById("totalRevenue").textContent = data.revenue;
  document.getElementById("totalOrders").textContent = data.orders;
  document.getElementById("totalInventory").textContent = data.inventory;
  document.getElementById("expiringMeds").textContent = data.expiring;
}

// Initialize all charts
function initializeCharts() {
  initRevenueChart();
  initMedicineGroupChart();
}

// Initialize revenue chart
function initRevenueChart() {
  const ctx = document.getElementById("revenueChart").getContext("2d");

  revenueChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
      datasets: [
        {
          label: "Doanh thu (VNĐ)",
          data: [1200000, 1900000, 800000, 1500000, 2000000, 1800000, 1300000],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return (value / 1000000).toFixed(1) + "M";
            },
          },
          grid: {
            color: "#f3f4f6",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      elements: {
        point: {
          hoverRadius: 8,
        },
      },
    },
  });
}

// Initialize medicine group pie chart
function initMedicineGroupChart() {
  const ctx = document.getElementById("medicineGroupChart").getContext("2d");

  medicineGroupChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Thuốc kê đơn", "Thuốc không kê đơn", "Thực phẩm chức năng"],
      datasets: [
        {
          data: [50, 35, 15],
          backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed;
              return `${label}: ${value}%`;
            },
          },
        },
      },
      cutout: "60%",
    },
  });
}

// Update charts based on filters
function updateCharts(timeFilter) {
  // Chart is hardcoded to show weekly data
  // No need to update based on filter
}

// Table functionality
function filterTable() {
  const searchTerm = document.getElementById("searchTable").value.toLowerCase();
  const filterValue = document.getElementById("tableFilter").value;
  const table = document.getElementById("detailTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
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
    if (filterValue !== "all" && showRow) {
      const revenue = parseInt(cells[1].textContent.replace(/[^\d]/g, ""));
      if (filterValue === "high" && revenue < 1000000) showRow = false;
      if (filterValue === "medium" && (revenue < 500000 || revenue >= 1000000))
        showRow = false;
      if (filterValue === "low" && revenue >= 500000) showRow = false;
    }

    row.style.display = showRow ? "" : "none";
  }
}

// Sort table
function sortTable(columnIndex) {
  const table = document.getElementById("detailTable");
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = Array.from(tbody.getElementsByTagName("tr"));

  // Determine sort direction
  const header = table.getElementsByTagName("th")[columnIndex];
  const isAscending = !header.classList.contains("sort-desc");

  // Clear all sort classes
  table.querySelectorAll("th").forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc");
  });

  // Add sort class to current header
  header.classList.add(isAscending ? "sort-asc" : "sort-desc");

  // Sort rows
  rows.sort((a, b) => {
    const aValue = a.getElementsByTagName("td")[columnIndex].textContent;
    const bValue = b.getElementsByTagName("td")[columnIndex].textContent;

    // Handle different data types
    let comparison = 0;
    if (columnIndex === 1) {
      // Revenue column
      const aNum = parseInt(aValue.replace(/[^\d]/g, ""));
      const bNum = parseInt(bValue.replace(/[^\d]/g, ""));
      comparison = aNum - bNum;
    } else if (columnIndex === 2) {
      // Orders column
      comparison = parseInt(aValue) - parseInt(bValue);
    } else {
      comparison = aValue.localeCompare(bValue);
    }

    return isAscending ? comparison : -comparison;
  });

  // Reorder rows in table
  rows.forEach((row) => tbody.appendChild(row));
}

// Export table to Excel
function exportTable() {
  const table = document.getElementById("detailTable");
  const rows = table.getElementsByTagName("tr");
  let csvContent = "";

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName(i === 0 ? "th" : "td");
    const rowData = [];

    for (let j = 0; j < cells.length; j++) {
      rowData.push(cells[j].textContent);
    }

    csvContent += rowData.join(",") + "\n";
  }

  // Create download link
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bao-cao-chi-tiet.csv";
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
  document.getElementById(
    "pageInfo"
  ).textContent = `Trang ${currentPage} / ${totalPages}`;

  // Update button states
  const prevBtn = document.querySelector(
    ".table-pagination button:first-child"
  );
  const nextBtn = document.querySelector(".table-pagination button:last-child");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Alert functions
function viewAllExpiring() {
  alert("Chức năng xem tất cả thuốc sắp hết hạn sẽ được triển khai");
}

function viewAllLowStock() {
  alert("Chức năng xem tất cả thuốc tồn kho thấp sẽ được triển khai");
}

// Update current date time
function updateDateTime() {
  // No longer needed custom date inputs
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
    const labels = data.medicineGroups.map((item) => item.label);
    const values = data.medicineGroups.map((item) => item.value);

    // Define colors for different medicine groups
    const colorMap = {
      "Thuốc kê đơn": "#3b82f6",
      "Thuốc không kê đơn": "#10b981",
      "Thực phẩm chức năng": "#f59e0b",
    };

    const colors = labels.map((label) => colorMap[label] || "#6b7280");

    medicineGroupChart.data.labels = labels;
    medicineGroupChart.data.datasets[0].data = values;
    medicineGroupChart.data.datasets[0].backgroundColor = colors;
    medicineGroupChart.update();
  }
}

// Update detail table
function updateDetailTable(tableData) {
  const tbody = document.querySelector("#detailTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!tableData || tableData.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td colspan="5" style="text-align: center; padding: 20px;">Chưa có dữ liệu</td>';
    tbody.appendChild(tr);
    return;
  }

  tableData.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${row.ngay}</td>
            <td>${row.doanh_thu || "0"} VNĐ</td>
            <td>${row.so_hoa_don || "0"}</td>
            <td>${row.nv_thuc_hien_nhieu_nhat || "Không rõ"}</td>
            <td>${row.thuoc_ban_chay_nhat || "Chưa có"}</td>
        `;
    tbody.appendChild(tr);
  });
}

// Update alerts
function updateAlerts(alerts) {
  // Update expiring medicines
  if (alerts.expiring) {
    const expiringContainer = document.querySelector(
      ".expiring-alert .alert-list"
    );
    const expiringCount = document.querySelector(
      ".expiring-alert .alert-count"
    );

    if (expiringContainer) {
      expiringContainer.innerHTML = "";

      if (alerts.expiring.length === 0) {
        expiringContainer.innerHTML =
          '<div style="padding: 20px; text-align: center; color: #666;">Không có thuốc sắp hết hạn</div>';
      } else {
        alerts.expiring.slice(0, 3).forEach((item) => {
          const alertItem = document.createElement("div");
          alertItem.className = `alert-item ${item.status}`;
          const imageUrl = item.anh || "../assets/images/placeholder.png";
          const expiryDate = new Date(item.han_su_dung).toLocaleDateString(
            "vi-VN"
          );

          alertItem.innerHTML = `
                        <img src="${imageUrl}" alt="${item.ten_thuoc}" />
                        <div class="alert-info">
                            <h4>${item.ten_thuoc}</h4>
                            <p>Hết hạn: ${expiryDate} (${
            item.days_left
          } ngày)</p>
                            <span class="alert-quantity">Số lượng: ${
                              item.so_luong
                            } ${item.don_vi}</span>
                        </div>
                        <div class="alert-status ${item.status}">
                            ${
                              item.status === "critical"
                                ? "Khẩn cấp"
                                : "Cảnh báo"
                            }
                        </div>
                    `;
          expiringContainer.appendChild(alertItem);
        });
      }
    }

    if (expiringCount) {
      expiringCount.textContent = `${alerts.expiring.length} sản phẩm`;
    }
  }

  // Update low stock medicines
  if (alerts.lowStock) {
    const lowStockContainer = document.querySelector(
      ".stock-alert .alert-list"
    );
    const lowStockCount = document.querySelector(".stock-alert .alert-count");

    if (lowStockContainer) {
      lowStockContainer.innerHTML = "";

      if (alerts.lowStock.length === 0) {
        lowStockContainer.innerHTML =
          '<div style="padding: 20px; text-align: center; color: #666;">Không có thuốc tồn kho thấp</div>';
      } else {
        alerts.lowStock.slice(0, 3).forEach((item) => {
          const alertItem = document.createElement("div");
          alertItem.className = `alert-item ${item.status}`;
          const imageUrl = item.anh || "../assets/images/placeholder.png";

          alertItem.innerHTML = `
                        <img src="${imageUrl}" alt="${item.ten_thuoc}" />
                        <div class="alert-info">
                            <h4>${item.ten_thuoc}</h4>
                            <p>Tồn kho: ${item.so_luong} ${item.don_vi}</p>
                            <span class="alert-quantity">Mức tối thiểu: ${
                              item.sl_toi_thieu
                            } ${item.don_vi}</span>
                        </div>
                        <div class="alert-status ${item.status}">
                            ${
                              item.status === "critical"
                                ? "Hết hàng"
                                : "Sắp hết"
                            }
                        </div>
                    `;
          lowStockContainer.appendChild(alertItem);
        });
      }
    }

    if (lowStockCount) {
      lowStockCount.textContent = `${alerts.lowStock.length} sản phẩm`;
    }
  }
}

// Removed switchRevenueChart function - no longer needed

// Initialize page info
updatePageInfo();
