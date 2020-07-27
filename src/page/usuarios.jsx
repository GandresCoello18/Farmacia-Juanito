import React from "react";
import PropType from "prop-types";
import Head from "../componentes/head";
import Nav from "../componentes/nav";
import { connect } from "react-redux";
import Confir from "../componentes/confirmacion";
import Edit from "../componentes/edit";
import Preload from "../componentes/preload";
import Alerta from "../componentes/alert";
import Footer from "../componentes/footer";

import { traer_usuarios } from "../actions/usuariosActions";

class Usuarios extends React.Component {
  componentDidMount() {
    if (this.props.usuariosReducer.usuarios.length == 0) {
      this.props.traer_usuarios();
    }
  }

  load = () => <Preload />;

  render() {
    return (
      <>
        <Head titulo="Usuarios | Medical" />
        <Nav />

        <section className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10">
              <table className="table-striped text-center mt-5">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Tipo de usuario</th>
                    <th>Email</th>
                    <th>Email Verificado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.usuariosReducer.cargando ? (
                    <tr>
                      <td colSpan="5" className="p-2">
                        {this.load()}
                      </td>
                    </tr>
                  ) : this.props.usuariosReducer.usuarios.length == 0 ? (
                    <tr>
                      <td colSpan="5">
                        <Alerta
                          titulo="No existen datos para mostrar"
                          contenido="Por el momento no existen usuarios."
                        />
                      </td>
                    </tr>
                  ) : (
                    this.props.usuariosReducer.usuarios.map((valor) => (
                      <tr key={valor.id_user}>
                        <td>
                          {valor.nombres} {valor.apellidos}
                        </td>
                        <td
                          className={
                            valor.tipo_user == "Administrador"
                              ? "alert-danger"
                              : "badge-warning"
                          }
                        >
                          {valor.tipo_user}
                        </td>
                        <td>{valor.email}</td>
                        <td
                          className={
                            valor.email_on == 1
                              ? "alert-success"
                              : "alert-danger"
                          }
                        >
                          {valor.email_on == 1 ? "Verificado" : "No Verificado"}
                        </td>
                        <td>
                          <Edit form="usuarios" data={valor} />
                          <Confir id={valor.id_user} tabla="usuarios" />
                        </td>
                      </tr>
                    ))
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

Usuarios.prototypes = {
  traer_usuarios: PropType.func,
  usuariosReducer: PropType.object,
};

const mapStateToProps = ({ usuariosReducer }) => {
  return { usuariosReducer };
};

const mapDispatchToProps = {
  traer_usuarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios);
