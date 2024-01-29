import {httpAxios} from '../httpAxios';

export async function loginservice(username, password) {
  try {
    const response = await httpAxios.post('api/login', {username, password});
    return response.data;
  } catch (error) {
    console.error('HTTP Error:', error);
    throw new Error(`Login failed: ${error.message}`);
  }
}
