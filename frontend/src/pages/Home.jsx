import React, { useState } from 'react'
import './Home.css'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'
import AppDownload from '../components/AppDownload/AppDownload'

const Home = () => {

  const [category,setCategory] = useState("All");
  const highlights = [
    {
      title: "State-wise menu",
      text: "Find lighter famous foods from Maharashtra, Gujarat, Punjab, Bengal and more."
    },
    {
      title: "Hostel-friendly delivery",
      text: "Add room, gate or landmark details so riders can find you faster."
    },
    {
      title: "Healthy over fancy",
      text: "Regional Indian meals with dal, sprouts, curd, millet and steamed options."
    }
  ];

  return (

    <div>
      <Header/>
      <section className="home-promise" aria-label="Why students choose us">
        {highlights.map((item, index) => (
          <article className="home-promise-card" key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
