import React from "react";

class EditUsuario extends React.Component {
  update_user = (id_user) => {
    console.log(id_user);
  };

  render() {
    return (
      <>
        {[this.props.data].map((item) => (
          <form className="p-2">
            <h4
              style={{
                fontWeight: "bold",
                padding: 7,
                backgroundColor: "#0866dc",
                color: "#fff",
              }}
            >
              Editar Usuario
            </h4>

            <div className="row">
              <label className="ml-3 mt-2">Nombres:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  placeholder="nuevo nombre"
                  defaultValue={item.nombres}
                />
              </div>

              <label className="ml-3 mt-2">Apellidos:</label>
              <div className="col-12">
                <input
                  className="form-control"
                  placeholder="nuevo apellido"
                  defaultValue={item.apellidos}
                />
              </div>

              <label className="ml-3 mt-2">Verificar Email:</label>
              <div className="col-12">
                <select className="form-control">
                  <option>Escoger</option>
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-12">
                <button
                  type="button"
                  onClick={() => this.update_user(item.id_user)}
                  className="mt-2 form-control btn btn-primary"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        ))}
      </>
    );
  }
}

export default EditUsuario;
