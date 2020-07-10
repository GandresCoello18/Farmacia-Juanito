import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";

////////////////////////  METODO DE PETICION POST

export const createVenta = async (data) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/factura`,
    data: data,
  });
};

////////////////////// METODO DE PETICION GET

export const obtenerVentas = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/venta`,
  });
};

export const obtenerMontoTotalPorFecha = async (fecha) => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/factura/monto_total/${fecha}`,
  });
};

//////////////////// METODO DE PETICION DELETE

export const eliminarVentas = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/venta/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const eliminarFactura = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/factura/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};
