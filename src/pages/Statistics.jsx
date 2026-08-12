import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  CalendarDays,
  BarChart3,
  Wallet2,
  Wine,
  Shell,
  Database,
} from "lucide-react";

import { api } from "../services/api";
import RevenueChart from "../components/RevenueChart";
import { formatMoney } from "../utils/calculateCommission";

export default function Statistics() {
  const [sales, setSales] = useState([]);
  const [filterType, setFilterType] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/commission");

      setSales(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================================
  // FORMATTERS
  // =====================================================

  const formatDate = (date) => {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  const formatMonth = (date) => {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredSales = useMemo(() => {
    if (filterType === "day") {
      const day = formatDate(selectedDate);

      return sales.filter((item) => {
        const itemDate = formatDate(
          item.date || item.createdAt
        );

        return itemDate === day;
      });
    }

    const month = formatMonth(selectedDate);

    return sales.filter((item) => {
      const itemDate = formatMonth(
        item.date || item.createdAt
      );

      return itemDate === month;
    });
  }, [sales, filterType, selectedDate]);

  // =====================================================
  // TOTALS
  // =====================================================

  const totalMoney = useMemo(() => {
    return filteredSales.reduce(
      (acc, item) =>
        acc + Number(item.commission || 0),
      0
    );
  }, [filteredSales]);

  const totalWine = useMemo(() => {
    return filteredSales.filter(
      (item) => item.type === "wine"
    ).length;
  }, [filteredSales]);

  const totalAbalone = useMemo(() => {
    return filteredSales
      .filter((item) => item.type === "abalone")
      .reduce(
        (acc, item) =>
          acc + Number(item.abaloneQty || 0),
        0
      );
  }, [filteredSales]);

  // =====================================================
  // REPORT LABEL
  // =====================================================

  const reportLabel =
    filterType === "day"
      ? new Date(selectedDate).toLocaleDateString(
          "vi-VN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        )
      : new Date(selectedDate).toLocaleDateString(
          "vi-VN",
          {
            month: "long",
            year: "numeric",
          }
        );

  // =====================================================
  // KPI CARDS
  // =====================================================

  const cards = [
    {
      title: "Tổng commission",
      value: formatMoney(totalMoney),
      description: "Doanh thu trong kỳ",
      icon: <Wallet2 size={19} />,
      iconBg: "bg-[#e6f4ff]",
      iconColor: "text-[#1677ff]",
    },
    {
      title: "Wine Orders",
      value: totalWine,
      description: "Số giao dịch rượu",
      icon: <Wine size={19} />,
      iconBg: "bg-[#fff0f6]",
      iconColor: "text-[#eb2f96]",
    },
    {
      title: "Abalone",
      value: totalAbalone,
      description: "Tổng số bào ngư",
      icon: <Shell size={19} />,
      iconBg: "bg-[#f6ffed]",
      iconColor: "text-[#52c41a]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-4 pb-10 text-[#1f2937] lg:px-6">
      <div className="mx-auto max-w-[1600px]">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="pt-5 lg:pt-6"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <BarChart3
                  size={15}
                  className="text-[#1677ff]"
                />

                <span className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                  Analytics
                </span>
              </div>

              <h1 className="m-0 text-[24px] font-semibold tracking-[-0.5px] text-[#111827]">
                Thống kê & phân tích
              </h1>

              <p className="mt-1 text-sm text-[#8c8c8c]">
                Theo dõi hiệu suất commission theo thời gian
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 py-2">
              <CalendarDays
                size={16}
                className="text-[#1677ff]"
              />

              <span className="text-sm font-medium capitalize text-[#374151]">
                {reportLabel}
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            FILTER
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.05,
          }}
          className="mt-5"
        >
          <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-end lg:justify-between">
              {/* MODE */}

              <div>
                <div className="mb-2 text-sm font-medium text-[#374151]">
                  Khoảng thời gian
                </div>

                <div className="flex">
                  <button
                    type="button"
                    onClick={() =>
                      setFilterType("month")
                    }
                    className={`rounded-l-md border px-5 py-2 text-sm font-medium transition ${
                      filterType === "month"
                        ? "border-[#1677ff] bg-[#1677ff] text-white"
                        : "border-[#d9d9d9] bg-white text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff]"
                    }`}
                  >
                    Theo tháng
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFilterType("day")
                    }
                    className={`-ml-px rounded-r-md border px-5 py-2 text-sm font-medium transition ${
                      filterType === "day"
                        ? "border-[#1677ff] bg-[#1677ff] text-white"
                        : "border-[#d9d9d9] bg-white text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff]"
                    }`}
                  >
                    Theo ngày
                  </button>
                </div>
              </div>

              {/* DATE */}

              <div>
                <div className="mb-2 text-xs text-[#8c8c8c]">
                  {filterType === "day"
                    ? "Ngày báo cáo"
                    : "Tháng báo cáo"}
                </div>

                <div className="flex h-10 items-center rounded-md border border-[#d9d9d9] bg-white px-3 transition focus-within:border-[#1677ff] focus-within:ring-2 focus-within:ring-blue-100">
                  <CalendarDays
                    size={16}
                    className="mr-2 text-[#8c8c8c]"
                  />

                  <input
                    type={
                      filterType === "day"
                        ? "date"
                        : "month"
                    }
                    value={
                      filterType === "day"
                        ? formatDate(selectedDate)
                        : formatMonth(selectedDate)
                    }
                    onChange={(e) => {
                      if (!e.target.value) return;

                      setSelectedDate(
                        new Date(
                          filterType === "day"
                            ? e.target.value
                            : `${e.target.value}-01`
                        )
                      );
                    }}
                    className="min-w-[145px] bg-transparent text-sm text-[#374151] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =================================================
            KPI
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="mt-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="m-0 text-[15px] font-semibold text-[#1f2937]">
                Tổng quan
              </h2>

              <p className="m-0 mt-1 text-xs text-[#9ca3af]">
                Số liệu trong kỳ {reportLabel}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#8c8c8c]">
              <Database size={13} />

              {filteredSales.length} giao dịch
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1 + index * 0.05,
                }}
                className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                      {card.title}
                    </div>

                    <div className="mt-2 text-[26px] font-semibold tracking-tight text-[#111827]">
                      {card.value}
                    </div>

                    <div className="mt-1 text-xs text-[#9ca3af]">
                      {card.description}
                    </div>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor}`}
                  >
                    {card.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =================================================
            CHART
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mt-5"
        >
          <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#f0f0f0] px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4ff] text-[#1677ff]">
                  <BarChart3 size={18} />
                </div>

                <div>
                  <h2 className="m-0 text-[15px] font-semibold text-[#1f2937]">
                    Biểu đồ doanh thu
                  </h2>

                  <p className="m-0 mt-0.5 text-xs text-[#9ca3af]">
                    Xu hướng commission theo thời gian
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 text-xs text-[#8c8c8c] sm:flex">
                <span className="h-2 w-2 rounded-full bg-[#1677ff]" />
                Commission
              </div>
            </div>

            {/* CHART */}

            <div className="p-4 lg:p-5">
              <div className="min-h-[320px]">
                <RevenueChart sales={sales} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* =================================================
            DETAIL
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="mt-5"
        >
          <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <div className="text-xs text-[#8c8c8c]">
                  Tổng commission
                </div>

                <div className="mt-1 text-sm font-semibold text-[#1f2937]">
                  {formatMoney(totalMoney)}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#8c8c8c]">
                  Wine Orders
                </div>

                <div className="mt-1 text-sm font-semibold text-[#1f2937]">
                  {totalWine} giao dịch
                </div>
              </div>

              <div>
                <div className="text-xs text-[#8c8c8c]">
                  Abalone
                </div>

                <div className="mt-1 text-sm font-semibold text-[#1f2937]">
                  {totalAbalone} sản phẩm
                </div>
              </div>
            </div>
          </div>
        </motion.section>

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