import React from "react";
import PropsType from "prop-types";
import { exist_token } from "../util/verifi-local-token";
import Nav from "../componentes/nav";
import Cookie from "js-cookie";
import Alerta from "../componentes/alert";
import { connect } from "react-redux";
import Load from "../componentes/preload";
import Confir from "../componentes/confirmacion";
import Footer from "../componentes/footer";
import Head from "../componentes/head";
import { Redirect } from "react-router-dom";
import {
  obtener_principio_activo,
  obterner_name_productos,
  obterner_name_laboratorio,
} from "../actions/productoAction";

class DetallesProduct extends React.Component {
  componentDidMount() {
    if (this.props.ProductoReducer.Producto_Name.length == 0) {
      this.props.obterner_name_productos();
    }
    if (this.props.ProductoReducer.Principio_activo.length == 0) {
      this.props.obtener_principio_activo();
    }
    if (this.props.ProductoReducer.Laboratorio_Name.length == 0) {
      this.props.obterner_name_laboratorio();
    }
  }

  load = () => {
    return <Load />;
  };

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Detalles de productos | Medical" />
        <Nav />

        <section className="container p-3">
          <div className="row justify-content-center">
            <div className="col-12" style={{ marginBottom: 10 }}>
              <h4 className="text-center" style={{ fontWeight: "bold" }}>
                Detalles de ( Productos, Principio Activo, Laboratorio )
              </h4>
            </div>
            <div className="col-4">
              <table className="table-striped text-center">
                <thead>
                  <tr>
                    <th>Active Principle</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.carga_principio_activo ? (
                    <tr>
                      <td colSpan="3" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Principio_activo.length ==
                    0 ? (
                    <tr>
                      <td colSpan="3">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Principios activos."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Principio_activo.map((valor) => (
                      <tr key={valor.id_principio_activo}>
                        <td>{valor.principio_activo}</td>
                        <td>
                          <button
                            className="btn btn-mini btn-warning"
                            style={{ cursor: "pointer" }}
                          >
                            <span className="material-icons">description</span>
                          </button>
                        </td>
                        <td>
                          <Confir
                            id={valor.id_principio_activo}
                            tabla="principio_activo"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <table className="table-striped text-center">
                <thead>
                  <tr>
                    <th>Name Product</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.cargar_name_product ? (
                    <tr>
                      <td colSpan="3" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Producto_Name.length == 0 ? (
                    <tr>
                      <td colSpan="3">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Nombres de productos."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Producto_Name.map((valor) => (
                      <tr key={valor.id_product_name}>
                        <td>{valor.product_name}</td>
                        <td>
                          <button
                            className="btn btn-mini btn-warning"
                            style={{ cursor: "pointer" }}
                          >
                            <span className="material-icons">description</span>
                          </button>
                        </td>
                        <td>
                          <Confir
                            id={valor.id_product_name}
                            tabla="nombre_producto"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-4">
              <table className="table-striped text-center">
                <thead>
                  <tr>
                    <th>Laboratory</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.ProductoReducer.carga_laboratorio ? (
                    <tr>
                      <td colSpan="3" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.ProductoReducer.Laboratorio_Name.length ==
                    0 ? (
                    <tr>
                      <td colSpan="3">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Nombres de laboratorio."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.ProductoReducer.Laboratorio_Name.map((valor) => (
                      <tr key={valor.id_name_laboratorio}>
                        <td>{valor.nombre_laboratorio}</td>
                        <td>
                          <button
                            className="btn btn-mini btn-warning"
                            style={{ cursor: "pointer" }}
                          >
                            <span className="material-icons">description</span>
                          </button>
                        </td>
                        <td>
                          <Confir
                            id={valor.id_name_laboratorio}
                            tabla="nombre_laboratorio"
                          />
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

DetallesProduct.prototypes = {
  obtener_principio_activo: PropsType.func,
  obterner_name_productos: PropsType.func,
  obterner_name_laboratorio: PropsType.func,
  ProductoReducer: PropsType.object,
};

const mapDispachToProps = {
  obtener_principio_activo,
  obterner_name_productos,
  obterner_name_laboratorio,
};

const mapStateToProps = ({ ProductoReducer }) => {
  return { ProductoReducer };
};

export default connect(mapStateToProps, mapDispachToProps)(DetallesProduct);
