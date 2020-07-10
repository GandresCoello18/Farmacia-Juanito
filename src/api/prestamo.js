import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";

////////////////  METODO DE PETICION GET

export const obtenerPrestamos = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/prestamo`,
  });
};

export const obtenerPrestamosPorFecha = async (fecha) => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/prestamo/fecha/${fecha}`,
  });
};

////////////////  METDOD DE PETICION POST

export const addPrestamo = async (descripcion_prestamo, cantidad_prestamo) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/prestamo`,
    data: { descripcion_prestamo, cantidad_prestamo },
    headers: { "access-token": Cookie.get("access_token") },
  });
};
