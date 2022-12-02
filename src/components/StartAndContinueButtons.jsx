import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function StartAndContinueButtons({
  doneRecipes,
  API,
  inProgressRecipes,
  id,
  pathname,
}) {
  return (
    <div>
      {
        pathname.split('/')[1] === 'drinks' ? (
          <div>
            {!doneRecipes.some((entry) => entry.id === API[0].idDrink) && (
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
            {Object.keys(inProgressRecipes.drinks)
              .some((entry) => entry === API[0].idDrink)
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
        ) : (
          <div>
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
        )
      }

    </div>
  );
}

StartAndContinueButtons.propTypes = ({
  doneRecipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  API: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  inProgressRecipes: PropTypes.shape().isRequired,
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
});

export default StartAndContinueButtons;
