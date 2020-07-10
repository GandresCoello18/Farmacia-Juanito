import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Producto from "./page/producto";
import DetalleProduct from "./page/detalles-productos";
import Stock from "./page/stock";
import Clientes from "./page/clientes";
import Graficos from "./page/graficos";
import Carrito from "./page/carrito";
import Ventas from "./page/ventas";
import Usuarios from "./page/usuarios";
import FlujoCaja from "./page/flujo-caja";
import Factura from "./page/factura";
import Proveedores from "./page/proveedores";
import Prestamos from "./page/prestamos";

import history from "./util/history";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/producto" component={Producto} />
          <Route exact path="/detalles-productos" component={DetalleProduct} />
          <Route exact path="/stock" component={Stock} />
          <Route exact path="/graficos" component={Graficos} />
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/carrito" component={Carrito} />
          <Route exact path="/ventas" component={Ventas} />
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/emitir-factura" component={Factura} />
          <Route exact path="/proveedores" component={Proveedores} />
          <Route exact path="/prestamos" component={Prestamos} />
          <Route exact path="/flujo-caja" component={FlujoCaja} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
