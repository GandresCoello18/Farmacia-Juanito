import {
  ADD_PRESTAMOS,
  ERROR_PRESTAMOS,
  TRAER_PRESTAMOS,
  TRAER_PRESTAMOS_POR_FECHA,
} from "../types/prestamosTypes";

const INITIAL_STATE = {
  Prestamo: [],
  Prestamo_por_fecha: [],
  error_prestamo: "",
  mensaje_prestamo: "",
  cargar_prestamo: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRESTAMOS:
      return {
        ...state,
        cargar_prestamo: true,
      };
    case TRAER_PRESTAMOS:
      return {
        ...state,
        Prestamo: action.payload,
        cargar_prestamo: false,
      };
    case TRAER_PRESTAMOS_POR_FECHA:
      return {
        ...state,
        Prestamo_por_fecha: action.payload,
      };
    case ERROR_PRESTAMOS:
      return {
        ...state,
        error_prestamo: action.payload,
      };
    default:
      return state;
  }
};
