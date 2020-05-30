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
        descripcionServicios: item.descripcionServicios,
        celular: item.celular,
        correo: item.correo
    }),
  }).then((response) => {
    return response;
  }).catch((err) => err);
  return response;
};

export {postInsertInfo};
