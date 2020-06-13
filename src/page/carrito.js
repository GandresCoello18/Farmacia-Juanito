import React from "react";
import Load from "../componentes/preload";
import Head from "../componentes/head";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { exist_token, domain } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Notificacion from "../componentes/notificacion";
import { Redirect } from "react-router-dom";
import Footer from "../componentes/footer";

class Carrito extends React.Component {
  state = {
    data_productos_sale_recientes: [],
    notificacion: false,
    total_compra: 300,
    validar_formato: false,
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
      marginTop: 60,
      color: "#fff",
    },
  };

  componentDidMount() {}

  /*validar_formato = (e, id) => {
    console.log(id);
    if (e.target.value != "Por Unidad") {
      document.getElementById(`validar-formato_${id}`).disabled = true;
    }
  };*/

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
                  {this.props.carritoReducer.carrito == false ? (
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
                          <select className="form-control">
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
                            onClick={() =>
                              this.setState({ notificacion: true })
                            }
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
                  <div className="col">
                    <h3 className="p-1">
                      SUBTOTAL: $ <b>{this.state.total_compra}</b>
                    </h3>
                  </div>
                  <div className="col">
                    <h3 className="p-1">
                      IVA: <b>12</b> %
                    </h3>
                  </div>
                  <div className="col">
                    <h3 className="p-1">
                      TOTAL: ${" "}
                      <b>
                        {this.state.total_compra +
                          (this.state.total_compra * 12) / 100}
                      </b>
                    </h3>
                  </div>
                </div>
              </x-card>
            </div>
            <div className="col-1">
              <x-button style={this.styles.btn_verde}>
                <x-label>Continuar</x-label>
                <dialog style={this.styles.dialogo}></dialog>
              </x-button>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ carritoReducer }) => {
  return { carritoReducer };
};

export default connect(mapStateToProps, null)(Carrito);
