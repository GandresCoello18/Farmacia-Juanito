import React from "react";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import ConfirEliminar from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Cookie from "js-cookie";
import Load from "../componentes/preload";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { exist_token, domain } from "../util/verifi-local-token";

import * as ProductoAction from "../actions/productoAction";

class Stock extends React.Component {
  state = {
    producto: "",
    laboratorio: "",
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

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.ProductoReducer.mensaje != "") {
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
    }
  }

  limpiar_sms = (sms_span) => {
    this.state.limpiar_a_tiempo = setTimeout(() => {
      document.getElementById(sms_span).innerText = "";
    }, 3000);
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
      this.state.pvp == ""
    ) {
      alert("Campos vacios en agregar productos a stock");
    } else {
      let data = new FormData();

      // let file = document.getElementById("foto-producto").files[0];
      // data.append("file", file);
      data.append("id_name_product", this.state.producto);
      data.append("id_name_laboratorio", this.state.laboratorio);
      data.append("cantidad", this.state.cantidad);
      data.append("presentacion", this.state.presentacion);
      data.append("lote", this.state.lote);
      data.append("registro_sanitario", this.state.registro_sanitario);
      data.append("dosis", this.state.dosis);
      data.append("tipo_dosis", this.state.tipo_dosis);
      data.append("fecha_elaboracion", this.state.fecha_elaboracion);
      data.append("fecha_caducidad", this.state.fecha_caducidad);
      data.append("pvp", this.state.pvp);
      data.append("pvf", this.state.pvf);

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

  load = () => {
    return <Load />;
  };

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
                    &nbsp; &nbsp;{" "}
                    <span
                      style={{ color: "#229954", fontWeight: "bold" }}
                      id="sms-name-product"
                    ></span>
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
                    &nbsp; &nbsp;{" "}
                    <span
                      style={{ color: "#229954", fontWeight: "bold" }}
                      id="sms-name-laboratorio"
                    ></span>
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
                          <b>Cantidad:</b>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="cantidad"
                          onChange={this.handleInputChange}
                          placeholder="100"
                          defaultValue={1}
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
            <div className="col-5">
              <input
                type="text"
                onChange={this.search_product}
                className="form-control input-buscar"
                placeholder="Buscar producto por: ----- Nombre ----- Laboratorio ----- "
              />
            </div>

            <div className="col-12 seccion-table-productos_all">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Laboratorio</th>
                    <th>Cant</th>
                    <th>Presentacion</th>
                    <th>Medidas</th>
                    <th>Tipo Medidas</th>
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
                  {this.props.ProductoReducer.Producto.length == 0 ? (
                    <tr>
                      <td colSpan="13" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto.map((valor) => (
                      <tr key={valor.id_producto}>
                        <td>{valor.product_name}</td>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>{valor.cantidad}</td>
                        <td>{valor.presentacion}</td>
                        <td>{valor.medida}</td>
                        <td>{valor.tipo_medida}</td>
                        <td>{valor.lote}</td>
                        <td>{valor.registro_sanitario}</td>
                        <td>{valor.pvp}</td>
                        <td>{valor.pvf}</td>
                        <td>{valor.fecha_elaboracion}</td>
                        <td>{valor.fecha_caducidad}</td>
                        <td>
                          <button className="btn btn-mini btn-warning">
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

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

export default connect(mapStateToProps, ProductoAction)(Stock);
