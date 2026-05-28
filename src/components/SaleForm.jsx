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
        background: "#0f172a",
        color: "#fff",
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
        background: "#0f172a",
        color: "#fff",
      });

      resetForm();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  const inputClass = `
    w-full
    h-[60px]

    bg-white/[0.03]
    backdrop-blur-xl

    border
    border-white/10

    rounded-2xl

    px-4

    text-[15px]
    text-white

    outline-none

    transition-all
    duration-300

    placeholder:text-slate-500

    focus:border-cyan-400/40
    focus:bg-cyan-400/[0.03]

    focus:shadow-[0_0_25px_rgba(34,211,238,0.12)]
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

        rounded-[34px]

        bg-white/[0.03]
        backdrop-blur-2xl

        border
        border-cyan-400/20

        shadow-[0_0_40px_rgba(34,211,238,0.05)]

        p-5
      "
    >
      {/* BORDER GLOW */}
      <div
        className="
          absolute
          inset-0
          rounded-[34px]
          p-[1px]

          bg-gradient-to-br
          from-cyan-400/30
          via-fuchsia-500/10
          to-blue-500/20

          [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
          [mask-composite:exclude]

          pointer-events-none
        "
      />

      {/* CYAN GLOW */}
      <div
        className="
          absolute
          -top-20
          -right-20
          w-72
          h-72
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />

      {/* PURPLE GLOW */}
      <div
        className="
          absolute
          bottom-0
          -left-20
          w-72
          h-72
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
        "
      />

      {/* HEADER */}
      <div className="relative z-10 mb-6">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-cyan-300/60
            font-semibold
          "
        >
          COMMISSION
        </p>

        <h2
          className="
            mt-3
            text-[30px]
            font-black
            tracking-tight
            text-white
          "
        >
          Thêm giao dịch
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Nhập doanh thu hôm nay
        </p>
      </div>

      {/* TYPE SELECT */}
      <div
        className="
          relative
          z-10

          mb-6

          p-1

          rounded-[24px]

          bg-white/[0.03]

          border
          border-white/10

          grid
          grid-cols-2
          gap-2
        "
      >
        {/* WINE */}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              type: "wine",
            })
          }
          className={`
            h-[56px]
            rounded-[20px]

            text-sm
            font-semibold

            transition-all
            duration-300

            flex
            items-center
            justify-center
            gap-2

            ${
              form.type === "wine"
                ? `
                  bg-cyan-400/10
                  border
                  border-cyan-400/30
                  text-cyan-300

                  shadow-[0_0_20px_rgba(34,211,238,0.15)]
                `
                : `
                  text-slate-400
                  hover:bg-white/[0.03]
                `
            }
          `}
        >
          <Wine size={18} />

          Rượu
        </button>

        {/* ABALONE */}
        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              type: "abalone",
            })
          }
          className={`
            h-[56px]
            rounded-[20px]

            text-sm
            font-semibold

            transition-all
            duration-300

            flex
            items-center
            justify-center
            gap-2

            ${
              form.type ===
              "abalone"
                ? `
                  bg-fuchsia-500/10
                  border
                  border-fuchsia-500/30
                  text-fuchsia-300

                  shadow-[0_0_20px_rgba(168,85,247,0.15)]
                `
                : `
                  text-slate-400
                  hover:bg-white/[0.03]
                `
            }
          `}
        >
          <Shell size={18} />

          Bào ngư
        </button>
      </div>

      {/* FORM */}
      <div className="relative z-10 space-y-5">
        {/* DATE */}
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">
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
                text-cyan-300/70
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
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Loại rượu
              </label>

              <select
                name="wineLevel"
                value={form.wineLevel}
                onChange={handleChange}
                className={inputClass}
              >
                <option
                  value="1m"
                  className="bg-[#0f172a]"
                >
                  Rượu {">"} 1 triệu
                </option>

                <option
                  value="3m"
                  className="bg-[#0f172a]"
                >
                  Rượu {">"} 3 triệu
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
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
            <label className="text-sm font-medium text-slate-300 mb-2 block">
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
          <label className="text-sm font-medium text-slate-300 mb-2 block">
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
                text-cyan-300/70
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
          <label className="text-sm font-medium text-slate-300 mb-2 block">
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
                text-cyan-300/70
              "
            />

            <select
              name="shift"
              value={form.shift}
              onChange={handleChange}
              className={`${inputClass} pl-12`}
            >
              <option
                value="Sáng"
                className="bg-[#0f172a]"
              >
                Sáng
              </option>

              <option
                value="Tối"
                className="bg-[#0f172a]"
              >
                Tối
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <motion.button
        whileHover={{
          scale: 1.01,
        }}
        whileTap={{
          scale: 0.97,
        }}
        type="submit"
        className="
          relative
          overflow-hidden

          z-10

          mt-7

          w-full
          h-[62px]

          rounded-[22px]

          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-fuchsia-500

          text-white
          text-[16px]
          font-bold

          shadow-[0_0_30px_rgba(34,211,238,0.35)]

          transition-all
          duration-300

          hover:shadow-[0_0_45px_rgba(34,211,238,0.5)]
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-white/10
            opacity-0
            hover:opacity-100
            transition-all
          "
        />

        <span className="relative z-10">
          Lưu doanh thu
        </span>
      </motion.button>
    </motion.form>
  );
}