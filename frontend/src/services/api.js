import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getClinicians = async () => {
  const response = await api.get("/clinicians");
  return response.data.data;
};

export const createClinician = async (name) => {
  const response = await api.post("/clinicians", {
    name,
  });

  return response.data.data;
};

export const getPatients = async () => {
  const response = await api.get("/patients");
  return response.data.data;
};

export const createPatient = async (name) => {
  const response = await api.post("/patients", {
    name,
  });

  return response.data.data;
};

export const getVisits = async () => {
  const response = await api.get("/visits");
  return response.data.data;
};

export const createVisit = async (visitData) => {
  const response = await api.post("/visits", visitData);
  return response.data.data;
};