import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getSales, createSale } from "../services/api";

import SaleForm from "../components/SaleForm";
import SummaryCards from "../components/SummaryCards";

export default function Home() {
  const [sales, setSales] = useState([]);

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

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b from-slate-100 via-slate-50 to-white
        px-4 md:px-6
        py-4
        pb-28
      "
    >

      {/* 🍎 HEADER (iOS compact widget style) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <div
          className="
            flex items-center justify-between
            bg-white/70
            backdrop-blur-2xl
            border border-white/50
            rounded-2xl
            px-5 py-4
            shadow-sm
          "
        >
          <div>
            <p className="text-xs text-slate-400 tracking-widest">
              COMMISSION
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Dashboard
            </h1>
          </div>

          <div className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            ANHMY
          </div>
        </div>
      </motion.div>

      {/* 🍎 WIDGET AREA (NO GRID) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-5"
      >
        <SummaryCards sales={sales} />
      </motion.div>

      {/* 🍎 FORM WIDGET */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SaleForm onSubmit={handleCreate} />
      </motion.div>

    </div>
  );
}