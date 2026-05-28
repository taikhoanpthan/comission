
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { motion } from "framer-motion";

import {
  TrendingUp,
  TrendingDown,
  Wallet2,
} from "lucide-react";

import { formatMoney } from "../utils/calculateCommission";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

  for (
    let i = 5;
    i >= 0;
    i--
  ) {
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
  // COMPARE MONTH
  // =========================
  const currentMonthValue =
    values[values.length - 1] || 0;

  const previousMonthValue =
    values[values.length - 2] || 0;

  const diffValue =
    currentMonthValue -
    previousMonthValue;

  const diffPercent =
    previousMonthValue > 0
      ? (
          (diffValue /
            previousMonthValue) *
          100
        ).toFixed(1)
      : 0;

  const isIncrease =
    diffValue >= 0;

  // =========================
  // FORMAT LABEL
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
      {
        label: "Doanh thu",

        data: values,

        borderColor:
          "#8b5cf6",

        backgroundColor:
          "rgba(139,92,246,0.15)",

        fill: true,

        tension: 0.45,

        borderWidth: 3,

        pointRadius: 0,

        pointHoverRadius: 7,

        pointHoverBorderWidth: 4,

        pointHoverBackgroundColor:
          "#ffffff",

        pointHoverBorderColor:
          "#8b5cf6",
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
          "#0f172a",

        padding: 14,

        cornerRadius: 14,

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
          color: "#94a3b8",

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
          color: "#94a3b8",

          callback: function (
            value
          ) {
            if (
              value >=
              1000000
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
      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* TOTAL */}
        <motion.div
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
            rounded-[28px]
            bg-gradient-to-br
            from-violet-600
            to-indigo-500
            p-5
            text-white
            shadow-[0_15px_35px_rgba(124,58,237,0.35)]
          "
        >
          <div
            className="
              absolute
              -top-10
              -right-10
              w-32
              h-32
              rounded-full
              bg-white/10
              blur-3xl
            "
          />

          <div className="relative z-10">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/15
                backdrop-blur-xl
                flex
                items-center
                justify-center
              "
            >
              <Wallet2
                size={22}
              />
            </div>

            <p className="mt-4 text-white/70 text-sm">
              Tổng 6 tháng
            </p>

            <h2
              className="
                mt-2
                text-[24px]
                leading-none
                font-bold
                tracking-tight
              "
            >
              {formatMoney(
                totalRevenue
              )}
            </h2>
          </div>
        </motion.div>

        {/* COMPARE MONTH */}
        <motion.div
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
            rounded-[28px]
            bg-white
            border
            border-slate-100
            p-5
            shadow-[0_10px_30px_rgba(0,0,0,0.03)]
          "
        >
          <div
            className="
              absolute
              -top-10
              -right-10
              w-32
              h-32
              rounded-full
              blur-3xl
              ${
                isIncrease
                  ? 'bg-emerald-200/20'
                  : 'bg-rose-200/20'
              }
            "
          />

          <div className="relative z-10">
            <div
              className={`
                w-12
                h-12
                rounded-2xl
                flex
                items-center
                justify-center
                ${
                  isIncrease
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-rose-100 text-rose-600"
                }
              `}
            >
              {isIncrease ? (
                <TrendingUp
                  size={22}
                />
              ) : (
                <TrendingDown
                  size={22}
                />
              )}
            </div>

            <p className="mt-4 text-slate-500 text-sm">
              So với tháng trước
            </p>

            <h2
              className={`
                mt-2
                text-[28px]
                leading-none
                font-bold
                ${
                  isIncrease
                    ? "text-emerald-600"
                    : "text-rose-600"
                }
              `}
            >
              {isIncrease
                ? "+"
                : ""}
              {diffPercent}%
            </h2>

            <p
              className={`
                mt-2
                text-sm
                font-semibold
                ${
                  isIncrease
                    ? "text-emerald-500"
                    : "text-rose-500"
                }
              `}
            >
              {isIncrease
                ? "+"
                : "-"}
              {formatMoney(
                Math.abs(
                  diffValue
                )
              )}
            </p>
          </div>
        </motion.div>
      </div>

      {/* CHART CARD */}
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
          rounded-[32px]
          bg-white
          border
          border-white/60
          p-5
          shadow-[0_15px_40px_rgba(15,23,42,0.04)]
        "
      >
        <div
          className="
            absolute
            -top-10
            -right-10
            w-40
            h-40
            rounded-full
            bg-violet-200/20
            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* HEADER */}
          <div className="mb-6">
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-slate-400
                font-medium
              "
            >
              Analytics
            </p>

            <h2
              className="
                mt-2
                text-[28px]
                leading-none
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Biểu đồ doanh thu
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Hiệu suất bán hàng
              6 tháng gần nhất
            </p>
          </div>

          {/* CHART */}
          <div className="h-[320px]">
            <Line
              data={data}
              options={
                options
              }
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
