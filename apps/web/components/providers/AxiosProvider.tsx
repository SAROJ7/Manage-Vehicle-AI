"use client";

import axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

const AxiosContext = createContext<null | AxiosInstance>(null);

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: { response?: { data?: { status?: number; error?: string } } }) => {
      if (error.response) {
        if (
          error.response.data?.status === 400 ||
          error.response.data?.status === 500
        ) {
          return Promise.reject(error.response.data.error);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
