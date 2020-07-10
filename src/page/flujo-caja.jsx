import React from "react";
import PropType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import moment from "moment";
import FlujoCajaYear from "../componentes/flujo-caja-year";
import FlujoCajaHoy from "../componentes/flujo-caja-hoy";
import PrestamoBtn from "../componentes/btn-prestamo";
import { connect } from "react-redux";
import Preload from "../componentes/preload";
import Alerta from "../componentes/alert";
import { fecha_actual } from "../util/fecha";

import { traer_prestamos_hoy } from "../actions/prestamoAction";

class FlujoCaja extends React.Component {
  state = {
    comienzo_ano: 2020,
    select_year: "",
    select_tipo_date: "por ano",
  };

  componentDidMount() {
    moment().lang("es");
    if (this.props.PrestamoReducer.Prestamo_hoy.length == 0) {
      this.props.traer_prestamos_hoy(fecha_actual());
    }
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
                <option value="por ano">Por año</option>
                <option value="por fecha">Por fecha</option>
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
                />
              )}
            </div>
            <div className="col-2 p-2 mt-2">
              <PrestamoBtn />
            </div>
          </div>

          {this.state.select_year == "" || this.state.select_year == "0000" ? (
            <FlujoCajaHoy />
          ) : (
            <FlujoCajaYear />
          )}
        </section>
      </>
    );
  }
}

FlujoCaja.prototypes = {
  traer_prestamos_hoy: PropType.func,
};

const mapDisPachToProsp = {
  traer_prestamos_hoy,
};

const mapStateToProsp = ({ PrestamoReducer }) => {
  return { PrestamoReducer };
};

export default connect(mapStateToProsp, mapDisPachToProsp)(FlujoCaja);
