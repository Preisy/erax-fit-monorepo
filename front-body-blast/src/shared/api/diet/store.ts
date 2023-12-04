import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { ProductsService } from './service';
import { Diet } from './types';

export const useDietStore = defineStore('diet-store', () => {
  const products = ref(useSingleState<Array<Diet.Product>>());
  const getProducts = () =>
    useSimpleStoreAction({
      stateWrapper: products.value,
      serviceAction: ProductsService.getProducts(),
    });
  const nutrition = ref(useSingleState<Diet.Response.Nutrition>());
  const getNutrition = () =>
    useSimpleStoreAction({
      stateWrapper: nutrition.value,
      serviceAction: ProductsService.getNutrition(),
    });
  return { products, getProducts, nutrition, getNutrition };
});
