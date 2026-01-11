import api from "./api";

export const fetchSigns = async () => {
  const res = await api.get("/signs");
  return res.data.data;
};
