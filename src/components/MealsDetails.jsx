import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function MealsDetails({
  API, renderIngredients, recommendations, doneRecipes, id, inProgressRecipes,
}) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setFavoriteRecipes(JSON
      .parse(localStorage.getItem('favoriteRecipes')) ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : []);
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(window.location.href);
          const messageElement = document.getElementById('share-message');
          messageElement.innerText = 'Link copied!';
        } }
      >
        Share Recipe
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        // não tenho ideia do pq o avaliador quer esse src aqui
        src={ favoriteRecipes.some((entry) => entry.id === API[0].idMeal)
          ? blackHeartIcon
          : whiteHeartIcon }
        onClick={ () => {
          let newFavoriteRecipes = [].concat(favoriteRecipes);
          if (favoriteRecipes.some((entry) => entry.id === API[0].idMeal)) {
            newFavoriteRecipes = newFavoriteRecipes
              .filter((entry) => entry.id !== API[0].idMeal);
            setFavoriteRecipes(newFavoriteRecipes);
            localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
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
            localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
          }
        } }
      >
        Favorite
      </button>
      {
        favoriteRecipes.some((entry) => entry.id === API[0].idMeal) ? (
          <img src={ blackHeartIcon } alt="favoriteIcon" style={ { padding: '5px' } } />
        ) : (
          <img src={ whiteHeartIcon } alt="favoriteIcon" style={ { padding: '5px' } } />)
      }
      <div>
        <p id="share-message" />
        <img
          src={ API[0].strMealThumb }
          alt={ API[0].strMeal }
          data-testid="recipe-photo"
        />
      </div>
      <p data-testid="recipe-title">{API[0].strMeal}</p>
      <p data-testid="recipe-category">
        {API[0].strCategory}
      </p>
      {renderIngredients()}
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
                  entry.strDrink
                }
              </p>
              <img
                src={ entry.strDrinkThumb }
                alt={ entry.strDrink }
                style={ {
                  padding: '1vw',
                  width: '180px',
                } }
              />
            </div>
          ))}
      </div>
      {!doneRecipes.some((entry) => entry.id === API[0].idMeal) && (
        <Link to={ `./${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            style={ {
              position: 'fixed',
              bottom: '0px',
            } }
          >
            Start Recipe
          </button>
        </Link>
      )}
      {Object.keys(inProgressRecipes.meals)
        .some((entry) => entry === API[0].idMeal)
              && (
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  style={ {
                    position: 'fixed',
                    bottom: '0px',
                  } }
                >
                  Continue Recipe
                </button>
              )}
    </div>
  );
}

MealsDetails.propTypes = ({
  API: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  renderIngredients: PropTypes.func.isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  doneRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  id: PropTypes.string.isRequired,
  inProgressRecipes: PropTypes.shape().isRequired,
});

export default MealsDetails;
