import React from "react";
import PropsType from "prop-types";
import moment from "moment";
import "../assest/css/factura.css";

class Factura extends React.Component {
  state = {
    productos: [],
    desc: 0,
    iva: 0,
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const productos = urlParams.get("productos");

    this.setState({
      productos: JSON.parse(productos),
      desc: urlParams.get("descuento"),
      iva: urlParams.get("iva"),
      total: urlParams.get("total"),
      efectivo: urlParams.get("efectivo"),
      cambio: urlParams.get("cambio"),
    });
  }

  render() {
    return (
      <>
        <section className="container">
          <div className="row">
            <div className="col-2">
              <h4 className="fecha-factura">
                {moment(new Date()).format("LL, LTS")}
              </h4>
              <table className="table-factura">
                <thead>
                  <tr>
                    <th className="fila-head">Cant</th>
                    <th className="fila-head">Product</th>
                    <th className="fila-head">Sub</th>
                    <th className="fila-head">Iva</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productos.map((item) => (
                    <tr>
                      <td className="fila-body">{item.unidades}</td>
                      <td className="fila-body">{item.product_name}</td>
                      <td className="fila-body">$ {item.item_total}</td>
                      <td className="fila-body">
                        {item.iva ? this.state.iva : 0} %
                      </td>
                    </tr>
                  ))}
                </tbody>
                <br />
                <thead>
                  <tr>
                    <th className="fila-head">Desc</th>
                    <th className="fila-head">Total</th>
                    <th className="fila-head">Efect</th>
                    <th className="fila-head">Cambio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fila-body">{this.state.desc} %</td>
                    <td className="fila-body">$ {this.state.total}</td>
                    <td className="fila-body">$ {this.state.efectivo}</td>
                    <td className="fila-body">$ {this.state.cambio}</td>
                  </tr>
                </tbody>
              </table>

              <span className="cliente-factura">
                <b>Cliente:</b> consumidor final
              </span>

              <p className="span-factura">¡GRACIAS POR SU COMPRA!</p>

              <button
                className="btn-factura oculto-impresion"
                onClick={() => window.print()}
              >
                Imprimir factura
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Factura;
