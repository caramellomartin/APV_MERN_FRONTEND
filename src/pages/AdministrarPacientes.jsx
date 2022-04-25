import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
import { useState } from "react";

function AdministrarPacientes() {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row">
        <button 
            type="button" 
            className="bg-indigo-500 text-white font-bold p-3 uppercase rounded-md mx-10 hover:bg-indigo-700 hover:cursor-pointer mb-10 md:hidden" 
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
        
        <div className={`${ mostrarFormulario ? "block" : "hidden" } md:block md:w-1/2 lg:w-2/5`}>
            <Formulario />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
            <ListadoPacientes />
        </div>
    </div>
  )
};

export default AdministrarPacientes