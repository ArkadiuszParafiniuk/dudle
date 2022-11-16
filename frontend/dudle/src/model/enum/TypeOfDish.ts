export enum TypeOfDish {
  BREAKFAST = "Śniadanie",
  DINNER = "Obiad",
  DESSERT = "Deser",
  ALL = "Wszystkie",
}

export function getTypeOfDishByKey(key: string) {
  return Object.values(TypeOfDish)[Object.keys(TypeOfDish).indexOf(key)];
}

export function getTypeOfDishByEnumValue(enumValue: string) {
  return Object.keys(TypeOfDish)[
    Object.values(TypeOfDish).indexOf(enumValue as TypeOfDish)
  ];
}
