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
import DetallesPP from "../componentes/detalles-producto-proveedor";
import Confirmacion from "../componentes/confirmacion";
import { exist_token } from "../util/verifi-local-token";
import NewProductProveedor from "../componentes/new-product-proveedor";

import {
  crear_proveedor,
  traer_proveedores,
  busqueda_en_proveedor,
  traer_product_proveedor,
} from "../actions/proveedorAction";
import { obterner_name_laboratorio } from "../actions/productoAction";

class Proveedores extends React.Component {
  state = {
    nombres: "",
    laboratorio: 0,
    correo: "",
    telefono: 0,
    /////////
    notifico: false,
    select_detalles_proveedor: "",
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
    if (this.props.ProveedoresReducer.Proveedores.length == 0) {
      this.props.traer_proveedores();
    }
    if (this.props.ProductoReducer.Laboratorio_Name.length == 0) {
      this.props.obterner_name_laboratorio();
    }
    if (this.props.ProveedoresReducer.Producto_proveedor.length == 0) {
      this.props.traer_product_proveedor();
    }
  }

  search_proveedor = (e) => {
    const respaldo = this.props.ProveedoresReducer.Proveedores;
    let nuevo = [];

    if (e.target.value == "") {
      this.props.busqueda_en_proveedor(
        this.props.ProveedoresReducer.Busqueda_proveedores
      );
    } else {
      for (let i = 0; i < respaldo.length; i++) {
        if (
          respaldo[i].nombres.indexOf(e.target.value) != -1 ||
          respaldo[i].nombre_laboratorio.indexOf(e.target.value) != -1 ||
          respaldo[i].correo.indexOf(e.target.value) != -1
          // respaldo[i].identificacion.indexOf(e.target.value) != -1
        ) {
          nuevo.push(respaldo[i]);
        }
      }
      this.props.busqueda_en_proveedor(nuevo);
    }
  };

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
                <div
                  className="pane-sm sidebar"
                  style={{
                    width: 400,
                    border: 1,
                    borderStyle: "solid",
                    borderColor: "#000",
                  }}
                >
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
                      style={{ color: "#000" }}
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
                        onChange={this.search_proveedor}
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
                          {this.props.ProveedoresReducer.cargar_proveedor ? (
                            <tr>
                              <td colSpan="5" className="p-2">
                                {this.load()}
                              </td>
                            </tr>
                          ) : this.props.ProveedoresReducer.Proveedores
                              .length == 0 ? (
                            <tr>
                              <td colSpan="5">
                                <Alerta
                                  titulo="No existen datos para mostrar"
                                  contenido="Por el momento no existen proveedores para mostrar."
                                />
                              </td>
                            </tr>
                          ) : (
                            this.props.ProveedoresReducer.Proveedores.map(
                              (valor) => (
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
                                  <td style={{ width: 100 }}>
                                    {valor.telefono}
                                  </td>
                                  <td>
                                    <NewProductProveedor
                                      id={valor.id_proveedores}
                                    />
                                    <button
                                      onClick={() =>
                                        this.setState({
                                          select_detalles_proveedor:
                                            valor.id_proveedores,
                                        })
                                      }
                                      className="btn btn-mini btn-primary ml-1 mr-1"
                                    >
                                      Detalles
                                    </button>
                                    <Edit form="proveedor" data={valor} />
                                    <Confirmacion
                                      id={valor.id_proveedores}
                                      tabla="proveedor"
                                    />
                                  </td>
                                </tr>
                              )
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="pane-sm sidebar"
                  style={{
                    width: 500,
                    overflowY: "scroll",
                    border: 1,
                    borderStyle: "solid",
                    borderColor: "#000",
                  }}
                >
                  <h6
                    className="text-center p-1"
                    style={{
                      backgroundColor: "#0866dc",
                      color: "#fff",
                      fontSize: 16,
                    }}
                  >
                    Detalles Pedidos
                  </h6>
                  {this.state.select_detalles_proveedor == "" ? (
                    <Alerta
                      titulo="No existen datos para mostrar"
                      contenido="Selecciona los detalles del proveedor."
                    />
                  ) : (
                    <DetallesPP
                      id_proveedor={this.state.select_detalles_proveedor}
                    />
                  )}
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
  ProveedoresReducer: PropsType.object,
  crear_proveedor: PropsType.func,
  traer_proveedores: PropsType.func,
  obterner_name_laboratorio: PropsType.func,
  busqueda_en_proveedor: PropsType.func,
  traer_product_proveedor: PropsType.func,
};

const mapStateToProps = ({ ProductoReducer, ProveedoresReducer }) => {
  return { ProductoReducer, ProveedoresReducer };
};

const mapDispachToProps = {
  traer_proveedores,
  traer_product_proveedor,
  crear_proveedor,
  busqueda_en_proveedor,
  obterner_name_laboratorio,
};

export default connect(mapStateToProps, mapDispachToProps)(Proveedores);
