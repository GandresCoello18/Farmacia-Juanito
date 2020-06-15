import React from "react";
import { exist_token } from "../util/verifi-local-token";
import Head from "../componentes/head";
import Load from "../componentes/preload";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import moment from "moment";
import Nav from "../componentes/nav";
import { Redirect } from "react-router-dom";
import Footer from "../componentes/footer";

import { traer_ventas } from "../actions/ventasActios";

class Ventas extends React.Component {
  state = {
    data_ventas: [],
  };

  componentDidMount() {
    if (this.props.ventasReducer.ventas.length == 0) {
      this.props.traer_ventas();
    }
  }

  load = () => {
    return <Load />;
  };

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
            <div className="col-3">
              <label>
                <b>Buscar ventas por fecha:</b>
              </label>
              <input type="date" className="form-control mt-2" />
            </div>

            <div className="col-3">
              <h4 className="p-2 text-left">
                Ventas: <b>{moment(`${new Date()}`).format("LL")}</b>
              </h4>
            </div>

            <div className="col-10 seccion-table-productos_all">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Descripcion</th>
                    <th>Fecha</th>
                    <th>Desc</th>
                    <th>Iva</th>
                    <th>Total</th>
                    <th>Correo</th>
                    <th>Ruc / Ced</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ventasReducer.ventas.length == 0 ? (
                    <tr>
                      <td colSpan="8">{this.load()}</td>
                    </tr>
                  ) : (
                    this.props.ventasReducer.ventas.map((valor) => (
                      <tr key={valor.id_factura}>
                        <td>{valor.descripcion_f}</td>
                        <td>{moment(valor.fecha_factura).format("LL, LTS")}</td>
                        <td>{valor.descuento}</td>
                        <td>{valor.iva}</td>
                        <td>{valor.total}</td>
                        <td>{valor.correo}</td>
                        <td>{valor.identificacion}</td>
                        <td>
                          <button className="btn btn-mini btn-primary">
                            Detallles
                          </button>
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

const mapStateToProps = ({ ventasReducer }) => {
  return { ventasReducer };
};

const mapDispatchToProps = {
  traer_ventas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ventas);
