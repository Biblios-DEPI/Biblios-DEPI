import '../styles/cart.css';

const CartPage = () => {
  return (
    <main>
        <h2>Your Cart</h2>
        <div className="main-container">
            <div className="products">
                {/* Item 1 */}
                <div className="cart-book card-prop">
                    <div className="cover">
                        <img src="/images/osyssey.png" alt="odyssey" />
                    </div>
                    <div className="details">
                        <p className="name-of-book">The Odyssey</p>
                        <p className="author">Homer</p>
                        <div className="seprate">
                            <div className="quantity">
                                <span className="more"><i className="fa-solid fa-minus"></i></span>
                                <span className="number">1</span>
                                <span className="less"><i className="fa-solid fa-plus"></i></span>
                            </div>
                            <span className="price">$15.99</span>
                        </div>
                    </div>
                    <div className="remove-container">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="cart-book card-prop">
                    <div className="cover">
                        <img src="/images/medit.png" alt="Meditations" />
                    </div>
                    <div className="details">
                        <p className="name-of-book">Meditations</p>
                        <p className="author">Marcus Aurelius</p>
                        <div className="seprate">
                            <div className="quantity">
                                <span className="more"><i className="fa-solid fa-minus"></i></span>
                                <span className="number">2</span>
                                <span className="less"><i className="fa-solid fa-plus"></i></span>
                            </div>
                            <span className="price">$25.00</span>
                        </div>
                    </div>
                    <div className="remove-container">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>

            <div className="summary-container">
                <div className="summary card-prop">
                    <h4>Order Summary</h4>
                    <div className="row-item">
                        <span>Subtotal</span>
                        <span>$59.74 </span>
                    </div>
                    <div className="row-item">
                        <span>Tax (8%)</span>
                        <span>$4.78 </span>
                    </div>
                    <hr />
                    <div className="row-item ">
                        <span>Total</span>
                        <span>$64.52 </span>
                    </div>
                    <button className="btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    </main>
  );
};

export default CartPage;