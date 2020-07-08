import {
  CREAR_PROVEEDOR,
  ERROR_PROVEEDORES,
  TRAER_PROVEEDORES,
  ADD_PRODUCTO_PROVEEDOR,
} from "../types/ProveedorTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";
import {
  crearProveedor,
  obtenerProveedores,
  eliminarProveedor,
  editarProveedor,
  addNewProduct,
  obtenerProductoProveedor,
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
  estado_pp
) => async (dispatch) => {
  try {
    addNewProduct(descripcion, fecha_pago, total, id_proveedor, estado_pp).then(
      (res) => {
        obtenerProductoProveedor().then((res) => {
          dispatch({
            type: ADD_PRODUCTO_PROVEEDOR,
            payload: res.data,
          });
        });
      }
    );
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
};
