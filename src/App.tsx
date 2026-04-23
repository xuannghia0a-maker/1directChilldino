import React, { useState, useEffect } from 'react';
import { ExternalLink, GraduationCap, ArrowRight, Info, Clock } from 'lucide-react';

const App = () => {
  // Thời gian chờ 60 giây (1 phút)
  const [countdown, setCountdown] = useState(60);
  const targetUrl = "https://chilldino.vn";

  // Tông màu chủ đạo theo yêu cầu
  const colors = {
    primary: '#ff7c00',
    primaryPastel: '#fff3e6',
    secondary: '#0a6962',
    secondaryPastel: '#e6f0ef',
  };

  useEffect(() => {
    // Luồng đếm ngược
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Tự động chuyển hướng khi đếm ngược về 0
  useEffect(() => {
    if (countdown === 0) {
      window.location.assign(targetUrl);
    }
  }, [countdown]);

  // Hàm điều hướng thủ công khi nhấn nút
  const handleRedirect = (e: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    // Sử dụng window.location.assign để đảm bảo trình duyệt điều hướng đi
    window.location.assign(targetUrl);
  };

  // Hàm định dạng thời gian mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#f8fafc]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="relative z-10 max-w-2xl w-full bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden transition-all hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.12)]">
        {/* Thanh trang trí trên cùng */}
        <div className="h-2 w-full flex">
          <div className="h-full flex-1" style={{ backgroundColor: colors.primary }}></div>
          <div className="h-full flex-1" style={{ backgroundColor: colors.secondary }}></div>
        </div>

        <div className="px-8 py-12 md:px-12 md:py-16 text-center">
          {/* Khu vực Icon */}
          <div className="mb-10 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full opacity-20" style={{ backgroundColor: colors.primary }}></div>
              <div className="relative p-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primaryPastel }}>
                <GraduationCap size={56} style={{ color: colors.primary }} />
              </div>
            </div>
          </div>

          {/* Nội dung thông báo */}
          <h1 className="text-3xl md:text-3xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">
            Thông báo Chuyển đổi Hệ thống
          </h1>
          
          <div className="space-y-6 mb-12 text-slate-600 text-lg leading-relaxed">
            <p>
              Toàn bộ hệ thống <span className="font-semibold text-slate-900 underline decoration-slate-200 underline-offset-4">app.htdclass.edu.vn</span> đã được chính thức chuyển sang địa chỉ mới:
            </p>
            
            {/* Khung URL */}
            <div className="flex justify-center">
              <a 
                href={targetUrl}
                target="_top"
                rel="noopener noreferrer"
                className="inline-block p-6 rounded-3xl border-2 border-dashed transition-all hover:scale-105 active:scale-95 group/link"
                style={{ 
                  color: colors.secondary, 
                  borderColor: colors.secondary, 
                  backgroundColor: colors.secondaryPastel,
                  textDecoration: 'none'
                }}
              >
                <span className="text-3xl md:text-4xl font-mono font-black tracking-tighter flex items-center gap-3">
                  chilldino.vn
                  <ExternalLink size={24} className="opacity-40 group-hover/link:opacity-100 transition-opacity" />
                </span>
              </a>
            </div>

            <p className="mt-4 italic text-slate-500 text-base">
              Hãy truy cập và tiếp tục học tập tại đây.
            </p>
          </div>

          {/* Nút bấm điều hướng chính */}
          <button
            onClick={handleRedirect}
            className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-2xl font-bold text-white shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: colors.secondary }}
          >
            <span className="text-xl">Tiếp tục học tập ngay</span>
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Thông tin chân trang */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Info size={18} />
              <span>Hệ thống cũ sẽ sớm ngừng hoạt động</span>
            </div>
            
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors"
              style={{ 
                backgroundColor: countdown < 10 ? '#fee2e2' : colors.primaryPastel, 
                color: countdown < 10 ? '#ef4444' : colors.primary 
              }}
            >
              <Clock size={18} />
              <span>Tự động chuyển hướng sau {formatTime(countdown)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hiệu ứng nền - Blurs từ yêu cầu */}
      <div className="fixed -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: colors.primary }}></div>
      <div className="fixed -bottom-24 -right-24 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: colors.secondary }}></div>
    </div>
  );
};

export default App;
