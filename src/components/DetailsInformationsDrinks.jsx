import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { JSONInProgressRecipesReader } from '../helpers/JSONReaders';
import renderIngredients from '../helpers/renderIngredients';

function DetailsInformationsDrinks() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const isInProgress = pathname.split('/')[3];
  const recommendations = useSelector((state) => state.recipeDetails.recommendations);
  const API = useSelector((state) => state.recipeDetails.API);

  useEffect(() => {
    const inProgressRecipes = JSONInProgressRecipesReader;
    if (inProgressRecipes[type][id] && isInProgress) {
      inProgressRecipes[type][id]
        .forEach((entry, index) => {
          const marked = Object.values(entry)[0];
          if (marked) {
            document
              .getElementById(`check-ingredients-${index}`)
              .checked = marked;
            document
              .getElementById(`${index}-ingredient-step`)
              .style.textDecoration = 'line-through solid rgb(0, 0, 0)';
          }
        });
    }
  }, []);

  return (
    <div>
      <div>
        <p id="share-message" />
        <img
          src={ API[0].strDrinkThumb }
          alt={ API[0].strDrink }
          data-testid="recipe-photo"
        />
      </div>
      <p data-testid="recipe-title">{API[0].strDrink}</p>
      <p data-testid="recipe-category">{API[0].strAlcoholic}</p>
      {renderIngredients(API, pathname)}
      <p data-testid="instructions">{API[0].strInstructions}</p>
      <p data-testid="video">{API[0].strVideo}</p>
      <h1>Recommended</h1>
      <div
        style={ {
          display: 'flex',
          width: '100%',
          overflowX: 'scroll',
        } }
      >
        {recommendations
          .filter((value, index) => {
            const maxRecommendations = 6;
            return index < maxRecommendations;
          })
          .map((entry, index) => (
            <div key={ index } data-testid={ `${index}-recommendation-card` }>
              <p data-testid={ `${index}-recommendation-title` }>
                {
                  entry.strMeal
                }
              </p>
              <img
                src={ entry.strMealThumb }
                alt={ entry.strMeal }
                style={ {
                  padding: '1vw',
                  width: '180px',
                } }
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetailsInformationsDrinks;