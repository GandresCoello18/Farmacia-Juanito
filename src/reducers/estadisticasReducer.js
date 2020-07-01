import { ESTADISTICAS_POR_DIA } from "../types/estadisticasTypes";

const INITIAL_STATE = {
  estadisticas_por_dia: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ESTADISTICAS_POR_DIA:
      return {
        ...state,
        estadisticas_por_dia: action.payload,
      };
    default:
      return state;
  }
};
