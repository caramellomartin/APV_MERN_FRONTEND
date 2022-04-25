import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  //Almacenamos el password con un State
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);


  const params = useParams();
  //Extraemos el token que nos trae params
  const { token } = params;

  //Para que el token sea válido una sola vez, usamos un useEffect
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
      
        setAlerta({
          msg: 'Coloca tu nuevo password'
        });

        setTokenValido(true); 
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace...',
          error: true
        })
      }
    }
    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    
    if([password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacíos...', error: true });
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({ msg: 'Oops, los password no coinciden...', error: true });
      return;
    }

    if(password.length < 6) {
      setAlerta({ msg: 'El password es muy corto, agrega como mínimo 6 caracteres...', error: true });
      return;
    }
    setAlerta({});

    //Interactuamos con la API
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
   
      setAlerta({
        msg: data.msg
      });
      //Para que aparezca el enlace para iniciar sesion luego de modificar correctamente el password
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Password y no pierdas acceso a tus <span className="text-black"> Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg && <Alerta 
          alerta={alerta}
        />}

        { tokenValido && (
          <>
            <form
            onSubmit={ handleSubmit }>
              <div className="my-5">
                <label className="uppercase text-gray-700 block text-xl font-bold">
                  Nueva Password
                </label>
                <input 
                  type="password" 
                  placeholder="Tu Nueva Password" 
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={ e => setPassword(e.target.value) }
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-700 block text-xl font-bold">
                  Repetir tu Nueva Password
                </label>
                <input 
                  type="password" 
                  placeholder="Repite tu Nueva Password" 
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={repetirPassword}
                  onChange={ e => setRepetirPassword(e.target.value) }
                />
              </div>

              <input type="submit" value="Cambiar Password" className="bg-indigo-500 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
            </form>
          </>
        )}

        {passwordModificado &&
          <Link 
          className='block text-center my-5 text-gray-500 hover:cursor-pointer hover:text-indigo-800 hover:font-semibold'              
          to="/">Iniciar Sesión</Link>
        }
        
      </div>
    </>
  )
}

export default NuevoPassword