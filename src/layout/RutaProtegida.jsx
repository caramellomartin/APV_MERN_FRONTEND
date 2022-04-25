import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return 'cargando...';

    //En la linea de auth ? <Outlet ..., dice que si auth tiene algo entonces muestra el outlet, sino entonces, utiliza el componente Navigate y nos manda a iniciar sesion
  return (
    <>
        <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            ): <Navigate to="/" />}
        <Footer /> 
    </>
       
  )
};

export default RutaProtegida