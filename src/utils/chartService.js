import tokenService from './tokenService'

const BASE_URL = '/api/charts/'

export default {
    index,
    create,
    deleteOne
}

function index() {
  console.log('in index')
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    };
    return fetch(BASE_URL, options).then(res => res.json());
  }

function deleteOne(_id) {
  console.log('in delete', `${BASE_URL}${_id}`)
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      body: {_id: _id}
    };
    return fetch(`${BASE_URL}${_id}`, options).then(res => res.json());
  }
  
  function create(chartDetails) {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // Add this header - don't forget the space after Bearer
        'Authorization': 'Bearer ' + tokenService.getToken()
      },
      body: JSON.stringify(chartDetails)
    };
    return fetch(BASE_URL, options).then(res => res.json());
  }

