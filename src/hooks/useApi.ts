import axiosClient from "../api/axiosClient";

//const api = axios.create({
//    baseURL: import.meta.env.VITE_REACT_APP_API
//});

export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            user: { id: 3, name: 'teste', email: 'ric@gmail.com' },
        }
        const response = await axiosClient.post('api/validate', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        return {
            user: { id: 3, name: 'Ricardo', email: 'ric@gmail.com' },
            token: '123456'
        }
        
        const response = await axiosClient.post('api/signin', { email, password });
        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await axiosClient.post('api/logout');
        return response.data;
    }
});