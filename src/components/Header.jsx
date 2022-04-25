import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {

    const { cerrarSesion } = useAuth();

  return (
    <header className="py-10 bg-indigo-700">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-center text-2xl text-indigo-200">
                Administrador de Pacientes de {''} 
                <span className="text-white font-black"> Veterinaria</span>
            </h1>

            <nav className="flex flex-col lg:flex-row items-center mt-5 lg:mt-0 gap-4">
                <Link to="/admin" className="text-white text-sm uppercase font-bold hover:text-indigo-300">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-sm uppercase font-bold hover:text-indigo-300">Perfil</Link>
                <button
                    type="button"
                    className="text-white text-sm uppercase font-bold hover:text-red-400"
                    onClick={cerrarSesion}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </div>

    </header>
  )
}

export default Header