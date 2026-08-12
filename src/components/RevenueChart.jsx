import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, PointElement, LineElement, LineController, BarElement, BarController, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
import { formatMoney } from "../utils/calculateCommission";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, BarElement, BarController, Tooltip, Legend, Filler);

export default function RevenueChart({ sales = [] }) {
  const months = Array.from({ length: 6 }, (_, index) => { const date = new Date(); date.setMonth(date.getMonth() - 5 + index); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; });
  const totals = sales.reduce((result, item) => { const month = (item.date || item.createdAt || "").slice(0, 7); result[month] = (result[month] || 0) + Number(item.commission || 0); return result; }, {});
  const values = months.map((month) => totals[month] || 0);
  return <div className="h-[260px]"><Line data={{ labels: months.map((month) => `${month.slice(5)}/${month.slice(2, 4)}`), datasets: [{ label: "Commission", data: values, borderColor: "#1677ff", backgroundColor: "rgba(22,119,255,0.08)", fill: true, tension: 0.25, borderWidth: 2, pointRadius: 3, pointBackgroundColor: "#1677ff" }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: "#1f2937", padding: 10, cornerRadius: 4, callbacks: { label: (context) => formatMoney(context.raw) } } }, scales: { x: { grid: { display: false }, ticks: { color: "#6b7280", font: { size: 11 } } }, y: { border: { display: false }, grid: { color: "#edf0f4" }, ticks: { color: "#6b7280", font: { size: 11 }, callback: (value) => value >= 1000000 ? `${value / 1000000}M` : value } } } }} /></div>;
}
