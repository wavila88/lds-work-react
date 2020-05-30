import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NombresApellidos.css';
import {useHistory} from 'react-router-dom';

function NombresApellidos() {

    const [datos, setDatos] = useState({
        nombres: '',
        apellidos: '',
        celular: '',
        correo: ''
    });

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
        sessionStorage.setItem("personal-info",JSON.stringify(datos));

        history.push('/negocio');
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

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    </Fragment >);
}

export default NombresApellidos;