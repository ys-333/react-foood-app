import { useRef } from 'react';

import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const totalAmount = amountRef.current.value;
    // const totalAmountNumber = +totalAmount;
    props.onTotalAmount(totalAmount);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: 'amount ' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
