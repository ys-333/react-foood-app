import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout';

import styles from './Cart.module.css';

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const toatlAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    console.log(item);
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkoutHandler = () => {
    setShowCheckout(true);
  };

  const orderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://meals-332d0-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
      'Content-Type': 'application/json',
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItems();
  };

  const isSubmittingContent = <p>Sending order data...</p>;

  const disdSubmittedContent = (
    <React.Fragment>
      <p>Order has been placed...</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
          />
        );
      })}
    </ul>
  );

  let cartModalItems = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{toatlAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={orderHandler} onCancel={props.onClose} />
      )}
      {!showCheckout && (
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button onClick={checkoutHandler} className={styles.button}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalItems}
      {isSubmitting && isSubmittingContent}
      {didSubmit && disdSubmittedContent}
    </Modal>
  );
};

export default Cart;
