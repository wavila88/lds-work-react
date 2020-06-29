import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NombresApellidos.css';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

const NombresApellidos = () => {

    const history = useHistory()

    const enviarDatos = (event) => {
        event.preventDefault();
        sessionStorage.setItem("personal-info", JSON.stringify(formik.values));
        history.push('/ubicacion');
    }

    const validate = (event) => {
        let errors = {}
        debugger
        const values = event;
        if (!values.nombres) {
            errors.nombres = 'requerido'
        }
        if (!values.apellidos) {
            errors.apellidos = 'requerido'
        }
        if (!values.celular) {
            errors.celular = 'requerido'
        } else if(!/^([0-9])*$/i.test(values.celular)){
            errors.celular = 'Solo se permiten numeros'
        } else if (values.celular.substring(0,1) !== "3"){
            errors.celular = 'El numero celular inicia con 3 ';
        }
        else if(values.celular.length !== 10){
            errors.celular = 'Se permiten 10 numeros ';
        } 
        if (!values.correo) {
            errors.correo = 'requerido'

        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
            errors.correo = 'correo invalido';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            nombres: '',
            apellidos: '',
            celular: '',
            correo: ''
        },
        validate

    })
    console.log("Formik Values", formik.values)
    console.log("Formik Errors", formik.errors)

    return (<Fragment>
        <center><h2>Bienvenido para iniciar ingresa tus datos personales</h2></center>
        <br></br>
        <div className="center">
            <form onSubmit={enviarDatos}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Nombres</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tus nombres" className="form-control" onChange={formik.handleChange} value={formik.values.nombres} name="nombres"></input>
                        <div className="error"> {formik.errors.nombres}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Apellidos</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tus Apellidos" className="form-control" onChange={formik.handleChange} value={formik.values.apellidos} name="apellidos"></input>
                        <div className="error"> {formik.errors.apellidos}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"> Celular</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tu numero Celular" className="form-control" onChange={formik.handleChange} value={formik.values.celular} name="celular"></input>
                        <div className="error"> {formik.errors.celular}</div>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Correo</label>
                    <div className="col-md-7">
                        <input type="text" placeholder="Ingresa tu correo electronico" className="form-control" onChange={formik.handleChange} value={formik.values.correo} name="correo"></input>
                        <div className="error"> {formik.errors.correo}</div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Continuar</button>
            </form>
        </div>
    </Fragment >);
}

export default NombresApellidos;