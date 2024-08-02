import { selector } from "./developmentOrProductionSelector";


const devOrProdConfig = {
    apiEndpoint: '',
};

if (selector === 'development') {
    devOrProdConfig.apiEndpoint = 'http://localhost:3333'
} else if ( selector === 'production') {
    devOrProdConfig.apiEndpoint = 'https://saposoapi-eydy.onrender.com'
}

export default devOrProdConfig;