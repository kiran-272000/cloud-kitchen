import React, { useReducer } from "react";
import CartContext from "./CartContext";

const initialCartValue = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const exsistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[exsistingCartItemIndex];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exsistingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "REMOVE") {
    const exsistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[exsistingCartItemIndex];
    const updatedAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[exsistingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartStateAction] = useReducer(
    cartReducer,
    initialCartValue
  );
  const addItemHandler = (item) => {
    dispatchCartStateAction({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartStateAction({ type: "REMOVE", id: id });
  };
  // console.log(cartState);
  const contextValue = {
    item: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
