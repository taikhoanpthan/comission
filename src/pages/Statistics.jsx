import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  CalendarDays,
  BarChart3,
  Wallet2,
  Wine,
} from "lucide-react";

import { api } from "../services/api";
import RevenueChart from "../components/RevenueChart";
import { formatMoney } from "../utils/calculateCommission";

export default function Statistics() {
  const [sales, setSales] = useState([]);
  const [filterType, setFilterType] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/commission");
      setSales(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // FORMATTERS
  // =========================
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  const formatMonth = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  // =========================
  // FILTER DATA (CHỈ UI)
  // =========================
  const filteredSales = useMemo(() => {
    if (filterType === "day") {
      const day = formatDate(selectedDate);
      return sales.filter((item) => item.date === day);
    }

    const month = formatMonth(selectedDate);
    return sales.filter((item) => item.date.startsWith(month));
  }, [sales, filterType, selectedDate]);

  // =========================
  // ALL DATA FOR CHART
  // =========================
  const chartSales = sales;

  // =========================
  // TOTALS (BASED ON FILTER)
  // =========================
  const totalMoney = filteredSales.reduce(
    (acc, item) => acc + Number(item.commission || 0),
    0
  );

  const totalWine = filteredSales.filter((i) => i.type === "wine").length;

  const totalAbalone = filteredSales
    .filter((i) => i.type === "abalone")
    .reduce((acc, i) => acc + Number(i.abaloneQty || 0), 0);

  // =========================
  // CARDS
  // =========================
  const cards = [
    {
      title: "Revenue",
      value: formatMoney(totalMoney),
      icon: <Wallet2 size={22} />,
      glow: "bg-cyan-500/10",
      border: "border-cyan-400/20",
      text: "text-cyan-300",
    },
    {
      title: "Wine Orders",
      value: totalWine,
      icon: <Wine size={22} />,
      glow: "bg-fuchsia-500/10",
      border: "border-fuchsia-400/20",
      text: "text-fuchsia-300",
    },
    {
      title: "Abalone",
      value: totalAbalone,
      icon: "🦪",
      glow: "bg-emerald-500/10",
      border: "border-emerald-400/20",
      text: "text-emerald-300",
    },
  ];

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-[#050510] text-white px-4 pt-4 pb-[120px]">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-white/5 backdrop-blur-2xl p-5 shadow-[0_0_50px_rgba(0,255,255,0.08)]">

          <div className="absolute -top-20 -right-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />

          <p className="text-[11px] tracking-[0.35em] text-cyan-300/60 uppercase">
            MMO ANALYTICS
          </p>

          <h1 className="text-[34px] font-black mt-2">Statistics</h1>
          <p className="text-sm text-slate-400 mt-2">
            Revenue tracking dashboard
          </p>
        </div>
      </motion.div>

      {/* FILTER */}
      <div className="mt-5 space-y-3">

        {/* MODE */}
        <div className="flex gap-2 p-2 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl">
          {["month", "day"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-1 h-[48px] rounded-xl text-sm font-semibold transition ${
                filterType === type
                  ? "bg-cyan-500 text-black shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                  : "text-slate-300"
              }`}
            >
              {type === "month" ? "By Month" : "By Day"}
            </button>
          ))}
        </div>

        {/* DATE PICKER */}
        <div className="flex items-center gap-3 h-[56px] px-4 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl">
          <CalendarDays size={18} className="text-cyan-300" />

          <input
            type={filterType === "day" ? "date" : "month"}
            value={
              filterType === "day"
                ? formatDate(selectedDate)
                : formatMonth(selectedDate)
            }
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="flex-1 bg-transparent outline-none text-white"
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="mt-5 space-y-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`relative overflow-hidden rounded-[26px] border ${card.border} bg-white/5 backdrop-blur-xl p-5`}
          >
            <div className={`absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full ${card.glow}`} />

            <div className="relative z-10 flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">{card.title}</p>
                <h2 className="text-[28px] font-black mt-1">{card.value}</h2>
              </div>

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 ${card.text}`}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHART (FULL DATA - FIX IMPORTANT) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5 relative overflow-hidden rounded-[28px] bg-white/5 border border-white/10 backdrop-blur-xl p-5"
      >
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center">
            <BarChart3 size={18} />
          </div>

          <div>
            <h2 className="font-bold text-lg">Revenue Chart</h2>
            <p className="text-sm text-slate-400">Analytics overview</p>
          </div>
        </div>

        {/* 🔥 FIX: CHART KHÔNG BỊ FILTER */}
        <RevenueChart sales={chartSales} />
      </motion.div>
    </div>
  );
}