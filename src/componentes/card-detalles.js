import React from "react";
import PropType from "prop-types";
import moment from "moment";
import "../assest/css/detalle-card.css";

const DetallesCard = ({ id_factura, data }) => {
  return (
    <>
      {data.map(
        (item) =>
          item.id_factura == id_factura && (
            <div className="row detalles-compra" key={item.id_producto_fac}>
              <div className="col-12">
                <div className="card-body">
                  <h5 className="card-title text-center">Detalles</h5>
                  <ul>
                    <li>
                      <b>Cliente:</b>{" "}
                      {item.nombres == "consumidor_final"
                        ? item.nombres
                        : `${item.nombres} - ${item.apellidos}`}
                    </li>
                    <li>
                      <b>Principio Activo:</b> {item.principio_activo}
                    </li>
                    <li>
                      <b>Producto:</b> {item.product_name}
                    </li>
                    <li>
                      <b>Laboratorio:</b> {item.nombre_laboratorio}
                    </li>
                    <li>
                      <b>Presentacion:</b> {item.presentacion}
                    </li>
                    <li>
                      <b>Medidas:</b> {item.medida} {item.tipo_medida}
                    </li>
                    <li>
                      <b>Cantidad:</b> {item.cantidad}
                    </li>
                    <li>
                      <b>Formato:</b> {item.formato}
                    </li>
                    <li>
                      <b>Unidades:</b> {item.fact_cant}
                    </li>
                    <li>
                      <div className="row justify-content-center">
                        <div className="col-5">
                          <b>PVP:</b> {item.pvp}
                        </div>
                        <div className="col-5">
                          <b>PVF:</b> {item.pvf}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <br />
                  <span className="fecha-vendido">
                    Vendido en:{" "}
                    <b>{moment(item.fecha_factura).format("LL, LTS")}</b>
                  </span>
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
};

DetallesCard.prototypes = {
  data: PropType.array,
  id_factura: PropType.string,
};

export default DetallesCard;
