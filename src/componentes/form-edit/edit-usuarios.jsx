import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { editar_usuario } from "../../actions/usuariosActions";

class EditUsuario extends React.Component {
  state = {
    actualizado: false,
  };

  update_user = (id_user) => {
    let nombres = document.getElementById("nombres").value;
    let apellidos = document.getElementById("apellidos").value;
    let email_on = document.getElementById("email_on").value;

    if (nombres == "" || apellidos == "" || email_on == "") {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      let on = null;
      if (email_on == "Si") {
        on = true;
      } else {
        on = false;
      }
      this.props.editar_usuario(id_user, nombres, apellidos, on);
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
          <form className="p-2" key={item.id_user}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Usuario
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

              <label className="ml-3 mt-2">Verificar Email:</label>
              <div className="col-12">
                <select className="form-control" id="email_on">
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_user(item.id_user)}
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

const mapDisPatchToProps = {
  editar_usuario,
};

EditUsuario.prototypes = {
  editar_usuario: PropType.func,
};

export default connect(null, mapDisPatchToProps)(EditUsuario);
