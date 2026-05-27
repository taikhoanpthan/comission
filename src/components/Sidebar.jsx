import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaChartBar,
  FaHistory,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Sidebar() {
  const mobileLinkClass = ({
    isActive,
  }) =>
    `
      relative
      flex
      flex-col
      items-center
      justify-center
      gap-1
      flex-1
      h-full
      transition-all
      ${
        isActive
          ? "text-blue-600"
          : "text-slate-500"
      }
    `;

  const desktopLinkClass = ({
    isActive,
  }) =>
    `
      flex
      items-center
      gap-3
      px-4
      py-4
      rounded-2xl
      transition-all
      font-medium
      ${
        isActive
          ? `
            bg-blue-600
            text-white
            shadow-lg
          `
          : `
            text-slate-600
            hover:bg-slate-100
          `
      }
    `;

  return (
    <>
      {/* DESKTOP */}
      <div
        className="
          hidden
          lg:flex
          w-[270px]
          min-h-screen
          bg-white/75
          backdrop-blur-2xl
          border-r
          border-white/60
          p-5
          flex-col
          shadow-[0_10px_40px_rgba(15,23,42,0.06)]
        "
      >
        {/* LOGO */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >
          <div className="flex items-center gap-4">
            <div
              className="
                w-16
                h-16
                rounded-3xl
                bg-gradient-to-br
                from-blue-500
                to-cyan-400
                flex
                items-center
                justify-center
                text-white
                text-3xl
                shadow-lg
              "
            >
              🍷
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                Commission
              </h1>

              <p className="text-slate-500 text-sm mt-1">
                Quản lý hoa hồng
              </p>
            </div>
          </div>
        </motion.div>

        {/* MENU */}
        <div className="flex flex-col gap-3">
          <NavLink
            to="/"
            className={desktopLinkClass}
          >
            <FaHome size={18} />

            Trang chủ
          </NavLink>

          <NavLink
            to="/statistics"
            className={desktopLinkClass}
          >
            <FaChartBar size={18} />

            Thống kê
          </NavLink>

          <NavLink
            to="/history"
            className={desktopLinkClass}
          >
            <FaHistory size={18} />

            Lịch sử
          </NavLink>
        </div>

        {/* FOOTER */}
        <div className="mt-auto">
          <div
            className="
              rounded-3xl
              bg-slate-50
              border
              border-slate-200
              p-5
            "
          >
            <p className="text-slate-400 text-sm">
              Dashboard
            </p>

            <h2 className="text-slate-800 font-bold mt-2">
              iOS Style UI
            </h2>

            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Giao diện sáng, mượt,
              hiện đại và tối ưu mobile.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE TAB BAR */}
      <div
        className="
          lg:hidden
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          w-[92%]
          h-[78px]
          bg-white/80
          backdrop-blur-2xl
          border
          border-white/60
          rounded-[30px]
          z-50
          shadow-[0_10px_40px_rgba(15,23,42,0.12)]
        "
      >
        <div className="grid grid-cols-3 h-full">
          {/* HOME */}
          <NavLink
            to="/"
            className={mobileLinkClass}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="tab"
                    className="
                      absolute
                      inset-2
                      rounded-2xl
                      bg-blue-50
                    "
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <FaHome size={21} />

                  <span className="text-[11px] font-semibold">
                    Home
                  </span>
                </div>
              </>
            )}
          </NavLink>

          {/* STATS */}
          <NavLink
            to="/statistics"
            className={mobileLinkClass}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="tab"
                    className="
                      absolute
                      inset-2
                      rounded-2xl
                      bg-blue-50
                    "
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <FaChartBar size={21} />

                  <span className="text-[11px] font-semibold">
                    Stats
                  </span>
                </div>
              </>
            )}
          </NavLink>

          {/* HISTORY */}
          <NavLink
            to="/history"
            className={mobileLinkClass}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="tab"
                    className="
                      absolute
                      inset-2
                      rounded-2xl
                      bg-blue-50
                    "
                  />
                )}

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <FaHistory size={21} />

                  <span className="text-[11px] font-semibold">
                    History
                  </span>
                </div>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
}