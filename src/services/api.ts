import axios from 'axios';

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
}

export const getIngredients = async (): Promise<Ingredient[]> => {
  const response = await axios.get<Ingredient[]>("ingredients");
  return response.data;
};

export const getFoundPotions = async () : Promise<any[]> => {
  const response = await axios.get('potions');
  return response.data;
}

export const updateIngredientQuantity = async (id: number, quantity: number): Promise<Ingredient> => {
  const response = await axios.patch<Ingredient>(`/ingredients/${id}`, {quantity} );
  return response.data;
};

export const determinePotion = async (ingredients: string[]): Promise<any> => {
  const response = await axios.post("/potions", ingredients);
  return response.data;
};
