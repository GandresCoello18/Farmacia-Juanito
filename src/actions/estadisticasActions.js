import {
  ESTADISTICAS_POR_DIA,
  ESTADISTICAS_GANANCIA_POR_MES,
  ESTADISTICAS_POR_SEMANA,
} from "../types/estadisticasTypes";
import {
  obtener_mes_por_fecha,
  ano_actual,
  obtener_primer_dia_semana,
  sumar_dias_por_fechas,
} from "../util/fecha";
import moment from "moment";

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

export const ganancia_del_mes_por_ano = () => async (dispatch, getState) => {
  let todasLasVentas = getState().ventasReducer.ventas;
  let ano = ano_actual();
  let resul = [];
  let ventas_del_ano = [];
  let ganancia = 0;

  for (let i = 0; i < todasLasVentas.length; i++) {
    if (todasLasVentas[i].fecha_factura.indexOf(`${ano}`) != -1) {
      ventas_del_ano.push(todasLasVentas[i]);
    }
  }

  suma_del_mes(0); //ENERO
  suma_del_mes(1); // FEBRERO
  suma_del_mes(2); // MARZO
  suma_del_mes(3); // ABRIL
  suma_del_mes(4); // MAYO
  suma_del_mes(5); // JUNIO
  suma_del_mes(6); // JULIO
  suma_del_mes(7); // AGOSTO
  suma_del_mes(8); // SEPTIEMBRE
  suma_del_mes(9); // OCTUBRE
  suma_del_mes(10); // NOVIEMBRE
  suma_del_mes(11); // DICIEMBRE

  function suma_del_mes(mes) {
    for (let k = 0; k < ventas_del_ano.length; k++) {
      if (obtener_mes_por_fecha(ventas_del_ano[k].fecha_factura) == mes) {
        ganancia = ganancia + Number(ventas_del_ano[k].total);
      }
    }
    resul.push(ganancia.toFixed(2));
    ganancia = 0;
  }

  dispatch({
    type: ESTADISTICAS_GANANCIA_POR_MES,
    payload: resul,
  });

  return true;
};

export const estadistica_ventas_por_semana = (fecha) => async (
  dispatch,
  getState
) => {
  let todasLasVentas = getState().ventasReducer.ventas;
  let ventas_del_ano = [];
  let ano = ano_actual();
  let resul = [];
  let label = [];
  let countProduct = [];
  let monto = [];

  for (let i = 0; i < todasLasVentas.length; i++) {
    if (todasLasVentas[i].fecha_factura.indexOf(`${ano}`) != -1) {
      ventas_del_ano.push(todasLasVentas[i]);
    }
  }

  datos_del_dia(1); // LUNES
  datos_del_dia(2); // MARTES
  datos_del_dia(3); // MIERCOLES
  datos_del_dia(4); // JUEVES
  datos_del_dia(5); // VIERNES
  datos_del_dia(6); // SABADO
  datos_del_dia(7); // DOMINGO

  function datos_del_dia(dia) {
    let fecha_a_buscar = "";
    let y = 0;
    for (let i = 0; i < ventas_del_ano.length; i++) {
      fecha_a_buscar = sumar_dias_por_fechas(
        obtener_primer_dia_semana(fecha),
        dia
      );

      if (ventas_del_ano[i].fecha_factura.indexOf(fecha_a_buscar) != -1) {
        let c = 0;

        for (let j = 0; j < ventas_del_ano.length; j++) {
          if (ventas_del_ano[i].id_factura == ventas_del_ano[j].id_factura) {
            c = c + 1;
          }
        }

        if (c < 2) {
          label.push(moment(fecha_a_buscar).format("LL"));
          countProduct.push(c);
          monto.push(ventas_del_ano[i].total);
        } else {
          y = y + 1;
          if (y < 2) {
            label.push(moment(fecha_a_buscar).format("LL"));
            countProduct.push(c);
            monto.push(ventas_del_ano[i].total);
          }
        }
      }
      fecha_a_buscar = "";
    }
  }

  resul.push(label);
  resul.push(monto);
  resul.push(countProduct);

  dispatch({
    type: ESTADISTICAS_POR_SEMANA,
    payload: resul,
  });

  return true;
};
