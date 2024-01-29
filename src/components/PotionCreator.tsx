import React, { useState, useEffect } from 'react';
import { getIngredients, getFoundPotions, determinePotion, updateIngredientQuantity } from '../services/api';
import { Ingredient } from '../views/Inventory';

const PotionCreator: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [createdPotions, setCreatedPotions] = useState<any[]>([]);
  const [foundPotions, setFoundPotions] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const ingredientsList = await getIngredients();
      const PotionsList = await getFoundPotions();
      setIngredients(ingredientsList);
      setFoundPotions(PotionsList)
    };

    fetchData();

  }, [createdPotions]);

  const clearSelection = () => {
    setSelectedIngredients([])
  }

  const handleIngredientSelect = (ingredient: Ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };

  const handleCreatePotion = async () => {
    try {
      if (selectedIngredients.length === 3) {
        const data = await determinePotion(selectedIngredients.map(ingredient => ingredient.name));
        selectedIngredients.forEach(ingredients => updateIngredientQuantity(ingredients.id, ingredients.quantity - 1))
        setCreatedPotions(prev => [...prev, data]);
        setSelectedIngredients([]);
      } else {
        setSelectedIngredients([]);
        alert('Sélectionnez trois ingrédients pour créer une potion.');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert("Recette de potion invalide. Choisissez d'autres ingrédients.");
        setSelectedIngredients([])
      } else {
        console.error('Une erreur s\'est produite :', error.message);
      }
    }
  };  

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-bold mb-4 text-purple-700">Créateur de Potions</h2>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Sélection d'Ingrédients</h3>
      <ul className="grid grid-cols-2 gap-2">
        {Array.isArray(ingredients) && ingredients.map((ingredient) => (
          ingredient.quantity > 0 && (
            <li
              key={ingredient.id}
              className="cursor-pointer p-2 bg-purple-100 text-purple-700 rounded"
              onClick={() => handleIngredientSelect(ingredient)}
            >
              {ingredient.name} - Quantité: {ingredient.quantity}
            </li>
          )
        ))}
      </ul>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Ingrédients Sélectionnés</h3>
      <ul className="list-disc list-inside">
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.id} className="mb-1">{ingredient.name}</li>
        ))}
      </ul>
      <div className="mt-2">
        <button
          className="bg-purple-700 text-white px-4 py-2 rounded mr-2"
          onClick={clearSelection}
        >
          Supprimer la sélection
        </button>
        <button
          className="bg-purple-700 text-white px-4 py-2 rounded"
          onClick={handleCreatePotion}
        >
          Créer Potion
        </button>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Potions Créées</h3>
      <ul className="list-disc list-inside">
        {createdPotions.map((potion, index) => (
          <li key={index} className="mb-1">{potion.name}</li>
        ))}
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">Potions Découvertes</h3>
      <ul className="list-disc list-inside">
        {foundPotions.map((potion, index) => (
          <li key={index} className="mb-1">{potion.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

};

export default PotionCreator;
