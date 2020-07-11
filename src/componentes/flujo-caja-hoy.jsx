import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";

import {
  traer_prestamos_hoy,
  traer_monto_total_por_fecha_prestamo,
} from "../actions/prestamoAction";
import { traer_monto_total_por_fecha_pp } from "../actions/proveedorAction";
import { traer_monto_por_fecha } from "../actions/ventasActios";

class FlujoCajaHoy extends React.Component {
  componentDidMount() {
    if (this.props.PrestamoReducer.Prestamo_por_fecha.length == 0) {
      this.props.traer_prestamos_hoy(this.props.fecha);
    }
    console.log(this.props.fecha);
    this.props.traer_monto_por_fecha(this.props.fecha);
    this.props.traer_monto_total_por_fecha_pp(this.props.fecha);
    this.props.traer_monto_total_por_fecha_prestamo(this.props.fecha);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.fecha != this.props.fecha) {
      console.log(nextProps.fecha);
      this.props.traer_monto_por_fecha(nextProps.fecha);
      this.props.traer_monto_total_por_fecha_pp(nextProps.fecha);
      this.props.traer_monto_total_por_fecha_prestamo(nextProps.fecha);
    }
  }

  render() {
    return (
      <>
        <div className="row justify-content-center">
          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              INGRESOS
            </h4>

            <table
              className="table-striped text-center mt-5"
              style={{ fontSize: 20 }}
            >
              <thead>
                <tr>
                  <th>Vendidos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="badge-success">
                    # {this.props.ventasReducer.cantidad_ventas_por_fecha}
                  </td>
                  <td className="badge-success">
                    $ {this.props.ventasReducer.monto_total_por_fecha}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              EGRESOS
            </h4>

            <table
              className="table-striped text-center mt-5"
              style={{ fontSize: 20 }}
            >
              <thead>
                <tr>
                  <th>Egresos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="badge-warning">
                    #{" "}
                    {this.props.ProveedoresReducer.count_total_por_fecha_app +
                      this.props.PrestamoReducer.count_total_por_fecha_prestamo}
                  </td>
                  <td className="badge-warning">
                    ${" "}
                    {this.props.ProveedoresReducer.monto_total_por_fecha_pp +
                      this.props.PrestamoReducer.monto_total_por_fecha_prestamo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              SALDOS
            </h4>

            <table
              className="table-striped text-center mt-5"
              style={{ fontSize: 20 }}
            >
              <thead>
                <tr>
                  <th>Saldo Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="badge-info">
                    {this.props.ventasReducer.monto_total_por_fecha -
                      (this.props.ProveedoresReducer.monto_total_por_fecha_pp +
                        this.props.PrestamoReducer
                          .monto_total_por_fecha_prestamo)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProsp = ({
  PrestamoReducer,
  ventasReducer,
  ProveedoresReducer,
}) => {
  return { PrestamoReducer, ventasReducer, ProveedoresReducer };
};

FlujoCajaHoy.prototypes = {
  ventasReducer: PropType.object,
  PrestamoReducer: PropType.object,
  traer_prestamos_hoy: PropType.func,
  traer_monto_por_fecha: PropType.func,
  traer_monto_total_por_fecha_prestamo: PropType.func,
  traer_monto_total_por_fecha_pp: PropType.func,
};

const mapDisPachToProsp = {
  traer_prestamos_hoy,
  traer_monto_por_fecha,
  traer_monto_total_por_fecha_prestamo,
  traer_monto_total_por_fecha_pp,
};

export default connect(mapStateToProsp, mapDisPachToProsp)(FlujoCajaHoy);
