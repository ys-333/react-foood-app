import React from 'react';
import MealsSummary from './MealSummary';
import AvailableMeals from './AvailableMeals';

const Meal = (props) => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
};
export default Meal;
