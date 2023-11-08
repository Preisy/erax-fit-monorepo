export namespace Diet {
  export interface Product {
    id: number;
    type: string;
    category: number;
    name?: string;
    quantity?: string;
  }

  export interface DietItem {
    name: string;
    mealItems: Product[];
  }

  export namespace Response {
    //TODO: replace user with userType
    export interface Nutrition {
      id: number;
      userId: number;
      user: object;
      meals: DietItem[];
    }
  }
}
