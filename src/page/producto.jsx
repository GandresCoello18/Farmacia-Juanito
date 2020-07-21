import React from "react";
import PropsType from "prop-types";
import { Redirect } from "react-router-dom";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Cookie from "js-cookie";
import Alerta from "../componentes/alert";
import Footer from "../componentes/footer";
import Load from "../componentes/preload";
import { connect } from "react-redux";
import { validar_status } from "../util/util-status";
import { exist_token } from "../util/verifi-local-token";
import "../assest/css/producto.css";

import {
  obtener_producto_completos,
  busqueda_en_producto,
  obterner_name_productos,
  obterner_name_laboratorio,
} from "../actions/productoAction";
import { add_carrito } from "../actions/carritoAction";

class Productos extends React.Component {
  componentDidMount() {
    const datos_carrito = this.props.carritoReducer.carrito;

    if (this.props.ProductoReducer.Producto_Name.length == 0) {
      this.props.obterner_name_productos();
    }
    if (this.props.ProductoReducer.Laboratorio_Name.length == 0) {
      this.props.obterner_name_laboratorio();
    }
    if (this.props.ProductoReducer.Producto.length == 0) {
      this.props.obtener_producto_completos();
    }

    if (datos_carrito.length > 0) {
      for (let i = 0; i < datos_carrito.length; i++) {
        let elemento_btn = document.getElementById(
          `btn_${datos_carrito[i].id_producto}`
        );
        elemento_btn.classList.remove("btn-positive");
        elemento_btn.classList.add("btn-primary");
        elemento_btn.disabled = true;
      }
    }
  }

  search_product = (e) => {
    const respaldo = this.props.ProductoReducer.Producto;
    let nuevo = [];

    if (e.target.value == "") {
      this.props.busqueda_en_producto(
        this.props.ProductoReducer.Busqueda_producto
      );
    } else {
      respaldo.forEach((item) => {
        if (item.nombre_laboratorio.indexOf(e.target.value) != -1) {
          nuevo.push(item);
        }

        if (item.product_name.indexOf(e.target.value) != -1) {
          nuevo.push(item);
        }

        if (item.lote.indexOf(e.target.value) != -1) {
          nuevo.push(item);
        }
      });

      this.props.busqueda_en_producto(nuevo);
    }
  };

  agregar_a_carrito = (id_producto) => {
    this.props.add_carrito(id_producto);
  };

  load = () => <Load />;

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
                placeholder="Buscar producto por: ----- Nombre ----- Laboratorio ----- Lote"
              />
            </div>

            <div className="col-12 seccion-table-productos_all mb-5">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Principio Activo</th>
                    <th>Laboratorio</th>
                    <th>Cant - Disp</th>
                    <th>Present</th>
                    <th>Medidas</th>
                    <th># Lote</th>
                    <th>Reg - Sanitario</th>
                    <th>PVP</th>
                    <th>PVF</th>
                    <th>Elaboracion</th>
                    <th>Caducidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.Producto.cargando ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Producto.filter(
                      (item) =>
                        (item.estado == "Disponible" ||
                          item.estado == "Aun disponible") &&
                        item.cantidad > 0
                    ).length == 0 ? (
                    <tr>
                      <td colSpan="13">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.filter(
                      (item) =>
                        item.estado == "Disponible" ||
                        item.estado == "Aun disponible"
                    ).map((valor) => (
                      <tr
                        key={valor.id_producto}
                        className={validar_status(valor.estado)}
                      >
                        <td>{valor.product_name}</td>
                        <td>{valor.principio_activo}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>
                          {valor.cantidad} / {valor.cantidad_disponible}
                        </td>
                        <td>{valor.presentacion}</td>
                        <td>
                          {valor.medida} {valor.tipo_medida}
                        </td>
                        <td>{valor.lote}</td>
                        <td>{valor.registro_sanitario}</td>
                        <td>{valor.pvp}</td>
                        <td>{valor.pvf}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <button
                            className="btn btn-mini btn-positive"
                            id={`btn_${valor.id_producto}`}
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.target.disabled = true;
                              e.target.classList.remove("btn-positive");
                              e.target.classList.add("btn-primary");
                              this.agregar_a_carrito(valor.id_producto);
                            }}
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

        <Footer />
      </>
    );
  }
}

Productos.prototypes = {
  ProductoReducer: PropsType.object,
  carritoReducer: PropsType.object,
  obtener_producto_completos: PropsType.func,
  obterner_name_productos: PropsType.func,
  busqueda_en_producto: PropsType.func,
  obterner_name_laboratorio: PropsType.func,
  add_carrito: PropsType.func,
};

const mapStateToProps = ({ ProductoReducer, carritoReducer }) => {
  return { ProductoReducer, carritoReducer };
};

const mapDispachToProps = {
  obtener_producto_completos,
  obterner_name_productos,
  busqueda_en_producto,
  obterner_name_laboratorio,
  add_carrito,
};

export default connect(mapStateToProps, mapDispachToProps)(Productos);
