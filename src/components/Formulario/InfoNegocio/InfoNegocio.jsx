import React, {useState } from 'react';
import {MultiSelect} from 'primereact/multiselect';
import EditorDescription from './EditorDescription';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';


function InfoNegocio() {
    const [cars1, setCars1] = useState([]);


    const cars = [
        {label: 'Audi', value: 'Audi'},
        {label: 'BMW', value: 'BMW'},
        {label: 'Fiat', value: 'Fiat'},
        {label: 'Honda', value: 'Honda'},
        {label: 'Jaguar', value: 'Jaguar'},
        {label: 'Mercedes', value: 'Mercedes'},
        {label: 'Renault', value: 'Renault'},
        {label: 'VW', value: 'VW'},
        {label: 'Volvo', value: 'Volvo'}
    ];

    return (
        <div className="multiselect-demo">
            <h3>Basic</h3>
            <MultiSelect value={cars1} options={cars} onChange={(e) => setCars1(e.value)}
                    style={{minWidth:'15em'}} filter={true} filterPlaceholder="Search" placeholder="Choose" />

            <EditorDescription/>
        </div>
    );
}

export default InfoNegocio;