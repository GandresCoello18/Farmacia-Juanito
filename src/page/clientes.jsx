import React from "react";
import PropsType from "prop-types";
import { exist_token } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Cookie from "js-cookie";
import Alerta from "../componentes/alert";
import { connect } from "react-redux";
import Load from "../componentes/preload";
import Confir from "../componentes/confirmacion";
import Edit from "../componentes/edit";
import Footer from "../componentes/footer";
import Head from "../componentes/head";
import FormCreateClient from "../componentes/form-create-cliente";
import { Redirect } from "react-router-dom";

import { traer_clientes, busqueda_en_clientes } from "../actions/clienteAction";

class Clientes extends React.Component {
  componentDidMount() {
    if (this.props.clienteReducer.clientes.length == 0) {
      this.props.traer_clientes();
    }
  }

  search_client = (e) => {
    const respaldo = this.props.clienteReducer.clientes;
    let nuevo = [];

    if (e.target.value == "") {
      this.props.busqueda_en_clientes(
        this.props.clienteReducer.busqueda_cliente
      );
    } else {
      for (let i = 0; i < respaldo.length; i++) {
        if (
          respaldo[i].nombres.indexOf(e.target.value) != -1 ||
          respaldo[i].apellidos.indexOf(e.target.value) != -1 ||
          respaldo[i].correo.indexOf(e.target.value) != -1
          // respaldo[i].identificacion.indexOf(e.target.value) != -1
        ) {
          nuevo.push(respaldo[i]);
        }
      }
      this.props.busqueda_en_clientes(nuevo);
    }
  };

  load = () => <Load />;

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Clientes | Medical" />

        <section className="container-fluid p-3">
          <div className="window">
            <Nav />
            <div className="window-content">
              <div className="pane-group">
                <div className="pane-sm sidebar" style={{ width: 400 }}>
                  <FormCreateClient />
                </div>
                <div className="pane">
                  <div
                    className="row justify-content-start"
                    style={{ marginLeft: 40 }}
                  >
                    <h4
                      className="p-2 text-left mt-5"
                      style={{ fontWeight: "bold" }}
                    >
                      Clientes:
                    </h4>
                    <div className="col-5">
                      <input
                        type="text"
                        onChange={this.search_client}
                        className="form-control input-buscar mt-5"
                        placeholder="Buscar cliente por: ----- Nombre ----- Cedula / Ruc ------"
                      />
                    </div>
                    <div className="col-8">
                      <table className="table-striped mt-2 table-vendidos_recientes text-center">
                        <thead>
                          <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Cedula / Ruc</th>
                            <th>Correo electronico</th>
                            <th>Direccion</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.clienteReducer.cargar_cliente ? (
                            <tr>
                              <td colSpan="6" className="p-2">
                                {this.load()}
                              </td>
                            </tr>
                          ) : this.props.clienteReducer.clientes.length == 0 ? (
                            <tr>
                              <td colSpan="6">
                                <Alerta
                                  titulo="No existen datos para mostrar"
                                  contenido="Por el momento no existen clientes."
                                />
                              </td>
                            </tr>
                          ) : (
                            this.props.clienteReducer.clientes.map((valor) => (
                              <tr key={valor.id_cliente}>
                                <td>{valor.nombres}</td>
                                <td>{valor.apellidos}</td>
                                <td>{valor.identificacion}</td>
                                <td
                                  className={
                                    valor.correo == "" ||
                                    valor.correo == "no especificado"
                                      ? "alert-danger"
                                      : ""
                                  }
                                >
                                  {valor.correo == ""
                                    ? "no especificado"
                                    : valor.correo}
                                </td>
                                <td style={{ width: 100 }}>
                                  {valor.direccion}
                                </td>
                                <td>
                                  <Edit form="cliente" data={valor} />
                                  <Confir
                                    id={valor.id_cliente}
                                    tabla="cliente"
                                  />
                                  <button className="btn btn-mini btn-primary">
                                    Detalles
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

Clientes.prototypes = {
  clienteReducer: PropsType.object,
  traer_clientes: PropsType.func,
  busqueda_en_clientes: PropsType.func,
};

const mapStateToProps = ({ clienteReducer }) => {
  return { clienteReducer };
};

const mapDispchToProps = {
  traer_clientes,
  busqueda_en_clientes,
};

export default connect(mapStateToProps, mapDispchToProps)(Clientes);
