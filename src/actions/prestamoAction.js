import {
  ADD_PRESTAMOS,
  TRAER_PRESTAMOS,
  TRAER_PRESTAMOS_POR_FECHA,
  ERROR_PRESTAMOS,
} from "../types/prestamosTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";
import {
  obtenerPrestamos,
  obtenerPrestamosPorFecha,
  addPrestamo,
  eliminarPrestamo,
  editarPrestamo,
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
        type: TRAER_PRESTAMOS_POR_FECHA,
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
      payload: `Error en agregar prestamos ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Prestamos) Error en agregar ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const eliminar_prestamo = (id) => async (dispatch) => {
  try {
    eliminarPrestamo(id).then((res) => {
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
            type: TRAER_PRESTAMOS,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: `(Prestamos) se elimino el prestamo`,
              date: new Date(),
            },
          });
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRESTAMOS,
      payload: `Error en eliminar el prestamos ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Prestamos) Error en eliminar ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const editar_prestamo = (id, descripcion, cantidad) => async (
  dispatch
) => {
  try {
    editarPrestamo(id, descripcion, cantidad).then((res) => {
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
            type: TRAER_PRESTAMOS,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: `(Prestamos) se edito el prestamo`,
              date: new Date(),
            },
          });
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRESTAMOS,
      payload: `Error en eliminar el editar ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Prestamos) Error en editar ${error.message}`,
        date: new Date(),
      },
    });
  }
};
