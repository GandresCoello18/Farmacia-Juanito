import React from "react";
import { Helmet } from "react-helmet";

class Head extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>{this.props.titulo} | Farmacia Juanito</title>
          <link rel="stylesheet" href="css/photon.css" />
          <link rel="stylesheet" href="css/login.css" />
          <link rel="stylesheet" href="css/bootstrap-grid.css" />
          <link rel="stylesheet" href="css/macos.css" />
          <link rel="stylesheet" href="css/icon.css" />
          <script src="js/xel.min.js"></script>
        </Helmet>
      </>
    );
  }
}

export default Head;
