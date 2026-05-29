
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  Tooltip,
} from "chart.js";

import {
  Line,
} from "react-chartjs-2";

import { motion } from "framer-motion";

import {
  TrendingUp,
  Wallet2,
} from "lucide-react";

import { formatMoney } from "../utils/calculateCommission";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart({
  sales = [],
}) {

  // =========================
  // LAST 6 MONTHS
  // =========================
  const months = [];

  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);

    d.setMonth(
      now.getMonth() - i
    );

    const key = `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;

    months.push(key);
  }

  // =========================
  // GROUP DATA
  // =========================
  const grouped = {};

  sales.forEach((item) => {
    if (!item?.date) return;

    const month =
      item.date.slice(0, 7);

    grouped[month] =
      (grouped[month] || 0) +
      Number(
        item.commission || 0
      );
  });

  // =========================
  // VALUES
  // =========================
  const values = months.map(
    (m) => grouped[m] || 0
  );

  // =========================
  // TOTAL
  // =========================
  const totalRevenue =
    values.reduce(
      (acc, val) =>
        acc + val,
      0
    );

  // =========================
  // BEST MONTH
  // =========================
  const maxValue =
    Math.max(...values);

  const bestMonth =
    months[
      values.indexOf(maxValue)
    ];

  // =========================
  // LABELS
  // =========================
  const labels = months.map(
    (month) => {
      const [year, m] =
        month.split("-");

      return `${m}/${year.slice(
        2
      )}`;
    }
  );

  // =========================
  // CHART DATA
  // =========================
  const data = {
    labels,

    datasets: [
      // BAR
      {
        type: "bar",

        label: "Revenue",

        data: values,

        backgroundColor:
          "rgba(34,211,238,0.16)",

        borderRadius: 14,

        borderSkipped: false,

        barThickness: 36,
      },

      // LINE
      {
        type: "line",

        label: "Trend",

        data: values,

        borderColor:
          "#22d3ee",

        backgroundColor:
          "rgba(34,211,238,0.12)",

        fill: true,

        tension: 0.45,

        borderWidth: 3,

        pointRadius: 5,

        pointHoverRadius: 8,

        pointBackgroundColor:
          "#22d3ee",

        pointBorderWidth: 3,

        pointBorderColor:
          "#0f172a",
      },
    ],
  };

  // =========================
  // OPTIONS
  // =========================
  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor:
          "#020617",

        borderColor:
          "rgba(34,211,238,0.2)",

        borderWidth: 1,

        padding: 14,

        cornerRadius: 18,

        displayColors: false,

        callbacks: {
          label: function (
            context
          ) {
            return formatMoney(
              context.raw
            );
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color:
            "rgba(226,232,240,0.7)",

          font: {
            size: 12,
            weight: "600",
          },
        },
      },

      y: {
        border: {
          display: false,
        },

        grid: {
          color:
            "rgba(148,163,184,0.08)",
        },

        ticks: {
          color:
            "rgba(226,232,240,0.55)",

          callback: function (
            value
          ) {
            if (
              value >= 1000000
            ) {
              return `${value / 1000000}M`;
            }

            return value;
          },
        },
      },
    },

    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

        {/* TOTAL */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-cyan-400/20
            bg-white/[0.03]
            backdrop-blur-2xl
            p-5
          "
        >

          <div
            className="
              absolute
              -top-20
              -right-20
              w-52
              h-52
              rounded-full
              bg-cyan-400/15
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                text-cyan-300
              "
            >
              <Wallet2 size={24} />
            </div>

            <p className="mt-5 text-sm text-cyan-200/60">
              Tổng doanh thu
            </p>

            <h2
              className="
                mt-2
                text-[30px]
                font-black
                leading-none
                tracking-tight
              "
            >
              {formatMoney(
                totalRevenue
              )}
            </h2>

          </div>
        </motion.div>

        {/* BEST MONTH */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.05,
          }}
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-fuchsia-500/20
            bg-white/[0.03]
            backdrop-blur-2xl
            p-5
          "
        >

          <div
            className="
              absolute
              -top-20
              -right-20
              w-52
              h-52
              rounded-full
              bg-fuchsia-500/15
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-fuchsia-500/20
                bg-fuchsia-500/10
                text-fuchsia-300
              "
            >
              <TrendingUp
                size={24}
              />
            </div>

            <p className="mt-5 text-sm text-fuchsia-200/60">
              Tháng cao nhất
            </p>

            <h2
              className="
                mt-2
                text-[30px]
                font-black
                leading-none
              "
            >
              {bestMonth}
            </h2>

            <p className="mt-3 font-semibold text-fuchsia-300">
              {formatMoney(
                maxValue
              )}
            </p>

          </div>
        </motion.div>
      </div>

      {/* CHART */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        className="
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-cyan-400/20
          bg-white/[0.03]
          backdrop-blur-2xl
          p-5
        "
      >

        {/* GLOW */}
        <div
          className="
            absolute
            -top-20
            right-0
            w-72
            h-72
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div className="relative z-10">

          {/* HEADER */}
          <div className="mb-8">

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.35em]
                text-cyan-300/60
                font-semibold
              "
            >
              ANALYTICS
            </p>

            <h2
              className="
                mt-3
                text-[30px]
                font-black
                leading-none
                tracking-tight
              "
            >
              Revenue Overview
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Hiệu suất doanh thu
              6 tháng gần nhất
            </p>

          </div>

          {/* CHART */}
          <div className="h-[340px]">
            <Line
              data={data}
              options={options}
            />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
