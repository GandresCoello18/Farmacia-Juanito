import {
  TRAER_TODOS_USERS,
  CREAR_USER,
  CARGANDO,
  ERROR,
  TOKEN,
} from "../types/usuariosTypes";

const INITIAL_STATE = {
  usuarios: [],
  cargando: true,
  error: "",
  token: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODOS_USERS:
      return {
        ...state,
        usuarios: action.payload,
        cargando: false,
        error: "",
      };

    case CREAR_USER:
      return {
        ...state,
        usuarios: {},
        error: "",
        cargando: true,
      };

    case CARGANDO:
      return { ...state, cargando: action.payload };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    case TOKEN:
      return { ...state, token: action.payload, cargando: false };

    default:
      return state;
  }
};
