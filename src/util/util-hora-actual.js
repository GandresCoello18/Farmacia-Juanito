function hora_actual() {
  let hoy = new Date();
  let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  return hora;
}

module.exports = {
  hora_actual,
};
