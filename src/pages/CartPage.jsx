// src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();

  // Math Calculations
  const taxRate = 0.08; // 8%
  const taxAmount = cartSubtotal * taxRate;
  const totalAmount = cartSubtotal + taxAmount;

  if (cartItems.length === 0) {
    return (
        <main className='main-cart'>
            <div className="container" style={{textAlign: 'center', padding: '50px'}}>
                <h2>Your Cart is Empty</h2>
                <Link to="/books" className="btn" style={{marginTop: '20px', display:'inline-block'}}>Browse Books</Link>
            </div>
        </main>
    )
  }

  return (
    <main className='main-cart'>
        <h2>Your Cart</h2>
        <div className="main-container">
            <div className="products">
                {/* DYNAMIC MAPPING */}
                {cartItems.map((item) => (
                    <div className="cart-book card-prop" key={item.id}>
                        <div className="cover">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="details">
                            <p className="name-of-book">{item.title}</p>
                            <p className="author">{item.author}</p>
                            <div className="seprate">
                                <div className="quantity">
                                    <span 
                                        className="more" 
                                        onClick={() => updateQuantity(item.id, 'decrease')}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </span>
                                    
                                    <span className="number">{item.quantity}</span>
                                    
                                    <span 
                                        className="more" // Using 'more' class for styling consistency
                                        onClick={() => updateQuantity(item.id, 'increase')}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                </div>
                                <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                        <div 
                            className="remove-container" 
                            onClick={() => removeFromCart(item.id)}
                            style={{cursor: 'pointer'}}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                ))}
            </div>

            {/* DYNAMIC SUMMARY */}
            <div className="summary-container">
                <div className="summary card-prop">
                    <h4>Order Summary</h4>
                    <div className="row-item">
                        <span>Subtotal</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="row-item">
                        <span>Tax (8%)</span>
                        <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="row-item">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <button className="btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </main>
  );
};

export default CartPage;