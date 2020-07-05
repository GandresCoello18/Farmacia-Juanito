import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import Notificacion from "../notificacion";
import { editar_producto_completo } from "../../actions/productoAction";

class EditProduct extends React.Component {
  state = {
    actualizado: false,
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  update_product = (id_producto) => {
    let producto = document.getElementById("producto_update").value;
    let laboratorio = document.getElementById("laboratorio_update").value;
    let principio_act = document.getElementById("principio_activo_update")
      .value;
    let cantidad = document.getElementById("cantidad_update").value;
    let lote = document.getElementById("lote_update").value;
    let registro_sanitario = document.getElementById(
      "registro_sanitario_update"
    ).value;
    let medidas = document.getElementById("dosis_update").value;
    let tipo_medidas = document.getElementById("tipo_dosis_update").value;
    let presentacion = document.getElementById("presentacion_update").value;
    let elaboracion = document.getElementById("fecha_elaboracion_update").value;
    let caducidad = document.getElementById("fecha_caducidad_update").value;
    let pvp = document.getElementById("pvp_update").value;
    let pvf = document.getElementById("pvf_update").value;

    if (
      cantidad == "" ||
      lote == "" ||
      registro_sanitario == "" ||
      medidas == "" ||
      elaboracion == "" ||
      caducidad == "" ||
      pvp == "" ||
      pvf == ""
    ) {
      alert("Campos vacios, revise y vuelva ha intentarlo");
    } else {
      this.props.editar_producto_completo(
        id_producto,
        producto,
        laboratorio,
        principio_act,
        cantidad,
        presentacion,
        lote,
        registro_sanitario,
        medidas,
        tipo_medidas,
        elaboracion,
        caducidad,
        pvp,
        pvf
      );
      this.setState({
        actualizado: true,
      });
      setTimeout(() => this.setState({ actualizado: false }), 1000);
    }
  };

  render() {
    return (
      <>
        {[this.props.data].map((item) => (
          <form
            className="p-2"
            key={item.id_producto}
            style={{ overflow: "scroll", height: 550 }}
          >
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Producto
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Producto:</label>
              <div className="col-12">
                <select
                  className="form-control"
                  id="producto_update"
                  onChange={this.handleInputChange}
                >
                  <option>-----</option>
                  {this.props.ProductoReducer.Producto_Name.map((item_p) => (
                    <option
                      key={item_p.id_product_name}
                      value={item_p.id_product_name}
                      selected={item_p.product_name == item.product_name}
                    >
                      {item_p.product_name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="ml-3 mt-2">Laboratorio:</label>
              <div className="col-12">
                <select
                  className="form-control"
                  id="laboratorio_update"
                  onChange={this.handleInputChange}
                >
                  <option>------</option>
                  {this.props.ProductoReducer.Laboratorio_Name.map((item_l) => (
                    <option
                      key={item_l.id_name_laboratorio}
                      value={item_l.id_name_laboratorio}
                      selected={
                        item_l.nombre_laboratorio == item.nombre_laboratorio
                      }
                    >
                      {item_l.nombre_laboratorio}
                    </option>
                  ))}
                </select>
              </div>

              <label className="ml-3 mt-2">Princ Activo:</label>
              <div className="col-12">
                <select
                  className="form-control"
                  id="principio_activo_update"
                  onChange={this.handleInputChange}
                >
                  <option>------</option>
                  {this.props.ProductoReducer.Principio_activo.map((item_a) => (
                    <option
                      key={item_a.id_principio_activo}
                      value={item_a.id_principio_activo}
                      selected={
                        item_a.principio_activo == item.principio_activo
                      }
                    >
                      {item_a.principio_activo}
                    </option>
                  ))}
                </select>
              </div>

              <label className="ml-3 mt-1">Presentacion:</label>
              <div className="col-12">
                <select
                  className="form-control"
                  id="presentacion_update"
                  onChange={this.handleInputChange}
                >
                  {["Tabletas", "Suero", "Jarabe", "Ampollas"].map((item_p) => (
                    <option
                      key={item_p}
                      value={item_p}
                      selected={item_p == item.presentacion}
                    >
                      {item_p}
                    </option>
                  ))}
                </select>
              </div>

              <label className="ml-3 mt-1">Cantidad:</label>
              <div className="col-12">
                <input
                  type="number"
                  className="form-control"
                  id="cantidad_update"
                  onChange={this.handleInputChange}
                  placeholder="100"
                  min="0"
                  max={this.state.cantidad_por_presentacion}
                  disabled={
                    this.state.presentacion == "-----" ||
                    this.state.presentacion == ""
                  }
                  defaultValue={item.cantidad}
                />
              </div>

              <div className="row justify-content-center mt-1">
                <div className="col-5">
                  <label className="ml-5 mt-1">PVP</label>
                </div>
                <div className="col-5">
                  <label className="ml-5 mt-1">PVF</label>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-6">
                  <input
                    type="number"
                    onChange={this.handleInputChange}
                    className="form-control"
                    id="pvp_update"
                    min="0"
                    placeholder="PVP: 0.00"
                    defaultValue={item.pvp}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    onChange={this.handleInputChange}
                    className="form-control"
                    id="pvf_update"
                    min="0"
                    placeholder="PVF: 0.00"
                    defaultValue={item.pvf}
                  />
                </div>
              </div>

              <label className="ml-3 mt-1">Lote</label>
              <div className="col-12">
                <input
                  type="number"
                  id="lote_update"
                  onChange={this.handleInputChange}
                  className="form-control"
                  min="0"
                  placeholder="0000000"
                  defaultValue={item.lote}
                />
              </div>

              <label className="ml-3 mt-1">Registro Sanitario</label>
              <div className="col-12">
                <input
                  type="text"
                  id="registro_sanitario_update"
                  onChange={this.handleInputChange}
                  className="form-control"
                  placeholder="000-000-000"
                  defaultValue={item.registro_sanitario}
                />
              </div>

              <label className="ml-3 mt-1">Tipo de medidas</label>
              <div className="col-12">
                <select
                  className="form-control"
                  id="tipo_dosis_update"
                  onChange={this.handleInputChange}
                >
                  {["Miligramos", "Gramos", "Litros", "Mililitros"].map(
                    (item_t) => (
                      <option
                        key={item_t}
                        value={item_t}
                        selected={item_t == item.tipo_medida}
                      >
                        {item_t}
                      </option>
                    )
                  )}
                </select>
              </div>

              <label className="ml-3 mt-1">Medidas</label>
              <div className="col-12">
                <input
                  type="number"
                  id="dosis_update"
                  onChange={this.handleInputChange}
                  className="form-control"
                  min="0"
                  placeholder="000"
                  defaultValue={item.medida}
                />
              </div>

              <div className="row mt-2">
                <div className="col">
                  <label className="ml-3 mt-1">Fecha elaboracion</label>
                </div>
                <div className="col">
                  <label className="ml-3 mt-1">Fecha caducidad</label>
                </div>
              </div>

              <div className="row p-3">
                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_elaboracion_update"
                    onChange={this.handleInputChange}
                    defaultValue={item.fecha_elaboracion}
                  />
                </div>

                <div className="col-6">
                  <input
                    type="date"
                    className="form-control"
                    id="fecha_caducidad_update"
                    onChange={this.handleInputChange}
                    defaultValue={item.fecha_caducidad}
                  />
                </div>
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_product(item.id_producto)}
                  className="mt-2 form-control btn btn-primary"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        ))}
        {this.state.actualizado && <Notificacion text="Actualizando...." />}
      </>
    );
  }
}

EditProduct.prototypes = {
  editar_producto_completo: PropType.func,
};

const mapDistpachToProps = {
  editar_producto_completo,
};

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

export default connect(mapStateToProps, mapDistpachToProps)(EditProduct);
