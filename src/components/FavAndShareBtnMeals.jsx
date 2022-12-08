import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { JSONFavRecipesReader } from '../helpers/JSONReaders';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavAndShareBtnMeals() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSONFavRecipesReader);
  const API = useSelector((state) => state.recipeDetails.API);
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000/meals/${pathname.split('/')[2]}`);
          const messageElement = document.getElementById('share-message');
          messageElement.innerText = 'Link copied!';
        } }
      >
        Share Recipe
      </button>
      <input
        alt="Favoritar"
        type="image"
        data-testid="favorite-btn"
        src={ favoriteRecipes.some((entry) => entry.id === API[0].idMeal)
          ? blackHeartIcon
          : whiteHeartIcon }
        onClick={ () => {
          let newFavoriteRecipes = [].concat(favoriteRecipes);
          if (favoriteRecipes.some((entry) => entry.id === API[0].idMeal)) {
            newFavoriteRecipes = newFavoriteRecipes
              .filter((entry) => entry.id !== API[0].idMeal);
            setFavoriteRecipes(newFavoriteRecipes);
            localStorage.setItem(
              'favoriteRecipes',
              JSON.stringify(newFavoriteRecipes),
            );
          } else {
            newFavoriteRecipes.push({
              id: API[0].idMeal,
              type: 'meal',
              nationality: API[0].strArea,
              category: API[0].strCategory,
              alcoholicOrNot: '',
              name: API[0].strMeal,
              image: API[0].strMealThumb,
            });
            setFavoriteRecipes(newFavoriteRecipes);
            localStorage.setItem(
              'favoriteRecipes',
              JSON.stringify(newFavoriteRecipes),
            );
          }
        } }
      />

    </div>
  );
}

export default FavAndShareBtnMeals;