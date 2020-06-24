import axios from "axios";
import { domain } from "../util/verifi-local-token";
import { createCliente, traerCLiente } from "../api/clientes";
import {
  CREAR_CLIENTE,
  TRAER_CLIENTES,
  BUSQUEDA_CLIENTES,
  ERROR_CLIENTE,
} from "../types/clientesTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";

export const crear_cliente = (
  nombre,
  apellido,
  identificacion,
  correo,
  direccion
) => async (dispatch) => {
  try {
    createCliente(nombre, apellido, identificacion, correo, direccion).then(
      (res) => {
        if (res.data.feeback != undefined) {
          dispatch({
            type: ERROR_CLIENTE,
            payload: res.data.feeback,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "ERROR",
              text: `(Cliente) ${res.data.feeback}`,
              date: new Date(),
            },
          });

          setTimeout(() => {
            dispatch({
              type: ERROR_CLIENTE,
              payload: "",
            });
          }, 3000);
        } else {
          dispatch({
            type: CREAR_CLIENTE,
            payload: res.data,
          });

          dispatch({
            type: NOTIFICACION_ACTIVIVDAD,
            payload: {
              tipo: "EXITO",
              text: "(Cliente) Se creo cliente/s correctamente",
              date: new Date(),
            },
          });
        }
      }
    );
  } catch (error) {
    dispatch({
      type: ERROR_CLIENTE,
      payload: `Error en crear cliente: ${error}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Cliente) Error en crear cliente: ${error}`,
        date: new Date(),
      },
    });
  }
};

export const traer_clientes = () => async (dispatch) => {
  try {
    traerCLiente().then((res) => {
      dispatch({
        type: TRAER_CLIENTES,
        payload: res.data,
      });

      dispatch({
        type: BUSQUEDA_CLIENTES,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_CLIENTE,
      payload: `Error al traer cliente: ${error}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Cliente) Error al mostrar cliente: ${error}`,
        date: new Date(),
      },
    });
  }
};

export const busqueda_en_clientes = (array) => async (dispatch) => {
  dispatch({
    type: TRAER_CLIENTES,
    payload: array,
  });
};

export const eliminar_cliente = (id) => async (dispatch) => {
  try {
    await axios({
      method: "DELETE",
      url: `${domain()}/api/cliente/${id}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "EXITO",
        text: `(Cliente) Error al eliminar cliente`,
        date: new Date(),
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR_CLIENTE,
      payload: `Error al eliminar cliente: ${error}`,
    });
  }
};
