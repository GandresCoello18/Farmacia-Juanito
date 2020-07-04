import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";

/////////////////  METODO DE PETICION POST
export const createCliente = async (
  nombre,
  apellido,
  identificacion,
  correo,
  direccion
) => {
  return await axios({
    method: "POST",
    url: `${domain()}/api/cliente`,
    data: {
      nombre,
      apellido,
      identificacion,
      correo,
      direccion,
    },
  });
};

////////////////  METODO DE PETICI0N GET

export const traerCLiente = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/cliente`,
  });
};

/////////////// METODO DE PETICION DELETE

export const eliminarCliente = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${domain()}/api/cliente/${id}`,
    headers: { "access-token": Cookie.get("access_token") },
  });
};

/////////////  METODO DE PETICION PUT

export const editarCliente = async (
  id,
  nombre,
  apellido,
  identificacion,
  correo,
  direccion
) => {
  return await axios({
    method: "PUT",
    url: `${domain()}/api/cliente/${id}`,
    data: {
      nombre,
      apellido,
      identificacion,
      correo,
      direccion,
    },
    headers: { "access-token": Cookie.get("access_token") },
  });
};
