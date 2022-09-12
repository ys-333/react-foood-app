import React from 'react';

import MealsImg from '../../assets/meals.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onOpen} />
      </header>
      <div className={styles['main-image']}>
        <img src={MealsImg} alt="A table full of meals"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
