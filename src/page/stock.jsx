import React from "react";
import PropsType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import ConfirEliminar from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Cookie from "js-cookie";
import Edit from "../componentes/edit";
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
    cantidad_disponible: 0,
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
    veces_de_ingreso: 1,
    ////////////////////
    cantidad_por_presentacion: 100,
    filtrar_por: "",
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

    if (name == "presentacion") {
      let c = 1;

      if (value == "Insumos medicos") {
        document.getElementById("select-principio_activo").disabled = true;
      } else {
        document.getElementById("select-principio_activo").disabled = false;
      }

      if (value == "Tabletas" || value == "Ampollas") {
        c = 100;
      }

      this.setState({
        cantidad_por_presentacion: c,
      });
      document.getElementById("cantidad").value = 0;
    }
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
      this.state.cantidad_disponible == "" ||
      this.state.lote == "" ||
      this.state.registro_sanitario == "" ||
      this.state.dosis == "" ||
      this.state.tipo_dosis == "-----" ||
      this.state.fecha_elaboracion == "" ||
      this.state.fecha_caducidad == "" ||
      this.state.pvp == "" ||
      this.state.pvf == "" ||
      this.state.veces_de_ingreso == ""
    ) {
      alert("Campos vacios en agregar productos a stock");
    } else {
      if (Number(this.state.veces_de_ingreso) < 1) {
        alert("Especifique las veces de ingreso del producto");
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
          cantidad_disponible: this.state.cantidad_disponible,
          veces_ingreso: this.state.veces_de_ingreso,
        };

        this.props.create_product(data);
        document.getElementById("form-stock").reset();
        // document.getElementById("fecha_caducidad").disabled = true;
      }
    }
  };

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

                  <form className="pb-5" id="form-stock">
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
                          <option>Gotas</option>
                          <option>Capsula</option>
                          <option>Cosmeticos</option>
                          <option>Cremas</option>
                          <option>Sobres</option>
                          <option>Ampollas</option>
                          <option>Insumos medicos</option>
                        </select>
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Princ Activo:</b>
                        </label>
                        <select
                          className="form-control"
                          name="principio_activo"
                          id="select-principio_activo"
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
                          id="cantidad"
                          onChange={this.handleInputChange}
                          placeholder="100"
                          min="0"
                          max={this.state.cantidad_por_presentacion}
                          disabled={
                            this.state.presentacion == "-----" ||
                            this.state.presentacion == ""
                          }
                          defaultValue={0}
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Cant Disponi:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="cantidad_disponible"
                          id="cantidad-disponible"
                          onChange={this.handleInputChange}
                          placeholder="000"
                          min="0"
                          max={this.state.cantidad}
                          disabled={
                            this.state.presentacion == "-----" ||
                            this.state.presentacion == "" ||
                            this.state.cantidad == 0
                          }
                          defaultValue={this.state.cantidad}
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>PVF:</b>
                        </label>
                        <input
                          type="number"
                          onChange={this.handleInputChange}
                          className="form-control"
                          name="pvf"
                          min="0"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>PVP:</b>
                        </label>
                        <input
                          type="number"
                          onChange={this.handleInputChange}
                          className="form-control"
                          name="pvp"
                          min="0"
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
                          type="text"
                          name="lote"
                          onChange={this.handleInputChange}
                          className="form-control"
                          min="0"
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
                          <option>Pulgadas</option>
                          <option>Centimetros</option>
                          <option>Mililitros</option>
                        </select>
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
                          min="0"
                          placeholder="000"
                        />
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
                          id="fecha_caducidad"
                          disabled={this.state.fecha_elaboracion == "" && true}
                          min={this.state.fecha_elaboracion}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="col p-2">
                        <label>
                          <b>Ingresar {this.state.veces_de_ingreso} veces:</b>
                        </label>
                        <input
                          type="number"
                          name="veces_de_ingreso"
                          className="form-control"
                          min="1"
                          defaultValue={this.state.veces_de_ingreso}
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
            <div className="col-2">
              <input
                type="text"
                style={{ borderRadius: 10 }}
                onChange={this.search_product}
                className="form-control input-buscar"
                placeholder="Buscar producto..."
              />
            </div>
            <div className="col-1">
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

            <div className="col-12 seccion-table-productos_all mt-4 mb-5">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Princ-Activo</th>
                    <th>Laboratorio</th>
                    <th>Cant - Disp</th>
                    <th>Present</th>
                    <th>Medidas</th>
                    <th># Lote</th>
                    <th>Reg - Sanitario</th>
                    <th>PVF</th>
                    <th>PVP</th>
                    <th>Elaboracion</th>
                    <th>Caducidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.Producto.cargando ? (
                    <tr>
                      <td colSpan="14" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Producto.length == 0 ? (
                    <tr>
                      <td colSpan="14">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Productos."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.sort((a, b) => {
                      if (a.product_name > b.product_name) {
                        return 1;
                      }
                      if (a.product_name < b.product_name) {
                        return -1;
                      }
                      return 0;
                    }).map((valor) => (
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
                        <td>{valor.pvf}</td>
                        <td>{valor.pvp}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          {valor.estado == "Disponible" && (
                            <Edit form="stock" data={valor} />
                          )}
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
