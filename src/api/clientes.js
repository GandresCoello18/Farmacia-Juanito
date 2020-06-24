import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";

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

export const traerCLiente = async () => {
  return await axios({
    method: "GET",
    url: `${domain()}/api/cliente`,
  });
};
