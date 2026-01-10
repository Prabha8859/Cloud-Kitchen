import api from "../api/axios";

export const loginApi = (data) => {
  return api.post("/auth/login", data);
};
