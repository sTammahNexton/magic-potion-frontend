import React, { useState, useEffect } from 'react';
import { getIngredients, updateIngredientQuantity } from '../services/api';

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
}

const Inventory: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await getIngredients();
      setIngredients(data);
    };

    fetchIngredients();
  }, []);

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Liste des Ingrédients</h2>
      <ul>
        {(ingredients || [])
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((ingredient) => (
            <li key={ingredient.id} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg">{ingredient.name}</span>
                <span className="text-gray-600">Quantité: {ingredient.quantity}</span>
              </div>
              <div className="mt-2">
                <button
                  className="bg-purple-700 text-white px-3 py-1 rounded mr-2"
                  onClick={() => updateIngredientQuantity(ingredient.id, ingredient.quantity !== 0 ? ingredient.quantity - 1 : 0)}
                >
                  -
                </button>
                <button
                  className="bg-purple-700 text-white px-3 py-1 rounded mr-2"
                  onClick={() => updateIngredientQuantity(ingredient.id, ingredient.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-purple-700 text-white px-3 py-1 rounded"
                  onClick={() => updateIngredientQuantity(ingredient.id, 50)}
                >
                  Recharger à 50
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Inventory;
