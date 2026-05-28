import { motion } from "framer-motion";

import {
  Wine,
  Clock3,
  CalendarDays,
  UtensilsCrossed,
} from "lucide-react";

import { formatMoney } from "../utils/calculateCommission";

export default function SaleTable({ sales }) {
  // TOTAL
  const total = sales.reduce(
    (acc, item) =>
      acc +
      Number(
        item.commission || 0
      ),
    0
  );

  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="mb-6">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-cyan-300/60
            font-semibold
          "
        >
          REVENUE
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <h2
            className="
              text-[30px]
              leading-none
              font-black
              tracking-tight
              text-white
            "
          >
            Giao dịch
          </h2>

          <div
            className="
              px-4
              py-2
              rounded-2xl

              bg-cyan-400/10
              border
              border-cyan-400/20

              text-cyan-300
              text-sm
              font-semibold

              shadow-[0_0_20px_rgba(34,211,238,0.08)]
            "
          >
            {formatMoney(total)}
          </div>
        </div>
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
            relative
            overflow-hidden

            rounded-[34px]

            bg-white/[0.03]
            backdrop-blur-2xl

            border
            border-cyan-400/20

            py-16
            px-5

            text-center

            shadow-[0_0_40px_rgba(34,211,238,0.05)]
          "
        >
          {/* BORDER */}
          <div
            className="
              absolute
              inset-0
              rounded-[34px]
              p-[1px]

              bg-gradient-to-br
              from-cyan-400/20
              via-fuchsia-500/10
              to-blue-500/20

              [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
              [mask-composite:exclude]

              pointer-events-none
            "
          />

          {/* GLOW */}
          <div
            className="
              absolute
              -top-20
              left-1/2
              -translate-x-1/2

              w-72
              h-72

              rounded-full

              bg-cyan-400/10

              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
            "
          >
            <div
              className="
                mx-auto

                w-24
                h-24

                rounded-full

                bg-cyan-400/10

                border
                border-cyan-400/20

                flex
                items-center
                justify-center

                text-4xl

                shadow-[0_0_25px_rgba(34,211,238,0.12)]
              "
            >
              📭
            </div>

            <h3
              className="
                mt-6
                text-[26px]
                font-black
                tracking-tight
                text-white
              "
            >
              Chưa có dữ liệu
            </h3>

            <p
              className="
                text-slate-400
                text-sm
                mt-3
              "
            >
              Hãy thêm doanh thu mới
            </p>
          </div>
        </motion.div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-5">
        {sales.map(
          (sale, index) => (
            <motion.div
              key={
                sale.id || index
              }
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.03,
              }}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="
                group
                relative
                overflow-hidden

                rounded-[32px]

                bg-white/[0.03]
                backdrop-blur-2xl

                border
                border-white/10

                p-5

                transition-all
                duration-300

                hover:border-cyan-400/20

                shadow-[0_0_30px_rgba(34,211,238,0.04)]
              "
            >
              {/* NEON BORDER */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-[32px]
                  p-[1px]

                  bg-gradient-to-br
                  from-cyan-400/0
                  via-fuchsia-500/0
                  to-blue-500/0

                  opacity-0

                  group-hover:opacity-100

                  transition-all
                  duration-500

                  [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                  [mask-composite:exclude]

                  pointer-events-none
                "
              />

              {/* GLOW */}
              <div
                className={`
                  absolute
                  -right-16
                  -top-16

                  w-52
                  h-52

                  rounded-full

                  blur-3xl

                  ${
                    sale.type ===
                    "wine"
                      ? `
                        bg-fuchsia-500/15
                      `
                      : `
                        bg-cyan-400/15
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

                        w-16
                        h-16

                        rounded-[22px]

                        flex
                        items-center
                        justify-center

                        border

                        ${
                          sale.type ===
                          "wine"
                            ? `
                              bg-fuchsia-500/10
                              border-fuchsia-500/20
                              text-fuchsia-300

                              shadow-[0_0_25px_rgba(168,85,247,0.15)]
                            `
                            : `
                              bg-cyan-400/10
                              border-cyan-400/20
                              text-cyan-300

                              shadow-[0_0_25px_rgba(34,211,238,0.15)]
                            `
                        }
                      `}
                    >
                      {sale.type ===
                      "wine" ? (
                        <Wine
                          size={26}
                        />
                      ) : (
                        <span className="text-3xl">
                          🦪
                        </span>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <h2
                        className="
                          text-[22px]
                          leading-none
                          font-black
                          tracking-tight
                          text-white
                        "
                      >
                        {sale.type ===
                        "wine"
                          ? sale.wineLevel ===
                            "3m"
                            ? "Rượu >3tr"
                            : "Rượu >1tr"
                          : "Bào ngư"}
                      </h2>

                      <div
                        className="
                          mt-4
                          flex
                          flex-col
                          gap-3
                        "
                      >
                        {/* TABLE */}
                        <div
                          className="
                            flex
                            items-center
                            gap-2

                            text-slate-400
                            text-sm
                          "
                        >
                          <UtensilsCrossed
                            size={15}
                            className="
                              text-cyan-300/70
                            "
                          />

                          <span>
                            Bàn{" "}
                            {
                              sale.tableNumber
                            }
                          </span>
                        </div>

                        {/* SHIFT */}
                        <div
                          className="
                            flex
                            items-center
                            gap-2

                            text-slate-400
                            text-sm
                          "
                        >
                          <Clock3
                            size={15}
                            className="
                              text-cyan-300/70
                            "
                          />

                          <span>
                            Ca{" "}
                            {sale.shift}
                          </span>
                        </div>

                        {/* DATE */}
                        <div
                          className="
                            flex
                            items-center
                            gap-2

                            text-slate-400
                            text-sm
                          "
                        >
                          <CalendarDays
                            size={15}
                            className="
                              text-cyan-300/70
                            "
                          />

                          <span>
                            {sale.date}
                          </span>
                        </div>

                        {/* ABALONE */}
                        {sale.type ===
                          "abalone" && (
                          <div
                            className="
                              inline-flex
                              items-center
                              gap-2

                              w-fit

                              rounded-full

                              bg-cyan-400/10

                              border
                              border-cyan-400/20

                              text-cyan-300

                              px-3
                              py-1.5

                              text-xs
                              font-semibold

                              mt-1

                              shadow-[0_0_20px_rgba(34,211,238,0.08)]
                            "
                          >
                            🦪 SL:{" "}
                            {
                              sale.abaloneQty
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right shrink-0">
                    <p
                      className="
                        text-slate-500
                        text-xs
                        uppercase
                        tracking-[0.2em]
                      "
                    >
                      Hoa hồng
                    </p>

                    <h1
                      className="
                        mt-3

                        text-[28px]
                        leading-none

                        font-black

                        tracking-tight

                        text-cyan-300

                        drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]
                      "
                    >
                      +
                      {formatMoney(
                        Number(
                          sale.commission
                        )
                      )}
                    </h1>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}