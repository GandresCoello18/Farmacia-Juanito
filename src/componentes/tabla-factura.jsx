import React from "react";
import "../assest/css/factura.css";
import moment from "moment";
import PropsType from "prop-types";

class TablaFactura extends React.Component {
  render() {
    return (
      <>
        <h4 className="fecha-factura">
          {moment(new Date()).format("LL, LTS")}
        </h4>
        <table className="table-factura">
          <thead>
            <tr>
              <th className="fila-head">Cant</th>
              <th className="fila-head">Product</th>
              <th className="fila-head">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fila-body">5</td>
              <td className="fila-body">Paracetamol</td>
              <td className="fila-body">$ 12.5</td>
            </tr>
            <tr>
              <td className="fila-body">5</td>
              <td className="fila-body">Paracetamol</td>
              <td className="fila-body">$ 12.5</td>
            </tr>
            <tr>
              <td className="fila-body">5</td>
              <td className="fila-body">Paracetamol</td>
              <td className="fila-body">$ 12.5</td>
            </tr>
            <tr>
              <td className="fila-body">5</td>
              <td className="fila-body">Paracetamol</td>
              <td className="fila-body">$ 12.5</td>
            </tr>
          </tbody>
          <br />
          <thead>
            <tr>
              <th className="fila-head">Sub</th>
              <th className="fila-head">Desc</th>
              <th className="fila-head">Iva</th>
              <th className="fila-head">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fila-body">$ 59</td>
              <td className="fila-body">0 %</td>
              <td className="fila-body">12 %</td>
              <td className="fila-body">$ 64</td>
            </tr>
          </tbody>
        </table>

        <span className="span-factura">¡GRACIAS POR SU COMPRA!</span>

        <button className="btn-factura" onClick={() => window.print()}>
          Imprimir factura
        </button>
      </>
    );
  }
}

export default TablaFactura;
