
export interface Cart {
    total: number;
    items: CartItem[];
  }

interface CartItem {
    productId: number;
    quantity: number;
    price: number;
    createdAt: number
  }