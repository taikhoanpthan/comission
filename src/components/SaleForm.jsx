import { useState } from "react";
import Swal from "sweetalert2";
import { CalendarDays, Shell, Wine } from "lucide-react";
import { calculateCommission } from "../utils/calculateCommission";

const initialForm = () => ({
  date: new Date().toISOString().split("T")[0], type: "wine", wineLevel: "1m", wineQty: 1, abaloneQty: 1, tableNumber: "", shift: "Tối",
});

export default function SaleForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    if (!form.tableNumber.trim()) {
      await Swal.fire({ icon: "warning", title: "Vui lòng nhập số bàn", confirmButtonColor: "#1677ff" });
      return;
    }
    try {
      await onSubmit({ ...form, commission: calculateCommission(form), createdAt: new Date().toISOString() });
      await Swal.fire({ icon: "success", title: "Đã lưu giao dịch", timer: 1200, showConfirmButton: false });
      setForm(initialForm());
    } catch {
      await Swal.fire({ icon: "error", title: "Không thể lưu giao dịch", confirmButtonColor: "#1677ff" });
    }
  };

  const fieldClass = "h-9 w-full rounded-md border border-[#d9dfe7] bg-white px-3 text-sm text-[#374151] outline-none focus:border-[#1677ff] focus:ring-2 focus:ring-blue-100";
  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-md border border-[#d9dfe7] bg-[#f8fafc] p-1">
        {[{ key: "wine", label: "Rượu", icon: Wine }, { key: "abalone", label: "Bào ngư", icon: Shell }].map(({ key, label, icon: Icon }) => (
          <button key={key} type="button" onClick={() => setForm({ ...form, type: key })} className={`flex h-8 items-center justify-center gap-2 rounded text-sm font-medium ${form.type === key ? "bg-white text-[#1677ff] shadow-sm" : "text-[#6b7280]"}`}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>

      <label className="block text-xs font-medium text-[#4b5563]">Ngày
        <span className="relative mt-1 block"><CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c98a8]" /><input type="date" name="date" value={form.date} onChange={change} className={`${fieldClass} pl-9`} /></span>
      </label>

      {form.type === "wine" ? <><label className="block text-xs font-medium text-[#4b5563]">Mức rượu<select name="wineLevel" value={form.wineLevel} onChange={change} className={`${fieldClass} mt-1`}><option value="1m">Rượu trên 1 triệu</option><option value="3m">Rượu trên 3 triệu</option></select></label><label className="block text-xs font-medium text-[#4b5563]">Số lượng<input type="number" min="1" name="wineQty" value={form.wineQty} onChange={change} className={`${fieldClass} mt-1`} /></label></> : <label className="block text-xs font-medium text-[#4b5563]">Số lượng bào ngư<input type="number" min="1" name="abaloneQty" value={form.abaloneQty} onChange={change} className={`${fieldClass} mt-1`} /></label>}

      <div className="grid grid-cols-2 gap-3"><label className="block text-xs font-medium text-[#4b5563]">Số bàn<input name="tableNumber" value={form.tableNumber} onChange={change} placeholder="VD: 12" className={`${fieldClass} mt-1`} /></label><label className="block text-xs font-medium text-[#4b5563]">Ca làm<select name="shift" value={form.shift} onChange={change} className={`${fieldClass} mt-1`}><option>Sáng</option><option>Tối</option></select></label></div>
      <button type="submit" className="flex h-9 w-full items-center justify-center rounded-md bg-[#1677ff] text-sm font-medium text-white hover:bg-[#0958d9]">Lưu giao dịch</button>
    </form>
  );
}
