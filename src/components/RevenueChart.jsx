import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function RevenueChart({ sales = [] }) {
  // =========================
  // GET LAST 6 MONTHS
  // =========================
  const months = [];

  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(now.getMonth() - i);

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

    const month = item.date.slice(0, 7);

    grouped[month] =
      (grouped[month] || 0) + Number(item.commission || 0);
  });

  // =========================
  // MAP FULL 6 MONTHS
  // =========================
  const values = months.map((m) => grouped[m] || 0);

  // =========================
  // DATA
  // =========================
  const data = {
    labels: months,
    datasets: [
      {
        label: "Doanh thu (6 tháng gần nhất)",
        data: values,

        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",

        tension: 0.4,
        fill: true,

        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 mt-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Biểu đồ doanh thu
        </h2>
        <p className="text-slate-500 mt-1">
          6 tháng gần nhất (trend chuẩn dashboard)
        </p>
      </div>

      <div className="h-[350px]">
        <Line data={data} />
      </div>
    </div>
  );
}