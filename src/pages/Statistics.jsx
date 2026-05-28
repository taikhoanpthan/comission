import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import {
  CalendarDays,
  BarChart3,
  Wallet2,
  Wine,
} from "lucide-react";

import { api } from "../services/api";

import RevenueChart from "../components/RevenueChart";

import { formatMoney } from "../utils/calculateCommission";

export default function Statistics() {
  const [sales, setSales] =
    useState([]);

  const [filterType, setFilterType] =
    useState("month");

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get(
        "/commission"
      );

      setSales(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FORMAT DATE
  const formatDate = (date) => {
    const d = new Date(date);

    const yyyy =
      d.getFullYear();

    const mm = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    const dd = String(
      d.getDate()
    ).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  // FORMAT MONTH
  const formatMonth = (date) => {
    const d = new Date(date);

    const yyyy =
      d.getFullYear();

    const mm = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    return `${yyyy}-${mm}`;
  };

  // FILTER SALES
  const filteredSales =
    useMemo(() => {
      // DAY
      if (
        filterType === "day"
      ) {
        const day =
          formatDate(
            selectedDate
          );

        return sales.filter(
          (item) =>
            item.date === day
        );
      }

      // MONTH
      const month =
        formatMonth(
          selectedDate
        );

      return sales.filter(
        (item) =>
          item.date.startsWith(
            month
          )
      );
    }, [
      sales,
      filterType,
      selectedDate,
    ]);

  // TOTAL MONEY
  const totalMoney =
    filteredSales.reduce(
      (acc, item) =>
        acc +
        Number(
          item.commission || 0
        ),
      0
    );

  // TOTAL WINE
  const totalWine =
    filteredSales.filter(
      (item) =>
        item.type === "wine"
    ).length;

  // TOTAL ABALONE
  const totalAbalone =
    filteredSales
      .filter(
        (item) =>
          item.type ===
          "abalone"
      )
      .reduce(
        (acc, item) =>
          acc +
          Number(
            item.abaloneQty ||
              0
          ),
        0
      );

  const cards = [
    {
      title: "Doanh thu",
      value:
        formatMoney(
          totalMoney
        ),
      icon: (
        <Wallet2 size={24} />
      ),
      bg: `
        from-violet-500
        to-indigo-500
      `,
      glow: `
        bg-violet-400/20
      `,
    },

    {
      title: "Rượu",
      value: totalWine,
      icon: (
        <Wine size={24} />
      ),
      bg: `
        from-sky-500
        to-cyan-500
      `,
      glow: `
        bg-sky-400/20
      `,
    },

    {
      title: "Bào ngư",
      value: totalAbalone,
      icon: "🦪",
      bg: `
        from-emerald-500
        to-teal-500
      `,
      glow: `
        bg-emerald-400/20
      `,
    },
  ];

  return (
    <div
      className="
        min-h-screen
        bg-[#f4f7fb]
        px-4
        pt-4
        pb-[120px]
      "
    >
      {/* SAFE AREA */}
      <div className="h-[env(safe-area-inset-top)]" />

      {/* HEADER */}
      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-5"
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-white
            border
            border-white/60
            shadow-[0_15px_40px_rgba(15,23,42,0.05)]
            p-5
          "
        >
          {/* BLUR */}
          <div
            className="
              absolute
              -top-10
              -right-10
              w-40
              h-40
              rounded-full
              bg-violet-200/30
              blur-3xl
            "
          />

          <div className="relative z-10">
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.25em]
                text-slate-400
                font-medium
              "
            >
              Dashboard
            </p>

            <h1
              className="
                mt-2
                text-[34px]
                leading-none
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              Thống kê
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Theo dõi doanh thu
              theo thời gian
            </p>
          </div>
        </div>
      </motion.div>

      {/* FILTER */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.05,
        }}
        className="
          mb-5
          flex
          flex-col
          gap-4
        "
      >
        {/* MODE */}
        <div
          className="
            bg-white
            border
            border-slate-100
            rounded-[26px]
            p-2
            shadow-[0_10px_30px_rgba(0,0,0,0.03)]
            flex
            gap-2
          "
        >
          {/* MONTH */}
          <button
            type="button"
            onClick={() =>
              setFilterType(
                "month"
              )
            }
            className={`
              flex-1
              h-[52px]
              rounded-2xl
              text-sm
              font-semibold
              transition-all
              ${
                filterType ===
                "month"
                  ? `
                    bg-violet-600
                    text-white
                    shadow-sm
                  `
                  : `
                    text-slate-500
                  `
              }
            `}
          >
            Theo tháng
          </button>

          {/* DAY */}
          <button
            type="button"
            onClick={() =>
              setFilterType(
                "day"
              )
            }
            className={`
              flex-1
              h-[52px]
              rounded-2xl
              text-sm
              font-semibold
              transition-all
              ${
                filterType ===
                "day"
                  ? `
                    bg-violet-600
                    text-white
                    shadow-sm
                  `
                  : `
                    text-slate-500
                  `
              }
            `}
          >
            Theo ngày
          </button>
        </div>

        {/* DATE PICKER */}
        <div
          className="
            bg-white
            border
            border-slate-100
            rounded-[26px]
            shadow-[0_10px_30px_rgba(0,0,0,0.03)]
            px-4
            h-[58px]
            flex
            items-center
            gap-3
          "
        >
          <CalendarDays
            size={18}
            className="text-slate-400"
          />

          <input
            type={
              filterType ===
              "day"
                ? "date"
                : "month"
            }
            value={
              filterType ===
              "day"
                ? formatDate(
                    selectedDate
                  )
                : formatMonth(
                    selectedDate
                  )
            }
            onChange={(e) =>
              setSelectedDate(
                new Date(
                  e.target.value
                )
              )
            }
            className="
              flex-1
              bg-transparent
              text-slate-700
              font-medium
              outline-none
            "
          />
        </div>
      </motion.div>

      {/* CARDS */}
      <div className="space-y-4">
        {cards.map(
          (card, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.08,
              }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-white
                border
                border-white/60
                shadow-[0_15px_40px_rgba(15,23,42,0.04)]
                p-5
              "
            >
              {/* GLOW */}
              <div
                className={`
                  absolute
                  -right-10
                  -top-10
                  w-40
                  h-40
                  rounded-full
                  blur-3xl
                  ${card.glow}
                `}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {
                      card.title
                    }
                  </p>

                  <h2
                    className="
                      mt-2
                      text-[30px]
                      leading-none
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    {
                      card.value
                    }
                  </h2>
                </div>

                <div
                  className={`
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    ${card.bg}
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  `}
                >
                  {card.icon}
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* CHART */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="
          mt-5
          relative
          overflow-hidden
          rounded-[32px]
          bg-white
          border
          border-white/60
          shadow-[0_15px_40px_rgba(15,23,42,0.05)]
          p-5
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            -top-10
            -right-10
            w-40
            h-40
            rounded-full
            bg-cyan-200/20
            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* TITLE */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-violet-100
                flex
                items-center
                justify-center
                text-violet-600
              "
            >
              <BarChart3
                size={22}
              />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >
                Biểu đồ doanh
                thu
              </h2>

              <p className="text-sm text-slate-500">
                Phân tích dữ
                liệu bán hàng
              </p>
            </div>
          </div>

          {/* CHART */}
          <RevenueChart
            sales={
              filteredSales
            }
          />
        </div>
      </motion.div>
    </div>
  );
}