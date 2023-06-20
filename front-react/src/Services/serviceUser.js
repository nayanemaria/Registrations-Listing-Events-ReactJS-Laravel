import api from './api';
import header from './header';
import {message} from 'antd';

export const ServiceUser = {
    save: (values) => {
        return api.post('/api/create', JSON.stringify(values), {headers: header})
        .then((response) => {
            message.success('Inscrição realizada com sucesso!', 2);
          })
          .catch((error) => {
            if (!(error.response && error.response.data && error.response.data.message)) {
                const errorMessage = 'Não foi possível se inscrever, pois você já tem um evento marcado para a mesma data.';
                message.error(errorMessage, 3);
              }
          });
    },     
    getAll: () => {
        return api.get('/api/', {headers: header})
            .then((responde) => responde.data)
            .catch((error) => message.error(error))
    },

    uppdate: (userEdit) => {
        api.put(`/api/update/${userEdit?.id}`, JSON.stringify(userEdit), {headers: header})
            .then((response) => {
                message.success('Dados atualizados com sucesso!', 2);
            })
            .catch((error) => message.error(error))
    },
    delete: (userId) => {
        return api.delete(`/api/delete/${userId}`, {headers: header})
            .then((response) =>response.data)
            .catch((error) => message.error(error))
    }
};