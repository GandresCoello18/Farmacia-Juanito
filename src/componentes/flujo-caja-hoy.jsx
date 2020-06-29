import React from "react";

class FlujoCajaHoy extends React.Component {
  render() {
    return (
      <>
        <div className="row justify-content-center">
          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              INGRESOS
            </h4>

            <table className="table-striped text-center mt-5">
              <thead>
                <tr>
                  <th>Vendidos</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tr>
                <td>26</td>
                <td>200</td>
              </tr>
              <tbody></tbody>
            </table>
          </div>

          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              EGRESOS
            </h4>

            <table className="table-striped text-center mt-5">
              <thead>
                <tr>
                  <th>Vendidos</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tr>
                <td>26</td>
                <td>200</td>
              </tr>
              <tbody></tbody>
            </table>
          </div>

          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              SALDOS
            </h4>

            <table className="table-striped text-center mt-5">
              <thead>
                <tr>
                  <th>Vendidos</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tr>
                <td>26</td>
                <td>200</td>
              </tr>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default FlujoCajaHoy;
