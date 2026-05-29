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

    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  const formatMonth = (date) => {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  // =========================
  // FILTER DATA
  // =========================
  const filteredSales = useMemo(() => {
    if (filterType === "day") {
      const day = formatDate(selectedDate);

      return sales.filter(
        (item) => item.date === day
      );
    }

    const month = formatMonth(selectedDate);

    return sales.filter((item) =>
      item.date.startsWith(month)
    );
  }, [sales, filterType, selectedDate]);

  // =========================
  // CHART DATA
  // =========================
  const chartSales = sales;

  // =========================
  // TOTALS
  // =========================
  const totalMoney = filteredSales.reduce(
    (acc, item) =>
      acc + Number(item.commission || 0),
    0
  );

  const totalWine = filteredSales.filter(
    (i) => i.type === "wine"
  ).length;

  const totalAbalone = filteredSales
    .filter((i) => i.type === "abalone")
    .reduce(
      (acc, i) =>
        acc + Number(i.abaloneQty || 0),
      0
    );

  // =========================
  // CARDS
  // =========================
  const cards = [
    {
      title: "Revenue",
      value: formatMoney(totalMoney),
      icon: <Wallet2 size={22} />,
      border:
        "border-cyan-400/20",
      bg: "bg-cyan-400/10",
      text: "text-cyan-300",
    },
    {
      title: "Wine Orders",
      value: totalWine,
      icon: <Wine size={22} />,
      border:
        "border-fuchsia-400/20",
      bg: "bg-fuchsia-400/10",
      text: "text-fuchsia-300",
    },
    {
      title: "Abalone",
      value: totalAbalone,
      icon: "🦪",
      border:
        "border-emerald-400/20",
      bg: "bg-emerald-400/10",
      text: "text-emerald-300",
    },
  ];

  return (
    <div className="min-h-screen px-4 pt-4 pb-[120px] text-white">

      {/* HEADER */}
      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

          <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/60">
            MMO ANALYTICS
          </p>

          <h1 className="mt-2 text-[36px] font-black tracking-tight">
            Statistics
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Revenue tracking dashboard
          </p>

        </div>
      </motion.div>

      {/* FILTER */}
      <div className="mt-5 space-y-3">

        {/* MODE */}
        <div className="flex gap-2 rounded-[24px] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-2xl">

          {["month", "day"].map(
            (type) => (
              <button
                key={type}
                onClick={() =>
                  setFilterType(type)
                }
                className={`flex-1 h-[48px] rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  filterType === type
                    ? "bg-cyan-400/90 text-black shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                    : "text-slate-300"
                }`}
              >
                {type === "month"
                  ? "By Month"
                  : "By Day"}
              </button>
            )
          )}

        </div>

        {/* DATE PICKER */}
        <div className="flex h-[56px] items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 backdrop-blur-2xl">

          <CalendarDays
            size={18}
            className="text-cyan-300"
          />

          <input
            type={
              filterType === "day"
                ? "date"
                : "month"
            }
            value={
              filterType === "day"
                ? formatDate(
                    selectedDate
                  )
                : formatMonth(
                    selectedDate
                  )
            }
            onChange={(e) =>
              setSelectedDate(
                new Date(e.target.value)
              )
            }
            className="flex-1 bg-transparent text-white outline-none"
          />

        </div>
      </div>

      {/* CARDS */}
      <div className="mt-5 space-y-4">

        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            className={`rounded-[28px] border bg-white/[0.04] p-5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${card.border}`}
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-1 text-[28px] font-black">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 ${card.bg} ${card.text}`}
              >
                {card.icon}
              </div>

            </div>
          </motion.div>
        ))}

      </div>

      {/* CHART */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="mt-5 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >

        <div className="mb-4 flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <BarChart3 size={18} />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Revenue Chart
            </h2>

            <p className="text-sm text-slate-400">
              Analytics overview
            </p>
          </div>

        </div>

        <RevenueChart sales={chartSales} />

      </motion.div>
    </div>
  );
}