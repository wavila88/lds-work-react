import React, { useState } from 'react';
import {Editor} from "primereact/editor";
import {Button} from "primereact/button";
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';

function EditorDescription() {
    const [text1, setText1] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');
    const [text2, setText2] = useState('');

    const header = (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );

    return (
        <div>
            <h3 className="first">Default</h3>
            <Editor style={{height:'320px'}} value={text1} onTextChange={(e)=> setText1(e.htmlValue)}/>
            <p>Value: {text1 ||'empty'}</p>
            <Button label="Clear" icon="pi pi-times" onClick={()=> setText1('')}/>

            <hr/>

            <h3 className="first">Custom Toolbar</h3>
            <Editor headerTemplate={header} style={{height:'320px'}} value={text2} onTextChange={(e)=> setText2(e.htmlValue)}/>
            <p>Value: {text2 ||'empty'}</p>
            <Button label="Clear" icon="pi pi-times" onClick={() => setText2('')}/>
        </div>
    );
}

export default EditorDescription;