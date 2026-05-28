import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import Swal from "sweetalert2";

import {
  Wallet2,
  Pencil,
  Trash2,
  Wine,
  Shell,
} from "lucide-react";

import { api } from "../services/api";

import EditSheet from "../components/EditSheet";

import {
  calculateCommission,
  formatMoney,
} from "../utils/calculateCommission";

export default function History() {
  const [sales, setSales] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("month");

  const [selectedSale, setSelectedSale] =
    useState(null);

  // =========================
  // FETCH
  // =========================
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get(
        "/commission"
      );

      setSales(
        res.data.reverse()
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER
  // =========================
  const today = new Date();

  const filteredSales =
    sales.filter((item) => {
      const saleDate =
        new Date(item.date);

      // TODAY
      if (filter === "today") {
        return (
          saleDate.toDateString() ===
          today.toDateString()
        );
      }

      // MONTH
      if (filter === "month") {
        return (
          saleDate.getMonth() ===
            today.getMonth() &&
          saleDate.getFullYear() ===
            today.getFullYear()
        );
      }

      return true;
    });

  // =========================
  // TOTAL
  // =========================
  const totalIncome =
    filteredSales.reduce(
      (acc, item) =>
        acc +
        Number(
          item.commission || 0
        ),
      0
    );

  // =========================
  // DELETE
  // =========================
  const handleDelete =
    async (id) => {
      const result =
        await Swal.fire({
          title:
            "Xóa giao dịch?",
          text: "Không thể hoàn tác",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText:
            "Xóa",
          cancelButtonText:
            "Hủy",
          confirmButtonColor:
            "#ef4444",
          background:
            "#ffffff",
          customClass: {
            popup:
              "rounded-[32px]",
          },
        });

      if (!result.isConfirmed)
        return;

      try {
        await api.delete(
          `/commission/${id}`
        );

        setSales((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        );

        Swal.fire({
          icon: "success",
          title: "Đã xóa",
          timer: 1000,
          showConfirmButton: false,
          background:
            "#ffffff",
          customClass: {
            popup:
              "rounded-[28px]",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // SAVE EDIT
  // =========================
  const handleSaveEdit =
    async (updatedSale) => {
      try {
        const commission =
          calculateCommission(
            updatedSale
          );

        const payload = {
          ...updatedSale,
          commission,
        };

        await api.put(
          `/commission/${updatedSale.id}`,
          payload
        );

        setSales((prev) =>
          prev.map((item) =>
            item.id ===
            updatedSale.id
              ? payload
              : item
          )
        );

        setSelectedSale(null);

        Swal.fire({
          icon: "success",
          title:
            "Đã cập nhật",
          timer: 1000,
          showConfirmButton: false,
          background:
            "#ffffff",
          customClass: {
            popup:
              "rounded-[28px]",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <div
        className="
          min-h-screen
          bg-[#f4f7fb]
          px-4
          pb-[130px]
        "
      >
        {/* SAFE AREA */}
        <div
          className="
            h-[env(safe-area-inset-top)]
          "
        />

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
          className="pt-2 mb-5"
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[34px]
              bg-white/85
              backdrop-blur-3xl
              border
              border-white/70
              shadow-[0_10px_40px_rgba(15,23,42,0.05)]
              p-5
            "
          >
            {/* BLUR */}
            <div
              className="
                absolute
                -top-14
                -right-10
                w-40
                h-40
                rounded-full
                bg-violet-200/40
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
                COMMISSION
              </p>

              <h1
                className="
                  mt-2
                  text-[38px]
                  leading-none
                  font-bold
                  tracking-tight
                  text-slate-900
                "
              >
                History
              </h1>

              <p className="text-sm text-slate-500 mt-2">
                Vuốt trái để sửa •
                Vuốt phải để xóa
              </p>
            </div>
          </div>
        </motion.div>

        {/* TOTAL */}
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
          className="mb-5"
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[34px]
              bg-gradient-to-br
              from-violet-600
              via-purple-500
              to-indigo-500
              p-5
              text-white
              shadow-[0_15px_45px_rgba(124,58,237,0.35)]
            "
          >
            {/* GLOW */}
            <div
              className="
                absolute
                -right-10
                -top-10
                w-40
                h-40
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-white/70 text-sm">
                  Tổng thu nhập
                </p>

                <h2
                  className="
                    mt-2
                    text-[36px]
                    leading-none
                    font-bold
                    tracking-tight
                  "
                >
                  {formatMoney(
                    totalIncome
                  )}
                </h2>
              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-[24px]
                  bg-white/15
                  backdrop-blur-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <Wallet2
                  size={28}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* FILTER */}
        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-1
            mb-5
            no-scrollbar
          "
        >
          {[
            {
              key: "month",
              label:
                "Tháng này",
            },
            {
              key: "today",
              label:
                "Hôm nay",
            },
            {
              key: "all",
              label:
                "Tất cả",
            },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() =>
                setFilter(
                  item.key
                )
              }
              className={`
                shrink-0
                h-[44px]
                px-5
                rounded-full
                text-sm
                font-medium
                transition-all
                ${
                  filter ===
                  item.key
                    ? `
                      bg-violet-600
                      text-white
                      shadow-lg
                    `
                    : `
                      bg-white/80
                      backdrop-blur-xl
                      border
                      border-white/70
                      text-slate-600
                    `
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {loading ? (
            [1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="
                    h-[120px]
                    rounded-[34px]
                    bg-white
                    animate-pulse
                  "
                />
              )
            )
          ) : filteredSales.length ===
            0 ? (
            <div
              className="
                rounded-[34px]
                bg-white
                p-10
                text-center
                shadow-sm
              "
            >
              <h2 className="text-lg font-semibold text-slate-800">
                Chưa có dữ liệu
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Hãy thêm giao dịch
              </p>
            </div>
          ) : (
            filteredSales.map(
              (
                sale,
                index
              ) => (
                <div
                  key={
                    sale.id ||
                    index
                  }
                  className="
                    relative
                    overflow-hidden
                    rounded-[34px]
                  "
                >
                  {/* EDIT BG */}
                  <div
                    className="
                      absolute
                      inset-y-0
                      left-0
                      w-[120px]
                      rounded-[34px]
                      bg-blue-500
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div className="flex flex-col items-center text-white">
                      <Pencil
                        size={22}
                      />

                      <span className="text-xs mt-2">
                        Sửa
                      </span>
                    </div>
                  </div>

                  {/* DELETE BG */}
                  <div
                    className="
                      absolute
                      inset-y-0
                      right-0
                      w-[120px]
                      rounded-[34px]
                      bg-red-500
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div className="flex flex-col items-center text-white">
                      <Trash2
                        size={22}
                      />

                      <span className="text-xs mt-2">
                        Xóa
                      </span>
                    </div>
                  </div>

                  {/* CARD */}
                  <motion.div
                    drag="x"
                    dragElastic={
                      0.08
                    }
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    onDragEnd={(
                      event,
                      info
                    ) => {
                      // DELETE
                      if (
                        info.offset
                          .x >
                        120
                      ) {
                        handleDelete(
                          sale.id
                        );
                      }

                      // EDIT
                      if (
                        info.offset
                          .x <
                        -120
                      ) {
                        setSelectedSale(
                          sale
                        );
                      }
                    }}
                  >
                    <div
                      className="
                        relative
                        z-10
                        bg-white/92
                        backdrop-blur-3xl
                        border
                        border-white/70
                        rounded-[34px]
                        p-4
                        shadow-[0_10px_35px_rgba(15,23,42,0.05)]
                      "
                    >
                      <div className="flex items-center justify-between gap-4">
                        {/* LEFT */}
                        <div className="flex items-center gap-4 flex-1">
                          {/* ICON */}
                          <div
                            className={`
                              w-14
                              h-14
                              rounded-[24px]
                              flex
                              items-center
                              justify-center
                              ${
                                sale.type ===
                                "wine"
                                  ? `
                                    bg-violet-100
                                    text-violet-600
                                  `
                                  : `
                                    bg-emerald-100
                                    text-emerald-600
                                  `
                              }
                            `}
                          >
                            {sale.type ===
                            "wine" ? (
                              <Wine
                                size={
                                  26
                                }
                              />
                            ) : (
                              <Shell
                                size={
                                  26
                                }
                              />
                            )}
                          </div>

                          {/* INFO */}
                          <div className="flex-1">
                            <h2
                              className="
                                text-[17px]
                                font-semibold
                                text-slate-900
                              "
                            >
                              {sale.type ===
                              "wine"
                                ? sale.wineLevel ===
                                  "3m"
                                  ? "Rượu >3 triệu"
                                  : "Rượu >1 triệu"
                                : "Bào ngư"}
                            </h2>

                            <div
                              className="
                                flex
                                flex-wrap
                                items-center
                                gap-2
                                mt-2
                              "
                            >
                              <span
                                className="
                                  px-2.5
                                  py-1
                                  rounded-full
                                  bg-slate-100
                                  text-[11px]
                                  text-slate-600
                                "
                              >
                                Bàn{" "}
                                {
                                  sale.tableNumber
                                }
                              </span>

                              <span
                                className="
                                  px-2.5
                                  py-1
                                  rounded-full
                                  bg-slate-100
                                  text-[11px]
                                  text-slate-600
                                "
                              >
                                {
                                  sale.shift
                                }
                              </span>

                              <span className="text-[11px] text-slate-400">
                                {
                                  sale.date
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="text-right shrink-0">
                          <p className="text-[11px] text-slate-400">
                            Hoa hồng
                          </p>

                          <h2
                            className="
                              mt-1
                              text-[18px]
                              font-bold
                              text-emerald-600
                            "
                          >
                            +
                            {formatMoney(
                              Number(
                                sale.commission
                              )
                            )}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {/* EDIT SHEET */}
      <AnimatePresence>
        {selectedSale && (
          <EditSheet
            sale={
              selectedSale
            }
            onClose={() =>
              setSelectedSale(
                null
              )
            }
            onSave={
              handleSaveEdit
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}