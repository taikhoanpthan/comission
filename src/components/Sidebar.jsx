import { NavLink } from "react-router-dom";
import { LayoutDashboard, BarChart3, History, ReceiptText } from "lucide-react";

const navigation = [
  { to: "/", label: "Tổng quan", icon: LayoutDashboard },
  { to: "/statistics", label: "Thống kê", icon: BarChart3 },
  { to: "/history", label: "Lịch sử giao dịch", icon: History },
];

export default function Sidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[240px] flex-col bg-[#172033] text-slate-300 lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1677ff] text-white">
          <ReceiptText size={18} />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Commission</div>
          <div className="text-[11px] text-slate-400">Management System</div>
        </div>
      </div>

        <nav className="flex-1 px-3 py-4">
        <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Điều hướng</div>
        <div className="space-y-1">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {({ isActive }) => (
                <div className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors ${isActive ? "bg-[#274a78] text-white" : "hover:bg-white/[0.06] hover:text-white"}`}>
                  <Icon size={17} />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </div>
        </nav>

        <div className="border-t border-white/10 p-4 text-xs text-slate-500">Phiên bản 1.0.0</div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-3 border-t border-[#dfe4eb] bg-white lg:hidden">
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className="flex items-stretch justify-center">
            {({ isActive }) => (
              <div className={`flex w-full flex-col items-center justify-center gap-1 border-t-2 text-[11px] font-medium ${isActive ? "border-[#1677ff] bg-[#f0f7ff] text-[#1677ff]" : "border-transparent text-[#6b7280]"}`}>
                <Icon size={18} />
                <span>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
