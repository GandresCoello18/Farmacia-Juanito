import {
  TRAER_CLIENTES,
  ERROR_CLIENTE,
  CREAR_CLIENTE,
} from "../types/clientesTypes";

const INITIAL_STATE = {
  clientes: [],
  error: "",
  mensaje: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
        cargando: false,
        error: "",
      };

    case CREAR_CLIENTE:
      return {
        ...state,
        clientes: [],
        error: "",
      };

    case ERROR_CLIENTE:
      return { ...state, error: action.payload, cargando: false };

    default:
      return state;
  }
};
