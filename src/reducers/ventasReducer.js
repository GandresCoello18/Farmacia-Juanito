import {
  CREAR_VENTAS,
  ERROR_VENTAS,
  MENSAJE_VENTAS,
  MOSTRAR_POR_FECHAS,
  CARGADO,
  TRAER_VENTAS,
} from "../types/ventasTypes";

const INITIAL_STATE = {
  ventas: [],
  ventas_por_fecha: [],
  error_ventas: "",
  mensaje_ventas: "",
  carga_ventas: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_VENTAS:
      return {
        ...state,
        ventas: [],
        mensaje_ventas: action.payload,
        carga_ventas: true,
      };

    case TRAER_VENTAS:
      return {
        ...state,
        ventas: action.payload,
        carga_ventas: false,
      };

    case MOSTRAR_POR_FECHAS:
      return {
        ...state,
        ventas_por_fecha: action.payload,
        carga_ventas: false,
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
