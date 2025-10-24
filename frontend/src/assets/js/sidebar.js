function setActive(element) {
  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.classList.remove("active");
  });
  element.classList.add("active");
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  
  sidebar.classList.toggle("active");
  
  // Chỉ hiển thị overlay trên mobile
  if (window.innerWidth <= 768) {
    if (overlay) {
      overlay.classList.toggle("active");
    }
  }
}

// Đóng sidebar khi click vào overlay
function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  
  sidebar.classList.remove("active");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

function logout() {
  if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
    // Xóa dữ liệu session/localStorage nếu có
    localStorage.clear();
    sessionStorage.clear();
    
    // Chuyển hướng về trang login
    window.location.href = "login.html";
  }
}

// Main functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log('Sidebar loaded');
  
  // Handle logo click
  const logo = document.querySelector('.logo a');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '../../index.html';
    });
  }
  
  // Handle menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      toggleSidebar();
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth <= 768 && sidebar && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      closeSidebar();
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (window.innerWidth > 768 && sidebar) {
      sidebar.classList.remove('active');
      if (overlay) {
        overlay.classList.remove('active');
      }
    }
  });

  // Highlight active sidebar link based on current page
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sidebar a").forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath || (currentPath === "index.html" && linkPath === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});