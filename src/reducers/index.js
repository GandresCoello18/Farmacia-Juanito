import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import userHistoryReducer from "./userHistorySession";
import ProductoReducer from "./productoReducer";
import clienteReducer from "./clientesReducer";
import carritoReducer from "./carritoReducer";
import ventasReducer from "./ventasReducer";
import EstadisticaReducer from "./estadisticasReducer";
import ProveedoresReducer from "./proveedoresReducer";
import PrestamoReducer from "./prestamoReducer";

export default combineReducers({
  userHistoryReducer,
  usuariosReducer,
  ProductoReducer,
  clienteReducer,
  carritoReducer,
  ventasReducer,
  EstadisticaReducer,
  ProveedoresReducer,
  PrestamoReducer,
});
