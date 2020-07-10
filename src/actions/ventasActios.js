import {
  CREAR_VENTAS,
  TRAER_VENTAS,
  MOSTRAR_POR_FECHAS,
  MONTO_TOTAL_POR_FECHA,
  CANTIDAD_VENTAS_POR_FECHA,
  MENSAJE_VENTAS,
  ERROR_VENTAS,
} from "../types/ventasTypes";
import {
  createVenta,
  obtenerVentas,
  obtenerMontoTotalPorFecha,
  eliminarVentas,
  eliminarFactura,
} from "../api/ventas";
import { obtenerProductoCompleto } from "../api/producto";
import { LIMPIAR_CARRITO } from "../types/carritoTypes";
import {
  NOTIFICACION_ACTIVIVDAD,
  TRAER_PRODUCTO,
  BUSCAR_PRODUCTO,
} from "../types/ProductoTypes";

export const crear_venta = (data) => async (dispatch, getState) => {
  try {
    createVenta(data).then((res) => {
      dispatch({
        type: CREAR_VENTAS,
        payload: "Venta Exitosa",
      });

      const array = getState().carritoReducer.carrito;
      array.splice(0, array.length);

      dispatch({
        type: LIMPIAR_CARRITO,
        payload: array,
      });

      obtenerProductoCompleto().then((res) => {
        dispatch({
          type: TRAER_PRODUCTO,
          payload: res.data,
        });

        dispatch({
          type: BUSCAR_PRODUCTO,
          payload: res.data,
        });
      });

      obtenerVentas().then((res) => {
        dispatch({
          type: TRAER_VENTAS,
          payload: res.data,
        });
      });
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
    obtenerVentas().then((res) => {
      dispatch({
        type: TRAER_VENTAS,
        payload: res.data,
      });
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

export const traer_monto_por_fecha = (fecha) => (dispatch) => {
  try {
    obtenerMontoTotalPorFecha(fecha).then((res) => {
      let total = 0;
      if (res.data[0].total != null) total = res.data[0].total;

      dispatch({
        type: MONTO_TOTAL_POR_FECHA,
        payload: total,
      });

      dispatch({
        type: CANTIDAD_VENTAS_POR_FECHA,
        payload: res.data[0].cantidad,
      });
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

export const traer_por_fecha = (array) => async (dispatch) => {
  dispatch({
    type: MOSTRAR_POR_FECHAS,
    payload: array,
  });
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

export const eliminar_venta = (id) => async (dispatch) => {
  try {
    eliminarVentas(id).then((res) => {
      if (res.data.feeback != undefined) {
        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "ERROR",
            text: `${res.data.feeback}`,
            date: new Date(),
          },
        });
      } else {
        obtenerVentas().then((res) => {
          dispatch({
            type: TRAER_VENTAS,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se elimino la venta`,
            date: new Date(),
          },
        });
      }
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

export const eliminar_factura = (id) => async (dispatch) => {
  try {
    eliminarFactura(id).then((res) => {
      console.log(res);
      if (res.data.feeback != undefined) {
        dispatch({
          type: ERROR_VENTAS,
          payload: `Error (Ventas): ${res.data.feeback}`,
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
        obtenerVentas().then((res) => {
          dispatch({
            type: TRAER_VENTAS,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se elimino la factura`,
            date: new Date(),
          },
        });
      }
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

export const quitar_facturas_repetidas = (ventas) => async () => {
  let count = 0;
  let y = 0;
  let resul = [];

  for (let i = 0; i < ventas.length; i++) {
    for (let j = 0; j < ventas.length; j++) {
      if (ventas[i].id_factura == ventas[j].id_factura) {
        count = count + 1;
      }
    }

    if (count < 2) {
      resul.push(ventas[i]);
    } else {
      y = y + 1;
      if (y < 2) {
        resul.push(ventas[i]);
      }
    }
    count = 0;
  }

  return resul;
};
