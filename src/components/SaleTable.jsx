import { motion } from "framer-motion";

import {
  Wallet2,
  Wine,
  Clock3,
  CalendarDays,
  UtensilsCrossed,
} from "lucide-react";

import { formatMoney } from "../utils/calculateCommission";

export default function SaleTable({ sales }) {
  // TOTAL
  const total = sales.reduce(
    (acc, item) => acc + Number(item.commission || 0),
    0,
  );

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="mb-5">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-slate-400
            font-medium
          "
        >
          Revenue
        </p>
      </div>


      {/* EMPTY */}
      {sales.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            rounded-[32px]
            bg-white
            border
            border-slate-100
            py-14
            px-5
            text-center
            shadow-[0_10px_30px_rgba(0,0,0,0.03)]
          "
        >
          <div
            className="
              mx-auto
              w-20
              h-20
              rounded-full
              bg-slate-100
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            📭
          </div>

          <h3
            className="
              mt-5
              text-xl
              font-bold
              text-slate-800
            "
          >
            Chưa có dữ liệu
          </h3>

          <p className="text-slate-500 text-sm mt-2">Hãy thêm doanh thu mới</p>
        </motion.div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-4">
        {sales.map((sale, index) => (
          <motion.div
            key={sale.id || index}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-white
                border
                border-white/60
                p-5
                shadow-[0_15px_40px_rgba(15,23,42,0.04)]
              "
          >
            {/* GLOW */}
            <div
              className={`
                  absolute
                  -right-10
                  -top-10
                  w-32
                  h-32
                  rounded-full
                  blur-3xl
                  ${
                    sale.type === "wine"
                      ? `
                        bg-violet-200/30
                      `
                      : `
                        bg-emerald-200/30
                      `
                  }
                `}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                {/* LEFT */}
                <div className="flex gap-4 flex-1">
                  {/* ICON */}
                  <div
                    className={`
                        shrink-0
                        w-14
                        h-14
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-white
                        shadow-lg
                        ${
                          sale.type === "wine"
                            ? `
                              bg-gradient-to-br
                              from-violet-500
                              to-indigo-500
                            `
                            : `
                              bg-gradient-to-br
                              from-emerald-500
                              to-teal-500
                            `
                        }
                      `}
                  >
                    {sale.type === "wine" ? (
                      <Wine size={24} />
                    ) : (
                      <span className="text-2xl">🦪</span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h2
                      className="
                          text-lg
                          font-bold
                          text-slate-900
                        "
                    >
                      {sale.type === "wine"
                        ? sale.wineLevel === "3m"
                          ? "Rượu >3tr"
                          : "Rượu >1tr"
                        : "Bào ngư"}
                    </h2>

                    <div
                      className="
                          mt-3
                          flex
                          flex-col
                          gap-2
                        "
                    >
                      {/* TABLE */}
                      <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            text-sm
                          "
                      >
                        <UtensilsCrossed size={14} />

                        <span>Bàn {sale.tableNumber}</span>
                      </div>

                      {/* SHIFT */}
                      <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            text-sm
                          "
                      >
                        <Clock3 size={14} />

                        <span>Ca {sale.shift}</span>
                      </div>

                      {/* DATE */}
                      <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-slate-500
                            text-sm
                          "
                      >
                        <CalendarDays size={14} />

                        <span>{sale.date}</span>
                      </div>

                      {/* ABALONE */}
                      {sale.type === "abalone" && (
                        <div
                          className="
                              inline-flex
                              items-center
                              gap-2
                              w-fit
                              rounded-full
                              bg-emerald-50
                              text-emerald-600
                              px-3
                              py-1
                              text-xs
                              font-medium
                              mt-1
                            "
                        >
                          🦪 SL: {sale.abaloneQty}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right shrink-0">
                  <p className="text-slate-400 text-xs">Hoa hồng</p>

                  <h1
                    className="
                        mt-2
                        text-[24px]
                        leading-none
                        font-bold
                        tracking-tight
                        text-emerald-500
                      "
                  >
                    +{formatMoney(Number(sale.commission))}
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
