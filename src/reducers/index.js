import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import userHistoryReducer from './userHistorySession';
import ProductoReducer from './productoReducer';

export default combineReducers({
  usuariosReducer,
  userHistoryReducer,
  ProductoReducer,
});
