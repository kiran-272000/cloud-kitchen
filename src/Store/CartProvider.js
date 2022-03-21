import React, { useReducer, useState, useEffect } from "react";
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

    // const existingItemNew = state.items.find(
    //   (item) => item.id === action.item.id
    // );

    // console.log(`new ${existingItemNew.amount}`);
    const existingItem = state.items[exsistingCartItemIndex];
    // console.log(`old ${existingItem.amount}`);
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
  if (action.type === "CLEAR") {
    return initialCartValue;
  }
};

const CartProvider = (props) => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      try {
        const response = await fetch(
          "https://cloud-kitchen-gk.herokuapp.com/api/kitchen/meals"
        );
        if (!response.ok) {
          throw new Error("Something went Wrong...");
        }
        const data = await response.json();
        const meal = data.data.meals.map((meal) => {
          return {
            id: meal.id,
            name: meal.name,
            description: meal.description,
            price: meal.price,
          };
        });
        setmeals(meal);
      } catch (err) {
        seterror(err.message);
      }
      setisLoading(false);
    }
    fetchData();
  }, []);

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

  const clearCartHandler = () => {
    dispatchCartStateAction({ type: "CLEAR" });
  };

  const contextValue = {
    item: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
    availableMeals: meals,
    loading: isLoading,
    error: error,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
