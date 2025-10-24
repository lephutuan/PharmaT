/**
 * API Service cho PharmaT sử dụng Supabase
 * File này chứa các functions để tương tác với database
 */

const API = {
    // ==================== THUỐC ====================
    
    /**
     * Lấy tất cả thuốc
     */
    async getThuoc() {
        try {
            const { data, error } = await window.supabaseClient
                .from('thuoc')
                .select('*')
                .order('ma_thuoc', { ascending: false });
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thuốc:', error);
            throw error;
        }
    },

    /**
     * Thêm thuốc mới
     */
    async createThuoc(thuocData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('thuoc')
                .insert([thuocData])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi thêm thuốc:', error);
            throw error;
        }
    },

    /**
     * Cập nhật thuốc
     */
    async updateThuoc(maThuoc, thuocData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('thuoc')
                .update(thuocData)
                .eq('ma_thuoc', maThuoc)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi cập nhật thuốc:', error);
            throw error;
        }
    },

    /**
     * Xóa thuốc
     */
    async deleteThuoc(maThuoc) {
        try {
            const { error } = await window.supabaseClient
                .from('thuoc')
                .delete()
                .eq('ma_thuoc', maThuoc);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Lỗi khi xóa thuốc:', error);
            throw error;
        }
    },

    /**
     * Tìm kiếm thuốc theo tên
     */
    async searchThuoc(keyword) {
        try {
            const { data, error } = await window.supabaseClient
                .from('thuoc')
                .select('*')
                .ilike('ten_thuoc', `%${keyword}%`);
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi tìm kiếm thuốc:', error);
            throw error;
        }
    },

    // ==================== NHÂN VIÊN ====================
    
    /**
     * Lấy tất cả nhân viên
     */
    async getNhanVien() {
        try {
            const { data, error } = await window.supabaseClient
                .from('nhan_vien')
                .select('*')
                .order('ma_nv', { ascending: false });
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách nhân viên:', error);
            throw error;
        }
    },

    /**
     * Thêm nhân viên mới
     */
    async createNhanVien(nhanVienData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('nhan_vien')
                .insert([nhanVienData])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi thêm nhân viên:', error);
            throw error;
        }
    },

    /**
     * Cập nhật nhân viên
     */
    async updateNhanVien(maNV, nhanVienData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('nhan_vien')
                .update(nhanVienData)
                .eq('ma_nv', maNV)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi cập nhật nhân viên:', error);
            throw error;
        }
    },

    /**
     * Xóa nhân viên
     */
    async deleteNhanVien(maNV) {
        try {
            const { error } = await window.supabaseClient
                .from('nhan_vien')
                .delete()
                .eq('ma_nv', maNV);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error);
            throw error;
        }
    },

    // ==================== KHÁCH HÀNG ====================
    
    /**
     * Lấy tất cả khách hàng
     */
    async getKhachHang() {
        try {
            const { data, error } = await window.supabaseClient
                .from('khach_hang')
                .select('*')
                .order('ma_kh', { ascending: false });
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khách hàng:', error);
            throw error;
        }
    },

    /**
     * Thêm khách hàng mới
     */
    async createKhachHang(khachHangData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('khach_hang')
                .insert([khachHangData])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi thêm khách hàng:', error);
            throw error;
        }
    },

    /**
     * Cập nhật khách hàng
     */
    async updateKhachHang(maKH, khachHangData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('khach_hang')
                .update(khachHangData)
                .eq('ma_kh', maKH)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi cập nhật khách hàng:', error);
            throw error;
        }
    },

    /**
     * Xóa khách hàng
     */
    async deleteKhachHang(maKH) {
        try {
            const { error } = await window.supabaseClient
                .from('khach_hang')
                .delete()
                .eq('ma_kh', maKH);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Lỗi khi xóa khách hàng:', error);
            throw error;
        }
    },

    // ==================== ĐƠN THUỐC ====================
    
    /**
     * Lấy tất cả đơn thuốc với thông tin khách hàng và nhân viên
     */
    async getDonThuoc() {
        try {
            const { data, error } = await window.supabaseClient
                .from('don_thuoc')
                .select(`
                    *,
                    khach_hang (ma_kh, ten_kh, sdt, di_ung, loai_kh, cap_thanh_vien, tong_tien_da_mua),
                    nhan_vien (ma_nv, ten_nv, chuc_vu)
                `)
                .order('ma_don', { ascending: false });
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn thuốc:', error);
            throw error;
        }
    },

    /**
     * Lấy chi tiết đơn thuốc
     */
    async getChiTietDonThuoc(maDon) {
        try {
            const { data, error } = await window.supabaseClient
                .from('chi_tiet_don_thuoc')
                .select(`
                    *,
                    thuoc (ma_thuoc, ten_thuoc, don_vi, gia_ban)
                `)
                .eq('ma_don', maDon);
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn thuốc:', error);
            throw error;
        }
    },

    /**
     * Tạo đơn thuốc mới
     */
    async createDonThuoc(donThuocData, chiTietList) {
        try {
            // Tạo đơn thuốc
            const { data: donThuoc, error: donError } = await window.supabaseClient
                .from('don_thuoc')
                .insert([donThuocData])
                .select();
            
            if (donError) throw donError;
            
            const maDon = donThuoc[0].ma_don;
            
            // Thêm chi tiết đơn thuốc
            const chiTietData = chiTietList.map(item => ({
                ma_don: maDon,
                ma_thuoc: item.ma_thuoc,
                lieu_dung: item.lieu_dung,
                so_ngay: item.so_ngay,
                so_luong: item.so_luong
            }));
            
            const { error: chiTietError } = await window.supabaseClient
                .from('chi_tiet_don_thuoc')
                .insert(chiTietData);
            
            if (chiTietError) throw chiTietError;
            
            return donThuoc[0];
        } catch (error) {
            console.error('Lỗi khi tạo đơn thuốc:', error);
            throw error;
        }
    },

    // ==================== HÓA ĐƠN ====================
    
    /**
     * Lấy tất cả hóa đơn
     */
    async getHoaDon() {
        try {
            const { data, error } = await window.supabaseClient
                .from('hoa_don')
                .select(`
                    *,
                    khach_hang (ma_kh, ten_kh, sdt),
                    nhan_vien (ma_nv, ten_nv)
                `)
                .order('ma_hd', { ascending: false });
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách hóa đơn:', error);
            throw error;
        }
    },

    /**
     * Lấy chi tiết hóa đơn
     */
    async getChiTietHoaDon(maHD) {
        try {
            const { data, error } = await window.supabaseClient
                .from('chi_tiet_hoa_don')
                .select(`
                    *,
                    thuoc (ma_thuoc, ten_thuoc, don_vi)
                `)
                .eq('ma_hd', maHD);
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
            throw error;
        }
    },

    /**
     * Tạo hóa đơn mới
     */
    async createHoaDon(hoaDonData, chiTietList) {
        try {
            // Tạo hóa đơn
            const { data: hoaDon, error: hdError } = await window.supabaseClient
                .from('hoa_don')
                .insert([hoaDonData])
                .select();
            
            if (hdError) throw hdError;
            
            const maHD = hoaDon[0].ma_hd;
            
            // Thêm chi tiết hóa đơn
            const chiTietData = chiTietList.map(item => ({
                ma_hd: maHD,
                ma_thuoc: item.ma_thuoc,
                so_luong: item.so_luong,
                don_gia: item.don_gia,
                thanh_tien: item.so_luong * item.don_gia
            }));
            
            const { error: ctError } = await window.supabaseClient
                .from('chi_tiet_hoa_don')
                .insert(chiTietData);
            
            if (ctError) throw ctError;
            
            // Cập nhật số lượng tồn kho
            for (const item of chiTietList) {
                const { data: thuoc } = await window.supabaseClient
                    .from('thuoc')
                    .select('so_luong')
                    .eq('ma_thuoc', item.ma_thuoc)
                    .single();
                
                if (thuoc) {
                    await window.supabaseClient
                        .from('thuoc')
                        .update({ so_luong: thuoc.so_luong - item.so_luong })
                        .eq('ma_thuoc', item.ma_thuoc);
                }
            }
            
            // Cập nhật trạng thái đơn thuốc thành 'Đã thanh toán'
            if (hoaDonData.ma_don) {
                await window.supabaseClient
                    .from('don_thuoc')
                    .update({ trang_thai: 'Đã thanh toán' })
                    .eq('ma_don', hoaDonData.ma_don);
            }
            
            // Cập nhật tổng tiền đã mua cho hội viên
            if (hoaDonData.ma_kh) {
                const { data: khachHang } = await window.supabaseClient
                    .from('khach_hang')
                    .select('tong_tien_da_mua, loai_kh')
                    .eq('ma_kh', hoaDonData.ma_kh)
                    .single();
                
                if (khachHang && khachHang.loai_kh === 'Hội viên') {
                    const newTotal = (khachHang.tong_tien_da_mua || 0) + hoaDonData.tong_tien;
                    await window.supabaseClient
                        .from('khach_hang')
                        .update({ tong_tien_da_mua: newTotal })
                        .eq('ma_kh', hoaDonData.ma_kh);
                    // Trigger sẽ tự động cập nhật cap_thanh_vien
                }
            }
            
            return hoaDon[0];
        } catch (error) {
            console.error('Lỗi khi tạo hóa đơn:', error);
            throw error;
        }
    },

    // ==================== CẢNH BÁO ====================
    
    /**
     * Lấy tất cả cảnh báo
     */
    async getCanhBao() {
        try {
            const { data, error } = await window.supabaseClient
                .from('canh_bao')
                .select(`
                    *,
                    thuoc (ma_thuoc, ten_thuoc, so_luong, han_su_dung)
                `)
                .order('ngay_tao', { ascending: false });
            
            if (error) throw error;
            return { records: data };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách cảnh báo:', error);
            throw error;
        }
    },

    /**
     * Tạo cảnh báo mới
     */
    async createCanhBao(canhBaoData) {
        try {
            const { data, error } = await window.supabaseClient
                .from('canh_bao')
                .insert([canhBaoData])
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi tạo cảnh báo:', error);
            throw error;
        }
    },

    /**
     * Cập nhật trạng thái cảnh báo
     */
    async updateCanhBao(maCB, trangThai) {
        try {
            const { data, error } = await window.supabaseClient
                .from('canh_bao')
                .update({ trang_thai: trangThai })
                .eq('ma_cb', maCB)
                .select();
            
            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Lỗi khi cập nhật cảnh báo:', error);
            throw error;
        }
    },

    /**
     * Kiểm tra và tạo cảnh báo tự động
     */
    async checkAndCreateAlerts() {
        try {
            const { data: thuocList } = await window.supabaseClient
                .from('thuoc')
                .select('*');
            
            const today = new Date();
            const alerts = [];
            
            for (const thuoc of thuocList) {
                // Kiểm tra tồn kho thấp
                if (thuoc.so_luong <= thuoc.sl_toi_thieu) {
                    alerts.push({
                        loai_cb: 'Tồn kho thấp',
                        noi_dung: `Thuốc "${thuoc.ten_thuoc}" còn ${thuoc.so_luong} ${thuoc.don_vi}, đã đạt mức tồn kho tối thiểu (${thuoc.sl_toi_thieu})`,
                        muc_do: 'Cao',
                        ma_thuoc: thuoc.ma_thuoc,
                        trang_thai: 'Chưa xử lý'
                    });
                }
                
                // Kiểm tra hạn sử dụng
                if (thuoc.han_su_dung) {
                    const expiryDate = new Date(thuoc.han_su_dung);
                    const daysToExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
                    
                    if (daysToExpiry <= 30 && daysToExpiry > 0) {
                        alerts.push({
                            loai_cb: 'Sắp hết hạn',
                            noi_dung: `Thuốc "${thuoc.ten_thuoc}" sẽ hết hạn sau ${daysToExpiry} ngày`,
                            muc_do: daysToExpiry <= 7 ? 'Cao' : 'Trung bình',
                            ma_thuoc: thuoc.ma_thuoc,
                            trang_thai: 'Chưa xử lý'
                        });
                    } else if (daysToExpiry <= 0) {
                        // Cập nhật trạng thái thuốc
                        await window.supabaseClient
                            .from('thuoc')
                            .update({ trang_thai: 'Hết hạn' })
                            .eq('ma_thuoc', thuoc.ma_thuoc);
                        
                        alerts.push({
                            loai_cb: 'Hết hạn',
                            noi_dung: `Thuốc "${thuoc.ten_thuoc}" đã hết hạn`,
                            muc_do: 'Cao',
                            ma_thuoc: thuoc.ma_thuoc,
                            trang_thai: 'Chưa xử lý'
                        });
                    }
                }
            }
            
            // Thêm các cảnh báo vào database
            if (alerts.length > 0) {
                const { error } = await window.supabaseClient
                    .from('canh_bao')
                    .insert(alerts);
                
                if (error) throw error;
            }
            
            return alerts;
        } catch (error) {
            console.error('Lỗi khi kiểm tra cảnh báo:', error);
            throw error;
        }
    },

    // ==================== THỐNG KÊ & BÁO CÁO ====================
    
    /**
     * Lấy thống kê tổng quan
     */
    async getStatistics() {
        try {
            // Đếm tổng số thuốc
            const { count: totalMedicines } = await window.supabaseClient
                .from('thuoc')
                .select('*', { count: 'exact', head: true });
            
            // Đếm số hóa đơn hôm nay
            const today = new Date().toISOString().split('T')[0];
            const { count: todayOrders } = await window.supabaseClient
                .from('hoa_don')
                .select('*', { count: 'exact', head: true })
                .gte('ngay_lap', today);
            
            // Tính doanh thu tháng này
            const thisMonth = new Date().toISOString().slice(0, 7);
            const { data: monthRevenue } = await window.supabaseClient
                .from('hoa_don')
                .select('tong_tien')
                .gte('ngay_lap', `${thisMonth}-01`)
                .eq('trang_thai', 'Đã thanh toán');
            
            const totalRevenue = monthRevenue?.reduce((sum, hd) => sum + parseFloat(hd.tong_tien), 0) || 0;
            
            // Đếm cảnh báo chưa xử lý
            const { count: alerts } = await window.supabaseClient
                .from('canh_bao')
                .select('*', { count: 'exact', head: true })
                .eq('trang_thai', 'Chưa xử lý');
            
            return {
                totalMedicines: totalMedicines || 0,
                todayOrders: todayOrders || 0,
                monthRevenue: totalRevenue,
                alerts: alerts || 0
            };
        } catch (error) {
            console.error('Lỗi khi lấy thống kê:', error);
            throw error;
        }
    },

    /**
     * Lấy dữ liệu cho biểu đồ doanh thu
     */
    async getRevenueChart(period = 'month') {
        try {
            let startDate;
            const today = new Date();
            
            if (period === 'week') {
                startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            } else if (period === 'month') {
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            } else {
                startDate = new Date(today.getFullYear(), 0, 1);
            }
            
            const { data, error } = await window.supabaseClient
                .from('hoa_don')
                .select('ngay_lap, tong_tien')
                .gte('ngay_lap', startDate.toISOString())
                .eq('trang_thai', 'Đã thanh toán')
                .order('ngay_lap');
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu biểu đồ:', error);
            throw error;
        }
    }
};

// UI Helper functions
const UI = {
    showMessage(message, type = 'info') {
        // Tạo thông báo đơn giản
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    },

    showLoading() {
        const loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.innerHTML = '<div class="spinner"></div>';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .spinner {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
    },

    hideLoading() {
        const loader = document.getElementById('globalLoader');
        if (loader) loader.remove();
    },

    confirmDelete(message) {
        return confirm(message);
    }
};

// Export
if (typeof window !== 'undefined') {
    window.API = API;
    window.UI = UI;
}

