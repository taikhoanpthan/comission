import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarOutlined,
  PlusOutlined,
  ReloadOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Tag, Tooltip } from "antd";
import dayjs from "dayjs";

import { getSales, createSale } from "../services/api";

import SaleForm from "../components/SaleForm";
import SummaryCards from "../components/SummaryCards";

export default function Home() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mặc định tháng hiện tại
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));

  const fetchSales = async () => {
    try {
      setLoading(true);

      const data = await getSales();

      setSales(
        [...data].sort(
          (a, b) =>
            new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt),
        ),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createSale(data);
      await fetchSales();
    } catch (err) {
      console.log(err);
    }
  };

  // Lọc doanh thu theo tháng
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const saleDate = new Date(sale.date || sale.createdAt || Date.now());

      const month = `${saleDate.getFullYear()}-${String(
        saleDate.getMonth() + 1,
      ).padStart(2, "0")}`;

      return month === selectedMonth;
    });
  }, [sales, selectedMonth]);

  const formattedMonth = dayjs(`${selectedMonth}-01`).format("MM/YYYY");

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#1f2937]">
      {/* ================= MAIN ================= */}
      <main>
        {/* ================= PAGE TITLE ================= */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="border-l-[3px] border-[#1677ff] pl-3">
              <div className="mb-1 flex items-center gap-2">
                <BarChartOutlined className="text-[#1677ff]" />

                <span className="text-xs font-medium uppercase tracking-wide text-[#8c8c8c]">
                  Dashboard
                </span>
              </div>

              <h1 className="m-0 text-[25px] font-semibold tracking-[-0.5px] text-[#111827]">
                Tổng quan Commission
              </h1>

              <p className="mt-1 text-sm text-[#8c8c8c]">
                Theo dõi doanh thu rượu và bào ngư
              </p>
            </div>

            <div className="flex items-center gap-2"><Tag color="blue" className="m-0 w-fit px-3 py-1 text-xs">Kỳ báo cáo: {formattedMonth}</Tag><Tooltip title="Làm mới dữ liệu"><Button type="text" icon={<ReloadOutlined />} loading={loading} onClick={fetchSales} className="text-[#6b7280]" /></Tooltip></div>
          </div>
        </motion.div>

        {/* ================= FILTER BAR ================= */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5"
        >
          <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2 text-sm font-medium text-[#374151]">
                  <CalendarOutlined className="text-[#1677ff]" />
                  Kỳ báo cáo
                </div>

                <div className="text-xs text-[#9ca3af]">
                  Chọn tháng để xem dữ liệu commission
                </div>
              </div>

              <DatePicker
                picker="month"
                value={dayjs(`${selectedMonth}-01`)}
                format="MM/YYYY"
                allowClear={false}
                onChange={(value) => {
                  if (value) {
                    setSelectedMonth(value.format("YYYY-MM"));
                  }
                }}
                className="h-10 w-full md:w-[180px]"
              />
            </div>
          </div>
        </motion.section>

        {/* ================= SUMMARY ================= */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="m-0 text-[16px] font-semibold text-[#1f2937]">
                Tổng quan
              </h2>

              <p className="mt-1 text-xs text-[#9ca3af]">
                Số liệu trong tháng {formattedMonth}
              </p>
            </div>

            <span className="text-xs text-[#9ca3af]">
              {filteredSales.length} giao dịch
            </span>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-4">
            <SummaryCards sales={filteredSales} />
          </div>
        </motion.section>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* ================= TRANSACTION OVERVIEW ================= */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="min-w-0"
          >
            <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* CARD HEADER */}
              <div className="flex items-center justify-between border-b border-[#f0f0f0] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f7ff] text-[#1677ff]">
                    <FileTextOutlined />
                  </div>

                  <div>
                    <h2 className="m-0 text-[15px] font-semibold text-[#1f2937]">
                      Giao dịch trong tháng
                    </h2>

                    <p className="m-0 mt-0.5 text-xs text-[#9ca3af]">
                      Danh sách commission đã ghi nhận
                    </p>
                  </div>
                </div>

                <Tag className="m-0">{filteredSales.length} bản ghi</Tag>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                {filteredSales.length === 0 ? (
                  <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5] text-[#bfbfbf]">
                      <FileTextOutlined />
                    </div>

                    <div className="text-sm font-medium text-[#595959]">
                      Chưa có giao dịch
                    </div>

                    <div className="mt-1 text-xs text-[#9ca3af]">
                      Chưa có dữ liệu commission trong tháng này
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-[#f0f0f0] bg-[#fafafa] p-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                        <div className="text-xs text-[#8c8c8c]">
                          Tổng giao dịch
                        </div>

                        <div className="mt-1 text-xl font-semibold text-[#1f2937]">
                          {filteredSales.length}
                        </div>
                      </div>

                      <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                        <div className="text-xs text-[#8c8c8c]">Kỳ báo cáo</div>

                        <div className="mt-1 text-xl font-semibold text-[#1677ff]">
                          {formattedMonth}
                        </div>
                      </div>

                      <div className="col-span-2 rounded-lg border border-[#e5e7eb] bg-white p-3 sm:col-span-1">
                        <div className="text-xs text-[#8c8c8c]">Trạng thái</div>

                        <div className="mt-1">
                          <Tag color="success" className="m-0">
                            Đang hoạt động
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* ================= CREATE SALE ================= */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              {/* HEADER */}
              <div className="border-b border-[#f0f0f0] px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4ff] text-[#1677ff]">
                    <PlusOutlined />
                  </div>

                  <div>
                    <h2 className="m-0 text-[15px] font-semibold text-[#1f2937]">
                      Thêm giao dịch
                    </h2>

                    <p className="m-0 mt-0.5 text-xs text-[#9ca3af]">
                      Ghi nhận commission mới
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <div className="p-4">
                <SaleForm onSubmit={handleCreate} />
              </div>
            </div>
          </motion.section>
        </div>

        {/* ================= FOOTER INFO ================= */}
        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-[#e5e7eb] pt-4 text-[11px] text-[#9ca3af] sm:flex-row">
          <span>MMO Commission Management System</span>

          <span>Dữ liệu cập nhật: {dayjs().format("DD/MM/YYYY HH:mm")}</span>
        </div>
      </main>
    </div>
  );
}
