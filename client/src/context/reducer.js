const Cartreducer = (state, action) => {
    const saveCartToLocalStorage = (cart) => {
      try {
        const minimalCart = cart.map((item) => ({
          _id: item._id,
          qty: item.qty,
        }));
        localStorage.setItem('cart', JSON.stringify(minimalCart));
      } catch (error) {
        console.error('LocalStorage Error:', error);
      }
    };
  
    switch (action.type) {
      case 'SET_PRODUCTS':
        return {
          ...state,
          products: action.payload,
        };
  
      case 'ADD_TO_CART':
        const itemInCart = state.cart.find((c) => c._id === action.payload._id);
        if (itemInCart) {
          const updatedCart = state.cart.map((c) =>
            c._id === action.payload._id ? { ...c, qty: c.qty + 1 } : c
          );
          saveCartToLocalStorage(updatedCart);
          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          const newCart = [...state.cart, { ...action.payload, qty: 1 }];
          saveCartToLocalStorage(newCart);
          return {
            ...state,
            cart: newCart,
          };
        }
  
      case 'REMOVE_FROM_CART':
        const filteredCart = state.cart.filter((c) => c._id !== action.payload._id);
        saveCartToLocalStorage(filteredCart);
        return {
          ...state,
          cart: filteredCart,
        };
  
      case 'CLEAR_CART':
        localStorage.removeItem('cart');
        return {
          ...state,
          cart: [],
        };
  
      default:
        return state;
    }
  };
  
  export default Cartreducer;
  