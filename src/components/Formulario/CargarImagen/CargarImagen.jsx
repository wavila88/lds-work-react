import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './CargarImagen.scss';


import React, { useRef } from 'react';
import {Growl} from 'primereact/growl';
import {FileUpload} from 'primereact/fileupload';

const CargarImagen = () => {
    let growl = useRef(null);
    const demo = [];

    const onUpload = (e) => {
        debugger
        growl.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    return (
        <div>
            <h3>Advanced</h3>
            <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload}
                        multiple={true} accept="image/*" maxFileSize={1000000} />

           
            <Growl ref={growl}></Growl>
        </div>
    )
}
                
export default CargarImagen;