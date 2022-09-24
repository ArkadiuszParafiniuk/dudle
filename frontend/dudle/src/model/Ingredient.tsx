export class Ingredient {
  ingredient: string;
  amount: string;
  id: number;

  constructor(ingredient: string, amount: string, id?: number) {
    this.ingredient = ingredient;
    this.amount = amount;
    this.id = id ? id : Math.random() * 100000;
    debugger;
  }
}
