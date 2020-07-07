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

////////////////  METODO DE PETICION DELETE

export const eliminarProveedor = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/proveedor/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};
