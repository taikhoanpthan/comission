import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { api } from "../services/api";
import RevenueChart from "../components/RevenueChart";
import { formatMoney } from "../utils/calculateCommission";

export default function Statistics() {
  const [sales, setSales] = useState([]);
  const [filterType, setFilterType] = useState("month"); // month | day
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/commission");
      setSales(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formatMonth = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${yyyy}-${mm}`;
  };

  const filteredSales = useMemo(() => {
    if (filterType === "day") {
      const day = formatDate(selectedDate);
      return sales.filter((item) => item.date === day);
    }

    const month = formatMonth(selectedDate);
    return sales.filter((item) => item.date.startsWith(month));
  }, [sales, filterType, selectedDate]);

  const totalMoney = filteredSales.reduce(
    (acc, item) => acc + Number(item.commission || 0),
    0
  );

  const totalWine = filteredSales.filter(
    (item) => item.type === "wine"
  ).length;

  const totalAbalone = filteredSales
    .filter((item) => item.type === "abalone")
    .reduce((acc, item) => acc + Number(item.abaloneQty || 0), 0);

  const cards = [
    {
      title: "Tổng tiền",
      value: formatMoney(totalMoney),
      icon: "💰",
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Tổng rượu",
      value: totalWine,
      icon: "🍷",
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Tổng bào ngư",
      value: totalAbalone,
      icon: "🦪",
      color: "from-orange-400 to-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white p-4 md:p-6 pb-28">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 mb-6"
      >
        <div className="bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgba(15,23,42,0.06)] rounded-[32px] p-5">
          
          <div className="flex items-center justify-between flex-wrap gap-4">

            {/* TITLE */}
            <div>
              <p className="text-slate-400 text-sm font-medium">Dashboard</p>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight mt-1">
                Thống kê
              </h1>
              <p className="text-slate-500 mt-2">
                Theo dõi doanh thu bán hàng
              </p>
            </div>

            {/* FILTER */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">

              {/* MODE */}
              <div className="flex bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-1 shadow-sm">
                <button
                  onClick={() => setFilterType("month")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterType === "month"
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Tháng
                </button>

                <button
                  onClick={() => setFilterType("day")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterType === "day"
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Ngày
                </button>
              </div>

              {/* DATE PICKER */}
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat={filterType === "day" ? "dd/MM/yyyy" : "MM/yyyy"}
                  showMonthYearPicker={filterType === "month"}
                  showFullMonthYearPicker={false}
                  className="
                    w-full
                    bg-white/80
                    backdrop-blur-xl
                    border
                    border-white/60
                    rounded-2xl
                    px-4
                    py-3
                    text-slate-700
                    font-medium
                    shadow-sm
                    outline-none
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  📅
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-2xl border border-white/60 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 blur-3xl`}
            />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-slate-500 text-sm">{card.title}</p>
                <h1 className="text-3xl font-black text-slate-800 mt-4">
                  {card.value}
                </h1>
              </div>

              <div
                className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center text-3xl shadow-lg`}
              >
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHART */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-[32px] bg-white/80 backdrop-blur-2xl border border-white/60 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
      >
        <RevenueChart sales={filteredSales} />
      </motion.div>
    </div>
  );
}