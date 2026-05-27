import { formatMoney } from "../utils/calculateCommission";

export default function SummaryCards({ sales }) {
  const totalMoney = sales.reduce(
    (acc, item) => acc + Number(item.commission || 0),
    0
  );

  const totalWine = sales.filter((item) => item.type === "wine").length;

  const totalAbalone = sales
    .filter((item) => item.type === "abalone")
    .reduce((acc, item) => acc + Number(item.abaloneQty || 0), 0);

  const cards = [
    {
      title: "Doanh thu",
      value: formatMoney(totalMoney),
      hint: "Tổng hoa hồng",
      color: "from-blue-500/10 to-blue-500/5 border-blue-200",
    },
    {
      title: "Rượu",
      value: totalWine,
      hint: "Đơn đã bán",
      color: "from-amber-500/10 to-amber-500/5 border-amber-200",
    },
    {
      title: "Bào ngư",
      value: totalAbalone,
      hint: "Sản lượng",
      color: "from-emerald-500/10 to-emerald-500/5 border-emerald-200",
    },
  ];

  return (
    <div
      className="
        mt-6
        flex
        gap-4
        overflow-x-auto
        pb-2
        scrollbar-thin
      "
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`
            min-w-[240px]
            flex-1
            shrink-0
            rounded-2xl
            px-5 py-4
            border
            bg-gradient-to-br
            ${card.color}
            shadow-sm
            hover:shadow-md
            transition-all
          `}
        >
          {/* TITLE */}
          <p className="text-slate-600 text-xs font-medium">
            {card.title}
          </p>

          {/* VALUE */}
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 tracking-tight">
            {card.value}
          </h2>

          {/* HINT */}
          <p className="mt-1 text-xs text-slate-500">
            {card.hint}
          </p>
        </div>
      ))}
    </div>
  );
}