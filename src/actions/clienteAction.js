import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";
import {
  CREAR_CLIENTE,
  TRAER_CLIENTES,
  ERROR_CLIENTE,
} from "../types/clientesTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";

export const crear_cliente = (
  nombre,
  apellido,
  identificacion,
  correo,
  direccion
) => async (dispatch) => {
  try {
    const i = await axios({
      method: "post",
      url: `${domain()}/api/cliente`,
      data: {
        nombre,
        apellido,
        identificacion,
        correo,
        direccion,
      },
    });

    dispatch({
      type: CREAR_CLIENTE,
      payload: i.data,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: { tipo: "EXITO", text: "Se creo cliente/s correctamente" },
    });
  } catch (error) {
    dispatch({
      type: ERROR_CLIENTE,
      payload: `Error en crear cliente: ${error}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: { tipo: "ERROR", text: `Error en crear cliente: ${error}` },
    });
  }
};

export const traer_clientes = () => async (dispatch) => {
  try {
    const i = await axios({
      method: "get",
      url: `${domain()}/api/cliente`,
    });

    dispatch({
      type: TRAER_CLIENTES,
      payload: i.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_CLIENTE,
      payload: `Error al traer cliente: ${error}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: { tipo: "ERROR", text: `Error al mostrar cliente: ${error}` },
    });
  }
};
