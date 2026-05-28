import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaHistory,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <>
      {/* MOBILE IOS TAB BAR */}
      <div
        className="
          lg:hidden
          fixed
          bottom-5
          left-1/2
          -translate-x-1/2
          z-50
          w-[92%]
          max-w-[430px]
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-full
            border
            border-white/40
            bg-white/75
            backdrop-blur-3xl
            shadow-[0_20px_50px_rgba(15,23,42,0.14)]
            px-3
            py-3
          "
        >
          {/* BLUR EFFECT */}
          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-40
              h-20
              bg-blue-200/30
              blur-3xl
            "
          />

          <div className="relative z-10 grid grid-cols-3">
            {/* HOME */}
            <NavLink to="/">
              {({ isActive }) => (
                <div
                  className={`
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    h-[64px]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "text-blue-600"
                        : "text-slate-500"
                    }
                  `}
                >
                  {/* ACTIVE BUBBLE */}
                  {isActive && (
                    <motion.div
                      layoutId="iosTab"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                      className="
                        absolute
                        w-[54px]
                        h-[54px]
                        rounded-full
                        bg-white
                        border
                        border-blue-100
                        shadow-[0_4px_20px_rgba(59,130,246,0.18)]
                      "
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <FaHome size={20} />

                    <span className="mt-1 text-[11px] font-semibold">
                      Home
                    </span>
                  </div>
                </div>
              )}
            </NavLink>

            {/* STATS */}
            <NavLink to="/statistics">
              {({ isActive }) => (
                <div
                  className={`
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    h-[64px]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "text-violet-600"
                        : "text-slate-500"
                    }
                  `}
                >
                  {/* ACTIVE BUBBLE */}
                  {isActive && (
                    <motion.div
                      layoutId="iosTab"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                      className="
                        absolute
                        w-[54px]
                        h-[54px]
                        rounded-full
                        bg-white
                        border
                        border-violet-100
                        shadow-[0_4px_20px_rgba(139,92,246,0.18)]
                      "
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <FaChartBar size={20} />

                    <span className="mt-1 text-[11px] font-semibold">
                      Stats
                    </span>
                  </div>
                </div>
              )}
            </NavLink>

            {/* HISTORY */}
            <NavLink to="/history">
              {({ isActive }) => (
                <div
                  className={`
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    h-[64px]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "text-emerald-600"
                        : "text-slate-500"
                    }
                  `}
                >
                  {/* ACTIVE BUBBLE */}
                  {isActive && (
                    <motion.div
                      layoutId="iosTab"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                      className="
                        absolute
                        w-[54px]
                        h-[54px]
                        rounded-full
                        bg-white
                        border
                        border-emerald-100
                        shadow-[0_4px_20px_rgba(16,185,129,0.18)]
                      "
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <FaHistory size={20} />

                    <span className="mt-1 text-[11px] font-semibold">
                      History
                    </span>
                  </div>
                </div>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}