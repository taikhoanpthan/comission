import { Shell, Wallet2, Wine } from "lucide-react";
import { formatMoney } from "../utils/calculateCommission";

export default function SummaryCards({ sales }) {
  const totalMoney = sales.reduce((sum, item) => sum + Number(item.commission || 0), 0);
  const totalWine = sales.filter((item) => item.type === "wine").length;
  const totalAbalone = sales.filter((item) => item.type === "abalone").reduce((sum, item) => sum + Number(item.abaloneQty || 0), 0);
  const cards = [
    { label: "Tổng commission", value: formatMoney(totalMoney), icon: Wallet2, tone: "bg-[#e6f4ff] text-[#1677ff]" },
    { label: "Giao dịch rượu", value: totalWine, icon: Wine, tone: "bg-[#fff1f0] text-[#cf1322]" },
    { label: "Bào ngư", value: totalAbalone, icon: Shell, tone: "bg-[#f6ffed] text-[#389e0d]" },
  ];
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{cards.map(({ label, value, icon: Icon, tone }) => <div key={label} className="flex items-center gap-3 rounded-md border border-[#e1e6ed] bg-white p-3"><div className={`flex h-8 w-8 items-center justify-center rounded-md ${tone}`}><Icon size={16} /></div><div><div className="text-xs text-[#6b7280]">{label}</div><div className="mt-0.5 text-lg font-semibold text-[#1f2937]">{value}</div></div></div>)}</div>;
}
