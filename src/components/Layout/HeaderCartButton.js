import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);

  const { totalAmount, items } = cartCtx;
  // console.log(items);

  const btnClasses = `${styles.button} ${btnIsHighLighted ? styles.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items, totalAmount]);

  const numberOfCartItems = items.reduce((curr, item) => {
    return curr + parseInt(item.amount);
  }, 0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.badge}>Your Cart</span>
      <span>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
