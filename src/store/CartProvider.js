import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // const updatedItems = state.items.concat(action.item);
    let updatedItems;

    // to get the id of item

    const itemId = state.items.findIndex((item) => item.id === action.item.id);

    if (itemId === -1) {
      updatedItems = state.items.concat(action.item);
    } else {
      updatedItems = state.items;
      let prevAmount = +updatedItems[itemId].amount;
      let newAmount = +action.item.amount;
      updatedItems[itemId].amount = prevAmount + newAmount;
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    let updatedItems;
    let updatedItem;
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    const prevItem = state.items[itemIndex];
    if (prevItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItem = { ...prevItem, amount: parseInt(prevItem.amount) - 1 };
      updatedItems = state.items;
      updatedItems[itemIndex] = updatedItem;
    }
    const updatedTotalAmount = state.totalAmount - prevItem.price;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    // console.log(item);
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearItemHandlerr = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItems: clearItemHandlerr,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
