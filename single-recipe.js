// single-recipe.js

const cardId = localStorage.getItem("id");
const SINGLERECIPEURL = `https://recipeapi.prakashsakari.repl.co/api/recipes/${cardId}`;

const getData = async (URL) => {
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Function to update the HTML elements with the fetched data
const updateRecipeData = (recipeData) => {
  console.log(recipeData); // Check the entire object in the browser console

  const recipeTitleElement = document.getElementById('recipe-title');
  const recipeImageElement = document.getElementById('recipe-image');
  const recipeIngredientsElement = document.getElementById('recipe-ingredients');
  const recipeInstructionsElement = document.getElementById('recipe-instructions');

  if (recipeData && recipeData.length > 0) {
    const recipe = recipeData[0]; // Access the first recipe object in the array

    recipeTitleElement.textContent = recipe.TranslatedRecipeName;
    recipeImageElement.src = recipe['image-url'];
    recipeIngredientsElement.textContent = recipe.TranslatedIngredients;
    recipeInstructionsElement.textContent = recipe.TranslatedInstructions;
  }
};

// Debounce function
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Debounced API call function
const debouncedFetchData = debounce(async () => {
  const singleRecipe = await getData(SINGLERECIPEURL);
  updateRecipeData(singleRecipe);
}, 500); // Adjust the delay as needed (500ms in this case)

// Initial call
debouncedFetchData();