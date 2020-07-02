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

            <table
              className="table-striped text-center mt-5"
              style={{ fontSize: 20 }}
            >
              <thead>
                <tr>
                  <th>Vendidos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="badge-success">26</td>
                  <td className="badge-success">200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              EGRESOS
            </h4>

            <table
              className="table-striped text-center mt-5"
              style={{ fontSize: 20 }}
            >
              <thead>
                <tr>
                  <th>Egresos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="badge-warning">26</td>
                  <td className="badge-warning">200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-3 mt-3">
            <h4 className="text-center" style={{ fontWeight: "bold" }}>
              SALDOS
            </h4>

            <table
              className="table-striped text-center mt-5"
              style={{ fontSize: 20 }}
            >
              <thead>
                <tr>
                  <th>Saldo Neto</th>
                  <th>Saldo acumulado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="badge-info">26</td>
                  <td className="badge-info">200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default FlujoCajaHoy;
