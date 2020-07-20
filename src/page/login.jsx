import React from "react";
import PropsType from "prop-types";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import Spinner from "../componentes/preload";
import Notificacion from "../componentes/notificacion";
import { exist_token } from "../util/verifi-local-token";
import { Redirect } from "react-router-dom";
import Head from "../componentes/head";

import {
  crear_cuenta,
  restaurar_user,
  login,
} from "../actions/usuariosActions";

class Login extends React.Component {
  state = {
    // registro data
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    password_confir: "",
    Autorizacion: "",
    notificacion: false,
    text_notificacion: "",

    // login data
    email_login: "",
    password_login: "",
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  crear_cuenta = async () => {
    if (
      this.state.nombres === "" ||
      this.state.apellidos === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.password_confir === "" ||
      this.state.Autorizacion === ""
    ) {
      this.cambio_notificacion(
        true,
        "Tienes campos vacios, revisa y vuelve a intentarlo"
      );
    } else {
      if (this.state.password === this.state.password_confir) {
        if (this.state.password.length >= 7) {
          const data = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            email: this.state.email,
            password: this.state.password,
            tipo: "",
          };

          this.props.crear_cuenta(data, this.state.Autorizacion);
          document.getElementById("create_cuenta").reset();
        } else {
          this.cambio_notificacion(
            true,
            "Se necesita 7 o mas caracteres en las contraseñas"
          );
        }
      } else {
        this.cambio_notificacion(
          true,
          "Las contraseñas no son iguales, revise y vuelva ha intentarlo"
        );
      }
    }
  };

  cambio_notificacion = (visible, text) => {
    this.setState({
      notificacion: visible,
      text_notificacion: text,
    });
    setTimeout(() => this.setState({ notificacion: false }), 3000);
  };

  btn_login = async () => {
    if (this.state.email_login == "" || this.state.password_login == "") {
      this.cambio_notificacion(
        true,
        "Se encontraron campos vacios en login, revise y vuelva ha intentarlo"
      );
    } else {
      this.props
        .login(this.state.email_login, this.state.password_login)
        .then(() => {
          this.props.restaurar_user();
        });
    }
  };

  render() {
    if (exist_token(Cookie.get("access_token")) == true) {
      return <Redirect to="/stock" />;
    }
    return (
      <>
        <Head titulo="Login" />

        <div className="window">
          <div className="window-content contaienr-fluid window-login">
            <div className="pane-group capa_oscura_login">
              <div className="pane ">
                <header className="toolbar toolbar-header">
                  <h1 className="title">Crear Cuenta</h1>
                </header>

                <div className="row justify-content-center">
                  <div className="col-10">
                    <form id="create_cuenta">
                      <h2 className="text-center">Registro</h2>
                      <div className="row">
                        <div className="col">
                          <label>Nombres:</label>
                          <input
                            type="text"
                            onChange={this.handleInputChange}
                            name="nombres"
                            className="form-control"
                            placeholder="Ingrese sus nombres"
                          />
                        </div>
                        <div className="col">
                          <label>Apellidos:</label>
                          <input
                            type="text"
                            onChange={this.handleInputChange}
                            name="apellidos"
                            className="form-control"
                            placeholder="Ingrese sus apellidos"
                          />
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <label>Email:</label>
                        <input
                          type="email"
                          onChange={this.handleInputChange}
                          name="email"
                          className="form-control"
                          placeholder="Ingrese su correo electronico"
                        />
                      </div>
                      <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                          type="password"
                          onChange={this.handleInputChange}
                          name="password"
                          className="form-control"
                          placeholder="Ingrese una clave con 7 o mas caracteres"
                        />
                      </div>
                      <div className="form-group">
                        <label>Confirmar Contraseña:</label>
                        <input
                          type="password"
                          onChange={this.handleInputChange}
                          name="password_confir"
                          className="form-control"
                          placeholder="Vuelva ha ingresar su contrasena"
                        />
                      </div>

                      <div className="form-group">
                        <label>Clave de Autorizacion:</label>
                        <input
                          type="password"
                          onChange={this.handleInputChange}
                          name="Autorizacion"
                          className="form-control"
                          placeholder="Ingrese la clave aqui.!"
                        />
                        <p>
                          <b>
                            Si no cuenta con una clave, pidale al usuario
                            administrador.
                          </b>
                        </p>
                      </div>

                      <div className="form-group">
                        <button
                          type="button"
                          onClick={this.crear_cuenta}
                          className="btn btn-primary mb-3 pull-right"
                        >
                          Crear esta cuenta
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="pane">
                <header className="toolbar toolbar-header">
                  <h1 className="title">INICIAR SESSION</h1>
                </header>

                <div className="row justify-content-center">
                  <div className="col-10">
                    <form style={{ textAlign: "center", top: 100 }}>
                      <h2 className="text-center">Iniciar Session</h2>
                      <div className="form-group">
                        <label>Usuario o Email</label>
                        <input
                          type="email"
                          onChange={this.handleInputChange}
                          name="email_login"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          onChange={this.handleInputChange}
                          name="password_login"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          onClick={this.btn_login}
                          className="btn btn-primary form-control mb-3 pull-right"
                        >
                          Entrar
                        </button>
                      </div>
                      {this.props.usuariosReducer.cargando && (
                        <div style={{ padding: 10 }}>
                          <Spinner />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.notificacion && (
          <Notificacion text={this.state.text_notificacion} />
        )}

        {this.props.usuariosReducer.error != "" &&
          alert(`Error: ${this.props.usuariosReducer.error}`)}
        {this.props.usuariosReducer.token != "" &&
          (Cookie.set("access_token", this.props.usuariosReducer.token),
          (window.location.href = "/stock"))}
        {this.props.usuariosReducer.mensaje != "" &&
          alert(`${this.props.usuariosReducer.mensaje}`)}
      </>
    );
  }
}

Login.prototypes = {
  crear_cuenta: PropsType.func,
  restaurar_user: PropsType.func,
  login: PropsType.func,
};

const mapStateToProps = ({ usuariosReducer }) => {
  return { usuariosReducer };
};

const mapDispatchToProps = {
  crear_cuenta,
  login,
  restaurar_user,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
