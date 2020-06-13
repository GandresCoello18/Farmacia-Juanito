import axios from "axios";
import Cookie from "js-cookie";
import { domain } from "../util/verifi-local-token";
import {
  ERROR_PRODUCTO,
  ERROR_PRODUCTO_COMPLETE,
  BUSCAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  CREAR_NAME_PRODUCTO,
  CREAR_NAME_LABORATORIO,
  NOTIFICACION_ACTIVIVDAD,
  CREAR_PRODUCTO,
  TRAER_NAME_LABORATORIO,
  TRAER_NAME_PRODUCTO,
  ERROR_NAME_LABORATORIO,
  TRAER_PRODUCTO,
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

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "EXITO",
        text: "Producto creado correctamente",
        date: new Date(),
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO_COMPLETE,
      payload: `Error en crear producto: ${error}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error al crear producto: ${error}`,
        date: new Date(),
      },
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

      dispatch({
        type: NOTIFICACION_ACTIVIVDAD,
        payload: { tipo: "ERROR", text: `${i.data.feeback}`, date: new Date() },
      });
    } else {
      dispatch({
        type: CREAR_NAME_PRODUCTO,
        payload: i.data,
      });

      dispatch({
        type: NOTIFICACION_ACTIVIVDAD,
        payload: {
          tipo: "EXITO",
          text: `Nombre del producto creado`,
          date: new Date(),
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO,
      payload: `Error en create name producto: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error en create name producto: ${error.message}`,
        date: new Date(),
      },
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

      dispatch({
        type: NOTIFICACION_ACTIVIVDAD,
        payload: {
          tipo: "ERROR",
          text: `${res.data.feeback}`,
          date: new Date(),
        },
      });
    } else {
      dispatch({
        type: CREAR_NAME_LABORATORIO,
        payload: res.data,
      });

      dispatch({
        type: NOTIFICACION_ACTIVIVDAD,
        payload: {
          tipo: "EXITO",
          text: `Se creo el nombre del producto`,
          date: new Date(),
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR_NAME_LABORATORIO,
      payload: `Error en create name laboratorio: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error en create name laboratorio: ${error.message}`,
        date: new Date(),
      },
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
      payload: `Error en obtener name producto: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error en obtener name producto: ${error.message}`,
        date: new Date(),
      },
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
      payload: `Error en obtener name laboratorio: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error en obtener name laboratorio: ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const obtener_producto_completos = () => async (dispatch) => {
  try {
    const i = await axios({
      method: "get",
      url: `${domain()}/api/producto`,
      headers: { "access-token": Cookie.get("access_token") },
    });

    dispatch({
      type: TRAER_PRODUCTO,
      payload: i.data,
    });

    dispatch({
      type: BUSCAR_PRODUCTO,
      payload: i.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO_COMPLETE,
      payload: `Error en obtener el producto: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error en obtener el producto: ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const busqueda_en_producto = (array) => async (dispatch) => {
  dispatch({
    type: TRAER_PRODUCTO,
    payload: array,
  });
};

export const eliminar_producto = (id) => async (dispatch) => {
  try {
    const i = await axios({
      method: "delete",
      url: `${domain()}/api/producto/${id}`,
      headers: { "access-token": Cookie.get("access_token") },
    });

    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: "Producto eliminado",
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "EXITO",
        text: `Producto eliminado`,
        date: new Date(),
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO_COMPLETE,
      payload: `Error ha eliminar el producto: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error ha eliminar el producto: ${error.message}`,
        date: new Date(),
      },
    });
  }
};
