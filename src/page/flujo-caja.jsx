import React from "react";
import PropType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import moment from "moment";
import FlujoCajaYear from "../componentes/flujo-caja-year";
import FlujoCajaHoy from "../componentes/flujo-caja-hoy";
import { connect } from "react-redux";
import Preload from "../componentes/preload";
import Alerta from "../componentes/alert";
import { fecha_actual, ano_actual } from "../util/fecha";

class FlujoCaja extends React.Component {
  state = {
    comienzo_ano: 2020,
    select_year: "",
  };

  componentDidMount() {
    moment().lang("es");
    for (let i = this.state.comienzo_ano; i <= ano_actual(); i++) {
      let option = document.createElement("option");
      option.innerText = i;
      document.getElementById("select_year").appendChild(option);
    }
  }

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
                onChange={this.select_data_for_year}
                id="select_year"
              >
                <option>{moment(fecha_actual()).format("LL")} (Hoy)</option>
              </select>
            </div>
          </div>

          {this.state.select_year == "" ||
          this.state.select_year ==
            `${moment(fecha_actual()).format("LL")} (Hoy)` ? (
            <FlujoCajaHoy />
          ) : (
            <FlujoCajaYear />
          )}
        </section>
      </>
    );
  }
}

export default FlujoCaja;
