import React from 'react';
import "../assest/css/detalle-card.css";


const DetallesCard = () => {
    return(
        <>
            <div className="row detalles-compra">
                <div className="col-12">
                    <img src="img/medicamento/paracetamol.jpg" alt="..." />
                </div>
                <div className="col-12">
                    <div className="card-body">
                        <h5 className="card-title">Producto</h5>
                        <ul>
                            <li>Cliente: Consumido final</li>
                            <li>Total: $ 45.30</li>
                        </ul>
                        <span>Vendido el dia: Martes 19 de Abril</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetallesCard;