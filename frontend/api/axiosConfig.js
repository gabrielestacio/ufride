import axios from 'axios';

// SUBSTITUA 'SEU_IP_LOCAL' PELO IP DA SUA MÁQUINA NA REDE LOCAL
const API_URL = 'http://192.168.0.234:3001/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;