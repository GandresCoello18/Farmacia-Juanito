import {
  TRAER_CLIENTES,
  ERROR_CLIENTE,
  BUSQUEDA_CLIENTES,
  CREAR_CLIENTE,
} from "../types/clientesTypes";

const INITIAL_STATE = {
  clientes: [],
  busqueda_cliente: [],
  error_cliente: "",
  mensaje_cliente: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
        cargando: false,
        error_cliente: "",
      };

    case CREAR_CLIENTE:
      return {
        ...state,
        clientes: [],
        error_cliente: "",
        mensaje_cliente: "Se creo el cliente",
      };

    case BUSQUEDA_CLIENTES:
      return {
        ...state,
        busqueda_cliente: action.payload,
      };

    case ERROR_CLIENTE:
      return {
        ...state,
        error_cliente: action.payload,
        mensaje_cliente: action.payload,
        cargando: false,
      };

    default:
      return state;
  }
};
