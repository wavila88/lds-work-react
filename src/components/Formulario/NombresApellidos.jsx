import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NombresApellidos.css';
import { useHistory } from 'react-router-dom';
import { getCiudades } from '../../services/ciudadesService';
import { getEstacas } from '../../services/estacaService';
import { getBarrios } from '../../services/barrioService';



const NombresApellidos = () => {

    const [datos, setDatos] = useState({
        nombres: '',
        apellidos: '',
        celular: '',
        correo: '',
    });
    //Listas
    const [ciudades, setCiudades] = useState();
    const [estacas, setEstacas] = useState();
    const [barrios, setBarrios] = useState();
    //Seleccionados
    const [ciudad, setCiudad] = useState();
    const [estaca, setEstaca] = useState();
    const obtenerCiudades = async () => {
        const res = await getCiudades();
        setCiudades(await res.json());
    }
    const obtenerEstacas = async () => {
        const res = await getEstacas();
        setEstacas(await res.json());

    }
    const obtenerBarrios = async (item) => {
        const res = await getBarrios(item);
        setBarrios(await res.json());

    }
    useEffect(() => {
        obtenerCiudades();
        obtenerEstacas();

    }, []);
    const history = useHistory();


    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        sessionStorage.setItem("personal-info", JSON.stringify(datos));

        history.push('/negocio');
    }
    //Listas 
    let showCiudades  = '';
    if (typeof ciudades !== 'undefined') {
        showCiudades = ciudades.map((ciudad, index) => {
          return  <option key={index} value={ciudad._id}>{ciudad.nombreCiudad}</option>;
        });
    }
    let showEstacas  = '';
    if (typeof estacas !== 'undefined') {
        showEstacas = estacas.map((es, index) => {
          return  <option key={index} value={es._id}>{es.nombreEstaca}</option>;
        });
    }

    //Eventos de selección
    const chooseCity = (event) => {
        setCiudad(event.target.value);
      }
      const chooseStake = (event) => {
        setEstaca(event.target.value);
        obtenerBarrios(event.target.value);
      }
    
    

    return (<Fragment>
        <center><h2>Bienvenido para iniciar ingresa tus datos personales</h2></center>
        <br></br>
        <div className="center">
            <form onSubmit={enviarDatos}>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Nombres</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tus nombres" className="form-control" onChange={handleInputChange} name="nombres"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Apellidos</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tus Apellidos" className="form-control" onChange={handleInputChange} name="apellidos"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label"> Celular</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tu numero Celular" className="form-control" onChange={handleInputChange} name="celular"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Correo</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tu correo electronico" className="form-control" onChange={handleInputChange} name="correo"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Ciudad</label>
                    <div className="col-md-7">
                        <select className="form-control" value={ciudad} onChange={chooseCity}>
                            {showCiudades}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Estaca</label>
                    <div className="col-md-7">
                        <select className="form-control" value={ciudad} onChange={chooseStake}>
                            {showEstacas}
                        </select>
                    </div>
                </div>  
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    </Fragment >);
}

export default NombresApellidos;