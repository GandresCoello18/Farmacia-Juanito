import {
  ADD_AL_CARRITO,
  ERRROR_CARRITO,
  QUITAR_DEL_CARRITO,
} from "../types/carritoTypes";

export const add_carrito = (array_carrito) => async (dispatch) => {
  dispatch({
    type: ADD_AL_CARRITO,
    payload: array_carrito,
  });
};

export const quitar_del_carrito = (id) => async (dispatch) => {
  dispatch({
    type: QUITAR_DEL_CARRITO,
    payload: id,
  });
};

export const error_carrito = (sms) => async (dispatch) => {
  dispatch({
    type: ERRROR_CARRITO,
    payload: sms,
  });
};
