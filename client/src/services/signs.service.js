import api from "./api";

export const fetchSigns = async () => {
  const res = await api.get("/api/signs");
  return res.data.signs;
};
