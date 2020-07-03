import React from "react";

class Notificacion extends React.Component {
  componentDidMount() {
    console.log(document.getElementById("notificacion").click());
  }

  render() {
    return (
      <>
        <x-button style={{ minHeight: 0 }} id="notificacion">
          <x-label></x-label>
          <x-notification timeout="3000">{this.props.text}</x-notification>
        </x-button>
      </>
    );
  }
}

export default Notificacion;
