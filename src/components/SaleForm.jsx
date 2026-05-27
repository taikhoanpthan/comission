import { useState } from "react";
import Swal from "sweetalert2";
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

    const commission = calculateCommission(form);

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

  // 👉 iOS input style
  const inputClass =
    "w-full bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl px-4 py-3 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-200 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mt-6
        bg-white/60
        backdrop-blur-2xl
        border border-white/40
        rounded-[28px]
        shadow-[0_10px_40px_rgba(15,23,42,0.08)]
        p-6
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
          Thêm doanh thu
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Nhập dữ liệu bán hàng
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className={inputClass}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="wine">Rượu</option>
          <option value="abalone">Bào ngư</option>
        </select>

        {/* WINE */}
        {form.type === "wine" && (
          <>
            <select
              name="wineLevel"
              value={form.wineLevel}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="1m">Rượu {">"} 1 triệu</option>
              <option value="3m">Rượu {">"} 3 triệu</option>
            </select>

            <input
              type="number"
              min="1"
              name="wineQty"
              value={form.wineQty}
              onChange={handleChange}
              placeholder="Số lượng rượu"
              className={inputClass}
            />
          </>
        )}

        {/* ABALONE */}
        {form.type === "abalone" && (
          <input
            type="number"
            min="1"
            name="abaloneQty"
            value={form.abaloneQty}
            onChange={handleChange}
            placeholder="Số lượng bào ngư"
            className={inputClass}
          />
        )}

        <input
          type="text"
          name="tableNumber"
          value={form.tableNumber}
          onChange={handleChange}
          placeholder="Số bàn"
          className={inputClass}
        />

        <select
          name="shift"
          value={form.shift}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="Sáng">Sáng</option>
          <option value="Tối">Tối</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="
          mt-6
          w-full
          bg-blue-500/90
          hover:bg-blue-600
          text-white
          py-3
          rounded-2xl
          font-medium
          shadow-sm
          active:scale-[0.98]
          transition-all
        "
      >
        Lưu doanh thu
      </button>
    </form>
  );
}