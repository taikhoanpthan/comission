import axios from "axios";

const BASE_URL =
  "https://6a13278b78d0434e0d5dd9da.mockapi.io";

export const api = axios.create({
  baseURL: BASE_URL,
});

const RESOURCE = "/commission";



// =========================
// GET ALL
// =========================

export const getSales = async () => {
  const res = await api.get(RESOURCE);

  return res.data;
};



// =========================
// CREATE
// =========================

export const createSale = async (data) => {
  const res = await api.post(
    RESOURCE,
    data
  );

  return res.data;
};



// =========================
// DELETE
// =========================

export const deleteSale = async (id) => {
  const res = await api.delete(
    `${RESOURCE}/${id}`
  );

  return res.data;
};



// =========================
// UPDATE
// =========================

export const updateSale = async (
  id,
  data
) => {
  const res = await api.put(
    `${RESOURCE}/${id}`,
    data
  );

  return res.data;
};



// =========================
// GET ONE
// =========================

export const getSaleById = async (
  id
) => {
  const res = await api.get(
    `${RESOURCE}/${id}`
  );

  return res.data;
};