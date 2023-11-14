import { Moment } from 'moment';

export interface Me {
  id: number;
  createdAt: Moment;
  updatedAt: Moment;
  deletedAt: Moment;
  firstName: string;
  lastName: string;
  role: 'client' | 'admin';
  email: string;
  password: string;
  tokenId: number;
  age: number;
  height: number;
  weight: number;
  weightInYouth: number;
  nutritRestrict: boolean;
  allergy: boolean;
  gastroDeseases: string;
  mealIntolerance: string;
  insulinResistance: boolean;
  kidneyDesease: string;
  heartDesease: string;
  muscleDesease: string;
  loadRestrictions: string;
  sportsExp: string;
  goals: string;
}

export namespace Me {
  export interface Response {
    data: Me;
  }
}
