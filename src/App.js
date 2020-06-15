import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Producto from "./page/producto";
import Stock from "./page/stock";
import Clientes from "./page/clientes";
import Graficos from "./page/graficos";
import Carrito from "./page/carrito";
import Ventas from "./page/ventas";
import history from "./util/history";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/producto" component={Producto} />
          <Route exact path="/stock" component={Stock} />
          <Route exact path="/graficos" component={Graficos} />
          <Route exact path="/clientes" component={Clientes} />
          <Route exact path="/carrito" component={Carrito} />
          <Route exact path="/ventas" component={Ventas} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
