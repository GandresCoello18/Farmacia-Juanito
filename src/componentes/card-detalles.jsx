import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import "../assest/css/detalle-card.css";
import { eliminar_venta } from "../actions/ventasActios";

class DetallesCard extends React.Component {
  state = {
    fecha_venta: "",
  };

  componentDidMount() {
    this.setState({
      fecha_venta: this.props.data[0].fecha_factura,
    });
  }

  eliminar_esta_venta = (id_producto_fac) => {
    this.props.eliminar_venta(id_producto_fac);
  };

  render() {
    return (
      <>
        <h5 className="card-title-detalles text-center">Detalles</h5>
        {this.props.data.map(
          (item) =>
            item.id_factura == this.props.id_factura && (
              <div className="row detalles-compra" key={item.id_producto_fac}>
                <div className="col-12">
                  <div className="card-body">
                    <ul>
                      <li>
                        <b>Cliente:</b>{" "}
                        {item.nombres == "consumidor_final"
                          ? item.nombres
                          : `${item.nombres} - ${item.apellidos}`}
                      </li>
                      <li>
                        <b>Principio Activo:</b> {item.principio_activo}
                      </li>
                      <li>
                        <b>Producto:</b> {item.product_name}
                      </li>
                      <li>
                        <b>Laboratorio:</b> {item.nombre_laboratorio}
                      </li>
                      <li>
                        <b>Presentacion:</b> {item.presentacion}
                      </li>
                      <li>
                        <b>Medidas:</b> {item.medida} {item.tipo_medida}
                      </li>
                      <li>
                        <b>Cant Disponible:</b> {item.cantidad}
                      </li>
                      <li>
                        <b>Formato:</b> {item.formato}
                      </li>
                      <li>
                        <div className="row justify-content-center">
                          <div className="col-5">
                            <b>Unidades:</b> {item.fact_cant}
                          </div>
                          <div className="col-5">
                            <b>Iva:</b> {item.iva_product_fact} %
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row justify-content-center">
                          <div className="col-5">
                            <b>PVP:</b>$ {item.pvp}
                          </div>
                          <div className="col-5">
                            <b>Total:</b>$ {item.item_total}
                          </div>
                        </div>
                      </li>
                    </ul>
                    <br />
                    <div className="row">
                      <div className="col">
                        <span
                          className="eliminar-venta"
                          onClick={() =>
                            this.eliminar_esta_venta(item.id_producto_fac)
                          }
                        >
                          Eliminar venta
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
        <span className="fecha-vendido">
          Vendido en: <b>{moment(this.state.fecha_venta).format("LL, LTS")}</b>
        </span>
      </>
    );
  }
}

DetallesCard.prototypes = {
  data: PropType.array,
  id_factura: PropType.string,
  eliminar_venta: PropType.func,
};

const mapDispatchToProps = {
  eliminar_venta,
};

export default connect(null, mapDispatchToProps)(DetallesCard);
