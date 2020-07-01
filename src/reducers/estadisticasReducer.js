import {
  ESTADISTICAS_POR_DIA,
  ESTADISTICAS_GANANCIA_POR_MES,
  ESTADISTICAS_POR_SEMANA,
} from "../types/estadisticasTypes";

const INITIAL_STATE = {
  estadisticas_por_dia: [],
  estadisticas_por_semana: [],
  estadisticas_ganacias_por_mes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ESTADISTICAS_POR_DIA:
      return {
        ...state,
        estadisticas_por_dia: action.payload,
      };

    case ESTADISTICAS_GANANCIA_POR_MES:
      return {
        ...state,
        estadisticas_ganacias_por_mes: action.payload,
      };

    case ESTADISTICAS_POR_SEMANA:
      return {
        ...state,
        estadisticas_por_semana: action.payload,
      };

    default:
      return state;
  }
};
