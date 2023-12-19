import axios, { AxiosInstance } from "axios";
import AppConfig from "@/config/app";
import i18next from "i18next";
import { dispatch } from "@/redux/store";
import { setError } from "@/redux/slices/app.slice";
import { getSession } from "next-auth/react";

const instance: AxiosInstance = axios.create({
  baseURL: AppConfig.apiUrl,
  timeout: 10000,
});

instance.interceptors.request.use(async (config) => {
  const session: any = getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.token.accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(async (response) => {
  if (response.status === 403) {
    dispatch(setError(i18next.t`errors.forbidden`));
  }
  if (response.status === 500) {
    dispatch(setError(i18next.t`errors.internalServerError`));
  }
  if (response.status === 404) {
    dispatch(setError(i18next.t`errors.notFound`));
  }
  if (response.status === 503) {
    dispatch(setError(i18next.t`errors.serviceUnavailable`));
  }
  if (response.status === 401) {
    dispatch(setError(i18next.t("errors.unauthorized", { message: "Session has been expired" })));
  }
  return Promise.reject(response.data.data ?? i18next.t`errors.unknown`);
});

export default instance;
