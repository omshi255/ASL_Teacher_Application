import api from "./api";

export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await api.post("/api/auth/signup", data);
  return res.data;
};
