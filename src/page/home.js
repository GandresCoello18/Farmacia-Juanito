import React from "react";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import { Redirect, useHistory } from "react-router-dom";
import DetalleCard from "../componentes/card-detalles";
import Alerta from "../componentes/alert";
import Load from "../componentes/preload";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import Confir from "../componentes/confirmacion";
import { exist_token } from "../util/verifi-local-token";
import "../assest/css/home.css";

import * as ActionsUser from "../actions/usuariosActions";

class Home extends React.Component {
  state = {
    data_producto_por_caducar: [],
    data_productos_sale_recientes: [],
  };

  styles = {
    dialogo: {
      width: 300,
      height: "100%",
      left: 0,
      right: "auto",
      overflowY: "scroll",
    },
    btn_azul: {
      borderColor: "#388df8",
      borderBottomColor: "#0866dc",
      backgroundColor: "#6eb4f7",
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 2,
      paddingRight: 2,
      color: "#fff",
    },
  };

  componentDidMount() {
    this.props.traerTodos();
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
    if (exist_token(Cookie.get("access_token")) == false) {
     return <Redirect to='/login' />
    }
    return (
      <>
        <Head titulo="Inicio | Medical" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center">
            <h4 className="p-2 text-left">Vendidos Recientemente</h4>

            <div className="col-12 seccion-table-recien-vendidos">
              <table className="table-striped mt-2 table-vendidos_recientes text-center">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Lote</th>
                    <th>Reg Sani</th>
                    <th>Laboratorio</th>
                    <th>Cantidad</th>
                    <th>Presentacion</th>
                    <th>Miligramos</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data_productos_sale_recientes == 0 ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : (
                    this.state.data_productos_sale_recientes.map((valor) => (
                      <tr key={valor.id}>
                        <td>
                          {" "}
                          <img src="img/medicamento/paracetamol.jpg" />{" "}
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
                        <td>Andres coello</td>
                        <td>$ 18.50</td>
                        <td>
                          <button className="btn btn-mini btn-warning">
                            Modificar
                          </button>
                          <span onClick={this.llamar}>
                            <Confir />
                          </span>
                          <button
                            className="btn btn-mini"
                            style={{ backgroundColor: "trasparent" }}
                          >
                            <x-button style={this.styles.btn_azul}>
                              <x-label>Detalles</x-label>
                              <dialog style={this.styles.dialogo}>
                                <DetalleCard />
                                <DetalleCard />
                                <DetalleCard />
                                <DetalleCard />
                                <DetalleCard />
                                <DetalleCard />
                              </dialog>
                            </x-button>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <hr />
            <h4>Productos por caducar</h4>
            <div className="col-12 seccion-table-por-caducar">
              <table className="table-striped mt-2 table-caducar text-center">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Stock</th>
                    <th>Presentacion</th>
                    <th>Miligramos</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data_producto_por_caducar == 0 ? (
                    <tr>
                      <td colSpan="9" className="p-2">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen productos que esten en peligro de expiracion."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.state.data_producto_por_caducar.map((valor) => (
                      <tr>
                        <td>
                          {" "}
                          <img src="img/medicamento/paracetamol.jpg" />{" "}
                        </td>
                        <td>CSS</td>
                        <td>28K</td>
                        <td>photon.css</td>
                        <td>CSS</td>
                        <td>28K</td>
                        <td>28K</td>
                        <td>28K</td>
                        <td>
                          <button className="btn btn-mini btn-warning">
                            Modificar
                          </button>

                          <Confir />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, ActionsUser)(Home);
