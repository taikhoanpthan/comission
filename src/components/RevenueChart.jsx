

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
<<<<<<< HEAD
import { TrendingUp, Wallet2 } from "lucide-react";
=======

import {
  TrendingUp,
  TrendingDown,
  Wallet2,
} from "lucide-react";

>>>>>>> 66aac84bdfcd34e82d0c443b255644fc60f9fb44
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

export default function RevenueChart({ sales = [] }) {
  // =========================
  // GROUP BY MONTH (ALL DATA)
  // =========================
  const grouped = {};

  sales.forEach((item) => {
    if (!item?.date) return;

    const monthKey = item.date.slice(0, 7); // YYYY-MM

    grouped[monthKey] =
      (grouped[monthKey] || 0) + Number(item.commission || 0);
  });

  // =========================
  // GET ALL MONTHS SORTED
  // =========================
  const months = Object.keys(grouped).sort((a, b) => {
    return new Date(a + "-01") - new Date(b + "-01");
  });

  const values = months.map((m) => grouped[m] || 0);

  // =========================
  // TOTAL
  // =========================
  const totalRevenue = values.reduce((acc, v) => acc + v, 0);

  // =========================
  // BEST MONTH
  // =========================
  const maxValue = Math.max(...values, 0);
  const bestIndex = values.indexOf(maxValue);
  const bestMonth = months[bestIndex] || "-";

  // =========================
  // AUTO COMPARE
  // =========================
  const currentMonth =
    months[months.length - 1];

  const previousMonth =
    months[months.length - 2];

  const currentMonthValue =
    grouped[currentMonth] || 0;

  const previousMonthValue =
    grouped[previousMonth] || 0;

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
  const labels = months.map((m) => {
    const [y, mo] = m.split("-");
    return `${mo}/${y.slice(2)}`;
  });

  const formatMonth = (
    month
  ) => {
    const [year, m] =
      month.split("-");

    return `${m}/${year.slice(
      2
    )}`;
  };

  // =========================
  // CHART DATA
  // =========================
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: values,
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34,211,238,0.12)",
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#020617",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (ctx) => formatMoney(ctx.raw),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(226,232,240,0.7)",
          font: { size: 12, weight: "600" },
        },
      },
      y: {
        grid: { color: "rgba(148,163,184,0.08)" },
        ticks: {
          color: "rgba(226,232,240,0.6)",
        },
      },
    },
  };

  return (
    <div>
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

        {/* TOTAL */}
        <motion.div className="relative overflow-hidden rounded-[30px] border border-cyan-400/20 bg-white/[0.03] backdrop-blur-2xl p-5">
          <Wallet2 className="text-cyan-300" size={24} />

          <p className="mt-4 text-cyan-200/60 text-sm">Total Revenue</p>

          <h2 className="mt-2 text-[30px] font-black text-white">
            {formatMoney(totalRevenue)}
          </h2>
        </motion.div>

<<<<<<< HEAD
        {/* BEST MONTH */}
        <motion.div className="relative overflow-hidden rounded-[30px] border border-fuchsia-500/20 bg-white/[0.03] backdrop-blur-2xl p-5">
          <TrendingUp className="text-fuchsia-300" size={24} />

          <p className="mt-4 text-fuchsia-200/60 text-sm">
            Best Month
          </p>

          <h2 className="mt-2 text-[30px] font-black text-white">
            {bestMonth}
          </h2>

          <p className="text-fuchsia-300 mt-2">
            {formatMoney(maxValue)}
          </p>
=======
        {/* AUTO COMPARE */}
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
          {/* GLOW */}
          <div
            className={`
              absolute
              -top-10
              -right-10
              w-32
              h-32
              rounded-full
              blur-3xl
              ${
                isIncrease
                  ? "bg-emerald-200/20"
                  : "bg-rose-200/20"
              }
            `}
          />

          <div className="relative z-10">
            {/* ICON */}
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

            {/* LABEL */}
            <p className="mt-4 text-slate-500 text-sm">
              {formatMonth(
                currentMonth
              )}{" "}
              vs{" "}
              {formatMonth(
                previousMonth
              )}
            </p>

            {/* PERCENT */}
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

            {/* MONEY */}
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
>>>>>>> 66aac84bdfcd34e82d0c443b255644fc60f9fb44
        </motion.div>

      </div>

      {/* CHART */}
      <motion.div className="relative overflow-hidden rounded-[34px] bg-white/[0.03] border border-cyan-400/20 p-5">
        <div className="h-[320px]">
          <Line data={data} options={options} />
        </div>
      </motion.div>
    </div>
  );
}
