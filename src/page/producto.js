import React from "react";
import { Redirect } from "react-router-dom";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Cookie from 'js-cookie';
import { exist_token } from "../util/verifi-local-token";
import "../assest/css/producto.css";

class Productos extends React.Component {
  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to='/login' />
     }
    return (
      <>
        <Head titulo="Productos" />
        <Nav />

        <section className="container-fluid">
          <h4 className="p-1 text-center">Todo los productos ingresados</h4>
          <div className="row justify-content-center">
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
                    <th>Lote</th>
                    <th>Reg Sani</th>
                    <th>Laboratorio</th>
                    <th>Stock</th>
                    <th>Presentacion</th>
                    <th>Miligramos</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>Fecha de Ingreso</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((valor) => (
                    <tr key={valor}>
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
                      <td>15/01/2020</td>
                      <td>
                        <button
                          className="btn btn-mini btn-positive"
                          style={{ cursor: "pointer" }}
                        >
                          Agregar al carrito
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Productos;
