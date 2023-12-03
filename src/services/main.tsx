import axios from "axios";
import { URL } from "../constants";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { JwtPayload } from "../types/main";

const createAxiosInstance = () => {
  const token = Cookies.get('jwt-token') as string;
  const decoded: JwtPayload = jwtDecode(token);

  return axios.create({
    baseURL: `${URL}/api/v1`,
    headers: {
      'tenantId': decoded.tenantId,
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getWorkers = async () => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.get("/workers");
    return data;
  } catch (error) {
    console.error("Error fetching workers:", error);
  }
};

export const getWorker = async (id: string) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.get(`/workers/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching worker:", error);
  }
}

export const editWorker = async (worker: any) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.put(`/workers`, worker);
    return data;
  } catch (error) {
    console.error("Error editing worker:", error);
  }
}

export const addWorker = async (worker: any) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.post(`/workers`, worker);
    return data;
  } catch (error) {
    console.error("Error adding worker:", error);
  }
}

export const deleteWorker = async (id: string) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.delete(`/workers/${id}`);
    return data;
  }
  catch (error) {
    console.error("Error deleting worker:", error);
  }
}

export const uploadCSV = async (file: File) => {
  const axiosInstance = createAxiosInstance();
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post(`/upload-csv`, formData);
    return data;
  } catch (error) {
    console.error("Error uploading csv:", error);
    throw error;
  }
};

export const downloadTemplate = async () => {
  const axiosInstance = createAxiosInstance();
  try {
    const response = await axiosInstance.get('/download-csv', { responseType: 'blob' });

    const blob = new Blob([response.data], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'template.csv';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

  } catch (error) {
    console.error('Error downloading template:', error);
  }
};
