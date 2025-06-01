import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Helper to get cart from cookies, or empty array
const getInitialCart = () => {
  const cookieCart = Cookies.get('cart');
  try {
    return cookieCart ? JSON.parse(cookieCart) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getInitialCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === product.id &&
          item.color  === product.color &&
          item.size === product.size
      );
      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += product.quantity || 1;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }
      Cookies.set('cart', JSON.stringify(state.items));
    },
    decreaseCartItem: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );
      if (existingIndex !== -1) {
        if (state.items[existingIndex].quantity > 1) {
          state.items[existingIndex].quantity -= 1;
        } else {
          state.items.splice(existingIndex, 1);
        }
      }
      Cookies.set('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );
      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1);
      }
      Cookies.set('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => { 
      state.items = [];
      Cookies.set('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, decreaseCartItem, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;