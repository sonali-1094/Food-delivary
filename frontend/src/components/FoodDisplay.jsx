import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, searchText } = useContext(StoreContext);
  const normalizedSearch = searchText.trim().toLowerCase();

  const filteredList = food_list.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;
    const searchMatch =
      normalizedSearch === '' ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch) ||
      item.state?.toLowerCase().includes(normalizedSearch);

    return categoryMatch && searchMatch;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Regional healthy picks near you</h2>
      <div className="food-display-list">
        {filteredList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            state={item.state}
          />
        ))}
      </div>
      {filteredList.length === 0 && (
        <p className='food-display-empty'>No healthy Indian meals found for your search.</p>
      )}
    </div>
  );
};

export default FoodDisplay;
