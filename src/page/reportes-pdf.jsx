import React from "react";
import PropsType from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Alerta from "../componentes/alert";
import Load from "../componentes/preload";
import { validar_status } from "../util/util-status";

import { obtener_producto_completos } from "../actions/productoAction";

class ReportePdf extends React.Component {
  style = {
    table_reporte: {
      border: 1,
      borderStyle: "solid",
      borderColor: "#000",
    },
  };

  componentDidMount() {
    if (this.props.ProductoReducer.Producto.length == 0) {
      this.props.obtener_producto_completos();
    }
  }

  load = () => <Load />;

  render() {
    return (
      <>
        <section className="container-fluid">
          <div className="row">
            <div className="col-6">
              <button onClick={() => window.print()}>Descargar reporte</button>
            </div>
            <div className="col-6">
              <Link to="/stock">
                <button>Volver</button>
              </Link>
            </div>
            <div className="col-12 seccion-table-productos_all mt-4 mb-5">
              <table className="mt-1 text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Princ-Activo</th>
                    <th>Laboratorio</th>
                    <th>Cant</th>
                    <th>Present</th>
                    <th>Medidas</th>
                    <th># Lote</th>
                    <th>Reg - Sanitario</th>
                    <th>PVF</th>
                    <th>PVP</th>
                    <th>Elaboracion</th>
                    <th>Caducidad</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.Producto.cargando ? (
                    <tr>
                      <td colSpan="14" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Producto.length == 0 ? (
                    <tr>
                      <td colSpan="14">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.sort((a, b) => {
                      if (a.product_name > b.product_name) {
                        return 1;
                      }
                      if (a.product_name < b.product_name) {
                        return -1;
                      }
                      return 0;
                    }).map((valor) => (
                      <tr
                        key={valor.id_producto}
                        className={validar_status(valor.estado)}
                      >
                        <td style={this.style.table_reporte}>
                          {valor.product_name}
                        </td>
                        <td style={this.style.table_reporte}>
                          {valor.principio_activo}
                        </td>
                        <td style={this.style.table_reporte}>
                          {valor.nombre_laboratorio}
                        </td>
                        <td style={this.style.table_reporte}>
                          {valor.cantidad} / {valor.cantidad_disponible}
                        </td>
                        <td style={this.style.table_reporte}>
                          {valor.presentacion}
                        </td>
                        <td style={this.style.table_reporte}>
                          {valor.medida} {valor.tipo_medida}
                        </td>
                        <td style={this.style.table_reporte}>{valor.lote}</td>
                        <td style={this.style.table_reporte}>
                          {valor.registro_sanitario}
                        </td>
                        <td style={this.style.table_reporte}>{valor.pvf}</td>
                        <td style={this.style.table_reporte}>{valor.pvp}</td>
                        <td style={this.style.table_reporte}>
                          {valor.fecha_elaboracion}
                        </td>
                        <td style={this.style.table_reporte}>
                          {valor.fecha_caducidad}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  }
}

ReportePdf.prototypes = {
  ProductoReducer: PropsType.object,
  obtener_producto_completos: PropsType.func,
};

const mapDisPachTopros = {
  obtener_producto_completos,
};

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

export default connect(mapStateToProps, mapDisPachTopros)(ReportePdf);
