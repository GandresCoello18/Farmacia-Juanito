import {
  CREAR_PROVEEDOR,
  TRAER_PROVEEDORES,
  ERROR_PROVEEDORES,
  BUSQUEDA_PROVEEDOR,
  ADD_PRODUCTO_PROVEEDOR,
} from "../types/ProveedorTypes";

const INITIAL_STATE = {
  Proveedores: [],
  Busqueda_proveedores: [],
  Producto_proveedor: [],
  error_proveedor: "",
  mensaje_proveedor: "",
  cargar_proveedor: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREAR_PROVEEDOR:
      return {
        ...state,
        cargar_proveedor: true,
      };
    case TRAER_PROVEEDORES:
      return {
        ...state,
        Proveedores: action.payload,
        cargar_proveedor: false,
      };
    case BUSQUEDA_PROVEEDOR:
      return {
        ...state,
        Busqueda_proveedores: action.payload,
      };
    case ERROR_PROVEEDORES:
      return {
        ...state,
        error_proveedor: action.payload,
      };
    case ADD_PRODUCTO_PROVEEDOR:
      return {
        ...state,
        Producto_proveedor: action.payload,
      };

    default:
      return state;
  }
};
