
import variEntorno from '../../config/ENV.json';
import json from './json.json';

export class UsuarioService {

   async getUsuarios(){
    const url = `${variEntorno[process.env.REACT_APP_ENVIRONMENT].domainApi}` +
        'getUsers';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(res => res).catch(err => err)
    return response;
};


getCarsLarge() {
    return json;
}
}
