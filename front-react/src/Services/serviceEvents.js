import api from './api';
import header from './header';

export const ServiceEvents = {
  getAll: () => {
    return api.get('/api/eventos', { headers: header })
        .then((responde) => responde.data)
        .catch((error) => error)
  },
}