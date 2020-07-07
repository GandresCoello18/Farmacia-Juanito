import React from "react";
import Notificacion from "../notificacion";
import PropsType from "prop-types";
import { connect } from "react-redux";

import { editar_laboratorio } from "../../actions/productoAction";

class EditLaboratio extends React.Component {
  state = {
    actualizado: false,
  };

  update_laboratorio_name = (id_product_name) => {
    let nombre = document.getElementById(
      `nombre_laboratorio_${id_product_name}`
    ).value;
    if (nombre == "") {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_laboratorio(id_product_name, nombre);
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
          <form className="p-2" key={item.id_name_laboratorio}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Laboratorio
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Nombre:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id={`nombre_laboratorio_${item.id_name_laboratorio}`}
                  placeholder="nuevo nombre"
                  defaultValue={item.nombre_laboratorio}
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() =>
                    this.update_laboratorio_name(item.id_name_laboratorio)
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

EditLaboratio.prototypes = {
  editar_laboratorio: PropsType.func,
};

const mapDistpachToProps = {
  editar_laboratorio,
};

export default connect(null, mapDistpachToProps)(EditLaboratio);
