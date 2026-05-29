import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import {
  Wallet2,
  Wine,
  Shell,
} from "lucide-react";

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
  // FILTER
  // =========================
  const today = new Date();

  const filteredSales = useMemo(() => {
    return sales.filter((item) => {
      const d = new Date(item.date);

      if (filter === "today") {
        return d.toDateString() === today.toDateString();
      }

      if (filter === "month") {
        return (
          d.getMonth() === selectedMonth.getMonth() &&
          d.getFullYear() === selectedMonth.getFullYear()
        );
      }

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
      background: "#0f172a",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/commission/${id}`);

      setSales((prev) =>
        prev.filter((i) => i.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-[120px] text-white">

      {/* HEADER */}
      <div className="pt-5">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">

          <h1 className="text-[36px] font-black tracking-tight">
            History
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Commission tracker
          </p>

        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-5">
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.18)]">

          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-fuchsia-400/10 to-blue-400/10" />

          <div className="relative flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-300">
                Total Income
              </p>

              <h2 className="text-[34px] font-black tracking-tight">
                {formatMoney(totalIncome)}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
              <Wallet2 size={28} />
            </div>

          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="mt-5 flex gap-3 overflow-x-auto no-scrollbar">

        {[
          {
            key: "month",
            label: "Month",
          },
          {
            key: "today",
            label: "Today",
          },
          {
            key: "all",
            label: "All",
          },
        ].map((i) => (
          <button
            key={i.key}
            onClick={() => setFilter(i.key)}
            className={`h-[42px] rounded-full border px-5 text-sm font-semibold transition-all duration-300 ${
              filter === i.key
                ? "border-cyan-300 bg-cyan-400/90 text-black shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                : "border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl"
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
            setSelectedMonth(
              new Date(e.target.value)
            );

            setFilter("month");
          }}
          className="h-[42px] rounded-full border border-white/10 bg-white/[0.04] px-4 text-white backdrop-blur-xl outline-none"
        />
      </div>

      {/* LIST */}
      <div className="mt-5 space-y-4">

        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[110px] animate-pulse rounded-[28px] bg-white/[0.03]"
            />
          ))
        ) : filteredSales.length === 0 ? (
          <div className="mt-10 text-center text-slate-400">
            No data
          </div>
        ) : (
          filteredSales.map((sale, index) => (
            <motion.div
              key={sale.id || index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative overflow-hidden rounded-[28px]"
            >

              {/* CARD */}
              <motion.div
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 120) {
                    handleDelete(sale.id);
                  }
                }}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              >

                <div className="flex items-center justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex min-w-0 flex-1 items-center gap-4">

                    {/* ICON */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                        sale.type === "wine"
                          ? "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-300"
                          : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                      }`}
                    >
                      {sale.type === "wine" ? (
                        <Wine />
                      ) : (
                        <Shell />
                      )}
                    </div>

                    {/* INFO */}
                    <div className="min-w-0">

                      <div className="truncate font-semibold">
                        {sale.type === "wine"
                          ? "Wine Order"
                          : "Shell Order"}
                      </div>

                      <div className="mt-1 flex gap-3 whitespace-nowrap text-xs text-slate-400">

                        <span>
                          Table {sale.tableNumber}
                        </span>

                        <span>
                          {sale.shift}
                        </span>

                        <span className="text-slate-500">
                          {sale.date}
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="shrink-0 text-right">

                    <div className="text-xs text-slate-500">
                      Commission
                    </div>

                    <div className="text-lg font-bold text-cyan-300">
                      +
                      {formatMoney(
                        Number(
                          sale.commission || 0
                        )
                      )}
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