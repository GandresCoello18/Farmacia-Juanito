import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { editar_prestamo } from "../../actions/prestamoAction";

class EditPrestamo extends React.Component {
  state = {
    actualizado: false,
  };

  update_prestamo = (id_prestamo) => {
    let cantidad = document.getElementById(`cantidad_prestamo_${id_prestamo}`)
      .value;
    let descripcion = document.getElementById(
      `descripcion_prestamo_${id_prestamo}`
    ).value;

    if ((cantidad == "", descripcion == "")) {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_prestamo(id_prestamo, descripcion, cantidad);
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
          <form className="p-2" key={item.id_prestamo}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Prestamo
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Cantidad prestamo:</label>
              <div className="col-12">
                <input
                  type="number"
                  className="form-control"
                  id={`cantidad_prestamo_${item.id_prestamo}`}
                  placeholder="Cantidad: $"
                  defaultValue={item.cantidad_prestamo}
                />
              </div>

              <label className="ml-3 mt-2">Descripcion prestamo:</label>
              <div className="col-12">
                <textarea
                  rows="3"
                  id={`descripcion_prestamo_${item.id_prestamo}`}
                  maxLength="100"
                  placeholder="100 caracteres"
                  className="form-control"
                  defaultValue={item.descripcion_prestamo}
                ></textarea>
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_prestamo(item.id_prestamo)}
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

EditPrestamo.prototypes = {
  editar_prestamo: PropType.func,
};

const mapDistpachToProps = {
  editar_prestamo,
};

export default connect(null, mapDistpachToProps)(EditPrestamo);
