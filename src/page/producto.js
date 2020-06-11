import React from "react";
import { Redirect } from "react-router-dom";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Cookie from "js-cookie";
import Load from "../componentes/preload";
import { connect } from "react-redux";
import { exist_token, domain } from "../util/verifi-local-token";
import "../assest/css/producto.css";

import * as ProductoAction from "../actions/productoAction";

class Productos extends React.Component {
  componentDidMount() {
    if (this.props.ProductoReducer.Producto_Name.length == 0) {
      this.props.obterner_name_productos();
    }
    if (this.props.ProductoReducer.Laboratorio_Name.length == 0) {
      this.props.obterner_name_laboratorio();
    }
    if (this.props.ProductoReducer.Producto.length == 0) {
      this.props.obtener_producto_completos();
    }
  }

  componentWillUpdate(nextProps, nextState) {}

  search_product = (e) => {
    const respaldo = this.props.ProductoReducer.Producto;
    let nuevo = [];

    if (e.target.value == "") {
      this.props.busqueda_en_producto(
        this.props.ProductoReducer.Busqueda_producto
      );
    } else {
      for (let i = 0; i < respaldo.length; i++) {
        if (
          respaldo[i].product_name.indexOf(e.target.value) != -1 ||
          respaldo[i].nombre_laboratorio.indexOf(e.target.value) != -1
        ) {
          nuevo.push(respaldo[i]);
        }
      }
      this.props.busqueda_en_producto(nuevo);
    }
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
        <Head titulo="Productos" />
        <Nav />

        <section className="container-fluid">
          <h4 className="p-1 text-center" style={{ fontWeight: "bold" }}>
            Todo los productos ingresados
          </h4>
          <div className="row justify-content-center">
            <div className="col-5">
              <input
                type="text"
                id="search_producto"
                onChange={this.search_product}
                className="form-control input-buscar"
                placeholder="Buscar producto por: ----- Nombre ----- Laboratorio -----"
              />
            </div>

            <div className="col-12 seccion-table-productos_all">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Cantidad</th>
                    <th>Presentacion</th>
                    <th>Medidas</th>
                    <th>Tipo Medidas</th>
                    <th># Lote</th>
                    <th>Reg - Sanitario</th>
                    <th>Fecha de elaboracion</th>
                    <th>Fecha de caducidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.Producto.length == 0 ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.map((valor) => (
                      <tr key={valor.id_producto}>
                        <td>
                          <img
                            src={`${domain()}/static/productos/${valor.imagen}`}
                          />
                        </td>
                        <td>{valor.product_name}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>{valor.cantidad}</td>
                        <td>{valor.presentacion}</td>
                        <td>{valor.medida}</td>
                        <td>{valor.tipo_medida}</td>
                        <td>{valor.lote}</td>
                        <td>{valor.registro_sanitario}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <button
                            className="btn btn-mini btn-positive"
                            style={{ cursor: "pointer" }}
                          >
                            Agregar al carrito
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
      </>
    );
  }
}

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

export default connect(mapStateToProps, ProductoAction)(Productos);
