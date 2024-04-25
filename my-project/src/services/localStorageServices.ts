export type typeProduct = {
    id: number;
    name: string;
    description: string;
    qtd: number;
    price: number;
    imageUrl: string;
};

const initialProducts: typeProduct[] = [
    { id: 1, name: "Saposo", description: "Token do grande Saposo", qtd: 1, price: 0.00, imageUrl: '/assets/saposo.png'},
    { id: 2, name: "Vaso rosa", description: "Um belo trono", qtd: 20, price: 1000.00, imageUrl: "/products/2.png"},
    { id: 3, name: "Pena de pássaro", description: "Pena de pássaro sem asa sem perna e sem pena", qtd: 30, price: 30.00, imageUrl: "/products/3.png"},
    { id: 4, name: "Paz Mundial", description: "O que você leu mesmo", qtd: 1, price: 1000000, imageUrl: "/products/4.jpg"},
    { id: 4, name: "", description: "", qtd: 1, price: 1, imageUrl: ""},
    { id: 4, name: "", description: "", qtd: 1, price: 1, imageUrl: ""},
    { id: 4, name: "", description: "", qtd: 1, price: 1, imageUrl: ""},
];

export const initializeDatabase = (): void => {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
};

export const getProducts = () : typeProduct[] => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

export const addProduct = (product: typeProduct): void => {
    const products = getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
};