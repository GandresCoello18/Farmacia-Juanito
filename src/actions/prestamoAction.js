import {
  ADD_PRESTAMOS,
  TRAER_PRESTAMOS,
  TRAER_PRESTAMOS_HOY,
  ERROR_PRESTAMOS,
} from "../types/prestamosTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";
import {
  obtenerPrestamos,
  obtenerPrestamosPorFecha,
  addPrestamo,
} from "../api/prestamo";

export const traer_prestamos = () => async (dispatch) => {
  try {
    obtenerPrestamos().then((res) => {
      dispatch({
        type: TRAER_PRESTAMOS,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRESTAMOS,
      payload: `Error en prestamos ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Prestamos) ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_prestamos_hoy = (fecha) => async (dispatch) => {
  try {
    obtenerPrestamosPorFecha(fecha).then((res) => {
      dispatch({
        type: TRAER_PRESTAMOS_HOY,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRESTAMOS,
      payload: `Error en prestamos ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Prestamos) ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const add_prestamo = (descripcion_p, cantidad_p) => async (dispatch) => {
  try {
    addPrestamo(descripcion_p, cantidad_p).then((res) => {
      if (res.data.feeback != undefined) {
        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "ERROR",
            text: `(Prestamos) ${res.data.feeback}`,
            date: new Date(),
          },
        });
      } else {
        obtenerPrestamos().then((res) => {
          dispatch({
            type: ADD_PRESTAMOS,
            payload: res.data,
          });

          dispatch({
            type: TRAER_PRESTAMOS,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: `(Prestamos) se agrego nuevo prestamo`,
              date: new Date(),
            },
          });
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRESTAMOS,
      payload: `Error en prestamos ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Prestamos) ${error.message}`,
        date: new Date(),
      },
    });
  }
};
