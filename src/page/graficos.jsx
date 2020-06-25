import React from "react";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import Footer from "../componentes/footer";
import { exist_token } from "../util/verifi-local-token";
import { Line, Bar } from "react-chartjs-2";

class Graficos extends React.Component {
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
          label: "Productos vendidos al dia",
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
          label: "Monto del dia",
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
    data_ano: {
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
          label: "Productos vendidos al año",
          data: [
            Math.round(Math.random() * 220),
            Math.round(Math.random() * 318),
            Math.round(Math.random() * 320),
            Math.round(Math.random() * 519),
            Math.round(Math.random() * 320),
            Math.round(Math.random() * 420),
            Math.round(Math.random() * 518),
            Math.round(Math.random() * 420),
            Math.round(Math.random() * 149),
            Math.round(Math.random() * 520),
            Math.round(Math.random() * 220),
            Math.round(Math.random() * 430),
          ],
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 106, 86, 0.2)",
            "rgba(255, 199, 132, 0.2)",
            "rgba(54, 192, 235, 0.2)",
            "rgba(75, 162, 192, 0.2)",
            "rgba(153, 142, 255, 0.2)",
            "rgba(255, 119, 64, 0.2)",
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
    },
  };

  componentDidMount() {
    console.log(Math.round(Math.random() * 20));
  }

  render() {
    if (exist_token(Cookie.get("access_token")) == false) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Head titulo="Graficos" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center p-2">
            <div className="col-12 col-md-6">
              <h4 className="text-center p-2">Ventas de la semana</h4>

              <Line data={this.state.data} />
            </div>
            <div className="col-12 col-md-6">
              <h4 className="text-center p-2">Monto de ventas semanal</h4>

              <Line data={this.state.data} />
            </div>

            <br />

            <div className="col-12 mb-3">
              <h4 className="text-center">Ventas de productos mensual</h4>

              <Bar data={this.state.data_ano} />
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}

export default Graficos;
