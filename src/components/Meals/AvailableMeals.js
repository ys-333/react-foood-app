import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMeal = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const url = 'https://meals-332d0-default-rtdb.firebaseio.com/meals.json';
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const mealsArray = [];
      for (let key in data) {
        mealsArray.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(mealsArray);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getMeal();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  let content = <p>{error}</p>;
  if (error) {
    content = <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  if (loading) {
    content = (
      <p style={{ color: 'maroon', textAlign: 'center' }}>Meals Loading...</p>
    );
  }
  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
