import axios from "axios";
import { useErrorStore } from "@/stores/error";

export const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: true,
  timeout: 60000,
});

api.setAuth = () => {
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `token ${token}`;
  }
};

api.setAuth();

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    useErrorStore().set(error);
    return Promise.reject(error);
  }
);

api.getAuth = (session) => {
  return api.get("authorize", { params: session });
};

api.getProv = (prov) => {
  const url = prov ? "prov/" + prov : "prov";
  return api.get(url);
};

api.getMun = (mun) => {
  return api.get("mun/" + mun);
};

api.getJob = (cod_municipio, cod_division, linea = 0) => {
  const params = { linea };
  return api.get("job/" + cod_municipio + "/" + cod_division, { params });
};

api.postJob = (cod_municipio, cod_division, options) => {
  return api.post("job/" + cod_municipio + "/" + cod_division, options);
};

api.deleteJob = (cod_municipio, cod_division) => {
  return api.delete("job/" + cod_municipio + "/" + cod_division);
};

api.putHgw = (cod_municipio, data) => {
  return api.put("hgw/" + cod_municipio, data);
};

api.postFixme = (cod_municipio, data) => {
  return api.post("fixme/" + cod_municipio, data);
};

api.putFixme = (cod_municipio, data, config) => {
  return api.put("fixme/" + cod_municipio, data, config);
};

api.deleteFixme = (cod_municipio) => {
  return api.delete("fixme/" + cod_municipio);
};

api.getExport = (cod_municipio) => {
  return api.get("export/" + cod_municipio);
};

export default api;
