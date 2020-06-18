const validar_status = (estado) => {
  switch (estado) {
    case "Disponible":
      return "alert-success";
    case "Aun disponible":
      return "alert-warning";
    default:
      return "alert-danger";
  }
};

module.exports = {
  validar_status,
};
