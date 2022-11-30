export const ingredientApi = async (ingrediente) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const nameApi = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result;
};

export const firstLetterApi = async (firstLetter) => {
  if (firstLetter.length === 1) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    return result;
  } global.alert('Your search must have only 1 (one) character');
};

export const ingredientCocktailApi = async (ingrediente) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks;
};

export const nameCocktailApi = async (name) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const reponse = await fetch(url);
  const result = await reponse.json();
  return result.drinks;
};

export const firstLetterCocktailApi = async (firstLetter) => {
  if (firstLetter.length === 1) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const reponse = await fetch(url);
    const result = await reponse.json();
    return result.drinks;
  } global.alert('Your search must have only 1 (one) character');
};
