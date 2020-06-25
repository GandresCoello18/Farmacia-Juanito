import React from "react";
import PropsType from "prop-types";
import { exist_token } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Cookie from "js-cookie";
import Alerta from "../componentes/alert";
import { connect } from "react-redux";
import Load from "../componentes/preload";
import Confir from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Head from "../componentes/head";
import { Redirect } from "react-router-dom";
import {
  TRAER_NAME_LABORATORIO,
  TRAER_NAME_PRODUCTO,
  TRAER_PRINCIPIO_ACTIVO,
} from "../types/ProductoTypes";

class DetallesProduct extends React.Component {
  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Detalles de productos | Medical" />
        <Nav />

        <section className="container p-3">
          <div className="row justify-content-center">
            <div className="col-12" style={{ marginBottom: 10 }}>
              <h4 className="text-center" style={{ fontWeight: "bold" }}>
                Detalles de ( Productos, Principio Activo, Laboratorio )
              </h4>
            </div>
            <div className="col-4">
              <table className="table-striped text-center">
                <thead>
                  <tr>
                    <th>Active Principle</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>photon.css</td>
                    <td>
                      <button class="btn btn-mini btn-warning">Warning</button>
                    </td>
                    <td>
                      <button class="btn btn-mini btn-negative">
                        Negative
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <table className="table-striped text-center">
                <thead>
                  <tr>
                    <th>Name Product</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>photon.css</td>
                    <td>
                      <button class="btn btn-mini btn-warning">Warning</button>
                    </td>
                    <td>
                      <button class="btn btn-mini btn-negative">
                        Negative
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <table className="table-striped text-center">
                <thead>
                  <tr>
                    <th>Laboratory</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>photon.css</td>
                    <td>
                      <button class="btn btn-mini btn-warning">Warning</button>
                    </td>
                    <td>
                      <button class="btn btn-mini btn-negative">
                        Negative
                      </button>
                    </td>
                  </tr>
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

export default connect(null, null)(DetallesProduct);
