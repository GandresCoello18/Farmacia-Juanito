import React from "react";
import { exist_token } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import Load from "../componentes/preload";
import Confir from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Head from "../componentes/head";
import { Redirect } from "react-router-dom";

import * as clienteActios from "../actions/clienteAction";
import clientesReducer from "../reducers/clientesReducer";

class Clientes extends React.Component {
  state = {
    nombres: "",
    apellidos: "",
    identificacion: 0,
    correo: "",
    direccion: "",
    data_clientes: [],
  };

  componentDidMount() {
    if (this.props.clienteReducer.clientes.length == 0) {
      this.props.traer_clientes();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.clienteReducer.mensaje_cliente != "") {
      alert(`${nextProps.clienteReducer.mensaje_cliente}`);
    }
    if (nextProps.clienteReducer.mensaje_cliente == "Se creo el cliente") {
      this.props.traer_clientes();
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  add_cliente = () => {
    if (
      this.state.nombres == "" ||
      this.state.apellidos == "" ||
      this.state.identificacion == "" ||
      this.state.correo == "" ||
      this.state.direccion == ""
    ) {
    } else {
      this.props.crear_cliente(
        this.state.nombres,
        this.state.apellidos,
        this.state.identificacion,
        this.state.correo,
        this.state.direccion
      );
      document.getElementById("client_form").reset();
    }
  };

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

  load = () => {
    return <Load />;
  };

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
                  <div
                    style={{
                      backgroundColor: "#0866dc",
                      color: "#fff",
                      width: "100%",
                      padding: 5,
                    }}
                  >
                    <strong
                      className="text-center"
                      style={{
                        marginLeft: 30,
                      }}
                    >
                      Nuevo Cliente
                    </strong>
                  </div>

                  <form className="p-2" id="client_form">
                    <label className="mt-0"> Nombres:</label>
                    <input
                      type="text"
                      name="nombres"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="Nombres completos"
                    />

                    <label className="mt-2">Apellidos:</label>
                    <input
                      type="text"
                      name="apellidos"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="Apellidos completos"
                    />

                    <label className="mt-2">Numero de identificacion:</label>
                    <input
                      type="number"
                      name="identificacion"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="0000"
                    />

                    <label className="mt-2">Direccion de correo:</label>
                    <input
                      type="email"
                      name="correo"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="ejemplo@gmail.com"
                    />

                    <label className="mt-2">Direccion:</label>
                    <textarea
                      rows="3"
                      name="direccion"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="......"
                    ></textarea>

                    <button
                      onClick={this.add_cliente}
                      type="button"
                      className="btn btn-primary form-control mt-1"
                    >
                      Guardar
                    </button>
                  </form>
                </div>
                <div className="pane">
                  <div
                    className="row justify-content-start"
                    style={{ marginLeft: 40 }}
                  >
                    <h4 className="p-2 text-left mt-5">Clientes:</h4>
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
                          {this.props.clienteReducer.clientes.length == 0 ? (
                            <tr>
                              <td colSpan="13" className="p-2">
                                {this.load()}
                              </td>
                            </tr>
                          ) : (
                            this.props.clienteReducer.clientes.map((valor) => (
                              <tr key={valor.id_cliente}>
                                <td>{valor.nombres}</td>
                                <td>{valor.apellidos}</td>
                                <td>{valor.identificacion}</td>
                                <td>{valor.correo}</td>
                                <td>{valor.direccion}</td>
                                <td>
                                  <button className="btn btn-mini btn-warning">
                                    Modificar
                                  </button>
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

const mapStateToProps = ({ clienteReducer }) => {
  return { clienteReducer };
};

export default connect(mapStateToProps, clienteActios)(Clientes);
