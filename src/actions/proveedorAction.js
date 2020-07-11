import {
  CREAR_PROVEEDOR,
  ERROR_PROVEEDORES,
  TRAER_PROVEEDORES,
  BUSQUEDA_PROVEEDOR,
  ADD_PRODUCTO_PROVEEDOR,
  MONTO_TOTAL_POR_FECHA_PP,
  COUNT_TOTAL_POR_FECHA_PP,
} from "../types/ProveedorTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";
import {
  crearProveedor,
  obtenerProveedores,
  eliminarProveedor,
  editarProveedor,
  editarProductoProveedor,
  addNewProduct,
  obtenerProductoProveedor,
  obtenerMontoTotalPP,
  eliminarProductoProveedor,
  pagarProductProveedor,
} from "../api/proveedor";

export const crear_proveedor = (
  nombre,
  laboratorio,
  correo,
  telefono
) => async (dispatch) => {
  try {
    crearProveedor(nombre, laboratorio, correo, telefono).then((res) => {
      obtenerProveedores().then((res) => {
        dispatch({
          type: CREAR_PROVEEDOR,
          payload: [],
        });

        dispatch({
          type: TRAER_PROVEEDORES,
          payload: res.data,
        });

        dispatch({
          type: BUSQUEDA_PROVEEDOR,
          payload: res.data,
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se creo el proveedor`,
            date: new Date(),
          },
        });
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al crear proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al crear proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_proveedores = () => async (dispatch) => {
  try {
    obtenerProveedores().then((res) => {
      dispatch({
        type: TRAER_PROVEEDORES,
        payload: res.data,
      });

      dispatch({
        type: BUSQUEDA_PROVEEDOR,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al traer proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al traer proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_monto_total_por_fecha_pp = (fecha) => async (dispatch) => {
  try {
    obtenerMontoTotalPP(fecha).then((res) => {
      console.log(res.data);
      let total = 0;
      if (res.data[0].total != null) total = res.data[0].total;

      dispatch({
        type: MONTO_TOTAL_POR_FECHA_PP,
        payload: total,
      });

      dispatch({
        type: COUNT_TOTAL_POR_FECHA_PP,
        payload: res.data[0].count,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al traer monto total  ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al traer monto total ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const eliminar_proveedor = (id) => async (dispatch) => {
  try {
    eliminarProveedor(id).then((res) => {
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
        obtenerProveedores().then((res) => {
          dispatch({
            type: TRAER_PROVEEDORES,
            payload: res.data,
          });

          dispatch({
            type: BUSQUEDA_PROVEEDOR,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: `Se elimino el proveedor`,
              date: new Date(),
            },
          });
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al eliminar proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al eliminar proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const editar_proveedor = (
  id,
  nombres,
  id_laboratorio,
  correo,
  telefono
) => async (dispatch) => {
  try {
    editarProveedor(id, nombres, id_laboratorio, correo, telefono).then(
      (res) => {
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
          obtenerProveedores().then((res) => {
            dispatch({
              type: TRAER_PROVEEDORES,
              payload: res.data,
            });

            dispatch({
              type: BUSQUEDA_PROVEEDOR,
              payload: res.data,
            });

            dispatch({
              type: NOTIFICACION_ACTIVIVDAD,
              payload: {
                tipo: "EXITO",
                text: `Se edito el proveedor`,
                date: new Date(),
              },
            });
          });
        }
      }
    );
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al editar proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al editar proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const busqueda_en_proveedor = (array) => async (dispatch) => {
  dispatch({
    type: TRAER_PROVEEDORES,
    payload: array,
  });
};

export const traer_product_proveedor = () => async (dispatch) => {
  try {
    obtenerProductoProveedor().then((res) => {
      dispatch({
        type: ADD_PRODUCTO_PROVEEDOR,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al obtener productos de proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al obtener productos de proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const add_new_product_proveedor = (
  descripcion,
  fecha_pago,
  total,
  id_proveedor,
  estado_pp,
  abono
) => async (dispatch) => {
  try {
    addNewProduct(
      descripcion,
      fecha_pago,
      total,
      id_proveedor,
      estado_pp,
      abono
    ).then((res) => {
      obtenerProductoProveedor().then((res) => {
        dispatch({
          type: ADD_PRODUCTO_PROVEEDOR,
          payload: res.data,
        });
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al agregar producto de proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al agregar producto de proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const eliminar_producto_proveedor = (id) => async (dispatch) => {
  try {
    eliminarProductoProveedor(id).then((res) => {
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
        obtenerProductoProveedor().then((res) => {
          dispatch({
            type: ADD_PRODUCTO_PROVEEDOR,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: `Se elimino el producto del proveedor`,
              date: new Date(),
            },
          });
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al eliminar producto de proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al eliminar producto de proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const pago_producto_proveedor = (id) => async (dispatch) => {
  try {
    pagarProductProveedor(id).then(() => {
      obtenerProductoProveedor().then((res) => {
        dispatch({
          type: ADD_PRODUCTO_PROVEEDOR,
          payload: res.data,
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se pago el producto del proveedor`,
            date: new Date(),
          },
        });
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al pagar producto de proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al pagar producto de proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
  return true;
};

export const editar_producto_proveedor = (
  id_pp,
  descripcion,
  fecha_pago,
  total,
  estado_pp,
  abonado
) => async (dispatch) => {
  try {
    editarProductoProveedor(
      id_pp,
      descripcion,
      fecha_pago,
      total,
      estado_pp,
      abonado
    ).then((res) => {
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
        obtenerProductoProveedor().then((res) => {
          dispatch({
            type: ADD_PRODUCTO_PROVEEDOR,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: `Se pago el producto del proveedor`,
              date: new Date(),
            },
          });
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PROVEEDORES,
      payload: `(Proveedor) Error al editar producto de proveedor ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Proveedor) Error al editar producto de proveedor ${error.message}`,
        date: new Date(),
      },
    });
  }
};
