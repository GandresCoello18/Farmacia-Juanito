import React from "react";
import { exist_token } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Load from "../componentes/preload";
import Confir from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Head from "../componentes/head";
import { Redirect } from "react-router-dom";

class Clientes extends React.Component {
  state = {
    data_clientes: [],
  };

  componentDidMount() {
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
        <Head titulo="Clientes | Medical" />
        <Nav />

        <section className="container-fluid p-3">
          <div className="row justify-content-center">
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
                    <th>
                      <x-icon
                        name="people"
                        style={{ position: "absolute" }}
                      ></x-icon>
                      Nombre
                    </th>
                    <th>Cedula / Ruc</th>
                    <th>Direccion</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data_clientes == 0 ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : (
                    this.state.data_clientes.map((valor) => (
                      <tr key={valor}>
                        <td>Andres coello</td>
                        <td>1207345768</td>
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
        </section>

        <Footer />
      </>
    );
  }
}

export default Clientes;
