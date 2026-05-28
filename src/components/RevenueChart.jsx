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
import { TrendingUp, Wallet2 } from "lucide-react";
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
  // FORMAT LABEL
  // =========================
  const labels = months.map((m) => {
    const [y, mo] = m.split("-");
    return `${mo}/${y.slice(2)}`;
  });

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