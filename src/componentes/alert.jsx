import React from "react";

const Alerta = ({ titulo, contenido }) => {
  return (
    <>
      <x-card>
        <main className="text-center">
          <strong>
            {titulo} <span className="material-icons">error_outline</span>
          </strong>
          <p>{contenido}</p>
        </main>
      </x-card>
    </>
  );
};

export default Alerta;
