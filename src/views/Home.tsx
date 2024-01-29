import React from 'react';
import PotionCreator from '../components/PotionCreator';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700">Mini-Jeu de Composition de Potions Magiques</h1>
      <div className="flex justify-center">
        <PotionCreator />
      </div>
    </div>
  );
};

export default HomePage;
