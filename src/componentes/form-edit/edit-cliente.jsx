import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { editar_cliente } from "../../actions/clienteAction";

class EditCliente extends React.Component {
  state = {
    actualizado: false,
  };

  update_client = (id_cliente) => {
    let nombre = document.getElementById("nombres").value;
    let apellido = document.getElementById("apellidos").value;
    let correo = document.getElementById("correo").value;
    let identificacion = document.getElementById("identificacion").value;
    let direccion = document.getElementById("direccion").value;

    if (
      (nombre == "",
      apellido == "",
      identificacion == "",
      correo == "",
      direccion == "")
    ) {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_cliente(
        id_cliente,
        nombre,
        apellido,
        identificacion,
        correo,
        direccion
      );
      this.setState({
        actualizado: true,
      });
      setTimeout(() => this.setState({ actualizado: false }), 1000);
    }
  };

  render() {
    return (
      <>
        {[this.props.data].map((item) => (
          <form className="p-2" key={item.id_cliente}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Cliente
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Nombres:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id="nombres"
                  placeholder="nuevo nombre"
                  defaultValue={item.nombres}
                />
              </div>

              <label className="ml-3 mt-2">Apellidos:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id="apellidos"
                  placeholder="nuevo apellido"
                  defaultValue={item.apellidos}
                />
              </div>

              <label className="ml-3 mt-2">Correo:</label>
              <div className="col-12">
                <input
                  type="email"
                  id="correo"
                  className="form-control"
                  defaultValue={item.correo}
                />
              </div>

              <label className="ml-3 mt-2">Identificacion:</label>
              <div className="col-12">
                <input
                  type="number"
                  id="identificacion"
                  className="form-control"
                  defaultValue={item.identificacion}
                />
              </div>

              <label className="ml-3 mt-2">Direccion:</label>
              <div className="col-12">
                <textarea
                  rows="3"
                  id="direccion"
                  maxLength="60"
                  placeholder="60 caracteres"
                  className="form-control"
                  defaultValue={item.direccion}
                ></textarea>
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_client(item.id_cliente)}
                  className="mt-2 form-control btn btn-primary"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        ))}
        {this.state.actualizado && <Notificacion text="Actualizando...." />}
      </>
    );
  }
}

EditCliente.prototypes = {
  editar_cliente: PropType.func,
};

const mapDistpachToProps = {
  editar_cliente,
};

export default connect(null, mapDistpachToProps)(EditCliente);
