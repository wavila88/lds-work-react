import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import React, { useState, Fragment, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './InfoNegocio.scss'
import { getSectores } from '../../../services/sectorService';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import {postInsertInfo} from '../../../services/data.insertinfo';
import CargarImagen from '../CargarImagen/CargarImagen';



const InfoNegocio = () => {


    //Listas
    const [sectores, setSectores] = useState();

    const history = useHistory();

    useEffect(() => {
        obtenerSectores();
    }, []);

    const obtenerSectores = async () => {
        try {
            const res = await getSectores();
            const json = await res.json();
            var jsonString = JSON.stringify(json);
            jsonString = jsonString.replace(/"nombreSector":/g, "\"label\":");

            await setSectores(JSON.parse(jsonString));
        } catch (error) {
            console.error("Error Llamando ciudades", error);
        }

    }


    const carTemplate = (option) => {
        return option.label;
    };
    const validate = (event) => {
        let errors = {}
        const values = event;
        if (!values.sector) {
            errors.sector = 'requerido'
        }
        if (!values.descripcion) {
            errors.descripcion = 'requerido'
        }
    
        return errors;
    }; 

    const formik = useFormik({
        initialValues: {
            sector: '',
            descripcion: '<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>'
        },
        validate

    })


    const enviarDatos = (event) => {
        event.preventDefault();
        const json = JSON.parse(sessionStorage.getItem("personal-info"));
        json.descripcion = formik.values.descripcion;
        json.sector = formik.values.sector;
      
        sessionStorage.setItem("personal-info",JSON.stringify(json));
        postInsertInfo(json);

        history.push('/');
    }
    return (
        <Fragment>
            <div className="info__container">
                <h3>En que sector trabajas?</h3>
                <br />
                <div className="info__dropdown">
                    <Dropdown value={formik.values.sector} name="sector" options={sectores} onChange={formik.handleChange} itemTemplate={carTemplate} style={{ width: '100%' }}
                        filter={true} filterPlaceholder="Seleccione sector" filterBy="label" showClear={true} />
                </div>
                <div>
                    <h3 className="first">Cuentanos de tus servicios</h3>
                    <Editor style={{ height: '320px' }} value={formik.values.descripcion} name="descripcion" onChange={formik.handleChange} />
                    <Button label="Enviar Info" icon="pi pi-check" disabled={!(formik.isValid && formik.dirty)}  onClick={enviarDatos} />
                    <CargarImagen></CargarImagen>
                </div>
            </div>
        </Fragment>
    );
}

export default InfoNegocio;