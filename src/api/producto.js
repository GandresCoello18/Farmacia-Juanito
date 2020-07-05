import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";

/////////////////////////  METODO DE PETICION POST

export const createProduct = async (data) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/producto`,
    data,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const createNameProduct = async (name) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/producto/nombre_producto`,
    data: {
      name_product: name,
    },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const createNameLaboratorio = async (name) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/producto/nombre_laboratorio`,
    data: {
      name_laboratorio: name,
    },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const createNamePrincipioActive = async (name) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/producto/principio_activo`,
    data: {
      name_principio_activo: name,
    },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

/////////////////////////////////////  METODO DE PETICION GET

export const obtenerPrincipioActive = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/producto/principio_activo`,
  });
};

export const obtenerNameProduct = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/producto/nombre_producto`,
  });
};

export const obtenerNameLaboratorio = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/producto/nombre_laboratorio`,
  });
};

export const obtenerProductoCompleto = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/producto`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

//////////////////////////////////// METODO DE PETICION DELETE

export const eliminarProducto = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/producto/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const elimarPrincioActivo = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/producto/principio_activo/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const elimarProductName = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/producto/nombre_producto/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const eliminarLaboratorio = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/producto/nombre_laboratorio/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

/////////////////// METODO DE PETICION PUT

export const editarPrincipioActivo = async (id, principio_activo) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/producto/principio_activo/${id}`,
    data: { principio_activo },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const editarNombreProducto = async (id, name_product) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/producto/nombre_producto/${id}`,
    data: { name_product },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const editarLaboratorio = async (id, name_laboratorio) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/producto/nombre_laboratorio/${id}`,
    data: { name_laboratorio },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const editarProducto = async (
  id,
  producto,
  laboratorio,
  principio_act,
  cantidad,
  presentacion,
  lote,
  sanitario,
  medidas,
  tipo_medidas,
  elaboracion,
  caducidad,
  pvp,
  pvf
) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/producto/${id}`,
    data: {
      producto,
      laboratorio,
      principio_act,
      cantidad,
      presentacion,
      lote,
      sanitario,
      medidas,
      tipo_medidas,
      elaboracion,
      caducidad,
      pvp,
      pvf,
    },
    headers: { "access-token": Cookie.get("access_token") },
  });
};
