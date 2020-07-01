import React from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

import { estadisticas_de_ventas_por_dia } from "../actions/estadisticasActions";
import { traer_ventas } from "../actions/ventasActios";

class EstadisticaVentasPorDia extends React.Component {
  state = {
    labels: [],
    monto: [],
    countProduct: [],
  };

  componentDidMount() {
    if (this.props.ventasReducer.ventas.length == 0) {
      this.props.traer_ventas();
    }

    this.obtener_datos(this.props.fecha);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.fecha != this.props.fecha) {
      this.obtener_datos(nextProps.fecha);
    }
  }

  obtener_datos = (fecha) => {
    this.props.estadisticas_de_ventas_por_dia(fecha).then(() => {
      let statistics = this.props.EstadisticaReducer.estadisticas_por_dia;

      this.setState({
        labels: statistics[0],
        countProduct: statistics[2],
        monto: statistics[1],
      });
    });
  };

  render() {
    return (
      <>
        <Line
          data={{
            labels: this.state.labels,
            datasets: [
              {
                label: "Productos vendidos",
                data: this.state.countProduct,
                backgroundColor: [
                  `rgba(255, 206, 86, 0.2)`,
                  `rgba(255, 99, 132, 0.2)`,
                  `rgba(54, 162, 235, 0.2)`,
                  `rgba(75, 192, 192, 0.2)`,
                  `rgba(153, 102, 255, 0.2)`,
                  `rgba(255, 159, 64, 0.2)`,
                ],
                borderColor: [
                  `rgba(255, 99, 132, 1)`,
                  `rgba(54, 162, 235, 1)`,
                  `rgba(255, 206, 86, 1)`,
                  `rgba(75, 192, 192, 1)`,
                  `rgba(153, 102, 255, 1)`,
                  `rgba(255, 159, 64, 1)`,
                ],
                borderWidth: 2,
              },
              {
                label: "Monto obtenido",
                data: this.state.monto,
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
                borderWidth: 2,
              },
            ],
          }}
        />
      </>
    );
  }
}

EstadisticaVentasPorDia.PropsTypes = {
  ventasReducer: PropsType.object,
  EstadisticaReducer: PropsType.object,
  estadisticas_de_ventas_por_dia: PropsType.func,
  traer_ventas: PropsType.func,
};

const mapStateToProps = ({ ventasReducer, EstadisticaReducer }) => {
  return { ventasReducer, EstadisticaReducer };
};

const mapDispachToProps = {
  estadisticas_de_ventas_por_dia,
  traer_ventas,
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(EstadisticaVentasPorDia);
