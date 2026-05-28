import { formatMoney } from "../utils/calculateCommission";
import { motion } from "framer-motion";
import { Wine, Shell, Wallet2 } from "lucide-react";

export default function SummaryCards({ sales }) {
  const totalMoney = sales.reduce(
    (acc, item) => acc + Number(item.commission || 0),
    0
  );

  const totalWine = sales.filter(
    (item) => item.type === "wine"
  ).length;

  const totalAbalone = sales
    .filter((item) => item.type === "abalone")
    .reduce(
      (acc, item) => acc + Number(item.abaloneQty || 0),
      0
    );

  return (
    <div className="space-y-4">
      {/* HERO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          relative
          overflow-hidden
          rounded-[30px]
          p-5
          bg-gradient-to-br
          from-violet-600
          via-purple-500
          to-indigo-500
          text-white
          shadow-[0_15px_40px_rgba(124,58,237,0.35)]
        "
      >
        {/* blur */}
        <div
          className="
            absolute
            -right-10
            -top-10
            w-40
            h-40
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-white/70 text-sm">
              Tổng thu nhập
            </p>

            <h2
              className="
                mt-2
                text-[32px]
                leading-none
                font-bold
                tracking-tight
              "
            >
              {formatMoney(totalMoney)}
            </h2>

            <div
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-3
                py-1.5
                text-xs
                backdrop-blur-xl
              "
            >
              <span>▲ 12.5%</span>
              <span className="text-white/70">
                so với tháng trước
              </span>
            </div>
          </div>

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-white/15
              backdrop-blur-xl
              flex
              items-center
              justify-center
            "
          >
            <Wallet2 size={28} />
          </div>
        </div>
      </motion.div>

      {/* SMALL CARDS */}
      <div className="grid grid-cols-2 gap-4">
        {/* WINE */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="
            rounded-[26px]
            bg-white
            p-4
            border border-slate-100
            shadow-[0_10px_30px_rgba(0,0,0,0.04)]
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-amber-100
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <Wine className="text-amber-600" size={22} />
          </div>

          <p className="text-slate-500 text-sm">
            Rượu
          </p>

          <h3
            className="
              mt-1
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {totalWine}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Đơn đã bán
          </p>
        </motion.div>

        {/* ABALONE */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="
            rounded-[26px]
            bg-white
            p-4
            border border-slate-100
            shadow-[0_10px_30px_rgba(0,0,0,0.04)]
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-emerald-100
              flex
              items-center
              justify-center
              mb-4
            "
          >
            <Shell className="text-emerald-600" size={22} />
          </div>

          <p className="text-slate-500 text-sm">
            Bào ngư
          </p>

          <h3
            className="
              mt-1
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {totalAbalone}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Sản lượng
          </p>
        </motion.div>
      </div>
    </div>
  );
}