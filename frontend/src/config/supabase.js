/**
 * Cấu hình Supabase cho PharmaT
 * File này chứa thông tin kết nối đến Supabase backend
 */

const SUPABASE_URL = 'https://esoksuiwnedmfrxyizlg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzb2tzdWl3bmVkbWZyeHlpemxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNDQ5NTksImV4cCI6MjA3NjcyMDk1OX0.6MKCI9wKafTbkx_IP4yjFFjFIdazvKbHR3xq47ybCew';

// Khởi tạo Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export cho sử dụng trong các module khác
if (typeof window !== 'undefined') {
    window.supabaseClient = supabase;
    window.SUPABASE_CONFIG = {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY
    };
}

