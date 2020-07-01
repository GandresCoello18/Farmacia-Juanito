import { ESTADISTICAS_POR_DIA } from "../types/estadisticasTypes";

export const estadisticas_de_ventas_por_dia = (fecha) => async (
  dispatch,
  getState
) => {
  let todasLasVentas = getState().ventasReducer.ventas;
  let resul = [];
  let label = [];
  let monto = [];
  let countProduct = [];
  let y = 0;

  for (let i = 0; i < todasLasVentas.length; i++) {
    if (todasLasVentas[i].fecha_factura.indexOf(fecha) != -1) {
      let c = 0;
      for (let j = 0; j < todasLasVentas.length; j++) {
        if (todasLasVentas[i].id_factura == todasLasVentas[j].id_factura) {
          c = c + 1;
        }
      }

      if (c < 2) {
        label.push(fecha);
        countProduct.push(c);
        monto.push(todasLasVentas[i].total);
      } else {
        y = y + 1;
        if (y < 2) {
          label.push(fecha);
          countProduct.push(c);
          monto.push(todasLasVentas[i].total);
        }
      }
    }
  }

  resul.push(label);
  resul.push(monto);
  resul.push(countProduct);

  dispatch({
    type: ESTADISTICAS_POR_DIA,
    payload: resul,
  });

  return true;
};
