import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {

  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState({});


  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlerta({ msg: 'El Email es obligatorio', error: true });
      return;
    }

    try {
      //data es la respuesta que nos va a dar axios - clienteAxios ya va a traer la url hasta la api
      //como es de tipo JSON abrimos llaves para que sea un objeto y le pasamos el email: email
      const { data } = await clienteAxios.post('veterinarios/olvide-password', { email });
      setAlerta({ msg: data.msg });
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Restaura tu <span className="text-black"> Contraseña</span></h1>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          
          { msg && <Alerta 
            alerta={alerta}
          />}

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-700 block text-xl font-bold">
                Email de la cuenta
              </label>
              <input 
                type="email" 
                placeholder="Escribe tu email" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Enviar Instrucciones al Mail" className="bg-indigo-500 w-full py-3 px-5 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>

            <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
                className='block text-center my-5 text-gray-500 hover:cursor-pointer hover:text-indigo-800 hover:font-semibold'              
                to="/">Ya tienes una cuenta? Inicia Sesión!</Link>
            <Link 
                className='block text-center my-5 text-gray-500 hover:cursor-pointer hover:text-indigo-800 hover:font-semibold'              
                to="/registrar">No tienes una cuenta? Regístrate!</Link>
            </nav>
          </form>
        </div>
      </div>

      <div>
        <img src="/passwordRecovery.png" alt="Recuperar contraseña" />
      </div>
    
    </>
  )
}

export default OlvidePassword