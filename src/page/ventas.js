import React from "react";
import { exist_token } from "../util/verifi-local-token";
import Head from "../componentes/head";
import Load from "../componentes/preload";
import moment from "moment";
import Nav from "../componentes/nav";
import { Redirect } from "react-router-dom";
import Footer from "../componentes/footer";

class Ventas extends React.Component {
  state = {
    data_ventas: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data_ventas: [
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
        <Head titulo="Ventas" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-3">
              <label>
                <b>Buscar ventas por fecha:</b>
              </label>
              <input type="date" className="form-control mt-2" />
            </div>

            <div className="col-3">
              <h4 className="p-2 text-left">
                Ventas: <b>{moment(`${new Date()}`).format("LLL")}</b>
              </h4>
            </div>

            <div className="col-10 seccion-table-productos_all">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Presentacion</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data_ventas == 0 ? (
                    <tr>
                      <td colSpan="7">{this.load()}</td>
                    </tr>
                  ) : (
                    this.state.data_ventas.map((valor) => (
                      <tr key={valor.id}>
                        <td>
                          <img src="img/medicamento/paracetamol.jpg" />
                        </td>
                        <td>Paracetamol</td>
                        <td>Mi favorito</td>
                        <td>Tabletas</td>
                        <td>20/02/2020</td>
                        <td>12/05/2021</td>
                        <td>
                          <button className="btn btn-mini btn-primary">
                            Detallles
                          </button>
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

export default Ventas;
