import { useEffect, useState } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  X,
  Calendar,
  Wine,
  Shell,
  Save,
} from "lucide-react";

export default function EditSheet({
  open,
  onClose,
  sale,
  onSave,
}) {
  const [form, setForm] =
    useState(null);

  // =========================
  // INIT FORM
  // =========================
  useEffect(() => {
    if (sale) {
      setForm({
        ...sale,
      });
    }
  }, [sale]);

  // =========================
  // LOCK BODY
  // =========================
  useEffect(() => {
    if (open) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "auto";
    }

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, [open]);

  if (!form) return null;

  // =========================
  // CHANGE
  // =========================
  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = () => {
    let commission = 0;

    // WINE
    if (
      form.type === "wine"
    ) {
      if (
        form.wineLevel ===
        "1m"
      ) {
        commission =
          Number(
            form.wineQty || 1
          ) * 200000;
      }

      if (
        form.wineLevel ===
        "3m"
      ) {
        commission =
          Number(
            form.wineQty || 1
          ) * 500000;
      }
    }

    // ABALONE
    if (
      form.type ===
      "abalone"
    ) {
      commission =
        Number(
          form.abaloneQty ||
            1
        ) * 100000;
    }

    onSave({
      ...form,
      commission,
    });
  };

  const inputClass = `
    w-full
    h-[58px]
    px-4
    rounded-[22px]
    bg-[#f4f7fb]
    border
    border-white
    outline-none
    text-[15px]
    text-slate-800
    shadow-inner
    focus:ring-4
    focus:ring-violet-100
    transition-all
  `;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              bg-black/30
              backdrop-blur-md
              z-[100]
            "
          />

          {/* SHEET */}
          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 240,
            }}
            drag="y"
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={0.18}
            onDragEnd={(
              e,
              info
            ) => {
              if (
                info.offset.y >
                140
              ) {
                onClose();
              }
            }}
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-[101]
              mx-auto
              w-full
              max-w-[700px]
            "
          >
            <div
              className="
                bg-white/95
                backdrop-blur-3xl
                rounded-t-[38px]
                shadow-[0_-10px_50px_rgba(15,23,42,0.15)]
                border
                border-white/60
                overflow-hidden
              "
            >
              {/* HANDLE */}
              <div className="pt-3 pb-1 flex justify-center">
                <div
                  className="
                    w-14
                    h-1.5
                    rounded-full
                    bg-slate-300
                  "
                />
              </div>

              {/* HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-5
                  pt-3
                  pb-5
                "
              >
                <div>
                  <p
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.25em]
                      text-slate-400
                    "
                  >
                    Commission
                  </p>

                  <h2
                    className="
                      mt-1
                      text-[30px]
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    Chỉnh sửa
                  </h2>
                </div>

                <button
                  onClick={
                    onClose
                  }
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    text-slate-600
                  "
                >
                  <X
                    size={20}
                  />
                </button>
              </div>

              {/* CONTENT */}
              <div
                className="
                  px-5
                  pb-[140px]
                  max-h-[75vh]
                  overflow-y-auto
                  space-y-4
                "
              >
                {/* DATE */}
                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Ngày
                  </p>

                  <div className="relative">
                    <Calendar
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
                      value={
                        form.date
                      }
                      onChange={
                        handleChange
                      }
                      className={`${inputClass} pl-12`}
                    />
                  </div>
                </div>

                {/* TYPE */}
                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Loại
                  </p>

                  <div className="grid grid-cols-2 gap-3">
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
                        h-[72px]
                        rounded-[24px]
                        border
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-3
                        ${
                          form.type ===
                          "wine"
                            ? `
                              bg-violet-500
                              border-violet-500
                              text-white
                              shadow-lg
                            `
                            : `
                              bg-[#f4f7fb]
                              border-white
                              text-slate-700
                            `
                        }
                      `}
                    >
                      <Wine
                        size={22}
                      />

                      <span className="font-medium">
                        Rượu
                      </span>
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
                        h-[72px]
                        rounded-[24px]
                        border
                        transition-all
                        flex
                        items-center
                        justify-center
                        gap-3
                        ${
                          form.type ===
                          "abalone"
                            ? `
                              bg-emerald-500
                              border-emerald-500
                              text-white
                              shadow-lg
                            `
                            : `
                              bg-[#f4f7fb]
                              border-white
                              text-slate-700
                            `
                        }
                      `}
                    >
                      <Shell
                        size={22}
                      />

                      <span className="font-medium">
                        Bào ngư
                      </span>
                    </button>
                  </div>
                </div>

                {/* WINE */}
                {form.type ===
                  "wine" && (
                  <>
                    <div>
                      <p className="text-sm text-slate-500 mb-2">
                        Mức rượu
                      </p>

                      <select
                        name="wineLevel"
                        value={
                          form.wineLevel
                        }
                        onChange={
                          handleChange
                        }
                        className={
                          inputClass
                        }
                      >
                        <option value="1m">
                          Rượu {">"} 1
                          triệu
                        </option>

                        <option value="3m">
                          Rượu {">"} 3
                          triệu
                        </option>
                      </select>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-2">
                        Số lượng
                      </p>

                      <input
                        type="number"
                        name="wineQty"
                        value={
                          form.wineQty
                        }
                        onChange={
                          handleChange
                        }
                        className={
                          inputClass
                        }
                      />
                    </div>
                  </>
                )}

                {/* ABALONE */}
                {form.type ===
                  "abalone" && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">
                      Số lượng
                    </p>

                    <input
                      type="number"
                      name="abaloneQty"
                      value={
                        form.abaloneQty
                      }
                      onChange={
                        handleChange
                      }
                      className={
                        inputClass
                      }
                    />
                  </div>
                )}

                {/* TABLE */}
                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Số bàn
                  </p>

                  <input
                    type="text"
                    name="tableNumber"
                    value={
                      form.tableNumber
                    }
                    onChange={
                      handleChange
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                {/* SHIFT */}
                <div>
                  <p className="text-sm text-slate-500 mb-2">
                    Ca làm
                  </p>

                  <select
                    name="shift"
                    value={
                      form.shift
                    }
                    onChange={
                      handleChange
                    }
                    className={
                      inputClass
                    }
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

              {/* FOOTER */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  pb-[calc(20px+env(safe-area-inset-bottom))]
                  bg-white/90
                  backdrop-blur-2xl
                  border-t
                  border-slate-100
                "
              >
                <button
                  onClick={
                    handleSave
                  }
                  className="
                    w-full
                    h-[58px]
                    rounded-[24px]
                    bg-gradient-to-r
                    from-violet-600
                    to-indigo-500
                    text-white
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    shadow-[0_10px_30px_rgba(124,58,237,0.35)]
                    active:scale-[0.98]
                    transition-all
                  "
                >
                  <Save
                    size={18}
                  />

                  Lưu thay đổi
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}