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
  ano_actual,
  fecha_actual,
  restar_fecha,
};
