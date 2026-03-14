import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

// TASKS
export const getTasks = (token) =>
  API.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (token, data) =>
  API.post("/tasks", data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (token, id) =>
  API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })

export const updateTask = (token, id, data) =>
  API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Uploads
export const uploadAvatar = (token, file) => {
  const formData = new FormData()
  formData.append("avatar", file)
  return API.post("/auth/avatar", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
}
