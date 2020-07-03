import React from "react";
import Notificacion from "../componentes/notificacion";
import PropsType from "prop-types";
import { connect } from "react-redux";

import { crear_cliente } from "../actions/clienteAction";

class CreateClient extends React.Component {
  state = {
    nombres: "",
    apellidos: "",
    identificacion: 0,
    correo: "",
    direccion: "",
    ///////////
    exito: false,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  add_cliente = () => {
    if (
      this.state.nombres == "" ||
      this.state.apellidos == "" ||
      this.state.identificacion == "" ||
      this.state.direccion == ""
    ) {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.crear_cliente(
        this.state.nombres,
        this.state.apellidos,
        this.state.identificacion,
        this.state.correo,
        this.state.direccion
      );
      document.getElementById("client_form").reset();
      this.setState({
        exito: true,
      });
    }
  };

  render() {
    return (
      <>
        {this.props.cambiar_slider != undefined && (
          <button
            style={{ marginTop: 30, marginBottom: 30 }}
            className="btn btn-primary"
            onClick={this.props.cambiar_slider}
          >
            Volver al carrito
          </button>
        )}

        <div
          style={{
            backgroundColor: "#0866dc",
            color: "#fff",
            width: "100%",
            padding: 5,
          }}
        >
          <strong
            className="text-center"
            style={{
              marginLeft: 35,
            }}
          >
            Nuevo Cliente
          </strong>
        </div>

        <form className="p-2" id="client_form">
          <label className="mt-0"> Nombres:</label>
          <input
            type="text"
            name="nombres"
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Nombres completos"
          />

          <label className="mt-2">Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Apellidos completos"
          />

          <label className="mt-2">Numero de identificacion:</label>
          <input
            type="number"
            name="identificacion"
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="0000"
          />

          <label className="mt-2">Direccion de correo:</label>
          <input
            type="email"
            name="correo"
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="ejemplo@gmail.com"
          />

          <label className="mt-2">Direccion:</label>
          <textarea
            rows="3"
            name="direccion"
            onChange={this.handleInputChange}
            className="form-control"
            maxLength="60"
            placeholder="60 caracteres"
          ></textarea>

          <button
            onClick={this.add_cliente}
            type="button"
            className="btn btn-primary form-control mt-1"
          >
            Guardar
          </button>
        </form>
        {this.state.exito && <Notificacion text="Cliente registrado" />}
      </>
    );
  }
}

CreateClient.prototypes = {
  crear_cliente: PropsType.func,
};

const mapDispatchToProps = {
  crear_cliente,
};

export default connect(null, mapDispatchToProps)(CreateClient);
