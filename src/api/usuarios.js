import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";

///////////////////////  METODO DE PETICION GET

export const verificacionCodeAccess = async (autorizacion) => {
  return await axios({
    method: "GET",
    url: `${domain()}/view/home/verificar/${autorizacion}`,
  });
};

export const verificarEmail = async (email) => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/email/verificar/email/${email}`,
  });
};

export const sessionHistory = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/usuario/history-session?limite=6`,
  });
};

export const obtenerUsuarios = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/usuario`,
  });
};

///////////////////  METODO DE PETICION POST

export const create_count = async (user_register) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/usuario`,
    data: user_register,
  });
};

export const loginAccess = async (email, password) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/login/autenticacion`,
    data: {
      email,
      password,
    },
  });
};

/////////////////  METODO DE PETICION DELETE

export const cleanHistory = async () => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/usuario/history-session`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const eliminarUser = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/usuario/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};
