import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";

import { add_prestamo } from "../actions/prestamoAction";

class Prestamo extends React.Component {
  styles = {
    btn_verde: {
      borderColor: "#29a03b",
      borderBottomColor: "#5bd46d",
      backgroundColor: "#5bd46d",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      color: "#fff",
    },
    dialogo: {
      width: 300,
      height: 300,
      border: 3,
      borderStyle: "solid",
      borderColor: "#212529",
      color: "#000",
    },
  };

  save_prestamo = () => {
    let descripcion_p = document.getElementById("descripcion_prestamo").value;
    let cantidad_p = document.getElementById("cantidad_prestamo").value;

    if (descripcion_p == "" || cantidad_p == "") {
      alert("Campos vacios, revise y vuelve a intentarlo");
    } else {
      this.props.add_prestamo(descripcion_p, cantidad_p);
      document.getElementById("form-create-prestamo").reset();
    }
  };

  render() {
    return (
      <>
        <button
          className="btn btn-mini "
          style={{ backgroundColor: "trasparent" }}
        >
          <x-button style={this.styles.btn_verde}>
            <x-label>Tomar dinero prestado</x-label>
            <dialog style={this.styles.dialogo}>
              <form id="form-create-prestamo">
                <label className="mt-2">Descripcion:</label>
                <br />
                <textarea
                  rows="3"
                  className="form-control"
                  id="descripcion_prestamo"
                  placeholder="Especificaciones del prestamo"
                ></textarea>
                <br />

                <label className="mt-2">Fecha pago:</label>
                <br />
                <input
                  type="number"
                  placeholder="example: $ 100"
                  id="cantidad_prestamo"
                  className="form-control"
                />
                <br />

                <button
                  type="button"
                  onClick={this.save_prestamo}
                  className="btn btn-mini btn-primary mt-4 form-control"
                >
                  Guardar
                </button>
                <br />
                <p style={{ color: "red", padding: 1 }}>
                  Se disminuye el salde de ingresos.
                </p>
              </form>
            </dialog>
          </x-button>
        </button>
      </>
    );
  }
}

Prestamo.prototypes = {
  add_prestamo: PropType.func,
};

const mapDisPachToProps = {
  add_prestamo,
};

export default connect(null, mapDisPachToProps)(Prestamo);
