import React from "react";
import Load from "../componentes/preload";
import Head from "../componentes/head";
import { exist_token } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Notificacion from "../componentes/notificacion";
import { Redirect } from "react-router-dom";
import Footer from "../componentes/footer";

class Carrito extends React.Component {
  state = {
    data_productos_sale_recientes: [],
    notificacion: false,
    total_compra: 300,
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data_productos_sale_recientes: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
          { id: "5" },
          { id: "6" },
          { id: "7" },
        ],
      });
    }, 4000);
  }

  load = () => {
    return <Load />;
  };

  render() {
    if (exist_token() === false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Carrito" />
        <Nav />

        <section className="container-fluid p-2">
          <div className="row justify-content-center">
            <h4 className="p-2 text-left">Productos Seleccionados</h4>

            <div className="col-12 seccion-table-recien-vendidos">
              <table className="table-striped mt-2 table-vendidos_recientes text-center">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Lote</th>
                    <th>Reg Sani</th>
                    <th>Laboratorio</th>
                    <th>Stock</th>
                    <th>Presentacion</th>
                    <th>Miligramos</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>P / U</th>
                    <th>Cantidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data_productos_sale_recientes == false ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : (
                    this.state.data_productos_sale_recientes.map((valor) => (
                      <tr key={valor}>
                        <td>
                          <img
                            src="img/medicamento/paracetamol.jpg"
                            alt="product"
                          />
                        </td>
                        <td>Paracetamol</td>
                        <td>200000633</td>
                        <td>01182-mac-1-04-11</td>
                        <td>Mi favorito</td>
                        <td># 5</td>
                        <td>Tabletas</td>
                        <td>500</td>
                        <td>20/02/2020</td>
                        <td>12/05/2021</td>
                        <td>$ 0.20</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Cantidad"
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

export default Carrito;
