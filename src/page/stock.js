import React from "react";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import ConfirEliminar from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Cookie from 'js-cookie';
import { useHistory } from "react-router-dom";
import { exist_token } from "../util/verifi-local-token";

class Stock extends React.Component {
  componentDidMount() {}

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      window.location.href = '/login';
    }
    return (
      <>
        <Head titulo="Stock" />
        <Nav />

        <section className="container-fluid">
          <h4 className="p-1 text-center">
            Agregar y Actualizar Productos en Stock
          </h4>

          <br />

          <div className="row justify-content-center mt-1">
            <div className="col-2">
              <x-button>
                <span className="material-icons">local_offer</span> &nbsp;
                <x-label>
                  <b style={{ fontSize: 15 }}>Add Product</b>
                </x-label>
                <dialog
                  style={{
                    position: "relative",
                    top: 200,
                    height: 120,
                    width: 400,
                  }}
                >
                  <form className="p-2">
                    <label>
                      <b>Registrar producto:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del producto"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                    />
                  </form>
                </dialog>
              </x-button>
            </div>

            <div className="col-2">
              <x-button>
                <span class="material-icons">add_box</span> &nbsp;
                <x-label>
                  <b style={{ fontSize: 15 }}>Add Laboratorio</b>
                </x-label>
                <dialog
                  style={{
                    position: "relative",
                    top: 200,
                    height: 120,
                    width: 400,
                  }}
                >
                  <form className="p-2">
                    <label>
                      <b>Registrar Laboratorio:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del laboratorio"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                    />
                  </form>
                </dialog>
              </x-button>
            </div>

            <div className="col-2">
              <x-button>
                <span className="material-icons">add_circle</span> &nbsp;
                <x-label>
                  {" "}
                  <b style={{ fontSize: 15 }}> Add Stock</b>{" "}
                </x-label>
                <dialog style={{ position: "relative", top: 200 }}>
                  <h5 className="text-center p-2">Agregar en Stock</h5>

                  <form className="pb-5">
                    <div className="row justify-content-center">
                      <div className="col p-2">
                        <label>
                          <b>Imagen:</b>
                        </label>
                        <input type="file" />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Producto:</b>
                        </label>
                        <select className="form-control">
                          <option>Option one</option>
                          <option>Option two</option>
                          <option>Option eight</option>
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Laboratorio:</b>
                        </label>
                        <select className="form-control">
                          <option>Option one</option>
                          <option>Option two</option>
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Cantidad:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="100"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Presentacion:</b>
                        </label>
                        <select className="form-control">
                          <option>Option one</option>
                          <option>Option two</option>
                          <option>Option three</option>
                        </select>
                      </div>
                    </div>

                    <div className="row justify-content-center">
                      <div className="col p-2">
                        <label>
                          <b>Lote:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="20004893"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Registro Sanitario:</b>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="011862-1-04-11"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Miligramos:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="500"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Fecha elaboracion:</b>
                        </label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Fecha caducidad:</b>
                        </label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>

                    <div className="col-12 p-2">
                      <button className="btn btn-mini btn-primary mt-2 ml-2">
                        Guardar
                      </button>
                    </div>
                  </form>
                </dialog>
              </x-button>
            </div>
            <div className="col-5">
              <input
                type="text"
                className="form-control input-buscar"
                placeholder="Buscar Producto por: ----- Nombre ----- Laboratorio ----- Presentacion"
              />
            </div>

            <div className="col-12 seccion-table-productos_all">
              <table className="table-striped mt-1 text-center">
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
                    <th>Fecha de Ingreso</th>
                    <th>Ingresado Por</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((valor) => (
                    <tr key={valor}>
                      <td>
                        <img src="img/medicamento/paracetamol.jpg" />
                      </td>
                      <td>Paracetamol</td>
                      <td>Mi favorito</td>
                      <td># 5</td>
                      <td>Tabletas</td>
                      <td>500</td>
                      <td>20/02/2020</td>
                      <td>12/05/2021</td>
                      <td>15/01/2020</td>
                      <td>Andres coello</td>
                      <td>
                        <button className="btn btn-mini btn-warning">
                          Modificar
                        </button>
                        <span>
                          <ConfirEliminar />
                        </span>
                      </td>
                    </tr>
                  ))}
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

export default Stock;
