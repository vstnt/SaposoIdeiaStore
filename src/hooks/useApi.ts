import axiosClient from "../api/axiosClient";


export const useApi = () => ({
    signin: async (email: string, password: string) => {     
        try {
            const response = await axiosClient.post('api/signin', { email, password });
            return response.data;
        } catch (error) {
            console.error("Error during signin (useApi):", error);
            throw error; // Propaga o erro para ser capturado pelo chamador
        }
        return {
            user: { id: 3, name: 'Ricardo', email: 'ric@gmail.com' },
            token: '123456'
        }
    },
    validateToken: async (token: string) => {
        const response = await axiosClient.post('api/validate', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
        return {
            user: { id: 3, name: 'teste', email: 'ric@gmail.com' },
        }
    },
    logout: async (token: string) => {
        const response = await axiosClient.post('api/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
        return { status: true };
    },
    register: async (email: string, name: string, password: string) => {     
        try {
            const response = await axiosClient.post('api/register', { email, fullName: name, password });
            return response.data;
        } catch (error) {
            console.error("Error during register (useApi):", error);
            throw error; // Propaga o erro para ser capturado pelo chamador
        }
    },
});