import React from "react";
import PropsType from "prop-types";
import { exist_token } from "../util/verifi-local-token";
import Head from "../componentes/head";
import Load from "../componentes/preload";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import moment from "moment";
import Alerta from "../componentes/alert";
import DetalleCard from "../componentes/card-detalles";
import Confirmacion from "../componentes/confirmacion";
import EstadisticasPorDia from "../componentes/grafico-estadistico-ventas-por-dia";
import Nav from "../componentes/nav";
import { fecha_actual } from "../util/fecha";
import { Redirect } from "react-router-dom";
import Footer from "../componentes/footer";

import { traer_ventas, traer_por_fecha } from "../actions/ventasActios";

class Ventas extends React.Component {
  state = {
    fecha_select: "",
  };

  styles = {
    dialogo: {
      width: 300,
      height: "100%",
      left: 0,
      right: "auto",
      overflowY: "scroll",
    },
    btn_azul: {
      borderColor: "#388df8",
      borderBottomColor: "#0866dc",
      backgroundColor: "#6eb4f7",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      color: "#fff",
    },
  };

  componentDidMount() {
    if (this.props.ventasReducer.ventas.length == 0) {
      this.props.traer_ventas();
    }

    this.metodo_buscar_venta(fecha_actual());
  }

  metodo_buscar_venta = (fecha) => {
    let datosVentas = this.props.ventasReducer.ventas;
    let nuevo = [];

    for (let i = 0; i < datosVentas.length; i++) {
      if (datosVentas[i].fecha_factura.indexOf(fecha) != -1) {
        nuevo.push(datosVentas[i]);
      }
    }
    this.props.traer_por_fecha(nuevo);
  };

  search_for_date = (e) => {
    this.metodo_buscar_venta(e.target.value);
    this.setState({ fecha_select: e.target.value });
  };

  load = () => <Load />;

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Ventas" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-6">
              <EstadisticasPorDia />
            </div>
            <div className="col-3 mt-5">
              <label>
                <b>Buscar ventas por fecha:</b>
              </label>
              <input
                type="date"
                max={fecha_actual()}
                className="form-control mt-2"
                onChange={this.search_for_date}
              />
              <br />
              <h4 className="p-2 text-left">
                Ventas:{" "}
                <b>
                  {moment(
                    `${
                      this.state.fecha_select == ""
                        ? new Date()
                        : this.state.fecha_select
                    }`
                  ).format("LL")}
                </b>
              </h4>
            </div>

            <div className="col-10 seccion-table-productos_all mt-5">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Fecha</th>
                    <th>Laboratorio</th>
                    <th>Activo</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Total</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ventasReducer.carga_ventas ? (
                    <tr>
                      <td colSpan="8">{this.load()}</td>
                    </tr>
                  ) : this.props.ventasReducer.ventas_por_fecha.length == 0 ? (
                    <tr>
                      <td colSpan="8">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen ventas en esta fecha."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ventasReducer.ventas_por_fecha
                      .filter((item) => item.estado == "Vendido")
                      .map((valor) => (
                        <tr key={valor.id_producto_fac}>
                          <td>{valor.product_name}</td>
                          <td>
                            {moment(valor.fecha_factura).format("LL, LTS")}
                          </td>
                          <td>{valor.nombre_laboratorio}</td>
                          <td>{valor.principio_activo}</td>
                          <td>
                            {valor.nombres == "consumidor_final"
                              ? valor.nombres
                              : `${valor.nombres} - ${valor.apellidos}`}
                          </td>
                          <td>{valor.correo}</td>
                          <td>{valor.total}</td>
                          <td>
                            <button
                              className="btn btn-mini"
                              style={{ backgroundColor: "trasparent" }}
                            >
                              <x-button style={this.styles.btn_azul}>
                                <x-label>Detalles</x-label>
                                <dialog style={this.styles.dialogo}>
                                  <DetalleCard
                                    id_factura={valor.id_factura}
                                    data={this.props.ventasReducer.ventas}
                                  />
                                </dialog>
                              </x-button>
                            </button>
                            <Confirmacion
                              id={valor.id_factura}
                              tabla="factura"
                            />
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

Ventas.prototypes = {
  ventasReducer: PropsType.object,
  traer_ventas: PropsType.func,
  traer_por_fecha: PropsType.func,
};

const mapStateToProps = ({ ventasReducer }) => {
  return { ventasReducer };
};

const mapDispatchToProps = {
  traer_ventas,
  traer_por_fecha,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ventas);
