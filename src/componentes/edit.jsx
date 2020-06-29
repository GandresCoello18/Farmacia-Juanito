import React from "react";
import PropType from "prop-types";
import EditUsuario from "../componentes/form-edit/edit-usuarios";

class Edit extends React.Component {
  state = {
    styles: {
      dialog: {
        width: 300,
        height: "100%",
        right: 0,
        left: "auto",
      },
      btn_amarillo: {
        borderColor: "#fcaa0e",
        borderBottomColor: "#fcaa0e",
        backgroundColor: "#fcaa0e",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2,
        color: "#000",
      },
    },
  };

  render() {
    return (
      <>
        <button
          className="btn btn-mini ml-2"
          style={{ backgroundColor: "trasparent" }}
        >
          <x-button style={this.state.styles.btn_amarillo}>
            <x-label>Editar</x-label>
            <dialog style={this.state.styles.dialog}>
              {this.props.form == "usuarios" && (
                <EditUsuario data={this.props.data} />
              )}
            </dialog>
          </x-button>
        </button>
      </>
    );
  }
}

EditUsuario.prototypes = {
  form: PropType.string,
  data: PropType.object,
};

export default Edit;
