import {
  TRAER_PRODUCTO,
  CREAR_PRODUCTO,
  BUSCAR_PRODUCTO,
  ERROR_PRODUCTO_COMPLETE,
  NOTIFICACION_ACTIVIVDAD,
  CREAR_NAME_PRODUCTO,
  TRAER_NAME_PRODUCTO,
  ERROR_PRODUCTO,
  CARGANDO_PRODUCTO,
  TRAER_NAME_LABORATORIO,
  CREAR_NAME_LABORATORIO,
  ERROR_NAME_LABORATORIO,
  CREAR_PRINCIPIO_ACTIVO,
  TRAER_PRINCIPIO_ACTIVO,
  ERROR_PRINCIPIO_ACTIVO,
} from "../types/ProductoTypes";

const INITIAL_STATE = {
  Producto: [],
  Busqueda_producto: [],
  Producto_Name: [],
  Laboratorio_Name: [],
  Principio_activo: [],
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
  //////////////
  error_principio_activo: "",
  mensaje_principio_activo: "",
  //////////////
  notificaciones_actividades: [],
};

const array_actividad = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_NAME_PRODUCTO:
      return {
        ...state,
        Producto_Name: [],
        error: "",
        mensaje: "Producto name creado exitosamente",
      };

    case CREAR_PRODUCTO:
      return {
        ...state,
        error: "",
        cargando: true,
        mensaje_producto_complete: "Producto creado exitosamente",
      };

    case CREAR_PRINCIPIO_ACTIVO:
      return {
        ...state,
        Principio_activo: [],
        mensaje_principio_activo: "principio activo creado exitosamente",
      };

    case ERROR_PRINCIPIO_ACTIVO:
      return {
        ...state,
        error_principio_activo: action.payload,
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
      return { ...state, Producto_Name: action.payload };

    case TRAER_NAME_LABORATORIO:
      return { ...state, Laboratorio_Name: action.payload };

    case TRAER_PRINCIPIO_ACTIVO:
      return {
        ...state,
        Principio_activo: action.payload,
        error_principio_activo: "",
        mensaje_principio_activo: "",
      };

    case CREAR_NAME_LABORATORIO:
      return {
        ...state,
        Laboratorio_Name: [],
        mensaje_laboratorio: "Laboratio creado exitosamente",
      };

    case ERROR_NAME_LABORATORIO:
      return {
        ...state,
        Laboratorio_Name: [],
        error_laboratorio: action.payload,
        mensaje_laboratorio: action.payload,
      };

    case BUSCAR_PRODUCTO:
      return {
        ...state,
        Busqueda_producto: action.payload,
      };

    case NOTIFICACION_ACTIVIVDAD:
      array_actividad.push(action.payload);
      return { ...state, notificaciones_actividades: array_actividad };

    default:
      return state;
  }
};
