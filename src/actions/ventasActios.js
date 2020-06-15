import {
  CREAR_VENTAS,
  TRAER_VENTAS,
  MENSAJE_VENTAS,
  ERROR_VENTAS,
} from "../types/ventasTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";
import axios from "axios";
import { domain } from "../util/verifi-local-token";

export const crear_venta = (data) => async (dispatch) => {
  try {
    await axios({
      method: "POST",
      url: `${domain()}/api/factura`,
      data: data,
    });

    dispatch({
      type: CREAR_VENTAS,
      payload: "Venta Exitosa",
    });
  } catch (error) {
    dispatch({
      type: ERROR_VENTAS,
      payload: `Error: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_ventas = () => async (dispatch) => {
  try {
    const i = await axios({
      method: "GET",
      url: `${domain()}/api/factura`,
    });

    dispatch({
      type: TRAER_VENTAS,
      payload: i.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_VENTAS,
      payload: `Error: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const limpiar_ventas = () => async (dispatch) => {
  dispatch({
    type: ERROR_VENTAS,
    payload: "",
  });

  dispatch({
    type: MENSAJE_VENTAS,
    payload: "",
  });
};
