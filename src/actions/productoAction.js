import {
  createProduct,
  createNameProduct,
  createNameLaboratorio,
  createNamePrincipioActive,
  obtenerPrincipioActive,
  obtenerNameProduct,
  obtenerNameLaboratorio,
  obtenerProductoCompleto,
  eliminarProducto,
  elimarPrincioActivo,
  elimarProductName,
  eliminarLaboratorio,
} from "../api/producto";
import {
  ERROR_PRODUCTO,
  ERROR_PRODUCTO_COMPLETE,
  BUSCAR_PRODUCTO,
  CREAR_NAME_PRODUCTO,
  CREAR_NAME_LABORATORIO,
  NOTIFICACION_ACTIVIVDAD,
  CREAR_PRODUCTO,
  TRAER_NAME_LABORATORIO,
  TRAER_NAME_PRODUCTO,
  ERROR_NAME_LABORATORIO,
  TRAER_PRODUCTO,
  CREAR_PRINCIPIO_ACTIVO,
  TRAER_PRINCIPIO_ACTIVO,
  ERROR_PRINCIPIO_ACTIVO,
} from "../types/ProductoTypes";

export const create_product = (data) => async (dispatch) => {
  try {
    createProduct(data).then((res) => {
      dispatch({
        type: CREAR_PRODUCTO,
        payload: res.data,
      });

      dispatch({
        type: NOTIFICACION_ACTIVIVDAD,
        payload: {
          tipo: "EXITO",
          text: "(Producto) creado correctamente",
          date: new Date(),
        },
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
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO_COMPLETE,
      payload: `(Create producto): ${error}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Create producto): ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const create_name_product = (name) => async (dispatch) => {
  try {
    createNameProduct(name).then((res) => {
      if (res.data.feeback) {
        dispatch({
          type: ERROR_PRODUCTO,
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
          type: CREAR_NAME_PRODUCTO,
          payload: res.data,
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
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO,
      payload: `(Name producto): ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Name producto): ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const create_name_laboratorio = (name) => async (dispatch) => {
  try {
    createNameLaboratorio(name).then((res) => {
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
    });
  } catch (error) {
    dispatch({
      type: ERROR_NAME_LABORATORIO,
      payload: `(Name laboratorio): ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Name laboratorio): ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const create_name_princ_activo = (name) => async (dispatch) => {
  try {
    createNamePrincipioActive(name).then((res) => {
      if (res.data.feeback) {
        dispatch({
          type: ERROR_PRINCIPIO_ACTIVO,
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
          type: CREAR_PRINCIPIO_ACTIVO,
          payload: res.data,
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se creo neuvo (Principio activo)`,
            date: new Date(),
          },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRINCIPIO_ACTIVO,
      payload: `(Principio activo): ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Principio activo): ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const obtener_principio_activo = () => async (dispatch) => {
  try {
    obtenerPrincipioActive().then((res) => {
      dispatch({
        type: TRAER_PRINCIPIO_ACTIVO,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRINCIPIO_ACTIVO,
      payload: `(Principio activo): ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Principio activo): ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const obterner_name_productos = () => async (dispatch) => {
  try {
    obtenerNameProduct().then((res) => {
      dispatch({
        type: TRAER_NAME_PRODUCTO,
        payload: res.data,
      });
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
    obtenerNameLaboratorio().then((res) => {
      dispatch({
        type: TRAER_NAME_LABORATORIO,
        payload: res.data,
      });
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
    eliminarProducto(id).then((res) => {
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
        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Producto eliminado`,
            date: new Date(),
          },
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
      }
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

export const eliminar_principio_activo = (id) => async (dispatch) => {
  try {
    elimarPrincioActivo(id).then((res) => {
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
        obtenerPrincipioActive().then((res) => {
          dispatch({
            type: TRAER_PRINCIPIO_ACTIVO,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `se ha eliminar principio activo`,
            date: new Date(),
          },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRINCIPIO_ACTIVO,
      payload: `Error ha eliminar el producto: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error ha eliminar princio activo: ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const eliminar_nombre_producto = (id) => async (dispatch) => {
  try {
    elimarProductName(id).then((res) => {
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
        obtenerNameProduct().then((res) => {
          dispatch({
            type: TRAER_NAME_PRODUCTO,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se elimino el nombre del producto`,
            date: new Date(),
          },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_PRODUCTO,
      payload: `Error al eliminar name laboratorio: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error al eliminar name laboratorio: ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const eliminar_laboratorio = (id) => async (dispatch) => {
  try {
    eliminarLaboratorio(id).then((res) => {
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
        obtenerNameLaboratorio().then((res) => {
          dispatch({
            type: TRAER_NAME_LABORATORIO,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se elimino el nombre del laboratorio`,
            date: new Date(),
          },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR_NAME_LABORATORIO,
      payload: `Error al eliminar name laboratorio: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `Error al eliminar name laboratorio: ${error.message}`,
        date: new Date(),
      },
    });
  }
};
