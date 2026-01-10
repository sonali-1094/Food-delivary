import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredList = category === 'All'
    ? food_list
    : food_list.filter(item => item.category === category);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.map((item, index) => {
          console.log(category, item.category); // ✅ Valid logging
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
