const devOrProdConfig = {apiEndpoint: '',};

if (process.env.NODE_ENV === 'development') {
    devOrProdConfig.apiEndpoint = 'http://localhost:3333'
} else if ( process.env.NODE_ENV === 'production') {
    devOrProdConfig.apiEndpoint = 'https://saposoapi-eydy.onrender.com'
}

export const apiPath = {
    base: `${devOrProdConfig.apiEndpoint}`,
    refreshToken: '/api/refreshtoken',
    validateToken: '/api/validate',
    signin: '/api/signin',
    logout: '/api/logout',
    register: 'api/register',

    getCart: '/api/cart',
    createCart: '/api/carts/create',
    clearCart: '/api/cart/clear',
    updateItem: '/api/cart/updateitem',
    deleteItem: '/api/cart/deleteitem',
}