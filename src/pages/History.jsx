import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import {
  Wallet2,
  Wine,
  Shell,
  CalendarDays,
  Trash2,
  ChevronRight,
  Database,
} from "lucide-react";

import { api } from "../services/api";
import { formatMoney } from "../utils/calculateCommission";

export default function History() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // =====================================================
  // FETCH
  // =====================================================

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);

      const res = await api.get("/commission");

      const sorted = (res.data || []).sort(
        (a, b) =>
          new Date(b.date || b.createdAt) -
          new Date(a.date || a.createdAt)
      );

      setSales(sorted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const today = new Date();

  const filteredSales = useMemo(() => {
    return sales.filter((item) => {
      const d = new Date(item.date);

      if (filter === "today") {
        return d.toDateString() === today.toDateString();
      }

      if (filter === "month") {
        return (
          d.getMonth() === selectedMonth.getMonth() &&
          d.getFullYear() === selectedMonth.getFullYear()
        );
      }

      return true;
    });
  }, [sales, filter, selectedMonth]);

  // =====================================================
  // TOTAL
  // =====================================================

  const totalIncome = useMemo(() => {
    return filteredSales.reduce(
      (acc, item) => acc + Number(item.commission || 0),
      0
    );
  }, [filteredSales]);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xóa giao dịch?",
      text: "Giao dịch này sẽ bị xóa và không thể hoàn tác.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Xóa giao dịch",
      cancelButtonText: "Hủy",

      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",

      background: "#ffffff",
      color: "#1f2937",

      reverseButtons: true,

      customClass: {
        popup: "erp-swal-popup",
        title: "erp-swal-title",
        htmlContainer: "erp-swal-text",
        confirmButton: "erp-swal-confirm",
        cancelButton: "erp-swal-cancel",
      },
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/commission/${id}`);

      setSales((prev) =>
        prev.filter((item) => item.id !== id)
      );

      await Swal.fire({
        title: "Đã xóa",
        text: "Giao dịch đã được xóa thành công.",
        icon: "success",
        confirmButtonText: "Đóng",
        confirmButtonColor: "#1677ff",
        background: "#ffffff",
        color: "#1f2937",
      });
    } catch (err) {
      console.log(err);

      await Swal.fire({
        title: "Có lỗi xảy ra",
        text: "Không thể xóa giao dịch. Vui lòng thử lại.",
        icon: "error",
        confirmButtonText: "Đóng",
        confirmButtonColor: "#1677ff",
        background: "#ffffff",
        color: "#1f2937",
      });
    }
  };

  // =====================================================
  // MONTH LABEL
  // =====================================================

  const monthLabel = selectedMonth.toLocaleDateString(
    "vi-VN",
    {
      month: "long",
      year: "numeric",
    }
  );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 pb-10 text-[#1f2937] lg:px-6">
      <div className="mx-auto max-w-[1600px]">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-5 lg:pt-6"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Database
                  size={15}
                  className="text-[#1677ff]"
                />

                <span className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                  Commission Management
                </span>
              </div>

              <h1 className="m-0 text-[24px] font-semibold tracking-[-0.5px] text-[#111827]">
                Lịch sử giao dịch
              </h1>

              <p className="mt-1 text-sm text-[#8c8c8c]">
                Theo dõi toàn bộ giao dịch commission
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2">
              <CalendarDays
                size={16}
                className="text-[#1677ff]"
              />

              <span className="text-sm font-medium capitalize text-[#374151]">
                {monthLabel}
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* TOTAL INCOME */}

            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                    Tổng commission
                  </div>

                  <div className="mt-2 text-[26px] font-semibold tracking-tight text-[#111827]">
                    {formatMoney(totalIncome)}
                  </div>

                  <div className="mt-1 text-xs text-[#9ca3af]">
                    Trong kỳ đang chọn
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f4ff] text-[#1677ff]">
                  <Wallet2 size={19} />
                </div>
              </div>
            </div>

            {/* TRANSACTION COUNT */}

            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                    Số giao dịch
                  </div>

                  <div className="mt-2 text-[26px] font-semibold tracking-tight text-[#111827]">
                    {filteredSales.length}
                  </div>

                  <div className="mt-1 text-xs text-[#9ca3af]">
                    Bản ghi commission
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f6ffed] text-[#52c41a]">
                  <Database size={19} />
                </div>
              </div>
            </div>

            {/* PERIOD */}

            <div className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                    Kỳ báo cáo
                  </div>

                  <div className="mt-2 text-[20px] font-semibold capitalize text-[#111827]">
                    {filter === "today"
                      ? "Hôm nay"
                      : filter === "all"
                        ? "Tất cả"
                        : monthLabel}
                  </div>

                  <div className="mt-1 text-xs text-[#9ca3af]">
                    Bộ lọc hiện tại
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff7e6] text-[#fa8c16]">
                  <CalendarDays size={19} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            FILTER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5"
        >
          <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-end md:justify-between">
              {/* FILTER BUTTONS */}

              <div>
                <div className="mb-2 text-sm font-medium text-[#374151]">
                  Bộ lọc thời gian
                </div>

                <div className="flex gap-2">
                  {[
                    {
                      key: "month",
                      label: "Theo tháng",
                    },
                    {
                      key: "today",
                      label: "Hôm nay",
                    },
                    {
                      key: "all",
                      label: "Tất cả",
                    },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setFilter(item.key)}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                        filter === item.key
                          ? "border-[#1677ff] bg-[#1677ff] text-white"
                          : "border-[#d9d9d9] bg-white text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* MONTH */}

              <div>
                <div className="mb-2 text-xs text-[#8c8c8c]">
                  Tháng báo cáo
                </div>

                <input
                  type="month"
                  value={`${selectedMonth.getFullYear()}-${String(
                    selectedMonth.getMonth() + 1
                  ).padStart(2, "0")}`}
                  onChange={(e) => {
                    if (!e.target.value) return;

                    setSelectedMonth(
                      new Date(`${e.target.value}-01`)
                    );

                    setFilter("month");
                  }}
                  className="h-10 rounded-md border border-[#d9d9d9] bg-white px-3 text-sm text-[#374151] outline-none transition focus:border-[#1677ff] focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            LIST
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-5"
        >
          <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#f0f0f0] px-4 py-4">
              <div>
                <h2 className="m-0 text-[15px] font-semibold text-[#1f2937]">
                  Danh sách giao dịch
                </h2>

                <p className="m-0 mt-1 text-xs text-[#9ca3af]">
                  Các giao dịch được sắp xếp theo thời gian
                </p>
              </div>

              <div className="rounded-md bg-[#f5f5f5] px-2.5 py-1 text-xs font-medium text-[#595959]">
                {filteredSales.length} giao dịch
              </div>
            </div>

            {/* LOADING */}

            {loading ? (
              <div className="p-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="mb-2 h-[72px] animate-pulse rounded-lg bg-[#f5f5f5]"
                  />
                ))}
              </div>
            ) : filteredSales.length === 0 ? (
              /* EMPTY */

              <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5] text-[#bfbfbf]">
                  <Database size={20} />
                </div>

                <div className="text-sm font-medium text-[#595959]">
                  Không có dữ liệu
                </div>

                <div className="mt-1 text-xs text-[#9ca3af]">
                  Không tìm thấy giao dịch trong khoảng thời gian này
                </div>
              </div>
            ) : (
              /* LIST */

              <div>
                {/* DESKTOP TABLE HEADER */}

                <div className="hidden grid-cols-[60px_1.5fr_1fr_1fr_180px_40px] items-center border-b border-[#f0f0f0] bg-[#fafafa] px-4 py-3 text-xs font-medium text-[#595959] md:grid">
                  <div>STT</div>
                  <div>Loại giao dịch</div>
                  <div>Bàn</div>
                  <div>Ca</div>
                  <div className="text-right">
                    Commission
                  </div>
                  <div />
                </div>

                {/* ROWS */}

                <div>
                  {filteredSales.map((sale, index) => (
                    <motion.div
                      key={sale.id || index}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.025,
                      }}
                      className="group relative border-b border-[#f5f5f5] last:border-b-0"
                    >
                      {/* DESKTOP */}

                      <div className="hidden min-h-[76px] grid-cols-[60px_1.5fr_1fr_1fr_180px_40px] items-center px-4 transition-colors hover:bg-[#fafafa] md:grid">
                        {/* STT */}

                        <div className="text-xs text-[#8c8c8c]">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* TYPE */}

                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              sale.type === "wine"
                                ? "bg-[#fff0f6] text-[#eb2f96]"
                                : "bg-[#e6f4ff] text-[#1677ff]"
                            }`}
                          >
                            {sale.type === "wine" ? (
                              <Wine size={17} />
                            ) : (
                              <Shell size={17} />
                            )}
                          </div>

                          <div>
                            <div className="text-sm font-medium text-[#262626]">
                              {sale.type === "wine"
                                ? "Wine Order"
                                : "Shell Order"}
                            </div>

                            <div className="mt-0.5 text-xs text-[#9ca3af]">
                              {sale.date || "--"}
                            </div>
                          </div>
                        </div>

                        {/* TABLE */}

                        <div className="text-sm text-[#595959]">
                          {sale.tableNumber
                            ? `Bàn ${sale.tableNumber}`
                            : "--"}
                        </div>

                        {/* SHIFT */}

                        <div className="text-sm text-[#595959]">
                          {sale.shift || "--"}
                        </div>

                        {/* COMMISSION */}

                        <div className="text-right">
                          <div className="text-sm font-semibold text-[#1677ff]">
                            +{" "}
                            {formatMoney(
                              Number(
                                sale.commission || 0
                              )
                            )}
                          </div>

                          <div className="mt-0.5 text-[11px] text-[#9ca3af]">
                            Commission
                          </div>
                        </div>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(sale.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md text-[#bfbfbf] opacity-0 transition-all hover:bg-[#fff1f0] hover:text-[#ff4d4f] group-hover:opacity-100"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* MOBILE */}

                      <motion.div
                        drag="x"
                        dragConstraints={{
                          left: 0,
                          right: 0,
                        }}
                        onDragEnd={(e, info) => {
                          if (info.offset.x > 120) {
                            handleDelete(sale.id);
                          }
                        }}
                        className="p-4 md:hidden"
                      >
                        <div className="flex items-center gap-3">
                          {/* ICON */}

                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                              sale.type === "wine"
                                ? "bg-[#fff0f6] text-[#eb2f96]"
                                : "bg-[#e6f4ff] text-[#1677ff]"
                            }`}
                          >
                            {sale.type === "wine" ? (
                              <Wine size={19} />
                            ) : (
                              <Shell size={19} />
                            )}
                          </div>

                          {/* INFO */}

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-[#262626]">
                              {sale.type === "wine"
                                ? "Wine Order"
                                : "Shell Order"}
                            </div>

                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8c8c8c]">
                              <span>
                                Bàn{" "}
                                {sale.tableNumber ||
                                  "--"}
                              </span>

                              <span>
                                {sale.shift || "--"}
                              </span>

                              <span>
                                {sale.date || "--"}
                              </span>
                            </div>
                          </div>

                          {/* AMOUNT */}

                          <div className="shrink-0 text-right">
                            <div className="text-[10px] text-[#9ca3af]">
                              Commission
                            </div>

                            <div className="mt-0.5 text-sm font-semibold text-[#1677ff]">
                              +
                              {formatMoney(
                                Number(
                                  sale.commission || 0
                                )
                              )}
                            </div>
                          </div>

                          <ChevronRight
                            size={16}
                            className="shrink-0 text-[#bfbfbf]"
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="py-5 text-center text-[11px] text-[#b0b0b0]">
          Commission Management System
        </div>
      </div>
    </div>
  );
}