import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { fecha_actual } from "../../util/fecha";
import { editar_producto_proveedor } from "../../actions/proveedorAction";

class EditCliente extends React.Component {
  state = {
    actualizado: false,
  };

  update_pp = (id_product_proveedor) => {
    let descripcion = document.getElementById(
      `descripcion_${id_product_proveedor}`
    ).value;
    let fecha_pago = document.getElementById(
      `fecha_pago_${id_product_proveedor}`
    ).value;
    let total = document.getElementById(`total_a_pagar_${id_product_proveedor}`)
      .value;
    let valor_a_cancelar = document.getElementById(
      `valor_a_cancelar_${id_product_proveedor}`
    ).value;

    if (
      (descripcion == "", fecha_pago == "", total == "", valor_a_cancelar == "")
    ) {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      let estado_pp = "";

      if (Number(valor_a_cancelar) > Number(total)) {
        alert("El valor a cancelar no puede ser mayor del total");
      } else {
        if (Number(valor_a_cancelar) == Number(total)) {
          estado_pp = "Pagado";
        } else if (Number(valor_a_cancelar) == 0) {
          estado_pp = "Ingresado";
        } else if (Number(valor_a_cancelar) < Number(total)) {
          estado_pp = "Saldo pendiente";
        } else {
          estado_pp = "No especificado";
        }

        this.props.editar_producto_proveedor(
          id_product_proveedor,
          descripcion,
          fecha_pago,
          total,
          estado_pp,
          valor_a_cancelar
        );
      }
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
          <form className="p-2" key={item.id_product_proveedor}>
            <h4
              style={{
                fontWeight: "bold",
                padding: 4,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Edit Product Proveedor
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Descripcion:</label>
              <div className="col-12">
                <textarea
                  className="form-control"
                  id={`descripcion_${item.id_product_proveedor}`}
                  defaultValue={item.descripcion}
                  placeholder="Descripcion......"
                ></textarea>
              </div>

              <label className="ml-3 mt-2">Fecha Pago:</label>
              <div className="col-12">
                <input
                  type="date"
                  className="form-control"
                  id={`fecha_pago_${item.id_product_proveedor}`}
                  defaultValue={item.fecha_pago}
                  min={fecha_actual()}
                />
              </div>

              <label className="ml-3 mt-2">Total a pagar:</label>
              <div className="col-12">
                <input
                  type="number"
                  min="0"
                  id={`total_a_pagar_${item.id_product_proveedor}`}
                  className="form-control"
                  defaultValue={item.total}
                />
              </div>

              <label className="ml-3 mt-2">Valor a cancelar:</label>
              <div className="col-12">
                <input
                  type="number"
                  min="0"
                  id={`valor_a_cancelar_${item.id_product_proveedor}`}
                  className="form-control"
                  defaultValue={item.abonado}
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_pp(item.id_product_proveedor)}
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
  editar_producto_proveedor: PropType.func,
};

const mapDistpachToProps = {
  editar_producto_proveedor,
};

export default connect(null, mapDistpachToProps)(EditCliente);
