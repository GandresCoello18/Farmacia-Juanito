import React from "react";
import PropsType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import { Redirect } from "react-router-dom";
import Alerta from "../componentes/alert";
import Load from "../componentes/preload";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import Edit from "../componentes/edit";
import Confirmacion from "../componentes/confirmacion";
import { exist_token } from "../util/verifi-local-token";

import { crear_proveedor, traer_proveedores } from "../actions/proveedorAction";
import { obterner_name_laboratorio } from "../actions/productoAction";

class Proveedores extends React.Component {
  state = {
    nombres: "",
    laboratorio: 0,
    correo: "",
    telefono: 0,
    /////////
    notifico: false,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    if (this.props.Proveedores.Proveedores.length == 0) {
      this.props.traer_proveedores();
    }
    if (this.props.ProductoReducer.Laboratorio_Name.length == 0) {
      this.props.obterner_name_laboratorio();
    }
  }

  add_proveedor = () => {
    if (
      this.state.nombres == "" ||
      this.state.laboratorio == "-----" ||
      this.state.correo == "" ||
      this.state.telefono == ""
    ) {
      alert("Campos vacios, revise y vuelva ha intentar");
    } else {
      this.props.crear_proveedor(
        this.state.nombres,
        this.state.laboratorio,
        this.state.correo,
        this.state.telefono
      );
    }
  };

  load = () => <Load />;

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Proveedores | Medical" />
        <section className="container-fluid p-3">
          <div className="window">
            <Nav />
            <div className="window-content">
              <div className="pane-group">
                <div className="pane-sm sidebar" style={{ width: 400 }}>
                  <div
                    style={{
                      backgroundColor: "#ffc107",
                      color: "#000",
                      width: "100%",
                      padding: 5,
                    }}
                  >
                    <strong
                      className="text-center"
                      style={{
                        marginLeft: 35,
                      }}
                    >
                      Nuevo Proveedor
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

                    <label className="mt-2">Laboratorios:</label>
                    <select
                      className="form-control"
                      name="laboratorio"
                      onChange={this.handleInputChange}
                    >
                      <option>-----</option>
                      {this.props.ProductoReducer.Laboratorio_Name.map(
                        (item) => (
                          <option
                            key={item.id_name_laboratorio}
                            value={item.id_name_laboratorio}
                          >
                            {item.nombre_laboratorio}
                          </option>
                        )
                      )}
                    </select>

                    <label className="mt-2">Direccion de correo:</label>
                    <input
                      type="email"
                      name="correo"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="ejemplo@gmail.com"
                    />

                    <label className="mt-2">Telefono:</label>
                    <input
                      type="number"
                      name="telefono"
                      placeholder="0000000"
                      className="form-control"
                      onChange={this.handleInputChange}
                    />

                    <button
                      onClick={this.add_proveedor}
                      type="button"
                      className="btn btn-warning form-control mt-3"
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
                    <h4
                      className="p-2 text-left mt-5"
                      style={{ fontWeight: "bold" }}
                    >
                      Proveedores:
                    </h4>
                    <div className="col-5">
                      <input
                        type="text"
                        onChange={this.search_client}
                        className="form-control input-buscar mt-5"
                        placeholder="Buscar Proveedor por: ----- Nombre ----- Correo ------"
                      />
                    </div>
                    <div className="col-8">
                      <table className="table-striped mt-2 table-vendidos_recientes text-center">
                        <thead>
                          <tr>
                            <th>Nombres</th>
                            <th>Laboratorio</th>
                            <th>Correo electronico</th>
                            <th>Telefono</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.Proveedores.cargar_proveedor ? (
                            <tr>
                              <td colSpan="5" className="p-2">
                                {this.load()}
                              </td>
                            </tr>
                          ) : this.props.Proveedores.Proveedores.length == 0 ? (
                            <tr>
                              <td colSpan="5">
                                <Alerta
                                  titulo="No existen datos para mostrar"
                                  contenido="Por el momento no existen proveedores para mostrar."
                                />
                              </td>
                            </tr>
                          ) : (
                            this.props.Proveedores.Proveedores.map((valor) => (
                              <tr key={valor.id_proveedores}>
                                <td>{valor.nombres}</td>
                                <td>{valor.nombre_laboratorio}</td>
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
                                <td style={{ width: 100 }}>{valor.telefono}</td>
                                <td>
                                  <button className="btn btn-mini btn-positive">
                                    New Product
                                  </button>
                                  <button className="btn btn-mini btn-primary">
                                    Detalles
                                  </button>
                                  <Edit form="proveedor" data={valor} />
                                  <Confirmacion
                                    id={valor.id_proveedores}
                                    tabla="proveedor"
                                  />
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="pane-sm sidebar" style={{ width: 420 }}>
                  detalles del pedido
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

Proveedores.prototypes = {
  ProductoReducer: PropsType.object,
  Proveedores: PropsType.object,
  crear_proveedor: PropsType.func,
  traer_proveedores: PropsType.func,
  obterner_name_laboratorio: PropsType.func,
};

const mapStateToProps = ({ ProductoReducer, Proveedores }) => {
  return { ProductoReducer, Proveedores };
};

const mapDispachToProps = {
  traer_proveedores,
  crear_proveedor,
  obterner_name_laboratorio,
};

export default connect(mapStateToProps, mapDispachToProps)(Proveedores);
