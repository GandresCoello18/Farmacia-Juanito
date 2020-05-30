import React from "react";
import Notificacion from "../componentes/notificacion";

class confirmacion extends React.Component {
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
                    setTimeout(
                      () => this.setState({ notificacion: false }),
                      3000
                    );
                  }}
                >
                  <x-button toggled id="agree-button">
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

export default confirmacion;
