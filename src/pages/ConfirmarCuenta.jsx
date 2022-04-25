import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {

        const url = `/veterinarios/confirmar/${id}`;
        //DATA es la respuesta que nos dara siempre AXIOS(por default es axios.get())
        const { data } = await clienteAxios(url);
        console.log(data);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a Administrar tus <span className="text-black"> Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white content-center'>
        {!cargando && 
          <Alerta 
            alerta={alerta}
          />}

        {cuentaConfirmada && (
          <Link 
          className="block text-center py-3 rounded-xl text-Black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-500 hover:text-white md:w-auto"              
          to="/">Iniciar Sesión</Link>
        )}    
      </div>
    </>
  )
}

export default ConfirmarCuenta