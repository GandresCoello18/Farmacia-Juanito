import React from "react";
import PropType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import moment from "moment";
import Preload from "../componentes/preload";
import Alerta from "../componentes/alert";
import Confirmacion from "../componentes/confirmacion";
import Edit from "../componentes/edit";
import { connect } from "react-redux";
import { fecha_actual } from "../util/fecha";

import {
  traer_prestamos,
  traer_prestamos_hoy,
} from "../actions/prestamoAction";

class Prestamos extends React.Component {
  state = {
    select_date_fecha: "",
  };

  componentDidMount() {
    if (this.props.PrestamoReducer.Prestamo.length == 0) {
      this.props.traer_prestamos();
    }
  }

  componentWillUnmount() {
    this.props.traer_prestamos();
  }

  select_fecha = (e) => {
    this.props.traer_prestamos_hoy(e.target.value);
    this.setState({
      select_date_fecha: e.target.value,
    });
  };

  load = () => <Preload />;

  render() {
    return (
      <>
        <Head titulo="Prestamos | Medical" />
        <Nav />

        <section className="container">
          <div className="row justify-content-center mt-1">
            <div className="col-12">
              <h4 className="text-center p-4" style={{ fontWeight: "bold" }}>
                Prestamos (
                {this.state.select_date_fecha == ""
                  ? "Todos"
                  : moment(this.state.select_date_fecha).format("LL")}
                )
              </h4>
            </div>
            <div className="col-2">
              <input
                type="date"
                onChange={this.select_fecha}
                className="form-control"
                max={fecha_actual()}
              />
            </div>
            <div className="col-8">
              <table className="table-striped mt-1 text-center">
                <thead>
                  <tr>
                    <th>Fecha prestamo</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.PrestamoReducer.cargar_prestamo ? (
                    <tr>
                      <td colSpan="4" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.PrestamoReducer.Prestamo.length == 0 ? (
                    <tr>
                      <td colSpan="4">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen Prestamos."
                        />
                      </td>
                    </tr>
                  ) : this.state.select_date_fecha == "" ? (
                    this.props.PrestamoReducer.Prestamo.map((item) => (
                      <tr key={item.id_prestamo}>
                        <td>{moment(item.fecha_prestamo).format("LL, LTS")}</td>
                        <td>{item.descripcion_prestamo}</td>
                        <td>$ {item.cantidad_prestamo}</td>
                        <td>
                          <Edit form="prestamo" data={item} />
                          <Confirmacion
                            tabla="prestamo"
                            id={item.id_prestamo}
                          />
                        </td>
                      </tr>
                    ))
                  ) : this.props.PrestamoReducer.Prestamo_por_fecha.length ==
                    0 ? (
                    <tr>
                      <td colSpan="4">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="No existen Prestamos para esta fecha."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.PrestamoReducer.Prestamo_por_fecha.map(
                      (item) => (
                        <tr key={item.id_prestamo}>
                          <td>
                            {moment(item.fecha_prestamo).format("LL, LTS")}
                          </td>
                          <td>{item.descripcion_prestamo}</td>
                          <td>$ {item.cantidad_prestamo}</td>
                          <td>
                            <Edit form="prestamo" data={item} />
                            <Confirmacion
                              tabla="prestamo"
                              id={item.id_prestamo}
                            />
                          </td>
                        </tr>
                      )
                    )
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

Prestamos.prototypes = {
  PrestamoReducer: PropType.object,
  traer_prestamos: PropType.func,
  traer_prestamos_hoy: PropType.func,
};

const mapStateToProps = ({ PrestamoReducer }) => {
  return { PrestamoReducer };
};

const mapDisPachToProps = {
  traer_prestamos,
  traer_prestamos_hoy,
};

export default connect(mapStateToProps, mapDisPachToProps)(Prestamos);
