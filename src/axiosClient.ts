import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        'Content-type': 'application/json'
    }
})


axiosClient.interceptors.request.use( // interceptamos as requisições, sempre adicionando o accessToken a elas, caso ele exista.
    (config) => {
      const accessToken = localStorage.getItem('authToken');
      //const refreshToken = localStorage.getItem('refreshToken')
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      //if (refreshToken) {
      //  config.headers['refresh_token'] = `Bearer ${refreshToken}`;
      //}
      return config;
    },

    async (error) => {  // lida com os erros que podem ocorrer nessa preparação da requisição, antes de envia-la.
      return Promise.reject(error);
    }
  );





let isRefreshing = false;   //???
let failedQueue: any[] = [];  //???

const processQueue = (error: any, token: string | null = null) => { //???
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


  axiosClient.interceptors.response.use(
    (response) => { // se recebo uma resposta sem erros, retorna ela normalmente.
      return response
    },

    async (error) => { // se tiver erro, então agimos.
      const originalRequest = error.config
  
      if (error.response.status === 401 && !originalRequest._retry) {
        
        if (isRefreshing) { //entender
          return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
          }).then((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return axiosClient(originalRequest);
          }).catch((err) => {
              return Promise.reject(err);
          });
        }

        console.log('recebido erro 401 e retry não marcado')
        originalRequest._retry = true
        isRefreshing = true; // entender

  
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          try {
            const response = await axios.post('http://localhost:3333/api/refreshtoken',{}, {headers:{ refresh_token: refreshToken }})
            const token = response.data.token
            const refresh_token = response.data.refreshToken
  
            localStorage.setItem('authToken', token)
            localStorage.setItem('refreshToken', refresh_token)
  
            originalRequest.headers['Authorization'] = `Bearer ${token}`

            processQueue(null, token); // entender
  
            return axiosClient(originalRequest)
          } catch (refreshError) {
            processQueue(refreshError, null); // entender
            localStorage.removeItem('authToken')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          } finally { // entender
            isRefreshing = false;
          }
        }


      }
  
      return Promise.reject(error)
    }
  )

export default axiosClient