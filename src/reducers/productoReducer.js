import { TRAER_PRODUCTO, CREAR_PRODUCTO, ERROR_PRODUCTO, CARGANDO_PRODUCTO, CREAR_NAME_PRODUCTO, TRAER_NAME_PRODUCTO  } from "../types/ProductoTypes";

const INITIAL_STATE = {
    Producto: [],
    Producto_Name: [],
    cargando: false,
    error: "",
    mensaje: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREAR_NAME_PRODUCTO:
            return {
                ...state,
                Producto_Name: [],
                cargando: false,
                error: "",
                mensaje: "Producto creado exitosamente"
            };

        case CREAR_PRODUCTO:
            return {
                ...state,
                Producto: [],
                error: "",
            };

        case CARGANDO_PRODUCTO:
            return { ...state, cargando: action.payload };

        case ERROR_PRODUCTO:
            return { ...state, error: action.payload, cargando: false };

        case TRAER_PRODUCTO:
            return { ...state, Producto: action.payload, cargando: false };

        case TRAER_NAME_PRODUCTO:
            return { ...state, Producto_Name: action.payload, cargando: false };

        default:
            return state;
    }
};
