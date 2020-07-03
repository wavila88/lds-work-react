import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import React, { useState, Fragment,useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import './InfoNegocio.scss'
import { getSectores } from '../../../services/sectorService';
import EditorDescription from './EditorDescription';


const InfoNegocio = () => {

 
    //Listas
    const [sectores, setSectores] = useState();
    //Seleccionados
    const [sector, setSector] = useState('Seleccione');

   

    useEffect(() => {
        obtenerSectores();
    }, []);

    const obtenerSectores = async () => {
        try {
            debugger
            const res = await getSectores();
           const json = await res.json();
           var jsonString = JSON.stringify(json);
           jsonString = jsonString.replace(/"nombreSector":/g, "\"label\":");

           await setSectores(JSON.parse(jsonString));
        } catch (error) {
            console.error("Error Llamando ciudades", error);
        }

    }
  
    const onCarChange2 = (e) => {
     debugger
        setSector(e.value);
    };

    const carTemplate = (option) => {
        return option.label;
    };

    return (
        <Fragment>
            <div className="info__container">
                <h3>En que sector trabajas?</h3>
                <br />
                <div className="info__dropdown">
                
                    <Dropdown value={sector} options={sectores} onChange={onCarChange2} itemTemplate={carTemplate} style={{ width: '100%' }}
                        filter={true} filterPlaceholder="Seleccione sector" filterBy="_id,nombreSector" showClear={true} />
               
                </div>
                    <EditorDescription/>
            </div>
        </Fragment>
    );
}

export default InfoNegocio;