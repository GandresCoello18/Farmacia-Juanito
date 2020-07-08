import React from "react";
import Notificacion from "../notificacion";
import PropsType from "prop-types";
import { connect } from "react-redux";

import { editar_proveedor } from "../../actions/proveedorAction";

class EditLaboratio extends React.Component {
  state = {
    actualizado: false,
  };

  update_proveedor = (id_proveedores) => {
    let nombre = document.getElementById(`nombre_proveedor_${id_proveedores}`)
      .value;
    let id_laboratorio = document.getElementById(
      `id_laboratorio_proveedor${id_proveedores}`
    ).value;
    let correo = document.getElementById(`correo_proveedor_${id_proveedores}`)
      .value;
    let telefono = document.getElementById(
      `telefono_proveedor_${id_proveedores}`
    ).value;

    if (nombre == "" || correo == "" || telefono == "") {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_proveedor(
        id_proveedores,
        nombre,
        id_laboratorio,
        correo,
        telefono
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
          <form className="p-2" key={item.id_proveedores}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Proveedor
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Nombres:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id={`nombre_proveedor_${item.id_proveedores}`}
                  placeholder="nuevo nombre"
                  defaultValue={item.nombres}
                />
              </div>

              <label className="ml-3 mt-2">Laboratorio:</label>
              <div className="col-12">
                <select
                  className="form-control"
                  id={`id_laboratorio_proveedor${item.id_proveedores}`}
                >
                  {this.props.ProductoReducer.Laboratorio_Name.map((item_L) => (
                    <option
                      value={item_L.id_name_laboratorio}
                      key={item_L.id_name_laboratorio}
                      selected={
                        item_L.id_name_laboratorio == item.id_name_laboratorio
                      }
                    >
                      {item_L.nombre_laboratorio}
                    </option>
                  ))}
                </select>
              </div>

              <label className="ml-3 mt-2">Direccion de Correo:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  id={`correo_proveedor_${item.id_proveedores}`}
                  placeholder="ejemplo@gmail.com"
                  defaultValue={item.correo}
                />
              </div>

              <label className="ml-3 mt-2">Telefono:</label>
              <div className="col-12">
                <input
                  type="number"
                  className="form-control"
                  id={`telefono_proveedor_${item.id_proveedores}`}
                  placeholder="0000000"
                  defaultValue={item.telefono}
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_proveedor(item.id_proveedores)}
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
  editar_proveedor: PropsType.func,
};

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

const mapDistpachToProps = {
  editar_proveedor,
};

export default connect(mapStateToProps, mapDistpachToProps)(EditLaboratio);
