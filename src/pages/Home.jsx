import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

import { getSales, createSale } from "../services/api";

import SaleForm from "../components/SaleForm";
import SummaryCards from "../components/SummaryCards";

export default function Home() {
  const [sales, setSales] = useState([]);

  // mặc định tháng hiện tại
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();
      setSales(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createSale(data);
      fetchSales();
    } catch (err) {
      console.log(err);
    }
  };

  // lọc doanh thu theo tháng được chọn
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const saleDate = new Date(
        sale.date || sale.createdAt || Date.now()
      );

      const month =
        `${saleDate.getFullYear()}-${String(
          saleDate.getMonth() + 1
        ).padStart(2, "0")}`;

      return month === selectedMonth;
    });
  }, [sales, selectedMonth]);

  return (
    <div className="relative min-h-screen text-white">
      <div className="relative z-10 px-4 pt-3">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div
            className="
            relative
            overflow-hidden
            rounded-[28px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            p-5
          "
          >
            <div className="absolute -top-20 -right-10 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[11px] tracking-[0.35em] uppercase text-cyan-200/50">
                  MMO COMMISSION
                </p>

                <h1 className="text-[30px] font-black mt-2">
                  Dashboard
                </h1>

                <p className="text-sm text-slate-400 mt-2">
                  Quản lý doanh thu rượu & bào ngư
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-2xl" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CHỌN THÁNG */}
        <div className="mb-5">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
            <label className="block text-sm text-slate-400 mb-2">
              Xem doanh thu theo tháng
            </label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-slate-900
                px-4
                py-3
                text-white
                outline-none
              "
            />
          </div>
        </div>

        {/* SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5"
        >
          <div className="rounded-[28px] bg-white/[0.03] border border-white/10 backdrop-blur-xl p-3">
            <SummaryCards sales={filteredSales} />
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="
            relative
            overflow-hidden
            rounded-[30px]
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-2xl
            p-4
          "
          >
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />

            <div className="relative z-10 mb-4">
              <h2 className="text-lg font-bold">
                Thêm giao dịch
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Nhập thông tin commission hôm nay
              </p>
            </div>

            <div className="relative z-10">
              <SaleForm onSubmit={handleCreate} />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}