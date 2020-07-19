import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import React, { useState, Fragment, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './InfoNegocio.scss'
import { getSectores } from '../../../services/sectorService';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { postInsertInfo } from '../../../services/data.insertinfo';




const InfoNegocio = () => {



    const [sectores, setSectores] = useState();
    const [imagen, setImagen] = useState('');
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

    const encodeImageFileAsURL = (element) => {
        debugger
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT', reader.result)
            setImagen(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        const json = JSON.parse(sessionStorage.getItem("personal-info"));
        json.descripcion = formik.values.descripcion;
        json.sector = formik.values.sector;
        json.imagen = imagen
        sessionStorage.setItem("personal-info", JSON.stringify(json));
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
                    <h3 className="first">Ingresa una Imagen con la cual puedan reconocer lo que haces.</h3>
                    <div className="info__send">
                        <input type="file" id="file" onChange={(e) => encodeImageFileAsURL(e.target)} />
                    </div>
                    <div className="info__send">
                        <Button label="Enviar Info" icon="pi pi-check" disabled={!(formik.isValid && formik.dirty)} onClick={enviarDatos} />
                    </div>
                    <div className="info__img_data">
                        <img className="info__image" src={imagen} srcSet={imagen} alt={""} ></img>

                    </div>
                    <div className="info__btn">

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default InfoNegocio;