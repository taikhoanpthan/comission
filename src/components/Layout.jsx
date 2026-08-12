import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Bell, ChevronRight, CircleHelp, Moon, Sun } from "lucide-react";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("commission-theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("commission-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-[#1f2937]">
      <Sidebar />
      <main className="min-h-screen pb-16 lg:ml-[240px] lg:pb-0">
        <div className="flex h-15 items-center justify-between border-b border-[#e1e6ed] bg-white px-4 lg:h-16 lg:px-6">
          <div className="flex items-center gap-2 text-xs text-[#7b8797]">
            <span className="font-medium text-[#4b5563]">Vận hành</span>
            <ChevronRight size={14} className="text-[#b2bac6]" />
            <span>Commission</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1.5 rounded-full border border-[#dcecdf] bg-[#f6ffed] px-2.5 py-1 text-[11px] font-medium text-[#389e0d] sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#52c41a]" />Hệ thống hoạt động</div>
            <button type="button" onClick={() => setDarkMode((current) => !current)} aria-label={darkMode ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"} className="flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f5f8]">{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button>
            <button type="button" aria-label="Trợ giúp" className="flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f5f8]"><CircleHelp size={17} /></button>
            <button type="button" aria-label="Thông báo" className="relative flex h-8 w-8 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f5f8]"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ff4d4f]" /></button>
            <div className="ml-1 flex items-center gap-2 border-l border-[#e5e7eb] pl-3">
              <div className="hidden text-right sm:block"><div className="text-xs font-medium text-[#374151]">Quản trị viên</div><div className="text-[10px] text-[#8c98a8]">Administrator</div></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e6f4ff] text-xs font-semibold text-[#1677ff]">A</div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1600px] p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
