import React from "react";
import { connect } from "react-redux";
import PropsType from "prop-types";
import { fecha_actual } from "../util/fecha";

import { add_new_product_proveedor } from "../actions/proveedorAction";

class NewProductProveedor extends React.Component {
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
      height: 400,
      border: 3,
      borderStyle: "solid",
      borderColor: "#212529",
      color: "#000",
    },
  };

  create_new_product = (id_proveedor) => {
    let descripcion = document.getElementById(`descripcion_${id_proveedor}`)
      .value;
    let fecha_pago = document.getElementById(`fecha_pago_${id_proveedor}`)
      .value;
    let total = document.getElementById(`pago_${id_proveedor}`).value;
    let valor_a_cancelar = document.getElementById(
      `pago_a_cancelar_${id_proveedor}`
    ).value;

    if (
      descripcion == "" ||
      fecha_pago == "" ||
      total == "" ||
      valor_a_cancelar == ""
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

        this.props.add_new_product_proveedor(
          descripcion,
          fecha_pago,
          total,
          id_proveedor,
          estado_pp,
          valor_a_cancelar
        );

        document.getElementById("form_new_pp").reset();
      }
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
            <x-label>New Product</x-label>
            <dialog style={this.styles.dialogo}>
              <form id="form_new_pp">
                <label className="mt-2">Descripcion:</label>
                <br />
                <textarea
                  rows="3"
                  className="form-control"
                  id={`descripcion_${this.props.id}`}
                  placeholder="Especificaciones del producto recibo"
                ></textarea>
                <br />

                <label className="mt-2">Fecha pago:</label>
                <br />
                <input
                  type="date"
                  min={fecha_actual()}
                  id={`fecha_pago_${this.props.id}`}
                  className="form-control"
                />
                <br />

                <label className="mt-2">Total de Pago:</label>
                <br />
                <input
                  type="number"
                  className="form-control"
                  id={`pago_${this.props.id}`}
                  placeholder="Valor a cancelar: $ 100"
                />
                <br />

                <label className="mt-2">Pago a cancelar:</label>
                <br />
                <input
                  type="number"
                  className="form-control"
                  id={`pago_a_cancelar_${this.props.id}`}
                  placeholder="Valor cancelado: $ 00"
                />
                <br />

                <button
                  type="button"
                  onClick={() => this.create_new_product(this.props.id)}
                  className="btn btn-mini btn-positive form-control mt-2"
                >
                  Gardar
                </button>
              </form>
            </dialog>
          </x-button>
        </button>
      </>
    );
  }
}

NewProductProveedor.prototypes = {
  id: PropsType.string,
  add_new_product_proveedor: PropsType.func,
};

const mapDispatchToProps = {
  add_new_product_proveedor,
};

export default connect(null, mapDispatchToProps)(NewProductProveedor);
