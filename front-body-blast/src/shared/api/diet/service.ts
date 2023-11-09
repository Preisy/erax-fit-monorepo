/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import { requestSimulator, useServiceAction } from 'shared/lib/utils';
import { Diet } from './types';

export const productsApi = [
  { id: 1, name: 'Овсянка', category: 1, type: 'cereals' },
  { id: 1, name: 'Булгур', category: 1, type: 'cereals' },
  { id: 1, name: 'Гречка', category: 2, type: 'cereals' },
  { id: 1, name: 'Рис', category: 2, type: 'cereals' },
  { id: 1, name: 'Полба', category: 3, type: 'cereals' },
  { id: 1, name: 'Перловка', category: 3, type: 'cereals' },
  { id: 1, name: 'Пшенка', category: 3, type: 'cereals' },
  { id: 1, name: 'Киноа', category: 3, type: 'cereals' },
  { id: 1, name: 'Огурец', category: 1, type: 'vegetables' },
  { id: 1, name: 'Булгур', category: 1, type: 'vegetables' },
  { id: 1, name: 'Гречка', category: 2, type: 'vegetables' },
  { id: 1, name: 'Рис', category: 2, type: 'vegetables' },
  { id: 1, name: 'Полба', category: 3, type: 'vegetables' },
  { id: 1, name: 'Перловка', category: 3, type: 'vegetables' },
  { id: 1, name: 'Пшенка', category: 3, type: 'vegetables' },
  { id: 1, name: 'Киноа', category: 3, type: 'vegetables' },
  { id: 1, name: 'Яблоко', category: 1, type: 'fruitsAndBerries' },
  { id: 1, name: 'Булгур', category: 1, type: 'fruitsAndBerries' },
  { id: 1, name: 'Полба', category: 3, type: 'fruitsAndBerries' },
  { id: 1, name: 'Перловка', category: 3, type: 'fruitsAndBerries' },
  { id: 1, name: 'Пшенка', category: 3, type: 'fruitsAndBerries' },
  { id: 1, name: 'Киноа', category: 3, type: 'fruitsAndBerries' },
];

export const nutritionApi = {
  id: 1,
  userId: 1,
  user: {},
  meals: [
    {
      name: 'breakfast',
      mealItems: [
        { id: 1, quantity: '100гр', type: 'Рис', category: 2 },
        { id: 1, quantity: '100гр', type: 'Полба', category: 3 },
        { id: 1, quantity: '100гр', type: 'Перловка', category: 3 },
        { id: 1, quantity: '100гр', type: 'Пшенка', category: 3 },
        { id: 1, quantity: '100гр', type: 'Киноа', category: 3 },
        { id: 1, quantity: '100гр', type: 'Огурец', category: 1 },
      ],
    },
    {
      name: 'firstBreak',
      mealItems: [
        { id: 1, quantity: '100гр', type: 'Киноа', category: 3 },
        { id: 1, quantity: '100гр', type: 'Яблоко', category: 1 },
        { id: 1, quantity: '100гр', type: 'Булгур', category: 1 },
        { id: 1, quantity: '100гр', type: 'Полба', category: 3 },
        { id: 1, quantity: '100гр', type: 'Перловка', category: 3 },
        { id: 1, quantity: '100гр', type: 'Пшенка', category: 3 },
      ],
    },
    {
      name: 'lunch',

      mealItems: [
        { id: 1, quantity: '100гр', type: 'Полба', category: 3 },
        { id: 1, quantity: '100гр', type: 'Перловка', category: 3 },
        { id: 1, quantity: '100гр', type: 'Пшенка', category: 3 },
      ],
    },
  ],
};

const getProductsApi = axios.create({ baseURL: '/api/products' });
const getNutritionApi = axios.create({ baseURL: '/api/nutrition' });
export namespace ProductsService {
  export const getProducts = useServiceAction(() => requestSimulator<Diet.Product[]>(productsApi));
  export const getNutrition = useServiceAction(() => requestSimulator<Diet.Response.Nutrition>(nutritionApi));
}
