// // src/context/CartContext.jsx
// import React, { createContext, useState, useContext } from 'react';

// // Create the context object
// export const CartContext = createContext();

// // Create a custom hook for easier consumption
// export const useCart = () => {
//     return useContext(CartContext);
// };

// // Create the Provider component
// export const CartProvider = ({ children }) => {
//     // State to hold the array of items in the cart
//     const [cartItems, setCartItems] = useState([]);

//     // Function to add or increment an item
//     const addToCart = (book) => {
//         setCartItems(prevItems => {
//             const existingItem = prevItems.find(item => item.id === book.id);

//             if (existingItem) {
//                 // If the item exists, increment its quantity
//                 return prevItems.map(item =>
//                     item.id === book.id
//                         ? { ...item, quantity: item.quantity + 1 }
//                         : item
//                 );
//             } else {
//                 // If it's a new item, add it with quantity 1
//                 return [...prevItems, { ...book, quantity: 1 }];
//             }
//         });
//     };

//     // Function to remove an item completely
//     const removeItem = (id) => {
//         setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//     };

//     // Function to change item quantity
//     const updateQuantity = (id, newQuantity) => {
//         if (newQuantity < 1) {
//             removeItem(id);
//             return;
//         }

//         setCartItems(prevItems => {
//             return prevItems.map(item =>
//                 item.id === id
//                     ? { ...item, quantity: newQuantity }
//                     : item
//             );
//         });
//     };

//     // Calculate total values (simplified here)
//     const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const taxRate = 0.08;
//     const tax = subtotal * taxRate;
//     const total = subtotal + tax;
    
//     // Provide the state and functions to consumers
//     const value = {
//         cartItems,
//         addToCart,
//         removeItem,
//         updateQuantity,
//         subtotal,
//         tax,
//         total,
//         taxRate
//     };

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     );
// };