import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import userHistoryReducer from "./userHistorySession";
import ProductoReducer from "./productoReducer";
import clienteReducer from "./clientesReducer";
import carritoReducer from "./carritoReducer";
import ventasReducer from "./ventasReducer";

export default combineReducers({
  userHistoryReducer,
  usuariosReducer,
  ProductoReducer,
  clienteReducer,
  carritoReducer,
  ventasReducer,
});
