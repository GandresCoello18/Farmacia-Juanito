import React from "react";
import PropsType from "prop-types";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import GraficoVentaDia from "../componentes/grafico-estadistico-ventas-por-dia";
import { Redirect } from "react-router-dom";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import { exist_token } from "../util/verifi-local-token";
import { Line, Bar } from "react-chartjs-2";

import {
  ganancia_del_mes_por_ano,
  estadistica_ventas_por_semana,
} from "../actions/estadisticasActions";
import { fecha_actual } from "../util/fecha";

class Graficos extends React.Component {
  state = {
    data_ganancia_por_mes: [],
    data_ganancia_por_semana: [],
    data_count_por_semana: [],
    data_label_por_semana: [],
  };

  componentDidMount() {
    this.props.ganancia_del_mes_por_ano().then(() => {
      this.setState({
        data_ganancia_por_mes: this.props.EstadisticaReducer
          .estadisticas_ganacias_por_mes,
      });
    });

    this.props.estadistica_ventas_por_semana(fecha_actual()).then(() => {
      let semana_statistics = this.props.EstadisticaReducer
        .estadisticas_por_semana;
      this.setState({
        data_label_por_semana: semana_statistics[0],
        data_ganancia_por_semana: semana_statistics[1],
        data_count_por_semana: semana_statistics[2],
      });
    });
  }

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Graficos Estadisticos" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center p-2">
            <div className="col-12 col-md-6">
              <h4 className="text-center p-2">Ventas de la semana</h4>

              <Line
                data={{
                  labels: this.state.data_label_por_semana,
                  datasets: [
                    {
                      label: "Productos vendidos al dia",
                      data: this.state.data_count_por_semana,
                      backgroundColor: [
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                    {
                      label: "Monto del dia",
                      data: this.state.data_ganancia_por_semana,
                      backgroundColor: [
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <h4 className="text-center p-2">
                Productos vendidos y monto obtenido
              </h4>

              <GraficoVentaDia fecha={fecha_actual()} />
            </div>

            <br />

            <div className="col-12 mb-3">
              <h4 className="text-center">Ganacias de cada mes</h4>

              <Bar
                data={{
                  labels: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre",
                  ],
                  datasets: [
                    {
                      label: "Ganacias del año",
                      data: this.state.data_ganancia_por_mes,
                      backgroundColor: [
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(255, 106, 86, 0.6)",
                        "rgba(255, 199, 132, 0.6)",
                        "rgba(54, 192, 235, 0.6)",
                        "rgba(75, 162, 192, 0.6)",
                        "rgba(153, 142, 255, 0.6)",
                        "rgba(255, 119, 64, 0.6)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

Graficos.prototypes = {
  EstadisticaReducer: PropsType.object,
  ganancia_del_mes_por_ano: PropsType.func,
  estadistica_ventas_por_semana: PropsType.func,
};

const mapStateToProps = ({ EstadisticaReducer }) => {
  return { EstadisticaReducer };
};

const mapDispatchToProps = {
  ganancia_del_mes_por_ano,
  estadistica_ventas_por_semana,
};

export default connect(mapStateToProps, mapDispatchToProps)(Graficos);
