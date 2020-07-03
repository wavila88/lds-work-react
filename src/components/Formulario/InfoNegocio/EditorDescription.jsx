import React, { useState } from 'react';
import {Editor} from "primereact/editor";
import {Button} from "primereact/button";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';

function EditorDescription() {
    const [text, setText] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');
    


    return (
        <div>
            <h3 className="first">Cuentanos de tus servicios</h3>
            <Editor style={{height:'320px'}} value={text} onTextChange={(e)=> setText(e.htmlValue)}/>
            <p>Value: {text ||'empty'}</p>
            <Button label="Clear" icon="pi pi-times" onClick={() => setText('')}/>
        </div>
    );
}

export default EditorDescription;