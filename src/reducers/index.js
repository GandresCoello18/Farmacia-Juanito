import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import userHistoryReducer from "./userHistorySession";
import ProductoReducer from "./productoReducer";
import clienteReducer from "./clientesReducer";

export default combineReducers({
  usuariosReducer,
  userHistoryReducer,
  ProductoReducer,
  clienteReducer,
});
