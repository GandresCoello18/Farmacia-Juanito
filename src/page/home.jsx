import React from "react";
import PropsType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import { Redirect } from "react-router-dom";
import DetalleCard from "../componentes/card-detalles";
import Alerta from "../componentes/alert";
import Load from "../componentes/preload";
import moment from "moment";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import Confirmacion from "../componentes/confirmacion";
import { exist_token } from "../util/verifi-local-token";
import {
  fecha_actual,
  restar_fecha,
  diferencias_de_dias_por_fecha,
} from "../util/fecha";
import { validar_status } from "../util/util-status";
import "../assest/css/home.css";

import { traer_ventas } from "../actions/ventasActios";
import { obtener_producto_completos } from "../actions/productoAction";

class Home extends React.Component {
  state = {
    one_factura: 0,
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
    if (this.props.ProductoReducer.Producto.length == 0) {
      this.props.obtener_producto_completos();
    }
  }

  validar_caducidad = (fecha_caducidad) => {
    let dias = Math.abs(
      diferencias_de_dias_por_fecha(
        fecha_caducidad,
        restar_fecha(fecha_actual(), -30)
      )
    );
    if (dias <= 30) {
      return true;
    }
    return false;
  };

  load = () => <Load />;

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Inicio | Medical" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center">
            <h4 className="p-2 text-left" style={{ fontWeight: "bold" }}>
              Vendidos Recientemente
            </h4>

            <div className="col-12 seccion-table-recien-vendidos">
              <table className="table-striped mt-2 table-vendidos_recientes text-center">
                <thead>
                  <tr>
                    <th>Descripcion</th>
                    <th>Cliente</th>
                    <th>Correo</th>
                    <th>Cedula / Ruc</th>
                    <th>Desc</th>
                    <th>Total</th>
                    <th>Efectivo</th>
                    <th>Cambio</th>
                    <th>Fecha</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ventasReducer.carga_ventas ? (
                    <tr>
                      <td colSpan="10">{this.load()}</td>
                    </tr>
                  ) : this.props.ventasReducer.ventas.length == 0 ? (
                    <tr>
                      <td colSpan="10">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen ventas en esta fecha."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ventasReducer.ventas
                      .filter((item) => item.estado == "Vendido")
                      .reverse()
                      .slice(0, 8)
                      .map((valor) => (
                        <tr key={valor.id_producto_fac}>
                          <td>{valor.descripcion_f}</td>
                          <td>
                            {valor.nombres == "consumidor_final"
                              ? valor.nombres
                              : `${valor.nombres} - ${valor.apellidos}`}
                          </td>
                          <td>{valor.correo}</td>
                          <td>{valor.identificacion}</td>
                          <td>{valor.descuento}</td>
                          <td>{valor.total}</td>
                          <td>{valor.efectivo}</td>
                          <td>{valor.cambio}</td>
                          <td>
                            {moment(valor.fecha_factura).format("LL, LTS")}
                          </td>
                          <td>
                            <Confirmacion
                              id={valor.id_factura}
                              tabla="factura"
                            />
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
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <h4 style={{ fontWeight: "bold" }}>Productos por caducar</h4>
            <div className="col-12 seccion-table-por-caducar">
              <table
                className="table-striped mt-2 table-caducar text-center"
                style={{ marginBottom: 40 }}
              >
                <thead>
                  <tr>
                    <th>Activo</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Cantidad</th>
                    <th>Present</th>
                    <th>Medidas</th>
                    <th># Lote</th>
                    <th>Reg - Sanitario</th>
                    <th>PVP</th>
                    <th>PVF</th>
                    <th>Elaboracion</th>
                    <th>Caducidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.Producto.cargando ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Producto.filter((item) =>
                      this.validar_caducidad(item.fecha_caducidad)
                    ).length == 0 ? (
                    <tr>
                      <td colSpan="13">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos en peligro a caducar."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.filter((item) =>
                      this.validar_caducidad(item.fecha_caducidad)
                    ).map((valor) => (
                      <tr
                        key={valor.id_producto}
                        className={validar_status(valor.estado)}
                      >
                        <td>{valor.principio_activo}</td>
                        <td>{valor.product_name}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>{valor.cantidad}</td>
                        <td>{valor.presentacion}</td>
                        <td>
                          {valor.medida} {valor.tipo_medida}
                        </td>
                        <td>{valor.lote}</td>
                        <td>{valor.registro_sanitario}</td>
                        <td>{valor.pvp}</td>
                        <td>{valor.pvf}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <Confirmacion
                            id={valor.id_producto}
                            tabla="productos"
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

Home.prototypes = {
  ventasReducer: PropsType.object,
  ProductoReducer: PropsType.object,
  traer_ventas: PropsType.func,
  obtener_producto_completos: PropsType.func,
};

const mapStateToProps = ({ ventasReducer, ProductoReducer }) => {
  return { ventasReducer, ProductoReducer };
};

const mapDispatchToProps = {
  obtener_producto_completos,
  traer_ventas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
