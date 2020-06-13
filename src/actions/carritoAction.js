import {
  ADD_AL_CARRITO,
  ERRROR_CARRITO,
  QUITAR_DEL_CARRITO,
} from "../types/carritoTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";

export const add_carrito = (id_producto) => async (dispatch, getState) => {
  const StoreProducto = getState().ProductoReducer.Producto;
  const search_producto = StoreProducto.find(
    (item) => item.id_producto == id_producto
  );

  dispatch({
    type: ADD_AL_CARRITO,
    payload: search_producto,
  });

  dispatch({
    type: NOTIFICACION_ACTIVIVDAD,
    payload: {
      tipo: "EXITO",
      text: "Se agrego producto al carrito",
      date: new Date(),
    },
  });
};

export const quitar_del_carrito = (id) => async (dispatch) => {
  dispatch({
    type: QUITAR_DEL_CARRITO,
    payload: id,
  });

  dispatch({
    type: NOTIFICACION_ACTIVIVDAD,
    payload: {
      tipo: "EXITO",
      text: "Se quito producto al carrito",
      date: new Date(),
    },
  });
};

export const error_carrito = (sms) => async (dispatch) => {
  dispatch({
    type: ERRROR_CARRITO,
    payload: sms,
  });
};
