import variEntorno from '../config/ENV.json';



const postInsertInfo = async (item) => {
  const url = `${variEntorno[process.env.REACT_APP_ENVIRONMENT].domainApi}` +
  'User';
 const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombres: item.nombres,
        apellidos: item.apellidos,
        descripcionServicios: item.descripcion,
        celular: item.celular,
        correo: item.correo,
        sector: item.sector._id,
        nombreEstaca: item.estaca,
        nombreBarrio : item.barrio,
        nombreCiudad : item.ciudad,       
        imagen : item.imagen
    }),
  }).then((response) => {
    return response;
  }).catch((err) => err);
  return response;
};

const getUser = async (item) =>{
  const url = `${variEntorno[process.env.REACT_APP_ENVIRONMENT].domainApi}` +
  'getUser';
 const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        correo: item.correo,
    }),
  }).then(res => res).catch(err => err)
  return response
};

export {postInsertInfo
      , getUser};
