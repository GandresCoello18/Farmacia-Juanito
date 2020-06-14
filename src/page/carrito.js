import React from "react";
import Load from "../componentes/preload";
import Head from "../componentes/head";
import Cookie from "js-cookie";
import moment from "moment";
import { connect } from "react-redux";
import { exist_token } from "../util/verifi-local-token";
import ImgFact from "../assest/logo-farmacia.jpeg";
import Nav from "../componentes/nav";
import Notificacion from "../componentes/notificacion";
import { Redirect } from "react-router-dom";
import Footer from "../componentes/footer";

import { quitar_del_carrito } from "../actions/carritoAction";
class Carrito extends React.Component {
  state = {
    data_productos_sale_recientes: [],
    notificacion: false,
    subTotalCompra: 300,
    descuento: 0,
  };

  styles = {
    dialogo: {
      width: 300,
      height: "100%",
      left: 0,
      right: "auto",
      overflowY: "scroll",
    },
    btn_verde: {
      borderColor: "#29a03b",
      borderBottomColor: "#248b34",
      backgroundColor: "#248b34",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10,
      cursor: "pointer",
      marginTop: 40,
      color: "#fff",
    },
  };

  componentDidMount() {
    moment.lang("es");

    let sub = 0;
    let datosCarrito = this.props.carritoReducer.carrito;
    for (let i = 0; i < datosCarrito.length; i++) {
      sub = sub + Number(datosCarrito[i].pvp);
    }

    this.setState({
      subTotalCompra: sub,
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  remover_del_carrito = (id_producto) => {
    this.props.quitar_del_carrito(id_producto);
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
        <Head titulo="Carrito" />
        <Nav />

        <section className="container-fluid p-2">
          <div className="row justify-content-center">
            <h4 className="p-2 text-left" style={{ fontWeight: "bold" }}>
              Productos Seleccionados
            </h4>

            <div className="col-12 seccion-table-recien-vendidos">
              <table className="table-striped mt-2 table-vendidos_recientes text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Cant</th>
                    <th>Presentacion</th>
                    <th>Medida</th>
                    <th>Tipo Medida</th>
                    <th>Lote</th>
                    <th>Reg-Sanit</th>
                    <th>PVP</th>
                    <th>Elaboracion</th>
                    <th>Caducidad</th>
                    <th>Formato</th>
                    <th>Cantidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.carritoReducer.carrito.length == 0 ? (
                    <tr>
                      <td colSpan="14" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : (
                    this.props.carritoReducer.carrito.map((valor) => (
                      <tr key={valor.id_producto}>
                        <td>{valor.product_name}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>{valor.cantidad}</td>
                        <td>{valor.presentacion}</td>
                        <td>{valor.medida}</td>
                        <td>{valor.tipo_medida}</td>
                        <td>{valor.lote}</td>
                        <td>{valor.registro_sanitario}</td>
                        <td>{valor.pvp}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <select
                            className="form-control"
                            disabled={valor.presentacion != "Tabletas"}
                          >
                            <option value="Por Unidad">-----</option>
                            <option value="Por Unidad">Por Unidad</option>
                            <option value="Por Paquete">Por Paquete</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Cantidad"
                            style={{ width: 60 }}
                            defaultValue={1}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-mini btn-negative"
                            onClick={() => {
                              this.setState({ notificacion: true });
                              this.remover_del_carrito(valor.id_producto);
                            }}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {this.state.notificacion && (
                <Notificacion text="Se removio el producto del carrito" />
              )}
            </div>

            <hr style={{ marginTop: 30 }} />

            <div className="col-8">
              <x-card>
                <div className="row text-center">
                  <div className="col mt-1">
                    <span
                      style={{ fontSize: 25 }}
                      className="p-1 badge badge-warning"
                    >
                      SUBTOTAL: $ <b>{this.state.subTotalCompra}</b>
                    </span>
                  </div>
                  <div className="col mt-1">
                    <span
                      style={{ fontSize: 25 }}
                      className="p-1 badge badge-info"
                    >
                      IVA: <b>12</b> %
                    </span>
                  </div>
                  <div className="col mt-1">
                    <span
                      style={{ fontSize: 25 }}
                      className="p-1 badge badge-light"
                    >
                      TOTAL: ${" "}
                      <b>
                        {(
                          this.state.subTotalCompra +
                          (this.state.subTotalCompra * 12) / 100
                        ).toFixed(2)}
                      </b>
                    </span>
                  </div>
                  <div className="col mt-1">
                    <input
                      type="number"
                      style={{ width: 100 }}
                      name="descuento"
                      onChange={this.handleInputChange}
                      className="form-control"
                      placeholder="Descuento  %"
                    />
                  </div>
                </div>
              </x-card>
            </div>
            <div className="col-1">
              <x-button style={this.styles.btn_verde}>
                <x-label>Continuar</x-label>
                <dialog style={this.styles.dialogo}>
                  <div className="card">
                    <img
                      src={ImgFact}
                      className="card-img-top p-2"
                      style={{ height: 220 }}
                    />
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Fecha: <b>{moment(new Date()).format("LL")}</b>
                      </li>
                      <li className="list-group-item">
                        <button className="btn btn-primary">
                          Agregar nuevo cliente
                        </button>
                      </li>
                      <li className="list-group-item">
                        <select className="form-control">
                          <option>Clientes</option>
                          {this.props.clienteReducer.clientes.map((item) => (
                            <option
                              key={item.identificacion}
                              value={item.identificacion}
                            >
                              {item.nombres} {item.apellidos}
                            </option>
                          ))}
                        </select>
                      </li>
                      <li className="list-group-item">
                        <textarea
                          rows="3"
                          className="form-control"
                          placeholder="Descripcion de la compra..."
                        ></textarea>
                      </li>
                      <li className="list-group-item">
                        Descuento: <b>{this.state.descuento} %</b>
                      </li>
                      <li className="list-group-item">
                        Iva: <b>12 %</b>
                      </li>
                      <li className="list-group-item">
                        Total a pagar: &nbsp; &nbsp;
                        <span
                          style={{ fontSize: 13 }}
                          className="badge-success p-1 mt-1"
                        >
                          <b>
                            ${" "}
                            {(
                              this.state.subTotalCompra +
                              (this.state.subTotalCompra * 12) / 100
                            ).toFixed(2)}
                          </b>
                        </span>
                      </li>
                    </ul>
                    <button className="btn btn-positive form-control mt-2">
                      Confirmar Pago
                    </button>
                  </div>
                </dialog>
              </x-button>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ carritoReducer, clienteReducer }) => {
  return { carritoReducer, clienteReducer };
};

const mapDispachToProps = {
  quitar_del_carrito,
};

export default connect(mapStateToProps, mapDispachToProps)(Carrito);
