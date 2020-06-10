import React from "react";
import Cookie from "js-cookie";
import moment from "moment";
import { domain } from "../util/verifi-local-token";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Alerta from "../componentes/alert";
import * as ActionsUser from "../actions/usuariosActions";

class Nav extends React.Component {
  state = {
    cantidad_carrito: 0,
    notificaciones_de_actividades: [],
  };

  styles = {
    dialog: {
      width: "30vw",
      height: "70vh",
      left: 0,
      right: "auto",
      top: "auto",
      color: "white",
      background: "#f5f5f4",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      opacity: 0.95,
      border: "solid",
      borderColor: "#326960",
      borderWidth: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
  };

  componentDidMount() {
    moment.lang("es");

    this.props.history_session();

    if (this.state.cantidad_carrito == 0) {
      document.getElementById("btn-carrito").classList.add("btn-negative");
    }

    let pathnombre = window.location.pathname;
    let item_menu = document.querySelectorAll(".tab-item");

    switch (pathnombre) {
      case "/":
        item_menu[0].classList.add("active");
        break;
      case "/producto":
        item_menu[1].classList.add("active");
        break;
      case "/stock":
        item_menu[2].classList.add("active");
        break;
      case "/ventas":
        item_menu[3].classList.add("active");
        break;
      case "/graficos":
        item_menu[4].classList.add("active");
        break;
      case "/clientes":
        item_menu[5].classList.add("active");
        break;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let btn_carrito = document.getElementById("btn-carrito");
    if (nextState.cantidad_carrito == 0) {
      btn_carrito.classList.add("btn-negative");
      btn_carrito.classList.remove("btn-positive");
    } else {
      btn_carrito.classList.remove("btn-negative");
      btn_carrito.classList.add("btn-positive");
    }
  }

  cerrar_session = () => {
    Cookie.remove("access_token");
    window.location.href = "/login";
  };

  render() {
    return (
      <>
        <div className="tab-group">
          <Link to="/" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 50, fontSize: 20 }}
            >
              house
            </span>
            <b style={{ fontSize: 14 }}>Inicio</b>
          </Link>
          <Link to="/producto" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 20, fontSize: 20 }}
            >
              local_offer
            </span>
            <b style={{ fontSize: 14 }}>Mis Productos</b>
          </Link>
          <Link to="/stock" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 20, fontSize: 20 }}
            >
              add_circle
            </span>
            <b style={{ fontSize: 14 }}>Agregar Stock</b>
          </Link>
          <Link to="/ventas" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 40, fontSize: 20 }}
            >
              store
            </span>
            <b style={{ fontSize: 14 }}>Ventas</b>
          </Link>
          <Link to="/graficos" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 30, fontSize: 20 }}
            >
              insert_chart
            </span>
            <b style={{ fontSize: 14 }}>Graficos</b>
          </Link>
          <Link to="/clientes" className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 30, fontSize: 20 }}
            >
              people
            </span>
            <b style={{ fontSize: 14 }}>Clientes</b>
          </Link>
          <div className="tab-item">
            <span
              className="material-icons"
              style={{ position: "absolute", left: 30, fontSize: 20 }}
            >
              attach_money
            </span>
            <b style={{ fontSize: 14 }}>Flujo de caja</b>
          </div>

          <div className="tab-item tab-item-fixed">
            <span className="icon icon-plus"></span>
          </div>
        </div>

        <div className="row justify-content-end" style={{ padding: 10 }}>
          <div className="col-4">
            <x-button
              style={{
                cursor: "pointer",
              }}
            >
              <span className="material-icons" style={{ marginRight: 5 }}>
                restore
              </span>
              <x-label>Historial Session</x-label>
              <dialog style={this.styles.dialog}>
                <h3 className="text-center p-2">Historial Session</h3>
                <ul className="list-group">
                  {this.props.userHistoryReducer.historySession ? (
                    this.props.userHistoryReducer.historySession.map(
                      (valor) => (
                        <li
                          className="list-group-item"
                          key={valor.id_historial_session}
                        >
                          <img
                            className="img-circle media-object pull-left"
                            src={`${domain()}/static/${valor.foto}`}
                            width="32"
                            height="32"
                          />
                          <div className="media-body">
                            <strong>
                              {valor.nombres} {valor.apellidos}
                            </strong>{" "}
                            &nbsp; &nbsp;
                            <span className="p-1">
                              Email: <b>{valor.email}</b>
                            </span>
                            <p>
                              <b>
                                Ultima coneccion:{" "}
                                {moment(valor.fecha_session).format("LL, LT")}
                              </b>
                              .
                            </p>
                          </div>
                        </li>
                      )
                    )
                  ) : (
                    <Alerta
                      titulo="Aviso"
                      contenido="Registro de sesiones vacio."
                    />
                  )}
                </ul>
              </dialog>
            </x-button>
          </div>

          <div className="col-5">
            <x-button
              style={{
                cursor: "pointer",
              }}
            >
              <span className="material-icons" style={{ marginRight: 5 }}>
                sort
              </span>
              <x-label>Notificacion de actividades</x-label>
              <dialog style={this.styles.dialog}>
                <h3 className="text-center p-2">Actividades</h3>
                <ul className="list-group">
                  {this.state.notificaciones_de_actividades &&
                    this.state.notificaciones_de_actividades.map((valor) => (
                      <li className="list-group-item"></li>
                    ))}
                </ul>
              </dialog>
            </x-button>
          </div>

          <div className="col-1">
            <Link
              to="/carrito"
              id="btn-carrito"
              className="btn"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <span className="material-icons">local_grocery_store</span>
              <b style={{ fontSize: 24 }}>{this.state.cantidad_carrito}</b>
            </Link>
          </div>

          <div className="col-2">
            <button
              onClick={this.cerrar_session}
              className="btn btn-mini btn-negative"
            >
              Cerrar Session
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ userHistoryReducer }) => {
  return { userHistoryReducer };
};

export default connect(mapStateToProps, ActionsUser)(Nav);
