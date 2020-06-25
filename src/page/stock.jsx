import React from "react";
import PropsType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import ConfirEliminar from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Cookie from "js-cookie";
import Alerta from "../componentes/alert";
import Load from "../componentes/preload";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { validar_status } from "../util/util-status";
import { exist_token } from "../util/verifi-local-token";

import {
  create_name_laboratorio,
  create_product,
  create_name_product,
  create_name_princ_activo,
  obterner_name_laboratorio,
  obterner_name_productos,
  obtener_producto_completos,
  obtener_principio_activo,
  busqueda_en_producto,
  eliminar_producto,
} from "../actions/productoAction";

class Stock extends React.Component {
  state = {
    producto: "",
    laboratorio: "",
    principio_activo: "",
    cantidad: 0,
    presentacion: "",
    lote: "",
    registro_sanitario: "",
    dosis: "",
    tipo_dosis: "",
    fecha_elaboracion: "",
    fecha_caducidad: "",
    pvp: 0,
    pvf: 0,
    limpiar_a_tiempo: null,
  };

  styles = {
    dialog: {
      width: 300,
      height: "100%",
      right: 0,
      left: "auto",
    },
  };

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
    if (this.props.ProductoReducer.Principio_activo.length == 0) {
      this.props.obtener_principio_activo();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    /*if (nextProps.ProductoReducer.mensaje != "") {
      document.getElementById(
        "sms-name-product"
      ).innerText = `${nextProps.ProductoReducer.mensaje}`;
      this.limpiar_sms("sms-name-product");
      this.props.obterner_name_productos();
    }

    if (nextProps.ProductoReducer.mensaje_laboratorio != "") {
      document.getElementById(
        "sms-name-laboratorio"
      ).innerText = `${nextProps.ProductoReducer.mensaje_laboratorio}`;
      this.limpiar_sms("sms-name-laboratorio");
      this.props.obterner_name_laboratorio();
    }

    if (nextProps.ProductoReducer.mensaje_producto_complete != "") {
      document.getElementById(
        "sms_product_complete"
      ).innerText = `${nextProps.ProductoReducer.mensaje_producto_complete}`;
      this.limpiar_sms("sms_product_complete");
      this.props.obtener_producto_completos();
    }*/
  }

  limpiar_sms = (sms_span) => {
    /*this.state.limpiar_a_tiempo = setTimeout(() => {
      document.getElementById(sms_span).innerText = "";
    }, 3000);*/
  };

  componentWillUnmount() {
    clearTimeout(this.state.limpiar_a_tiempo);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  add_name_product = () => {
    let name = document.getElementById("nombre_producto");

    if (name.value == "") {
      alert("Campo vacio en nombre del producto");
    } else {
      this.props.create_name_product(name.value);
      name.value = "";
    }
  };

  add_name_laboratorio = () => {
    let name = document.getElementById("name_laboratorio");

    if (name.value == "") {
      alert("Campo vacio en nombre del Laboratorio");
    } else {
      this.props.create_name_laboratorio(name.value);
      name.value = "";
    }
  };

  add_name_prin_activo = () => {
    let name = document.getElementById("principio_activo");

    if (name.value == "") {
      alert("Campo vacio en principio activo");
    } else {
      this.props.create_name_princ_activo(name.value);
      name.value = "";
    }
  };

  save_product = () => {
    if (
      this.state.producto == "-----" ||
      this.state.laboratorio == "------" ||
      this.state.cantidad == "" ||
      this.state.lote == "" ||
      this.state.registro_sanitario == "" ||
      this.state.dosis == "" ||
      this.state.tipo_dosis == "-----" ||
      this.state.presentacion == "-----" ||
      this.state.fecha_elaboracion == "" ||
      this.state.fecha_caducidad == "" ||
      this.state.pvp == "" ||
      this.state.pvf == ""
    ) {
      alert("Campos vacios en agregar productos a stock");
    } else {
      let data = {
        id_name_product: this.state.producto,
        id_name_laboratorio: this.state.laboratorio,
        cantidad: this.state.cantidad,
        presentacion: this.state.presentacion,
        lote: this.state.lote,
        registro_sanitario: this.state.registro_sanitario,
        dosis: this.state.dosis,
        tipo_dosis: this.state.tipo_dosis,
        fecha_elaboracion: this.state.fecha_elaboracion,
        fecha_caducidad: this.state.fecha_caducidad,
        pvp: this.state.pvp,
        pvf: this.state.pvf,
        id_principio_activo: this.state.principio_activo,
      };

      this.props.create_product(data);
    }
  };

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

  load = () => <Load />;

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Stock" />
        <Nav />

        <section className="container-fluid">
          <h4 className="p-1 text-center" style={{ fontWeight: "bold" }}>
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
                    <label className="text-center">
                      <b>Registrar producto:</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre_producto"
                      placeholder="Nombre del producto"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                      onClick={this.add_name_product}
                    />{" "}
                    <Link
                      className="btn btn-primary mt-2"
                      style={{ position: "absolute", right: 10 }}
                      to="/detalles-productos"
                    >
                      Producto y mas detalles
                    </Link>
                  </form>
                </dialog>
              </x-button>
            </div>

            <div className="col-2">
              <x-button>
                <span className="material-icons">add_box</span> &nbsp;
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
                      id="name_laboratorio"
                      className="form-control"
                      placeholder="Nombre del laboratorio"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                      onClick={this.add_name_laboratorio}
                    />{" "}
                    <Link
                      className="btn btn-primary mt-2"
                      style={{ position: "absolute", right: 10 }}
                      to="/detalles-productos"
                    >
                      Producto y mas detalles
                    </Link>
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
                <dialog style={{ position: "relative", top: 130 }}>
                  <h3
                    className="text-center p-2"
                    style={{
                      backgroundColor: "#0866dc",
                      color: "#fff",
                      padding: 5,
                    }}
                  >
                    Agregar en Stock
                  </h3>

                  <form className="pb-5">
                    <div className="row justify-content-center">
                      <div className="col p-2">
                        <label>
                          <b>Producto:</b>
                        </label>
                        <select
                          className="form-control"
                          name="producto"
                          onChange={this.handleInputChange}
                        >
                          <option>-----</option>
                          {this.props.ProductoReducer.Producto_Name.map(
                            (item) => (
                              <option
                                key={item.id_product_name}
                                value={item.id_product_name}
                              >
                                {item.product_name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Laboratorio:</b>
                        </label>
                        <select
                          className="form-control"
                          name="laboratorio"
                          onChange={this.handleInputChange}
                        >
                          <option>------</option>
                          {this.props.ProductoReducer.Laboratorio_Name.map(
                            (item) => (
                              <option
                                key={item.id_name_laboratorio}
                                value={item.id_name_laboratorio}
                              >
                                {item.nombre_laboratorio}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Princ Activo:</b>
                        </label>
                        <select
                          className="form-control"
                          name="principio_activo"
                          onChange={this.handleInputChange}
                        >
                          <option>------</option>
                          {this.props.ProductoReducer.Principio_activo.map(
                            (item) => (
                              <option
                                key={item.id_principio_activo}
                                value={item.id_principio_activo}
                              >
                                {item.principio_activo}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Cantidad:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="cantidad"
                          onChange={this.handleInputChange}
                          placeholder="100"
                          defaultValue={0}
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Presentacion:</b>
                        </label>
                        <select
                          className="form-control"
                          name="presentacion"
                          onChange={this.handleInputChange}
                        >
                          <option>-----</option>
                          <option>Tabletas</option>
                          <option>Suero</option>
                          <option>Jarabe</option>
                          <option>Ampollas</option>
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>PVP:</label>
                        <input
                          type="number"
                          onChange={this.handleInputChange}
                          className="form-control"
                          name="pvp"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="col p-2">
                        <label>PVF:</label>
                        <input
                          type="number"
                          onChange={this.handleInputChange}
                          className="form-control"
                          name="pvf"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="row justify-content-center">
                      <div className="col p-2">
                        <label>
                          <b>Lote:</b>
                        </label>
                        <input
                          type="number"
                          name="lote"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="0000000"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Registro Sanitario:</b>
                        </label>
                        <input
                          type="text"
                          name="registro_sanitario"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="000-000-000"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Medidas:</b>
                        </label>
                        <input
                          type="number"
                          name="dosis"
                          onChange={this.handleInputChange}
                          className="form-control"
                          placeholder="000"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Tipo de medidas:</b>
                        </label>
                        <select
                          className="form-control"
                          name="tipo_dosis"
                          onChange={this.handleInputChange}
                        >
                          <option>-----</option>
                          <option>Miligramos</option>
                          <option>Gramos</option>
                          <option>Litros</option>
                          <option>Mililitros</option>
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Fecha elaboracion:</b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="fecha_elaboracion"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Fecha caducidad:</b>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="fecha_caducidad"
                          disabled={this.state.fecha_elaboracion == "" && true}
                          min={this.state.fecha_elaboracion}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col-12 p-2">
                      <button
                        type="button"
                        onClick={this.save_product}
                        className="btn btn-mini btn-primary mt-2 ml-2"
                      >
                        Guardar
                      </button>{" "}
                      &nbsp; &nbsp;{" "}
                      <span
                        style={{ color: "#229954", fontWeight: "bold" }}
                        id="sms_product_complete"
                      ></span>
                    </div>
                  </form>
                </dialog>
              </x-button>
            </div>
            <div className="col-2">
              <x-button>
                <span className="material-icons">local_pharmacy</span> &nbsp;
                <x-label>
                  <b style={{ fontSize: 15 }}>Add Activo</b>
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
                      <b>Registra Principio Activo:</b>
                    </label>
                    <input
                      type="text"
                      id="principio_activo"
                      className="form-control"
                      placeholder="Nombre del principio activo"
                    />
                    <input
                      type="button"
                      className="btn btn-primary mt-2"
                      value="Registrar"
                      onClick={this.add_name_prin_activo}
                    />{" "}
                    <Link
                      className="btn btn-primary mt-2"
                      style={{ position: "absolute", right: 10 }}
                      to="/detalles-productos"
                    >
                      Producto y mas detalles
                    </Link>
                  </form>
                </dialog>
              </x-button>
            </div>
            <div className="col-3">
              <input
                type="text"
                style={{ borderRadius: 10 }}
                onChange={this.search_product}
                className="form-control input-buscar"
                placeholder="Buscar por: ----- Nombre ----- Laboratorio"
              />
            </div>

            <div className="col-12 seccion-table-productos_all mt-4">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Activo</th>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Cant</th>
                    <th>Present</th>
                    <th>Medidas</th>
                    <th># Lote</th>
                    <th>Reg - Sanitario</th>
                    <th>PVP</th>
                    <th>PVF</th>
                    <th>Status</th>
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
                  ) : this.props.ProductoReducer.Producto.length == 0 ? (
                    <tr>
                      <td colSpan="13">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.map((valor) => (
                      <tr
                        key={valor.id_producto}
                        className={validar_status(valor.estado)}
                      >
                        <td>{valor.principio_activo}</td>
                        <td>{valor.product_name}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>{valor.cantidad}</td>
                        <td>{valor.presentacion}</td>
                        <td>
                          {valor.medida} {valor.tipo_medida}
                        </td>
                        <td>{valor.lote}</td>
                        <td>{valor.registro_sanitario}</td>
                        <td>{valor.pvp}</td>
                        <td>{valor.pvf}</td>
                        <td>{valor.estado}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <button
                            className="btn btn-mini btn-warning"
                            disabled={valor.estado != "Disponible" && true}
                          >
                            Modificar
                          </button>
                          <span>
                            <ConfirEliminar
                              id={valor.id_producto}
                              tabla="productos"
                            />
                          </span>
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

Stock.prototypes = {
  ProductoReducer: PropsType.object,
  create_name_laboratorio: PropsType.func,
  create_product: PropsType.func,
  create_name_product: PropsType.func,
  obterner_name_laboratorio: PropsType.func,
  obterner_name_productos: PropsType.func,
  obtener_producto_completos: PropsType.func,
  obtener_principio_activo: PropsType.func,
  busqueda_en_producto: PropsType.func,
  eliminar_producto: PropsType.func,
  create_name_princ_activo: PropsType.func,
};

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

const mapDispachToProps = {
  create_name_laboratorio,
  create_product,
  create_name_product,
  create_name_princ_activo,
  obterner_name_laboratorio,
  obterner_name_productos,
  obtener_producto_completos,
  obtener_principio_activo,
  busqueda_en_producto,
  eliminar_producto,
};

export default connect(mapStateToProps, mapDispachToProps)(Stock);
