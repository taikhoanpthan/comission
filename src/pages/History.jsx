import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { Wallet2, Trash2, Wine, Shell } from "lucide-react";

import { api } from "../services/api";
import { formatMoney } from "../utils/calculateCommission";

export default function History() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // =========================
  // FETCH
  // =========================
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/commission");

      const sorted = (res.data || []).sort(
        (a, b) =>
          new Date(b.date || b.createdAt) -
          new Date(a.date || a.createdAt)
      );

      setSales(sorted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER LOGIC
  // =========================
  const today = new Date();

  const filteredSales = useMemo(() => {
    return sales.filter((item) => {
      const d = new Date(item.date);

      // TODAY
      if (filter === "today") {
        return d.toDateString() === today.toDateString();
      }

      // MONTH (THEO THÁNG CHỌN)
      if (filter === "month") {
        return (
          d.getMonth() === selectedMonth.getMonth() &&
          d.getFullYear() === selectedMonth.getFullYear()
        );
      }

      // ALL
      return true;
    });
  }, [sales, filter, selectedMonth]);

  // =========================
  // TOTAL
  // =========================
  const totalIncome = useMemo(() => {
    return filteredSales.reduce(
      (acc, i) => acc + Number(i.commission || 0),
      0
    );
  }, [filteredSales]);

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xóa giao dịch?",
      text: "Không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ff003c",
      background: "#050510",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/commission/${id}`);
      setSales((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white px-4 pb-[120px]">

      {/* HEADER */}
      <div className="mt-5">
        <div className="rounded-[28px] bg-white/5 border border-cyan-400/20 p-5 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
          <h1 className="text-[34px] font-black">History</h1>
          <p className="text-sm text-slate-400">Commission tracker</p>
        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-5">
        <div className="rounded-[28px] bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 p-5 shadow-[0_0_50px_rgba(168,85,247,0.25)]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/70 text-sm">Total Income</p>
              <h2 className="text-[34px] font-black">
                {formatMoney(totalIncome)}
              </h2>
            </div>
            <Wallet2 />
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 overflow-x-auto mt-5 no-scrollbar">
        {[
          { key: "month", label: "Month" },
          { key: "today", label: "Today" },
          { key: "all", label: "All" },
        ].map((i) => (
          <button
            key={i.key}
            onClick={() => setFilter(i.key)}
            className={`px-5 h-[42px] rounded-full text-sm font-medium ${
              filter === i.key
                ? "bg-cyan-500 text-black"
                : "bg-white/5 border border-white/10 text-slate-300"
            }`}
          >
            {i.label}
          </button>
        ))}

        {/* MONTH PICKER */}
        <input
          type="month"
          value={`${selectedMonth.getFullYear()}-${String(
            selectedMonth.getMonth() + 1
          ).padStart(2, "0")}`}
          onChange={(e) => {
            setSelectedMonth(new Date(e.target.value));
            setFilter("month");
          }}
          className="bg-white/5 border border-white/10 text-white rounded-full px-4 h-[42px]"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4 mt-5">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-[110px] rounded-[26px] bg-white/5 animate-pulse" />
          ))
        ) : filteredSales.length === 0 ? (
          <div className="text-center text-slate-400 mt-10">
            No data
          </div>
        ) : (
          filteredSales.map((sale, index) => (
            <motion.div
              key={sale.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[26px]"
            >

              {/* DELETE GLOW */}
              <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-red-500/10 blur-2xl" />

              {/* CARD */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 120) handleDelete(sale.id);
                }}
                className="relative z-10 bg-[#0a0a1a]/90 backdrop-blur-xl border border-white/10 rounded-[26px] p-4"
              >
                <div className="flex justify-between items-center gap-4">

                  {/* LEFT */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      sale.type === "wine"
                        ? "bg-fuchsia-500/20 text-fuchsia-300"
                        : "bg-cyan-500/20 text-cyan-300"
                    }`}>
                      {sale.type === "wine" ? <Wine /> : <Shell />}
                    </div>

                    <div className="min-w-0">

                      <div className="font-semibold truncate">
                        {sale.type === "wine" ? "Wine Order" : "Shell Order"}
                      </div>

                      {/* DATE FIX 1 LINE */}
                      <div className="text-xs text-slate-400 flex gap-3 whitespace-nowrap">
                        <span>Table {sale.tableNumber}</span>
                        <span>{sale.shift}</span>
                        <span className="text-slate-500">
                          {sale.date}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right shrink-0">
                    <div className="text-xs text-slate-500">Commission</div>
                    <div className="text-lg font-bold text-cyan-300">
                      +{formatMoney(Number(sale.commission || 0))}
                    </div>
                  </div>

                </div>
              </motion.div>

            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}