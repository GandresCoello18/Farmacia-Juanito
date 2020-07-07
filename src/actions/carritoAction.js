import {
  ADD_AL_CARRITO,
  ERRROR_CARRITO,
  QUITAR_DEL_CARRITO,
  LIMPIAR_CARRITO,
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

export const quitar_del_carrito = (id_producto) => async (
  dispatch,
  getState
) => {
  const datos_carrito = getState().carritoReducer.carrito;
  for (let i = 0; i < datos_carrito.length; i++) {
    if (datos_carrito[i].id_producto.indexOf(id_producto) != -1) {
      //console.log(datos_carrito[i]);
      datos_carrito.splice(i, 1);
    }
  }

  dispatch({
    type: QUITAR_DEL_CARRITO,
    payload: datos_carrito,
  });

  dispatch({
    type: NOTIFICACION_ACTIVIVDAD,
    payload: {
      tipo: "EXITO",
      text: "Se quito producto del carrito",
      date: new Date(),
    },
  });

  return true;
};

export const limpiar_carrito = () => async (dispatch, getState) => {
  const array = getState().carritoReducer.carrito;
  array.splice(0, array.length);

  dispatch({
    type: LIMPIAR_CARRITO,
    payload: array,
  });

  dispatch({
    type: NOTIFICACION_ACTIVIVDAD,
    payload: {
      tipo: "EXITO",
      text: "Se limpio el carrito",
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
