import React from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { editar_nombre_producto } from "../../actions/productoAction";

class EditProductName extends React.Component {
  state = {
    actualizado: false,
  };

  update_product_name = (id_product_name) => {
    let nombre = document.getElementById(`nombre_product_${id_product_name}`)
      .value;
    if (nombre == "") {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_nombre_producto(id_product_name, nombre);
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
          <form className="p-2" key={item.id_product_name}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Nombre Producto
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Nombre:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id={`nombre_product_${item.id_product_name}`}
                  placeholder="nuevo nombre"
                  defaultValue={item.product_name}
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_product_name(item.id_product_name)}
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

EditProductName.prototypes = {
  editar_nombre_producto: PropsType.func,
};

const mapDistpachToProps = {
  editar_nombre_producto,
};

export default connect(null, mapDistpachToProps)(EditProductName);
