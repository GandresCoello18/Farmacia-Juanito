import {
  CREAR_VENTAS,
  ERROR_VENTAS,
  MENSAJE_VENTAS,
  MOSTRAR_POR_FECHAS,
  MONTO_TOTAL_POR_FECHA,
  CANTIDAD_VENTAS_POR_FECHA,
  MONTO_VENTAS_TOTAL_HOY,
  TRAER_VENTAS,
} from "../types/ventasTypes";

const INITIAL_STATE = {
  ventas: [],
  ventas_por_fecha: [],
  monto_total_por_fecha: 0,
  cantidad_ventas_por_fecha: 0,
  monto_venta_total_hoy: 0,
  error_ventas: "",
  mensaje_ventas: "",
  carga_ventas: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_VENTAS:
      return {
        ...state,
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

    case MONTO_VENTAS_TOTAL_HOY:
      return {
        ...state,
        monto_venta_total_hoy: action.payload,
      };

    case MONTO_TOTAL_POR_FECHA:
      return {
        ...state,
        monto_total_por_fecha: action.payload,
      };

    case CANTIDAD_VENTAS_POR_FECHA:
      return {
        ...state,
        cantidad_ventas_por_fecha: action.payload,
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
