import React from "react";
import PropType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import moment from "moment";
import { Link } from "react-router-dom";
import FlujoCajaYear from "../componentes/flujo-caja-year";
import FlujoCajaHoy from "../componentes/flujo-caja-hoy";
import PrestamoBtn from "../componentes/btn-prestamo";
import { connect } from "react-redux";
import Preload from "../componentes/preload";
import Alerta from "../componentes/alert";
import { fecha_actual } from "../util/fecha";

class FlujoCaja extends React.Component {
  state = {
    comienzo_ano: 2020,
    select_year: "",
    select_fecha: "",
    select_tipo_date: "",
  };

  componentDidMount() {
    moment().lang("es");
    this.setState({
      select_fecha: fecha_actual(),
      select_tipo_date: "por fecha",
    });
  }

  /*insertar_option = () => {
    for (let i = this.state.comienzo_ano; i <= ano_actual(); i++) {
      let option = document.createElement("option");
      option.innerText = i;
      document.getElementById("select_year").appendChild(option);
    }
  }*/

  select_for_tipo_date = (e) => {
    this.setState({
      select_tipo_date: e.target.value,
    });
  };

  select_data_for_year = (e) => {
    this.setState({
      select_year: e.target.value,
      select_tipo_date: "por ano",
    });
  };

  select_fecha = (e) => {
    this.setState({
      select_fecha: e.target.value,
      select_tipo_date: "por fecha",
    });
  };

  render() {
    return (
      <>
        <Head titulo="Flujo de caja | Medical" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-2 p-2 mt-2">
              <select
                className="form-control"
                onChange={this.select_for_tipo_date}
              >
                <option value="por fecha">Por fecha</option>
                <option value="por ano">Por año</option>
              </select>
            </div>
            <div className="col-2 p-2 mt-2">
              {this.state.select_tipo_date == "por ano" ? (
                <select
                  className="form-control"
                  onChange={this.select_data_for_year}
                  id="select_year"
                >
                  <option>0000</option>
                  <option>2020</option>
                  <option>2021</option>
                </select>
              ) : (
                <input
                  type="date"
                  className="form-control"
                  max={fecha_actual()}
                  onChange={this.select_fecha}
                />
              )}
            </div>
            <div className="col-2 p-2 mt-2">
              <PrestamoBtn />
            </div>
            <div className="col-2 p-2 mt-2">
              <Link to="/prestamos" className="btn btn-mini btn-primary">
                Ver prestamos
              </Link>
            </div>
          </div>

          {this.state.select_tipo_date == "por fecha" ? (
            <FlujoCajaHoy fecha={this.state.select_fecha} />
          ) : (
            <FlujoCajaYear />
          )}
        </section>

        <Footer />
      </>
    );
  }
}

export default connect(null, null)(FlujoCaja);
