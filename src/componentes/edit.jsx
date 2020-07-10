import React from "react";
import PropType from "prop-types";
import EditCliente from "../componentes/form-edit/edit-cliente";
import EditUsuario from "../componentes/form-edit/edit-usuarios";
import EditPrincipioActivo from "../componentes/form-edit/edit-principio-activo";
import EditProductName from "../componentes/form-edit/edit-name-product";
import EditLaboratorio from "../componentes/form-edit/edit-name-laboratorio";
import EditProduct from "../componentes/form-edit/edit-producto";
import EditProveedor from "../componentes/form-edit/edit-proveedor";
import EditProductProveedor from "../componentes/form-edit/edit-producto-proveedor";
import EditPrestamo from "../componentes/form-edit/edit-prestamo";

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
              {this.props.form == "cliente" && (
                <EditCliente data={this.props.data} />
              )}
              {this.props.form == "principio_activo" && (
                <EditPrincipioActivo data={this.props.data} />
              )}
              {this.props.form == "product_name" && (
                <EditProductName data={this.props.data} />
              )}
              {this.props.form == "laboratorio" && (
                <EditLaboratorio data={this.props.data} />
              )}
              {this.props.form == "stock" && (
                <EditProduct data={this.props.data} />
              )}
              {this.props.form == "proveedor" && (
                <EditProveedor data={this.props.data} />
              )}
              {this.props.form == "detalles_pp" && (
                <EditProductProveedor data={this.props.data} />
              )}
              {this.props.form == "prestamo" && (
                <EditPrestamo data={this.props.data} />
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
