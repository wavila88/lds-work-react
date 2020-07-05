import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Ubicacion.scss';
import { useHistory } from 'react-router-dom';
import { getCiudades } from '../../../services/ciudadesService';
import { getEstacas } from '../../../services/estacaService';
import { getBarrios } from '../../../services/barrioService';
import { useFormik } from 'formik';



const UbicacionComponent = () => {


    //Listas
    const [ciudades, setCiudades] = useState();
    const [estacas, setEstacas] = useState();
    const [barrios, setBarrios] = useState();


    const obtenerCiudades = async () => {
        try {
            const res = await getCiudades();
            setCiudades(await res.json());
        } catch (error) {
            console.error("Error Llamando ciudades", error);
        }

    }
    const obtenerEstacas = async () => {
        try {
            const res = await getEstacas();
            setEstacas(await res.json());
        } catch (error) {
            console.error("Error Llamando estacas", error);
        }
    }
    const obtenerBarrios = async (item) => {
        try {
            const res = await getBarrios(item);
            setBarrios(await res.json());
        } catch (error) {
            console.error("Error Llamando Barrios", error);
        }
    }
    useEffect(() => {
        obtenerCiudades();
        obtenerEstacas();

    }, []);
    const history = useHistory();

    const enviarDatos = (event) => {
        event.preventDefault();
        const json = JSON.parse(sessionStorage.getItem("personal-info"));
        json.ciudad = formik.values.ciudad;
        json.estaca = formik.values.estaca;
        json.barrio = formik.values.barrio;
        sessionStorage.setItem("personal-info",JSON.stringify(json));

        history.push('/negocio');
    }
    //Listas 
    let showCiudades = '';
    if (typeof ciudades !== 'undefined') {
        showCiudades = ciudades.map((ciudad, index) => {
            return <option key={index} value={ciudad._id}>{ciudad.nombreCiudad}</option>;
        });
    }
    let showEstacas = '';
    if (typeof estacas !== 'undefined') {
        showEstacas = estacas.map((es, index) => {
            return <option key={index} value={es._id}>{es.nombreEstaca}</option>;
        });
    }

    let showBarrios = '';
    if (typeof barrios !== 'undefined') {
        showBarrios = barrios.map((es, index) => {
            return <option key={index} value={es._id}>{es.nombreBarrio}</option>;
        });
    }

    //Eventos de selección

    const chooseStake = (event) => {
        formik.values.estaca = event.target.value;
        obtenerBarrios(event.target.value);
    }

    //Validaciones
    const validate = (event) => {
        let errors = {}
        const values = event;
        if (!values.ciudad) {
            errors.ciudad = 'requerido'
        }
        if (!values.estaca) {
            errors.estaca = 'requerido'
        }
        if (!values.barrio) {
            errors.barrio = 'requerido'
        }
        return errors;
    }; 

    const formik = useFormik({
        initialValues: {
            ciudad: '',
            estaca: '',
            barrio: ''
            
        },
        validate

    })

    return (<Fragment>
        <center><h2>Datos de Ubicación</h2></center>
        <br></br>
        <div className="center">
            <form onSubmit={enviarDatos}>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Ciudad</label>
                    <div className="col-md-7">
                        <select className="form-control" value={formik.values.ciudad} name="ciudad" onChange={formik.handleChange}>
                        <option selected="true">{showCiudades !== '' ? 'Seleccione' : 'Cargando...' }</option>
                            {showCiudades}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Estaca</label>
                    <div className="col-md-7">
                        <select className="form-control" value={formik.values.estaca}  name="estaca"  onChange={chooseStake}>
                            <option selected="true">{showEstacas !== '' ? 'Seleccione' : 'Cargando...' }</option>
                            {showEstacas}
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label class="col-sm-2 col-form-label">Barrio</label>
                    <div className="col-md-7">
                        <select className="form-control" name="barrio"  disabled={showBarrios !== '' ? false : true } value={formik.values.barrio}  onChange={formik.handleChange}>
                        <option selected="true" >Seleccione</option>
                            {showBarrios}
                        </select>
                    </div>
                </div>
                <button disabled={!(formik.isValid && formik.dirty)}  type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
    </Fragment >);
}

export default UbicacionComponent;