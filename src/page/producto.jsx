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
import { add_carrito, quitar_del_carrito } from "../actions/carritoAction";

class Productos extends React.Component {
  state = {
    filtrar_por: "",
  };

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

  filtrar_productos = (e) => {
    this.setState({
      filtrar_por: e.target.value,
    });
  };

  search_product = (e) => {
    const respaldo = this.props.ProductoReducer.Producto;
    let nuevo = [];

    if (e.target.value == "") {
      this.props.busqueda_en_producto(
        this.props.ProductoReducer.Busqueda_producto
      );
    } else {
      switch (this.state.filtrar_por) {
        case "Todos":
          nuevo = respaldo;
          break;
        case "Nombre":
          nuevo = respaldo.filter(
            (item) => item.product_name.indexOf(e.target.value) != -1
          );
          break;
        case "principio activo":
          nuevo = respaldo.filter(
            (item) => item.principio_activo.indexOf(e.target.value) != -1
          );
          break;
        case "Laboratorio":
          nuevo = respaldo.filter(
            (item) => item.nombre_laboratorio.indexOf(e.target.value) != -1
          );
          break;
        case "cantidad":
          nuevo = respaldo.filter((item) => {
            item.cantidad = item.cantidad + "";
            if (item.cantidad.indexOf(e.target.value) != -1) {
              return true;
            }
          });
          break;
        case "Cantidad disponible":
          nuevo = respaldo.filter((item) => {
            item.cantidad_disponible = item.cantidad_disponible + "";
            if (item.cantidad_disponible.indexOf(e.target.value) != -1) {
              return true;
            }
          });
          break;
        case "Presentacion":
          nuevo = respaldo.filter(
            (item) => item.presentacion.indexOf(e.target.value) != -1
          );
          break;
        case "Tipo medidas":
          nuevo = respaldo.filter(
            (item) => item.tipo_medida.indexOf(e.target.value) != -1
          );
          break;
        case "Medidas":
          nuevo = respaldo.filter((item) => {
            item.medida = item.medida + "";
            if (item.medida.indexOf(e.target.value) != -1) {
              return true;
            }
          });
          break;
        case "Lote":
          nuevo = respaldo.filter(
            (item) => item.lote.indexOf(e.target.value) != -1
          );
          break;
        case "Reg Sanitario":
          nuevo = respaldo.filter(
            (item) => item.registro_sanitario.indexOf(e.target.value) != -1
          );
          break;
        case "Pvp":
          nuevo = respaldo.filter((item) => {
            item.pvp = item.pvp + "";
            if (item.pvp.indexOf(e.target.value) != -1) {
              return true;
            }
          });
          break;
        case "PvF":
          nuevo = respaldo.filter((item) => {
            item.pvf = item.pvf + "";
            if (item.pvf.indexOf(e.target.value) != -1) {
              return true;
            }
          });
          break;
        case "Elaboracion":
          nuevo = respaldo.filter(
            (item) => item.fecha_elaboracion.indexOf(e.target.value) != -1
          );
          break;
        case "Caducidad":
          nuevo = respaldo.filter(
            (item) => item.fecha_caducidad.indexOf(e.target.value) != -1
          );
          break;
      }

      this.props.busqueda_en_producto(nuevo);
    }
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
            <div className="col-3">
              <input
                type="text"
                id="search_producto"
                onChange={this.search_product}
                className="form-control input-buscar"
                placeholder="Buscar producto......"
              />
            </div>
            <div className="col-2">
              <select
                className="form-control"
                onChange={this.filtrar_productos}
              >
                <option>Todos</option>
                <option>Nombre</option>
                <option>principio activo</option>
                <option>Laboratorio</option>
                <option>cantidad</option>
                <option>Cantidad disponible</option>
                <option>Presentacion</option>
                <option>Tipo medidas</option>
                <option>Medidas</option>
                <option>Lote</option>
                <option>Reg Sanitario</option>
                <option>Pvp</option>
                <option>PvF</option>
                <option>Elaboracion</option>
                <option>Caducidad</option>
              </select>
            </div>

            <div className="col-12 seccion-table-productos_all mt-3 mb-5">
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
                        item.cantidad_disponible > 0
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
                    )
                      .sort((a, b) => {
                        if (a.product_name > b.product_name) {
                          return 1;
                        }
                        if (a.product_name < b.product_name) {
                          return -1;
                        }
                        return 0;
                      })
                      .map((valor) => (
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
                                if (
                                  e.target.innerText == "Quitar del carrito"
                                ) {
                                  e.target.classList.remove("btn-primary");
                                  e.target.classList.add("btn-positive");
                                  e.target.parentElement.parentElement.classList.remove(
                                    "alert-primary"
                                  );
                                  e.target.parentElement.parentElement.classList.add(
                                    "alert-success"
                                  );
                                  e.target.innerText = "Agregar al carrito";
                                  this.props.quitar_del_carrito(
                                    valor.id_producto
                                  );
                                } else {
                                  e.target.classList.remove("btn-positive");
                                  e.target.classList.add("btn-primary");
                                  e.target.parentElement.parentElement.classList.remove(
                                    "alert-success"
                                  );
                                  e.target.parentElement.parentElement.classList.add(
                                    "alert-primary"
                                  );
                                  e.target.innerText = "Quitar del carrito";
                                  this.props.add_carrito(valor.id_producto);
                                }
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
  quitar_del_carrito: PropsType.func,
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
  quitar_del_carrito,
};

export default connect(mapStateToProps, mapDispachToProps)(Productos);
