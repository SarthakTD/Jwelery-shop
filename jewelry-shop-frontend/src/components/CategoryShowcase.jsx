//There is need of Adding Multiple Pages for Categories
import React from 'react';
import './Category.css';

// Import images from src/assets/images
import MangalsutraImg from '../assets/images/Type/Mangalsutra.png';
import Earring from '../assets/images/Type/Earring.jpeg';
import Bracelet from '../assets/images/Type/Bracelet.webp';
import Mens from '../assets/images/Type/Mens.webp';
import Necklace from '../assets/images/Type/Necklace.png';
import Ring from '../assets/images/Type/Ring.jpg';

const categories = [
  { name: "Necklaces", image: Necklace },
  { name: "Ring", image: Ring },
  { name: "Earring", image: Earring },
  { name: "Bracelet", image: Bracelet },
  { name: "Mens", image: Mens },
  { name: "Mangalsutra", image: MangalsutraImg },
];

const CategoryShowcase = () => {
  return (
    <section className="category-showcase">
      <h2 className="title">Everyday Demifine Jewellery</h2>
      <div className="categories">
        {categories.map((cat, i) => (
          <div key={i} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
