import React from "react";
import PropsType from "prop-types";
import Load from "../componentes/preload";
import Head from "../componentes/head";
import Cookie from "js-cookie";
import Alerta from "../componentes/alert";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { exist_token } from "../util/verifi-local-token";
import ImgFact from "../assest/logo-farmacia.jpeg";
import Nav from "../componentes/nav";
import Notificacion from "../componentes/notificacion";
import FormCreateClient from "../componentes/form-create-cliente";
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
    ////////////
    time: null,
    slider: "carrito_pago",
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

    this.calcular_sub_total_de_pago();
  }

  componentWillUpdate(nextProps, nextState) {}

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name == "descuento") {
      this.calcular_sub_total_de_pago(Number(value));
    }
    if (name == "efectivo_pago") {
      let cambio = "";

      if (value != "") {
        cambio = (Number(value) - this.state.Total).toFixed(2);
      }

      this.setState({
        cambio_pago: cambio,
      });
    }

    this.setState({
      [name]: value,
    });
  };

  remover_del_carrito = (id_producto) => {
    this.props.quitar_del_carrito(id_producto);
    this.time = setTimeout(() => this.calcular_sub_total_de_pago(), 1000);
  };

  componentWillUnmount() {
    clearTimeout(this.time);
  }

  clear_carrito = () => {
    this.props.limpiar_carrito();

    this.setState({
      descuento: 0,
      subTotalCompra: 0,
      Total: 0,
    });
  };

  calcular_sub_total_de_pago = (descuento = null, aplicar_iva = false) => {
    let sub = 0;
    let total = 0;

    let celda_total = document.querySelectorAll(".celda_total");

    if (aplicar_iva) {
      for (let i = 0; i < celda_total.length; i++) {
        total = total + Number(celda_total[i].value);
      }

      this.setState({
        Total: Number(total.toFixed(2)),
      });
    } else {
      for (let i = 0; i < celda_total.length; i++) {
        sub = sub + Number(celda_total[i].value);
      }

      if (descuento != null) {
        total = sub;
        let desc = ((total * descuento) / 100).toFixed(2);
        total = total - desc;
      } else {
        total = sub;
      }

      this.setState({
        subTotalCompra: Number(sub.toFixed(2)),
        Total: Number(total.toFixed(2)),
      });
    }
  };

  add_iva = (id_producto) => {
    let item_total = Number(
      document.getElementById(`item_total_${id_producto}`).value
    );
    let cantidad = Number(
      document.getElementById(`cantidad_${id_producto}`).value
    );
    let sub = 0;
    let data_iva = 0;

    let datosCarrito = this.props.carritoReducer.carrito;
    let data = datosCarrito.find((item) => item.id_producto == id_producto);
    sub = Number(data.pvp) / Number(data.cantidad);
    sub = sub * Number(cantidad);

    if (document.getElementById(`iva_${id_producto}`).checked) {
      data_iva = item_total + (item_total * this.state.iva) / 100;
    } else {
      data_iva = item_total - (sub * this.state.iva) / 100;
    }

    document.getElementById(
      `item_total_${id_producto}`
    ).value = data_iva.toFixed(2);
    this.calcular_sub_total_de_pago(null, true);
    this.validar_aplicar_iva_not_descuento();
  };

  validar_aplicar_iva_not_descuento = () => {
    let checkbox = document.querySelectorAll(".aplicar_iva");
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        document.getElementById("descuento").disabled = true;
        return true;
      }
    }
    document.getElementById("descuento").disabled = false;
  };

  validar_cantidad_item_producto_not_cero = () => {
    let celda_cantidad = document.querySelectorAll(".celda_cantidad");
    for (let i = 0; i < celda_cantidad.length; i++) {
      if (celda_cantidad[i].value == 0) {
        return true;
      }
    }

    let celda_total = document.querySelectorAll(".celda_total");
    for (let i = 0; i < celda_total.length; i++) {
      if (celda_total[i].value == 0) {
        return true;
      }
    }

    return false;
  };

  cambiar_slider = () => this.setState({ slider: "carrito_pago" });

  formato = (e, id_producto) => {
    document.getElementById("descuento").value = "";
    document.getElementById(`cantidad_${id_producto}`).value = 0;

    this.setState({
      descuento: 0,
    });
  };

  cantidad = (e, id_producto) => {
    let item_total = document.getElementById(`item_total_${id_producto}`);
    let sub = 0;

    let datosCarrito = this.props.carritoReducer.carrito;
    let data = datosCarrito.find((item) => item.id_producto == id_producto);

    if (
      document.getElementById(`formato_${id_producto}`).value == "Por Paquete"
    ) {
      if (Number(e.target.value) < 2 && Number(e.target.value) > 0) {
        sub = sub + Number(data.pvp);
      } else {
        e.target.value = 1;
        sub = item_total.value;
      }
    } else {
      sub = Number(data.pvp) / Number(data.cantidad);
    }

    sub = sub * Number(e.target.value);

    item_total.value = sub.toFixed(2);
    this.calcular_sub_total_de_pago();
  };

  confirmar_pago = () => {
    if (this.state.efectivo_pago != "") {
      if (Number(this.state.efectivo_pago) < this.state.Total) {
        alert(
          "El efectivo tiene que ser mayor o igual que el total de la compra"
        );
        return false;
      } else if (this.state.cambio_pago < 0) {
        alert("Fatal: cambio negativo, el cambio es menor a cero");
        return false;
      }
      this.setState({
        cambio_pago: Number(this.state.efectivo_pago) - this.state.Total,
      });
    }

    if (this.validar_cantidad_item_producto_not_cero()) {
      alert("Hay cantidades sin especificar o totales en 0");
    } else {
      const datosCarrito = this.props.carritoReducer.carrito;

      for (let i = 0; i < datosCarrito.length; i++) {
        datosCarrito[i].formato = document.getElementById(
          `formato_${datosCarrito[i].id_producto}`
        ).value;
        datosCarrito[i].unidades = document.getElementById(
          `cantidad_${datosCarrito[i].id_producto}`
        ).value;
      }

      const obj = {
        id_cliente: this.state.cliente_pago,
        descripcion: this.state.descripcion_pago,
        descuento: this.state.descuento,
        iva: this.state.iva,
        total: Number(this.state.Total),
        efectivo: this.state.efectivo_pago,
        cambio: Number(
          (Number(this.state.efectivo_pago) - this.state.Total).toFixed(2)
        ),
        productos: datosCarrito,
      };

      if (obj.cambio == "$: Cambio") obj.cambio = 0;

      this.props.crear_venta(obj);
      this.props.history.push("/producto");
    }
  };

  load = () => <Load />;

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
                    <th>Activo</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Cant</th>
                    <th>Present</th>
                    <th>Medida</th>
                    <th>PVP</th>
                    <th>Caducidad</th>
                    <th>Formato</th>
                    <th>Cantidad</th>
                    <th>¿ Iva ?</th>
                    <th>Total</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.carritoReducer.cargar_carrito ? (
                    <tr>
                      <td colSpan="14">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos almacenados en carrito."
                        />
                      </td>
                    </tr>
                  ) : this.props.carritoReducer.carrito.length == 0 ? (
                    <tr>
                      <td colSpan="14">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos almacenados en carrito."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.carritoReducer.carrito.map((valor) => (
                      <tr key={valor.id_producto}>
                        <td>{valor.principio_activo}</td>
                        <td>{valor.product_name}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>{valor.cantidad}</td>
                        <td>{valor.presentacion}</td>
                        <td>
                          {valor.medida} {valor.tipo_medida}
                        </td>
                        <td>{valor.pvp}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <select
                            className="form-control"
                            onChange={(e) => this.formato(e, valor.id_producto)}
                            id={`formato_${valor.id_producto}`}
                            disabled={valor.presentacion != "Tabletas"}
                          >
                            <option value="Por Paquete">Por Paquete</option>
                            <option value="Por Unidad">Por Unidad</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            max={valor.cantidad}
                            onChange={(e) =>
                              this.cantidad(e, valor.id_producto)
                            }
                            id={`cantidad_${valor.id_producto}`}
                            className="form-control celda_cantidad"
                            placeholder="Cantidad"
                            style={{ width: 60 }}
                            defaultValue={1}
                          />
                        </td>
                        <td>
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                className="aplicar_iva"
                                id={`iva_${valor.id_producto}`}
                                onClick={() => this.add_iva(valor.id_producto)}
                              />{" "}
                              {this.state.iva} %
                            </label>
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            id={`item_total_${valor.id_producto}`}
                            className="form-control celda_total"
                            defaultValue={valor.pvp}
                            disabled={true}
                            style={{ width: 65 }}
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
                      min="0"
                      max="100"
                      id="descuento"
                      style={{ width: 100 }}
                      name="descuento"
                      disabled={this.props.carritoReducer.carrito.length == 0}
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
                  {this.state.slider != "carrito_pago" ? (
                    <div style={{ color: "#000" }}>
                      <FormCreateClient cambiar_slider={this.cambiar_slider} />
                    </div>
                  ) : (
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
                          <button
                            className="btn btn-primary"
                            disabled={
                              this.props.carritoReducer.carrito.length == 0
                            }
                            onClick={() => {
                              this.setState({
                                slider: "crear cliente",
                              });
                            }}
                          >
                            Agregar nuevo cliente
                          </button>
                        </li>
                        <li className="list-group-item">
                          <select
                            className="form-control"
                            name="cliente_pago"
                            disabled={
                              this.props.carritoReducer.carrito.length == 0
                            }
                          >
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
                            disabled={
                              this.props.carritoReducer.carrito.length == 0
                            }
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
                            min="0"
                            onChange={this.validar_efectivo}
                            disabled={
                              this.props.carritoReducer.carrito.length == 0
                            }
                            onChange={this.handleInputChange}
                            className="form-control"
                            placeholder="$: Efectivo"
                            style={{ width: 100 }}
                          />
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <input
                            type="number"
                            name="cambio_pago"
                            id="cambio_pago"
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
                        Confirmar Compra
                      </button>
                    </div>
                  )}
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
