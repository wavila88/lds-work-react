import variEntorno from '../config/ENV.json';



const getEstacas = async (item) => {
  const url = `${variEntorno[process.env.REACT_APP_ENVIRONMENT].domainApi}` +
  'estaca';
 const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  
  }).then(res => res).catch(err => err)
  return  response;
};

export {getEstacas};
