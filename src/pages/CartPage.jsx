// src/pages/CartPage.jsx
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { auth } from '../firebase'; // Added auth import
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'; // Added toast for feedback
import '../styles/cart.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();
  const navigate = useNavigate();

  // Math Calculations
  const taxRate = 0.08; 
  const taxAmount = cartSubtotal * taxRate;
  const totalAmount = cartSubtotal + taxAmount;

  // --- NEW: CHECKOUT HANDLER ---
  const handleCheckout = () => {
    if (!auth.currentUser) {
        toast.error("Please login to proceed to checkout");
        navigate('/login');
    } else {
        // Since you don't have a checkout page yet, we will just toast for now
        // OR if you create a CheckoutPage later, use: navigate('/checkout');
        toast.success("Proceeding to secure checkout...");
        // navigate('/checkout'); 
    }
  };

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
                                        className="more" 
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
                    {/* BUTTON NOW CALLS THE HANDLER */}
                    <button className="btn" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </main>
  );
};

export default CartPage;