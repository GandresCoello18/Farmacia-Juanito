import {
  CREAR_VENTAS,
  ERROR_VENTAS,
  MENSAJE_VENTAS,
  TRAER_VENTAS,
} from "../types/ventasTypes";

const INITIAL_STATE = {
  ventas: [],
  error_ventas: "",
  mensaje_ventas: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_VENTAS:
      return {
        ...state,
        ventas: [],
        mensaje_ventas: action.payload,
      };

    case TRAER_VENTAS:
      return {
        ...state,
        ventas: action.payload,
      };

    case MENSAJE_VENTAS:
      return {
        ...state,
        mensaje_ventas: action.payload,
      };

    case ERROR_VENTAS:
      return {
        ...state,
        error_carrito: action.payload,
      };

    default:
      return state;
  }
};
