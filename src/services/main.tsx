import axios from "axios";
import { URL } from "../constants";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { JwtPayload } from "../types/main";
import {toast} from "react-toastify";

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
    toast.error('Помилка завантаження файлу');
  }
};

export const getCourses = async () => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.get("/courses");
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
}

export const addCourse = async (course: any) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.post(`/courses/create`, course);
    return data;
  } catch (error) {
    console.error("Error adding course:", error);
  }
}

export const addCourseParticipant = async (courseId: string, participant:any) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.post(`/courses/participants?courseId=${courseId}`,participant );
    return data;
  } catch (error) {
    console.error("Error adding course participant:", error);
  }
}

export const getCourse = async (id: string) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.get(`/courses/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching course:", error);
  }
}

export const getCourseParticipants = async (id: string) => {
  const axiosInstance = createAxiosInstance();
  try {
    const { data } = await axiosInstance.get(`courses/participants?courseId=${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching course participants:", error);
  }
}

export const uploadCertificateLayout = async (file: File, courseId: string) => {
  const axiosInstance = createAxiosInstance();
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post(`/certificates/upload?courseId=${courseId}`, formData);
    return data;
  } catch (error) {
    console.error("Error uploading certificate layout:", error);
    throw error;
  }
}

export const changeCertificateLayout = async (file: File, fileId: string) => {
  const axiosInstance = createAxiosInstance();
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axiosInstance.put(`/certificates/upload?fileId=${fileId}`, formData);
    return data;
  } catch (error) {
    console.error("Error uploading certificate layout:", error);
    throw error;
  }
}

export const downloadCertificateLayout = async (fileId: string) => {
  const axiosInstance = createAxiosInstance();
  try {
    const response = await axiosInstance.get(`/certificates/download/${fileId}`, { responseType: 'blob' });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Open a new window
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.src = window.URL.createObjectURL(blob);

      newWindow.document.body.appendChild(iframe);
    } else {
      toast.error('Не вдалося відкрити сертифікат');
    }
  } catch (error) {
    toast.error('Помилка завантаження файлу');
  }
}

export const signedCertificates = async (file: Uint8Array, password: string, courseId: string, participants: number[]) => {
  const axiosInstance = createAxiosInstance();
  const payload = {
    signaturePassword: password,
    courseId,
    participantIds: participants,
    file: Array.from(file),
  }
  try {
    const { data } = await axiosInstance.post(`/certificates/sign`, payload);
    return data;
  } catch (error) {
    console.error("Error signed certificates:", error);
    throw error;
  }
}

