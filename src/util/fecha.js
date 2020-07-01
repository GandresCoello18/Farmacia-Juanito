const { func } = require("prop-types");

function fecha_actual() {
  let ano = new Date().getFullYear();
  let mes = new Date().getMonth();
  let dia = new Date().getDate();

  mes = agregar_ceros_mes(mes);
  dia = agregar_ceros_dia(dia);

  return ano + "-" + mes + "-" + dia;
}

function restar_fecha(fecha_de_partida, dias) {
  let fecha = new Date();
  fecha.setDate(fecha.getDate(fecha_de_partida) + dias);

  let ano = fecha.getFullYear();
  let mes = fecha.getMonth();
  let dia = fecha.getDate();

  mes = agregar_ceros_mes(mes);
  dia = agregar_ceros_dia(dia);

  return ano + "-" + mes + "-" + dia;
}

function sumar_dias_por_fechas(fecha, dias) {
  let f = new Date(fecha);
  f.setDate(f.getDate() + dias);
  /////////////////////////
  let ano = f.getFullYear();
  let mes = f.getMonth();
  let dia = f.getDate();

  mes = agregar_ceros_mes(mes);
  dia = agregar_ceros_dia(dia);

  return ano + "-" + mes + "-" + dia;
}

function diferencias_de_dias_por_fecha(inicio, fin) {
  let date_1 = new Date(inicio);
  let date_2 = new Date(fin);

  //let milisegundos_por_mes = 2628000000;
  let milisegundos_por_dia = 86400000;
  let diferencia_en_milisegundos = date_2 - date_1;
  return Number(Math.round(diferencia_en_milisegundos / milisegundos_por_dia));
}

function ano_actual() {
  return new Date().getFullYear();
}

function obtener_mes_por_fecha(fecha) {
  return new Date(fecha).getMonth();
}

function obtener_dia_semana_por_fecha(fecha) {
  let dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  let dt = new Date(fecha);
  return dias[dt.getUTCDay()];
}

function obtener_primer_dia_semana(fecha) {
  let d = new Date(fecha);
  let day = d.getDay();
  let diff = d.getDate() - day + (day == 0 ? -6 : 1);
  d.setDate(diff);
  ////////////////////////
  let ano = d.getFullYear();
  let mes = d.getMonth();
  let dia = d.getDate();

  mes = agregar_ceros_mes(mes);
  dia = agregar_ceros_dia(dia);

  return ano + "-" + mes + "-" + dia;
}

function agregar_ceros_mes(mes) {
  if (mes < 10) {
    mes = `${0}${mes + 1}`;
  }
  return mes;
}

function agregar_ceros_dia(dia) {
  if (dia < 10) {
    dia = `${0}${dia}`;
  }
  return dia;
}

module.exports = {
  diferencias_de_dias_por_fecha,
  obtener_dia_semana_por_fecha,
  obtener_primer_dia_semana,
  obtener_mes_por_fecha,
  sumar_dias_por_fechas,
  ano_actual,
  fecha_actual,
  restar_fecha,
};
