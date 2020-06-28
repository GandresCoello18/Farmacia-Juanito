import React from "react";
import { Line } from "react-chartjs-2";

class EstadisticaVentasPorDia extends React.Component {
  state = {
    data: {
      labels: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domindo",
      ],
      datasets: [
        {
          label: "Productos vendidos",
          data: [
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 18),
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 19),
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 30),
          ],
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
          label: "Monto obtenido",
          data: [
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 18),
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 19),
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 20),
            Math.round(Math.random() * 30),
          ],
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
    },
  };
  render() {
    return (
      <>
        <Line data={this.state.data} />
      </>
    );
  }
}

export default EstadisticaVentasPorDia;
