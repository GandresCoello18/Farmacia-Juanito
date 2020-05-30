import axios from "axios";
import { domain } from "../util/verifi-local-token";
import {
  TRAER_TODOS,
  CREAR_USER,
  CARGANDO,
  ERROR,
  TOKEN,
} from "../types/usuariosTypes";

export const crear_cuenta = (data, autorizacion) => async (dispatch) => {
  try {
    let user_register = {};

    const obtenerTipo = await axios({
      method: "get",
      url: `${domain()}/view/home/verificar/${autorizacion}`,
    });

    if (obtenerTipo.data.feeback == "Acceso concedido") {
      user_register = {
        ...data,
        tipo: obtenerTipo.data.info[0].tipo,
      };
    } else {
      dispatch({
        type: ERROR,
        payload: obtenerTipo.data.feeback,
      });
    }

    const respuesta = await axios({
      method: "POST",
      url: `${domain()}/api/usuario`,
      data: user_register,
    });
    if (respuesta.data.feeback != undefined || respuesta.data.feeback != null) {
      dispatch({
        type: ERROR,
        payload: respuesta.data.feeback,
      });
    } else {
      dispatch({
        type: CREAR_USER,
        payload: respuesta.data,
      });
      dispatch({
        type: CARGANDO,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Error al crear Usuario usuariosActions.",
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const email_on = await axios({
      method: "get",
      url: `${domain()}/api/email/verificar/email/${email}`,
    });

    if (email_on.data == [] || email_on.data == 0) {
      dispatch({
        type: ERROR,
        payload: `No existe cuenta asociada con: ${email}`,
      });
    } else if (email_on.data[0].email_on == 0) {
      dispatch({
        type: ERROR,
        payload: `Este email (${email}) no esta verificado, ingrese a su tablero de mensajes para confirmarlo`,
      });
    } else {
      const login_user = await axios({
        method: "post",
        url: `${domain()}/api/login/autenticacion`,
        data: {
          email,
          password,
        },
      });

      if (
        login_user.data.feeback != undefined ||
        login_user.data.feeback != null
      ) {
        dispatch({
          type: ERROR,
          payload: login_user.data.feeback,
        });
      } else {
        dispatch({
          type: TOKEN,
          payload: login_user.data.token,
        });
      }
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Fallo en login, usuario Actions.",
    });
  }
};

export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Información de usuario no disponible.",
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
