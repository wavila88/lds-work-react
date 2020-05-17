import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Formulario.css';

const Formaulario = () => {
  const [datos, setDatos] = useState({
    nombres: '',
    apellidos: '',
    areaProfesion: '',
    descripcion: ''
  })

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    debugger
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const enviarDatos = (event) => {
    event.preventDefault()
    console.log('enviando datos...' + datos.nombres + ' ' + datos.apellidos+ '')
  }

  return (
    <Fragment>
      <div className="formulario-container">
        <h1>Formulario</h1>
        <form onSubmit={enviarDatos}>
          <div className="form-group row">
            <label class="col-sm-2 col-form-label">Nombres</label>
            <div className="col-md-7">
              <input type="text" placeholder="Ingresa primer y segundo Nombre" className="form-control" onChange={handleInputChange} name="nombres"></input>
            </div>


          </div>
          <div className="form-group row">
            <label class="col-sm-2 col-form-label">Apellidos</label>
            <div className="col-md-7">
              <input type="text" placeholder="Ingresa tus Apellidos" className="form-control" onChange={handleInputChange} name="apellidos"></input>
            </div>
          </div>

          <div className="form-group row">
          <label class="col-sm-2 col-form-label">Area de Profesión</label>
          <div className="col-md-7">
          <select name="areaProfesion"  className="form-control" onChange={handleInputChange}> 
            <option value="1">Arreglos Hogar</option>
            <option value="2">Plomeria</option>
            <option value="3">Tecnologia</option>
          </select>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <div className="form-group row">
          <label class="col-sm-10  ol-form-label">Ingrese descripción sobre sus servicios.</label>
          <textarea className="form-control"  rows="10" name="descripcion"  onChange={handleInputChange} placeholder="Ingrese una descripción"></textarea>
          </div>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        <ul>
          <li>{datos.nombres}</li>
          <li>{datos.apellidos}</li>
          <li>{datos.areaProfesion}</li>
          <li>{datos.descripcion}</li>
        </ul>
      </div>
    </Fragment>
  );
}

export default Formaulario;
