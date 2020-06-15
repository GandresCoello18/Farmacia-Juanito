import React from "react";
import PropsType from "prop-types";
import Load from "../componentes/preload";
import Head from "../componentes/head";
import Cookie from "js-cookie";
import moment from "moment";
import { Link, his, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { exist_token } from "../util/verifi-local-token";
import ImgFact from "../assest/logo-farmacia.jpeg";
import Nav from "../componentes/nav";
import Notificacion from "../componentes/notificacion";
import Footer from "../componentes/footer";

import { quitar_del_carrito, limpiar_carrito } from "../actions/carritoAction";
import { traer_clientes } from "../actions/clienteAction";
import { crear_venta, limpiar_ventas } from "../actions/ventasActios";

class Carrito extends React.Component {
  state = {
    data_productos_sale_recientes: [],
    notificacion: false,
    /////////////
    subTotalCompra: 0,
    descuento: 0,
    Total: 0,
    iva: 12,
    /////////////
    cliente_pago: "",
    descripcion_pago: "",
    efectivo_pago: 0,
    cambio_pago: "$: Cambio",
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

    if (this.props.clienteReducer.clientes.length == 0) {
      this.props.traer_clientes();
    }

    let sub = 0;
    let datosCarrito = this.props.carritoReducer.carrito;
    for (let i = 0; i < datosCarrito.length; i++) {
      sub = sub + Number(datosCarrito[i].pvp);
    }

    let total = (sub + (sub * this.state.iva) / 100).toFixed(2);

    this.setState({
      subTotalCompra: sub.toFixed(2),
      Total: total,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.ventasReducer.mensaje_ventas != "") {
      this.props.history.push("/producto");
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

  remover_del_carrito = (id_producto) => {
    this.props.quitar_del_carrito(id_producto);
  };

  clear_carrito = () => this.props.limpiar_carrito();

  confirmar_pago = () => {
    const obj = {
      id_cliente: this.state.cliente_pago,
      descripcion: this.state.descripcion_pago,
      descuento: this.state.descuento,
      iva: this.state.iva,
      total: Number(this.state.Total),
      efectivo: this.state.efectivo_pago,
      cambio: this.state.cambio_pago,
    };

    if (obj.cambio == "$: Cambio") obj.cambio = 0;

    this.props.crear_venta(obj);

    this.props.limpiar_carrito();
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
                      IVA: <b>{this.state.iva}</b> %
                    </span>
                  </div>
                  <div className="col mt-1">
                    <span
                      style={{ fontSize: 25 }}
                      className="p-1 badge badge-light"
                    >
                      TOTAL: $ <b>{this.state.Total}</b>
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
                        <Link to="/clientes" className="btn btn-primary">
                          Agregar nuevo cliente
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <select className="form-control" name="cliente_pago">
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
                          name="descripcion_pago"
                          className="form-control"
                          placeholder="Descripcion de la compra..."
                        ></textarea>
                      </li>
                      <li className="list-group-item">
                        Descuento:{" "}
                        <b className="badge-info p-1">
                          {this.state.descuento} %
                        </b>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp; Iva:{" "}
                        <b className="badge-info p-1">{this.state.iva} %</b>
                      </li>
                      <li className="list-group-item">
                        <input
                          type="number"
                          name="efectivo_pago"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="$: Efectivo"
                          style={{ width: 100 }}
                        />
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <input
                          type="number"
                          name="cambio_pago"
                          onChange={this.handleInputChange}
                          className="form-control"
                          disabled={true}
                          placeholder={this.state.cambio_pago}
                          style={{ width: 100 }}
                        />
                      </li>
                      <li className="list-group-item">
                        Total a pagar: &nbsp; &nbsp;
                        <span
                          style={{ fontSize: 13 }}
                          className="badge-success p-1 mt-1"
                        >
                          <b>$ {this.state.Total}</b>
                        </span>
                      </li>
                    </ul>
                    <button
                      disabled={this.props.carritoReducer.carrito.length == 0}
                      className="btn btn-positive form-control mt-2"
                      onClick={this.confirmar_pago}
                    >
                      Confirmar Pago
                    </button>
                  </div>
                </dialog>
              </x-button>
            </div>
            <div className="col-1">
              <button
                className="btn btn-negative"
                onClick={this.clear_carrito}
                style={{ marginTop: 40 }}
              >
                Limpiar Carrito
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

Carrito.prototypes = {
  carritoReducer: PropsType.object,
  clienteReducer: PropsType.object,
  history: PropsType.object.isRequired,
  quitar_del_carrito: PropsType.func,
  traer_clientes: PropsType.func,
  limpiar_carrito: PropsType.func,
  crear_venta: PropsType.func,
  limpiar_ventas: PropsType.func,
};

const mapStateToProps = ({ carritoReducer, clienteReducer, ventasReducer }) => {
  return { carritoReducer, clienteReducer, ventasReducer };
};

const mapDispachToProps = {
  quitar_del_carrito,
  traer_clientes,
  limpiar_carrito,
  crear_venta,
  limpiar_ventas,
};

export default connect(mapStateToProps, mapDispachToProps)(Carrito);
