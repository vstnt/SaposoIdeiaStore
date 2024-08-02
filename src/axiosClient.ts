import axios from 'axios';
import devOrProdConfig from './developmentOrProductionVariables';

// pq o _?

const axiosClient = axios.create({
    baseURL: devOrProdConfig.apiEndpoint,
    headers: {
        'Content-type': 'application/json'
    }
})



// interceptamos as requisições, sempre adicionando o accessToken a elas, caso ele exista.
axiosClient.interceptors.request.use( 
  (config) => {
    const accessToken = localStorage.getItem('authToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['tokenOrigin'] = localStorage.getItem('tokenOrigin') ;
    }
    return config;
  },
  async (error) => {  
    return Promise.reject(error);
  }
);



// Daqui pra baixo é pra lidar com as requisições que retornarem 401 (não autorizado). 
// Declaramos variáveis globais dentro do módulo. Elas tem permanência ao longo das requisições do usuário.
let isRefreshing = false; // indica se já está acontecendo uma tentativa de atualização dos tokens.
let failedQueue: any[] = [];  // fila para as requisições que retornaram 401 quando já está acontecendo a tentativa de atualização de tokens.

// Com isso processamos a fila de promises após o processo de tentativa de atualização de tokens. Enviaremos a esse processador um erro ou um novo token de acesso.
// Se for o erro, o retornará às requisições da lista, se for token, procurará realizar as requisições com o novo token.
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = []; // depois de processar a lista, a limpa.
};


// aqui temos o interceptador de respostas. Ele realiza o trabalho em si de atualização de tokens e de modificação e respostas das requisições com erro.
axiosClient.interceptors.response.use(
  
  // se recebe uma resposta sem erros, retorna ela normalmente e vida que segue.
  (response) => { 
    return response
  },

  // Se resposta com erro, nosso interceptador entra em ação.
  async (error) => {
    const originalRequest = error.config // salva a requisição inicial
    
    // Caso erro de auth (401) e não seja a segunda tentativa da requisição:
    if (error.response.status === 401 && !originalRequest._retry) {
      
      // caso outra requisição já esteja tentando atualizar os tokens, adicionamos a requisição à fila de requisições que retornaram erro. 
      // Isso evita a execução paralela de múltiplas operações de refresh token.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosClient(originalRequest);
        }).catch((err) => {
            return Promise.reject(err);
        });
      }

      // Aqui chegamos no caso de primeira requisição com erro 401, em sua primeira tentativa.
      // Marcamos então que se está tentando o refresh, e também essa requisição com o retry, para evitar um loop no caso de continuidade do erro 401.
      originalRequest._retry = true; // pq esse _?
      isRefreshing = true;
      
      // Tratamos de usar o refresh token, obtendo novos tokens e modificando também as requisições que possam ter ido para a lista
      // Também relançamos a requisição original que nos trouxe até aqui. E avisamos via variavel que o processo de atualização não está mais acontecendo.
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          if (localStorage.getItem('tokenOrigin') == 'backend') {
            const refreshTokenResponse = await axios.post(`${devOrProdConfig.apiEndpoint}/api/refreshtoken`,{}, {headers:{ refresh_token: refreshToken }})
            console.log(refreshTokenResponse)
            const newAccessToken = refreshTokenResponse.data.token
            const newRefreshToken = refreshTokenResponse.data.refreshToken
            localStorage.setItem('authToken', newAccessToken)
            localStorage.setItem('refreshToken', newRefreshToken)
            originalRequest.headers['Authorization'] = `Bearer ${ newAccessToken }`
            const response = axiosClient(originalRequest)
            processQueue(null, newAccessToken)
            return response
          }
          
        // Caso tenhamos erro na atualização dos tokens, enviamos o erro para a lista, para que ela retorne o erro para suas requisições
        // Então limpamos os tokens do usuário, o enviamos para /login e passamos o erro obtido.
        // E avisamos, por meio da variável, que o processo de atualização de tokens não está mais ocorrendo.
        } catch (refreshError) {
          processQueue(refreshError, null);
          localStorage.setItem('authToken', '')
          localStorage.setItem('refreshToken', '')
          localStorage.setItem('tokenOrigin', '')
          // window.location.href = '/login'; 
          return Promise.reject(refreshError)
        
        } finally {
          isRefreshing = false;
        }
      // isso é para caso não exista um refreshToken, indicando a outras requisições que
      // o processo de atualização de tokens não está mais ocorrendo, e levando para baixo, passando o erro obtido anteriormente.
      } else {
        isRefreshing = false;
      }
    }

    // Vamos pra cá caso retorne erro na segunda tentativa da requisição original, já com o novo token de acesso.
    // Ou caso na primeira resposta de erro, se não houver um refresh token no localStorage
    return Promise.reject(error)
  }
)

export default axiosClient