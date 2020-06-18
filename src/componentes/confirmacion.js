import React from "react";
import PropType from "prop-types";
import Notificacion from "../componentes/notificacion";
import { connect } from "react-redux";
import { eliminar_producto } from "../actions/productoAction";
import { eliminar_cliente } from "../actions/clienteAction";
import { eliminar_venta } from "../actions/ventasActios";

class Confirmacion extends React.Component {
  state = {
    styles: {
      btn_rojo: {
        borderColor: "#fb2f29",
        borderBottomColor: "#fb1710",
        backgroundColor: "#fb2f29",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2,
        color: "#fff",
      },
    },
    notificacion: false,
  };

  close = () => {
    for (var i = 0; i < document.querySelectorAll("dialog").length; i++) {
      document.querySelectorAll("dialog")[i].close();
    }
  };

  eliminar = (id, tabla) => {
    switch (tabla) {
      case "productos":
        this.props.eliminar_producto(id);
        break;
      case "cliente":
        this.props.eliminar_cliente(id);
        break;
      case "producto_factura":
        this.props.eliminar_venta(id);
    }
  };

  render() {
    return (
      <>
        <button
          className="btn btn-mini ml-2"
          style={{ backgroundColor: "trasparent" }}
        >
          <x-button style={this.state.styles.btn_rojo}>
            <x-label>Eliminar</x-label>

            <dialog>
              <main>
                <h3>¿Estas seguro que quieres eliminar este elemento?</h3>
                <p style={{ color: "#000" }}>
                  No prodras recupararlo una vez eliminado
                </p>
              </main>

              <footer>
                <span onClick={this.close}>
                  <x-button id="disagree-button">
                    <x-label>Cancelar</x-label>
                  </x-button>
                </span>

                <span
                  onClick={() => {
                    this.close();
                    this.setState({ notificacion: true });
                    /*setTimeout(
                      () => this.setState({ notificacion: false }),
                      3000
                    );*/
                  }}
                >
                  <x-button
                    toggled
                    id="agree-button"
                    onClick={() =>
                      this.eliminar(this.props.id, this.props.tabla)
                    }
                  >
                    <x-label>Si eliminar</x-label>
                  </x-button>
                </span>
              </footer>
            </dialog>
          </x-button>
        </button>

        {this.state.notificacion && <Notificacion text="Elemento eliminado" />}
      </>
    );
  }
}

Confirmacion.prototypes = {
  eliminar_producto: PropType.func,
  eliminar_cliente: PropType.func,
  eliminar_venta: PropType.func,
};

const mapDispachToProps = {
  eliminar_producto,
  eliminar_cliente,
  eliminar_venta,
};

export default connect(null, mapDispachToProps)(Confirmacion);
