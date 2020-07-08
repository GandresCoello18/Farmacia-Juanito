import axios from "axios";
import { domain } from "../util/verifi-local-token";
import Cookie from "js-cookie";

/////////////////  METODO DE PETICION GET

export const obtenerProveedores = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/proveedor`,
  });
};

export const obtenerProductoProveedor = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/proveedor/producto`,
  });
};

/////////////////  METODO DE PETICION POST

export const crearProveedor = async (
  nombres,
  id_laboratorio,
  correo,
  telefono
) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/proveedor`,
    data: {
      nombres,
      id_laboratorio,
      correo,
      telefono,
    },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const addNewProduct = async (
  descripcion,
  fecha_pago,
  total,
  id_proveedor,
  estado_pp
) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/proveedor/producto`,
    data: { descripcion, fecha_pago, total, id_proveedor, estado_pp },
  });
};

////////////////  METODO DE PETICION DELETE

export const eliminarProveedor = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/proveedor/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const eliminarProductoProveedor = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/proveedor/producto/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

///////////////  METODO DE PETICION PUT

export const editarProveedor = async (
  id,
  nombres,
  id_laboratorio,
  correo,
  telefono
) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/proveedor/${id}`,
    data: { nombres, id_laboratorio, correo, telefono },
    headers: { "access-token": Cookie.get("access_token") },
  });
};

export const pagarProductProveedor = async (id) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/proveedor/producto/estado/pagado/${id}`,
  });
};
