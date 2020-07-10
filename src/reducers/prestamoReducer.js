import {
  ADD_PRESTAMOS,
  ERROR_PRESTAMOS,
  TRAER_PRESTAMOS,
  TRAER_PRESTAMOS_HOY,
} from "../types/prestamosTypes";

const INITIAL_STATE = {
  Prestamo: [],
  Prestamo_hoy: [],
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
    case TRAER_PRESTAMOS_HOY:
      return {
        ...state,
        Prestamo_hoy: action.payload,
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
