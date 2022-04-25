import axios from "axios";
import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";


const PacienteContext = createContext();

export const PacienteProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const obetenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        }
        obetenerPacientes();
    }, []);

    const guardarPaciente = async (paciente) => {
        
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );
                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
    
                //Va a crear un objeto sin los 3 primeros antes del spread operator
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
    
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('Confirmar la eliminación del Paciente?');
        
        if(confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
                //Traera a todos los states que tengan el id diferente al id que eliminamos
                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id );
                
                setPacientes(pacientesActualizado);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}

        </PacienteContext.Provider>
    )
}



export default PacienteContext