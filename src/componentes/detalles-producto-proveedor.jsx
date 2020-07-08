import React from "react";
import PropsType from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import "../assest/css/detalle-product-proveedor.css";

import {
  eliminar_producto_proveedor,
  pago_producto_proveedor,
} from "../actions/proveedorAction";

class DetallesPP extends React.Component {
  state = {
    data_detalles_pp: [],
  };

  componentDidMount() {
    let result = [];
    const data_pp = this.props.ProveedoresReducer.Producto_proveedor;
    for (let i = 0; i < data_pp.length; i++) {
      if (data_pp[i].id_proveedor == this.props.id_proveedor) {
        result.push(data_pp[i]);
      }
    }
    this.setState({
      data_detalles_pp: result,
    });
  }

  remover_pp = (id_pp, e) => {
    e.target.parentElement.parentElement.style.display = "none";
    this.props.eliminar_producto_proveedor(id_pp);
  };

  pagar_product = (id_pp, e) => {
    let element_total =
      e.target.parentElement.parentElement.children[1].children[3];
    element_total.classList.remove();
    element_total.classList.add("badge", "badge-success");
    element_total.innerHTML = `
        <b>Estado: </b> Pagado
        `;
    this.props.pago_producto_proveedor(id_pp);
  };

  render() {
    return (
      <>
        {this.state.data_detalles_pp.map((item) => (
          <div
            className="card-detalles-pp mb-3"
            key={item.id_product_proveedor}
          >
            <div className="card-detalles-pp-header">
              {moment(item.fecha_ingreso).format("LL, LTS")}
            </div>
            <div className="card-detalles-pp-body">
              <b className="text-center">{item.nombre_laboratorio}</b>
              <p className="card-text">
                <b>Texto: </b>
                {item.descripcion}
              </p>
              <p>
                <b>Total: </b>$ {item.total}
              </p>
              <p
                className={
                  item.estado_pp == "Pagado"
                    ? "badge badge-success"
                    : "badge alert-warning"
                }
              >
                <b>Estado: </b>
                {item.estado_pp}
              </p>
            </div>
            <div className="card-detalles-pp-footer">
              <b>Fecha pago: </b>
              {moment(item.fecha_pago).format("LL")}
            </div>
            <div className="card-detalles-pp-footer">
              <button
                className="btn btn-mini btn-positive p-1 ml-1 mr-1"
                onClick={(e) =>
                  this.pagar_product(item.id_product_proveedor, e)
                }
                disabled={item.estado_pp == "Pagado"}
              >
                Pagado
              </button>
              <button className="btn btn-mini btn-warning p-1 ml-1 mr-1">
                Editar
              </button>
              <button
                className="btn btn-mini btn-negative p-1 ml-1 mr-1"
                onClick={(e) => this.remover_pp(item.id_product_proveedor, e)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
}

DetallesPP.prototypes = {
  eliminar_producto_proveedor: PropsType.func,
  pago_producto_proveedor: PropsType.func,
};

const mapStateToProps = ({ ProveedoresReducer }) => {
  return { ProveedoresReducer };
};

const mapDispachToProps = {
  eliminar_producto_proveedor,
  pago_producto_proveedor,
};

export default connect(mapStateToProps, mapDispachToProps)(DetallesPP);
