import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";
import {
  ERROR_PRODUCTO,
  ERROR_PRODUCTO_COMPLETE,
  CREAR_NAME_PRODUCTO,
  CREAR_NAME_LABORATORIO,
  CREAR_PRODUCTO,
  TRAER_NAME_LABORATORIO,
  TRAER_NAME_PRODUCTO,
  ERROR_NAME_LABORATORIO,
} from "../types/ProductoTypes";

export const create_product = (data) => async (dispatch) => {
  try {
    const i = await axios({
      method: "post",
      url: `${domain()}/api/producto`,
      data,
      headers: { "access-token": Cookie.get("access_token") },
    });

    dispatch({
      type: CREAR_PRODUCTO,
      payload: i.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO_COMPLETE,
      payload: `Error en crear producto: ${error}`,
    });
  }
};

export const create_name_product = (name) => async (dispatch) => {
  try {
    const i = await axios({
      method: "post",
      url: `${domain()}/api/producto/nombre_producto`,
      data: {
        name_product: name,
      },
      headers: { "access-token": Cookie.get("access_token") },
    });

    if (i.data.feeback) {
      dispatch({
        type: ERROR_PRODUCTO,
        payload: `${i.data.feeback}`,
      });
    } else {
      dispatch({
        type: CREAR_NAME_PRODUCTO,
        payload: i.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO,
      payload: `Error en create name producto: ${error}`,
    });
  }
};

export const create_name_laboratorio = (name) => async (dispatch) => {
  try {
    const res = await axios({
      method: "post",
      url: `${domain()}/api/producto/nombre_laboratorio`,
      data: {
        name_laboratorio: name,
      },
      headers: { "access-token": Cookie.get("access_token") },
    });

    if (res.data.feeback) {
      dispatch({
        type: ERROR_NAME_LABORATORIO,
        payload: `${res.data.feeback}`,
      });
    } else {
      dispatch({
        type: CREAR_NAME_LABORATORIO,
        payload: res.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_NAME_LABORATORIO,
      payload: `Error en create name laboratorio: ${error}`,
    });
  }
};

export const obterner_name_productos = () => async (dispatch) => {
  try {
    const i = await axios({
      method: "get",
      url: `${domain()}/api/producto/nombre_producto`,
    });

    dispatch({
      type: TRAER_NAME_PRODUCTO,
      payload: i.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO,
      payload: `Error en obtener name producto: ${error}`,
    });
  }
};

export const obterner_name_laboratorio = () => async (dispatch) => {
  try {
    const i = await axios({
      method: "get",
      url: `${domain()}/api/producto/nombre_laboratorio`,
    });

    dispatch({
      type: TRAER_NAME_LABORATORIO,
      payload: i.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_NAME_LABORATORIO,
      payload: `Error en obtener name laboratorio: ${error}`,
    });
  }
};
