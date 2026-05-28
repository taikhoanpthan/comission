import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <>
      {/* MOBILE MMO DOCK */}
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[430px]">

        <div className="relative overflow-hidden rounded-full border border-cyan-400/20 bg-[#050510]/70 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,255,255,0.08)] px-3 py-3">

          {/* neon glow background */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-52 h-24 bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-3">

            {/* HOME */}
            <NavLink to="/">
              {({ isActive }) => (
                <div className="relative flex flex-col items-center justify-center h-[64px]">

                  {isActive && (
                    <motion.div
                      layoutId="mmoTab"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      className="absolute w-[54px] h-[54px] rounded-full bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.25)]"
                    />
                  )}

                  <div
                    className={`relative z-10 flex flex-col items-center transition ${
                      isActive ? "text-cyan-300" : "text-slate-500"
                    }`}
                  >
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
                <div className="relative flex flex-col items-center justify-center h-[64px]">

                  {isActive && (
                    <motion.div
                      layoutId="mmoTab"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      className="absolute w-[54px] h-[54px] rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 shadow-[0_0_20px_rgba(255,0,200,0.2)]"
                    />
                  )}

                  <div
                    className={`relative z-10 flex flex-col items-center transition ${
                      isActive ? "text-fuchsia-300" : "text-slate-500"
                    }`}
                  >
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
                <div className="relative flex flex-col items-center justify-center h-[64px]">

                  {isActive && (
                    <motion.div
                      layoutId="mmoTab"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      className="absolute w-[54px] h-[54px] rounded-full bg-emerald-500/10 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                    />
                  )}

                  <div
                    className={`relative z-10 flex flex-col items-center transition ${
                      isActive ? "text-emerald-300" : "text-slate-500"
                    }`}
                  >
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