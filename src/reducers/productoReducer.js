import {
  TRAER_PRODUCTO,
  CREAR_PRODUCTO,
  BUSCAR_PRODUCTO,
  ERROR_PRODUCTO_COMPLETE,
  ELIMINAR_PRODUCTO,
  CREAR_NAME_PRODUCTO,
  TRAER_NAME_PRODUCTO,
  ERROR_PRODUCTO,
  CARGANDO_PRODUCTO,
  TRAER_NAME_LABORATORIO,
  CREAR_NAME_LABORATORIO,
  ERROR_NAME_LABORATORIO,
} from "../types/ProductoTypes";

const INITIAL_STATE = {
  Producto: [],
  Busqueda_producto: [],
  Producto_Name: [],
  Laboratorio_Name: [],
  ////////////////
  cargando: false,
  error: "",
  mensaje: "",
  ///////////////
  mensaje_laboratorio: "",
  error_laboratorio: "",
  //////////////
  mensaje_producto_complete: "",
  error_producto_complete: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_NAME_PRODUCTO:
      return {
        ...state,
        Producto_Name: [],
        cargando: false,
        error: "",
        mensaje: "Producto name creado exitosamente",
      };

    case CREAR_PRODUCTO:
      return {
        ...state,
        Producto: [],
        error: "",
        mensaje_producto_complete: "Producto creado exitosamente",
      };

    case ERROR_PRODUCTO_COMPLETE:
      return {
        ...state,
        Producto: [],
        error: action.payload,
        mensaje_producto_complete: "",
      };

    case CARGANDO_PRODUCTO:
      return { ...state, cargando: action.payload };

    case ERROR_PRODUCTO:
      return {
        ...state,
        error: action.payload,
        mensaje: action.payload,
        cargando: false,
      };

    case TRAER_PRODUCTO:
      return { ...state, Producto: action.payload, cargando: false };

    case TRAER_NAME_PRODUCTO:
      return { ...state, Producto_Name: action.payload, cargando: false };

    case TRAER_NAME_LABORATORIO:
      return { ...state, Laboratorio_Name: action.payload, cargando: false };

    case CREAR_NAME_LABORATORIO:
      return {
        ...state,
        Laboratorio_Name: [],
        cargando: false,
        mensaje_laboratorio: "Laboratio creado exitosamente",
      };

    case ERROR_NAME_LABORATORIO:
      return {
        ...state,
        Laboratorio_Name: [],
        cargando: false,
        error_laboratorio: action.payload,
        mensaje_laboratorio: action.payload,
      };

    case BUSCAR_PRODUCTO:
      return {
        ...state,
        Busqueda_producto: action.payload,
      };

    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        mensaje_producto_complete: action.payload,
      };

    default:
      return state;
  }
};
