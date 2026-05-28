import { formatMoney } from "../utils/calculateCommission";
import { motion } from "framer-motion";

import {
  Wine,
  Shell,
  Wallet2,
} from "lucide-react";

export default function SummaryCards({
  sales,
}) {
  const totalMoney =
    sales.reduce(
      (acc, item) =>
        acc +
        Number(
          item.commission || 0
        ),
      0
    );

  const totalWine =
    sales.filter(
      (item) =>
        item.type === "wine"
    ).length;

  const totalAbalone =
    sales
      .filter(
        (item) =>
          item.type ===
          "abalone"
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(
            item.abaloneQty ||
              0
          ),
        0
      );

  return (
    <div className="space-y-5">
      {/* HERO CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        whileHover={{
          y: -3,
        }}
        className="
          group
          relative
          overflow-hidden

          rounded-[34px]

          bg-white/[0.03]
          backdrop-blur-2xl

          border
          border-cyan-400/20

          p-6

          shadow-[0_0_40px_rgba(34,211,238,0.06)]

          transition-all
          duration-300
        "
      >
        {/* NEON BORDER */}
        <div
          className="
            absolute
            inset-0
            rounded-[34px]
            p-[1px]

            bg-gradient-to-br
            from-cyan-400/30
            via-fuchsia-500/10
            to-blue-500/20

            [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
            [mask-composite:exclude]

            pointer-events-none
          "
        />

        {/* CYAN GLOW */}
        <div
          className="
            absolute
            -right-20
            -top-20

            w-72
            h-72

            rounded-full

            bg-cyan-400/15

            blur-3xl
          "
        />

        {/* PURPLE GLOW */}
        <div
          className="
            absolute
            bottom-0
            left-0

            w-52
            h-52

            rounded-full

            bg-fuchsia-500/10

            blur-3xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* LEFT */}
          <div>
            <p
              className="
                text-cyan-300/65
                text-sm
              "
            >
              Tổng thu nhập
            </p>

            <h2
              className="
                mt-3

                text-[38px]
                leading-none

                font-black

                tracking-tight

                text-white
              "
            >
              {formatMoney(
                totalMoney
              )}
            </h2>


          </div>

          {/* ICON */}
          <div
            className="
              shrink-0

              w-16
              h-16

              rounded-[22px]

              bg-cyan-400/10

              border
              border-cyan-400/20

              text-cyan-300

              backdrop-blur-xl

              flex
              items-center
              justify-center

              shadow-[0_0_30px_rgba(34,211,238,0.15)]
            "
          >
            <Wallet2 size={30} />
          </div>
        </div>
      </motion.div>

      {/* SMALL CARDS */}
      <div className="grid grid-cols-2 gap-5">
        {/* WINE */}


        {/* ABALONE */}

      </div>
    </div>
  );
}