import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: true,
});

api.setAuth = () => {
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `token ${token}`;
  }
};

api.setAuth();

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

api.getJob = (cod_municipio, cod_division, options) => {
  return api.get("job/" + cod_municipio + "/" + cod_division, options);
};

api.postJob = (cod_municipio, cod_division, options) => {
  return api.post("job/" + cod_municipio + "/" + cod_division, options);
};

api.putHgw = (cod_municipio, data) => {
  return api.put("hgw/" + cod_municipio, data);
};

export default api;
