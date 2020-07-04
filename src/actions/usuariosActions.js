import {
  verificacionCodeAccess,
  create_count,
  verificarEmail,
  loginAccess,
  sessionHistory,
  cleanHistory,
  obtenerUsuarios,
  eliminarUser,
  editarUser,
} from "../api/usuarios";
import {
  CREAR_USER,
  CARGANDO,
  ERROR,
  TOKEN,
  TRAER_TODOS_USERS,
} from "../types/usuariosTypes";
import { TRAER_ULTIMOS_6, ERROR_HISTORY } from "../types/historySessionTypes";
import { NOTIFICACION_ACTIVIVDAD } from "../types/ProductoTypes";

export const crear_cuenta = (data, autorizacion) => async (dispatch) => {
  try {
    let user_register = {};

    verificacionCodeAccess(autorizacion).then((res) => {
      if (res.data.feeback == "Acceso concedido") {
        user_register = {
          ...data,
          tipo: res.data.info[0].tipo,
        };

        create_count(user_register).then((res) => {
          if (res.data.feeback != undefined || res.data.feeback != null) {
            dispatch({
              type: ERROR,
              payload: res.data.feeback,
            });
          } else {
            dispatch({
              type: CREAR_USER,
              payload: res.data,
            });
            dispatch({
              type: CARGANDO,
              payload: true,
            });
          }
        });
      } else {
        dispatch({
          type: ERROR,
          payload: res.data.feeback,
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Error (Usuario) usuariosActions: " + error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    verificarEmail(email).then((res) => {
      if (res.data == [] || res.data == 0) {
        dispatch({
          type: ERROR,
          payload: `No existe cuenta asociada con: ${email}`,
        });
      } else if (res.data[0].email_on == 0) {
        dispatch({
          type: ERROR,
          payload: `Este email (${email}) no esta verificado, ingrese a su tablero de mensajes para confirmarlo`,
        });
      } else {
        loginAccess(email, password).then((res) => {
          if (res.data.feeback != undefined || res.data.feeback != null) {
            dispatch({
              type: ERROR,
              payload: res.data.feeback,
            });
          } else {
            dispatch({
              type: TOKEN,
              payload: res.data.token,
            });
          }
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Fallo en login, usuario Actions: " + error.message,
    });
  }
};

export const restaurar_user = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: false,
  });
  dispatch({
    type: ERROR,
    payload: "",
  });
  dispatch({
    type: TOKEN,
    payload: "",
  });
};

export const history_session = () => async (dispatch) => {
  try {
    sessionHistory().then((res) => {
      dispatch({
        type: TRAER_ULTIMOS_6,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_HISTORY,
      payload: `Error en history: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(History Session) ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const limpiar_history_session = () => async (dispatch) => {
  try {
    cleanHistory().then((res) => {
      sessionHistory().then((res) => {
        dispatch({
          type: TRAER_ULTIMOS_6,
          payload: res.data,
        });
      });

      dispatch({
        type: NOTIFICACION_ACTIVIVDAD,
        payload: {
          tipo: "EXITO",
          text: `${res.data.feeback}`,
          date: new Date(),
        },
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_HISTORY,
      payload: `Error en history: ${error.message}`,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Cliente) ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const traer_usuarios = () => async (dispatch) => {
  try {
    obtenerUsuarios().then((res) => {
      dispatch({
        type: TRAER_TODOS_USERS,
        payload: res.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Error en traer usuario: " + error.message,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Cliente) ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const eliminar_ususario = (id) => async (dispatch) => {
  try {
    eliminarUser(id).then((res) => {
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
        obtenerUsuarios().then((res) => {
          dispatch({
            type: TRAER_TODOS_USERS,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se elimino el usuario`,
            date: new Date(),
          },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Error al eliminar usuario: " + error.message,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Usuario) ${error.message}`,
        date: new Date(),
      },
    });
  }
};

export const editar_usuario = (id, nombres, apellidos, email_on) => async (
  dispatch
) => {
  try {
    editarUser(id, nombres, apellidos, email_on).then((res) => {
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
        obtenerUsuarios().then((res) => {
          dispatch({
            type: TRAER_TODOS_USERS,
            payload: res.data,
          });
        });

        dispatch({
          type: NOTIFICACION_ACTIVIVDAD,
          payload: {
            tipo: "EXITO",
            text: `Se actualizo el usuario`,
            date: new Date(),
          },
        });
      }
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Error al editar el usuario: " + error.message,
    });

    dispatch({
      type: NOTIFICACION_ACTIVIVDAD,
      payload: {
        tipo: "ERROR",
        text: `(Usuario) ${error.message}`,
        date: new Date(),
      },
    });
  }
};
