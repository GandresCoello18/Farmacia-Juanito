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
    setTimeout(() => {
      this.setState({
        data_clientes: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
          { id: "6" },
          { id: "7" },
          { id: "8" },
          { id: "9" },
          { id: "10" },
          { id: "11" },
          { id: "12" },
          { id: "13" },
          { id: "14" },
          { id: "15" },
        ],
      });
    }, 4000);
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
      alert("Campos vacios, revise y vuelva ha intentarlo");
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
        <Nav />

        <section className="container-fluid p-3">
          <div className="window">
            <div className="window-content">
              <div className="pane-group">
                <div className="pane-sm sidebar" style={{ width: 400 }}>
                  <h4 className="mt-3 p-2 text-center">Registrar</h4>

                  <form className="p-2" id="client_form">
                    <label className="mt-2"> Nombres:</label>
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
                      className="btn btn-primary form-control mt-4"
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
                              <tr key={valor}>
                                <td>Andres Roberto</td>
                                <td>coello Goyes</td>
                                <td>1207345768</td>
                                <td>goyeselcoca@gmail.com</td>
                                <td>San juan ( KLM 1 ) via a vinces</td>
                                <td>
                                  <button className="btn btn-mini btn-warning">
                                    Modificar
                                  </button>
                                  <Confir />
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
