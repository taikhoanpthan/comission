import { motion } from "framer-motion";
import { formatMoney } from "../utils/calculateCommission";

export default function SaleTable({ sales }) {
  const total = sales.reduce(
    (acc, item) => acc + Number(item.commission || 0),
    0
  );

  return (
    <div className="mt-4">
      {/* HEADER + TOTAL */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Lịch sử bán hàng
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Danh sách doanh thu gần đây
        </p>
      </div>

      {/* TOTAL CARD (iOS STYLE) */}
      <div className="mb-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-slate-500 text-xs">
              Tổng doanh thu
            </p>

            <p className="text-slate-800 font-semibold text-sm mt-1">
              Tất cả giao dịch
            </p>
          </div>

          <div className="text-emerald-600 text-xl font-bold">
            {formatMoney(total)}
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {sales.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl py-10 text-center">
          <h3 className="text-base font-semibold text-slate-700">
            Chưa có dữ liệu
          </h3>

          <p className="text-slate-500 text-sm mt-2">
            Hãy thêm doanh thu mới
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-3">
        {sales.map((sale, index) => (
          <motion.div
            key={sale.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="
              bg-white
              rounded-2xl
              p-4
              border
              border-slate-200
              shadow-sm
              active:scale-[0.99]
              transition
            "
          >
            <div className="flex items-center justify-between gap-3">
              {/* LEFT */}
              <div className="flex-1">
                <h2 className="text-slate-800 text-base font-semibold">
                  {sale.type === "wine"
                    ? sale.wineLevel === "3m"
                      ? "🍷 Rượu >3tr"
                      : "🍷 Rượu >1tr"
                    : "🦪 Bào ngư"}
                </h2>

                <div className="text-slate-500 text-xs mt-2 flex flex-col gap-1">
                  <span>🪑 Bàn: {sale.tableNumber}</span>
                  <span>🕒 Ca: {sale.shift}</span>
                  <span>📅 {sale.date}</span>

                  {sale.type === "abalone" && (
                    <span>🦪 SL: {sale.abaloneQty}</span>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right shrink-0">
                <p className="text-slate-400 text-xs">
                  Hoa hồng
                </p>

                <h1 className="text-lg font-bold text-emerald-600">
                  +{formatMoney(Number(sale.commission))}
                </h1>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}