export namespace Training {
  export interface Response {
    name: string;
    commentary: string;
    animUrl: string;
    info: {
      weight: string;
      sets: string;
      repeats: string;
      rest: string;
      temp: string;
    };
  }
}
