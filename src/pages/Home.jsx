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
        bg-[#f4f7fb]
        overflow-x-hidden
        pb-32
      "
    >
      {/* IOS SAFE AREA */}
      <div className="h-[env(safe-area-inset-top)] bg-[#f4f7fb]" />

      <div className="px-4 pt-3">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-5"
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              bg-white/80
              backdrop-blur-3xl
              border border-white/60
              shadow-[0_8px_30px_rgba(0,0,0,0.05)]
              px-5
              py-5
            "
          >
            {/* blur orb */}
            <div
              className="
                absolute
                -top-10
                -right-10
                w-32
                h-32
                rounded-full
                bg-violet-200/40
                blur-3xl
              "
            />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p
                  className="
                    text-[11px]
                    font-medium
                    tracking-[0.25em]
                    uppercase
                    text-slate-400
                    mb-1
                  "
                >
                  Commission
                </p>

                <h1
                  className="
                    text-[28px]
                    leading-none
                    font-semibold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Dashboard
                </h1>

                <p className="text-sm text-slate-500 mt-2">
                  Quản lý doanh thu rượu & bào ngư
                </p>
              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-500
                  to-indigo-500
                  flex
                  items-center
                  justify-center
                  text-white
                  font-semibold
                  shadow-lg
                "
              >
                A
              </div>
            </div>
          </div>
        </motion.div>

        {/* SUMMARY */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5"
        >
          <SummaryCards sales={sales} />
        </motion.div>

        {/* FORM SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="
              rounded-[30px]
              bg-white
              border border-slate-100
              shadow-[0_10px_40px_rgba(0,0,0,0.04)]
              p-4
            "
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Thêm giao dịch
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Nhập thông tin commission hôm nay
              </p>
            </div>

            <SaleForm onSubmit={handleCreate} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}