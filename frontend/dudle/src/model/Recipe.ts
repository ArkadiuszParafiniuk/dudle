import { Ingredient } from "./Ingredient";

export class Recipe {
  uuid?: string;
  title: string;
  content: string;
  ingredients: Ingredient[];
  typeOfDish: string;
  tags: string[];

  constructor(
    title: string,
    content: string,
    ingredients: Ingredient[],
    typeOfDish: string,
    tags: string[],
    uuid?: string
  ) {
    this.uuid = uuid;
    this.title = title;
    this.content = content;
    this.typeOfDish = typeOfDish;
    this.ingredients = ingredients;
    this.tags = tags;
  }
}
