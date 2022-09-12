import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';

const validPostal = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    postal: true,
    city: true,
    street: true,
  });

  const nameInputRef = useRef();
  const postalInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPostalCodeIsValid = validPostal(enteredPostal);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setInputValidity({
      name: enteredNameIsValid,
      postal: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const nameClasses = `${classes.control} ${
    inputValidity.name ? '' : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    inputValidity.postal ? '' : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    inputValidity.street ? '' : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    inputValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.formCheckout} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputValidity.name && (
          <p className={classes['error-text']}>Name Field must not be empty.</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputValidity.street && (
          <p className={classes['error-text']}>
            Street Field must not be empty.
          </p>
        )}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!inputValidity.postal && (
          <p className={classes['error-text']}>
            Postal Code must not be empty (should be 5 chars).
          </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputValidity.city && (
          <p className={classes['error-text']}>City must not be empty.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
