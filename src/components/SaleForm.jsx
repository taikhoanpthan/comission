import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

import {
  Wine,
  Shell,
  CalendarDays,
  Clock3,
  Hash,
} from "lucide-react";

import { calculateCommission } from "../utils/calculateCommission";

export default function SaleForm({ onSubmit }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "wine",
    wineLevel: "1m",
    wineQty: 1,
    abaloneQty: 1,
    tableNumber: "",
    shift: "Tối",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      date: new Date().toISOString().split("T")[0],
      type: "wine",
      wineLevel: "1m",
      wineQty: 1,
      abaloneQty: 1,
      tableNumber: "",
      shift: "Tối",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tableNumber.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng nhập số bàn",
      });
      return;
    }

    const commission =
      calculateCommission(form);

    const payload = {
      ...form,
      commission,
      createdAt: new Date().toISOString(),
    };

    try {
      await onSubmit(payload);

      Swal.fire({
        icon: "success",
        title: "Đã lưu doanh thu",
        timer: 1200,
        showConfirmButton: false,
      });

      resetForm();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
      });
    }
  };

  const inputClass = `
    w-full
    h-[58px]
    bg-[#f8fafc]
    border
    border-slate-200/70
    rounded-2xl
    px-4
    text-[15px]
    text-slate-800
    outline-none
    transition-all
    focus:border-violet-300
    focus:ring-4
    focus:ring-violet-100
  `;

  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      onSubmit={handleSubmit}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-white
        border
        border-white/60
        shadow-[0_20px_50px_rgba(15,23,42,0.06)]
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

      {/* HEADER */}
      <div className="relative z-10 mb-5">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-slate-400
            font-medium
          "
        >
          Commission
        </p>

        <h2
          className="
            mt-2
            text-[28px]
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Thêm giao dịch
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Nhập doanh thu hôm nay
        </p>
      </div>

      {/* TYPE SELECT */}
      <div
        className="
          relative
          z-10
          mb-5
          p-1
          rounded-2xl
          bg-slate-100
          grid
          grid-cols-2
          gap-1
        "
      >
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              type: "wine",
            })
          }
          className={`
            h-[52px]
            rounded-2xl
            text-sm
            font-semibold
            transition-all
            flex
            items-center
            justify-center
            gap-2
            ${
              form.type === "wine"
                ? `
                  bg-white
                  text-violet-600
                  shadow-sm
                `
                : `
                  text-slate-500
                `
            }
          `}
        >
          <Wine size={18} />

          Rượu
        </button>

        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              type: "abalone",
            })
          }
          className={`
            h-[52px]
            rounded-2xl
            text-sm
            font-semibold
            transition-all
            flex
            items-center
            justify-center
            gap-2
            ${
              form.type ===
              "abalone"
                ? `
                  bg-white
                  text-emerald-600
                  shadow-sm
                `
                : `
                  text-slate-500
                `
            }
          `}
        >
          <Shell size={18} />

          Bào ngư
        </button>
      </div>

      {/* FORM */}
      <div className="relative z-10 space-y-4">
        {/* DATE */}
        <div>
          <label className="text-sm font-medium text-slate-600 mb-2 block">
            Ngày
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={`${inputClass} pl-12`}
            />
          </div>
        </div>

        {/* WINE */}
        {form.type === "wine" && (
          <>
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                Loại rượu
              </label>

              <select
                name="wineLevel"
                value={form.wineLevel}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="1m">
                  Rượu {">"} 1 triệu
                </option>

                <option value="3m">
                  Rượu {">"} 3 triệu
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                Số lượng
              </label>

              <input
                type="number"
                min="1"
                name="wineQty"
                value={form.wineQty}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </>
        )}

        {/* ABALONE */}
        {form.type ===
          "abalone" && (
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">
              Số lượng bào ngư
            </label>

            <input
              type="number"
              min="1"
              name="abaloneQty"
              value={form.abaloneQty}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        )}

        {/* TABLE */}
        <div>
          <label className="text-sm font-medium text-slate-600 mb-2 block">
            Số bàn
          </label>

          <div className="relative">
            <Hash
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              name="tableNumber"
              value={form.tableNumber}
              onChange={handleChange}
              placeholder="Ví dụ: B12"
              className={`${inputClass} pl-12`}
            />
          </div>
        </div>

        {/* SHIFT */}
        <div>
          <label className="text-sm font-medium text-slate-600 mb-2 block">
            Ca làm
          </label>

          <div className="relative">
            <Clock3
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <select
              name="shift"
              value={form.shift}
              onChange={handleChange}
              className={`${inputClass} pl-12`}
            >
              <option value="Sáng">
                Sáng
              </option>

              <option value="Tối">
                Tối
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <motion.button
        whileTap={{
          scale: 0.97,
        }}
        type="submit"
        className="
          relative
          z-10
          mt-6
          w-full
          h-[60px]
          rounded-2xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-500
          text-white
          text-[16px]
          font-semibold
          shadow-[0_10px_30px_rgba(124,58,237,0.35)]
        "
      >
        Lưu doanh thu
      </motion.button>
    </motion.form>
  );
}