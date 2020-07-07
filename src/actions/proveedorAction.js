import {
  CREAR_PROVEEDOR,
  ERROR_PROVEEDORES,
  TRAER_PROVEEDORES,
} from "../types/ProveedorTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";
import {
  crearProveedor,
  obtenerProveedores,
  eliminarProveedor,
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
