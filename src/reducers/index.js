import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import userHistoryReducer from "./userHistorySession";
import ProductoReducer from "./productoReducer";
import clienteReducer from "./clientesReducer";
import carritoReducer from "./carritoReducer";

export default combineReducers({
  usuariosReducer,
  userHistoryReducer,
  ProductoReducer,
  clienteReducer,
  carritoReducer,
});
