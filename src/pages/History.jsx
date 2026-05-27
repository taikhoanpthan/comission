import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { api } from "../services/api";

import SaleTable from "../components/SaleTable";

export default function History() {
  const [sales, setSales] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/commission");

      setSales(
        res.data.reverse()
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-slate-100
        via-slate-50
        to-white
        p-4
        md:p-6
        pb-28
      "
    >
      {/* HEADER */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          bg-white/80
          backdrop-blur-2xl
          border
          border-white/60
          rounded-[32px]
          p-5
          shadow-[0_10px_40px_rgba(15,23,42,0.06)]
          mb-6
        "
      >
        <p className="text-slate-400 text-sm font-medium">
          Commission
        </p>

        <h1 className="text-4xl font-black text-slate-800 mt-1">
          Lịch sử bán
        </h1>

        <p className="text-slate-500 mt-2">
          Theo dõi toàn bộ doanh thu
        </p>
      </motion.div>

      {/* CONTENT */}
      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-32
                rounded-3xl
                bg-white
                animate-pulse
                border
                border-slate-200
              "
            />
          ))}
        </div>
      ) : (
        <SaleTable sales={sales} />
      )}
    </div>
  );
}