import React from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { editar_principio_activo } from "../../actions/productoAction";

class EditPrincipioActive extends React.Component {
  state = {
    actualizado: false,
  };

  update_principio_activo = (id_principio_activo) => {
    let nombre = document.getElementById(
      `nombre_principio_activo_${id_principio_activo}`
    ).value;
    if (nombre == "") {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_principio_activo(id_principio_activo, nombre);
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
          <form className="p-2" key={item.id_principio_activo}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Principio Activo
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Nombre:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id={`nombre_principio_activo_${item.id_principio_activo}`}
                  placeholder="nuevo nombre"
                  defaultValue={item.principio_activo}
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() =>
                    this.update_principio_activo(item.id_principio_activo)
                  }
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

EditPrincipioActive.prototypes = {
  editar_principio_activo: PropsType.func,
};

const mapDistpachToProps = {
  editar_principio_activo,
};

export default connect(null, mapDistpachToProps)(EditPrincipioActive);
