import React, { useEffect, useState } from 'react';
import RecipeCard from './components/RecipeCard';
import axios from 'axios';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state to show/hide the loader
  const [errorMessage, setErrorMessage] = useState('');  // To handle error messages
  
  // Run the search automatically on page load (if needed)
  useEffect(() => {
    searchBtn();
  }, []);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);  // Update the state with the input value
  };

  const searchBtn = async () => {
    if (!inputValue) {
      setErrorMessage('Please enter a search term!');
      return;  // If no input is provided, show error
    }

    setIsLoading(true);  // Set loading to true when starting the request
    setErrorMessage('');  // Reset error message

    const API_key = 'd157f432f4394e04a577601dabd0fb66'; 
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          query: inputValue,
          apiKey: API_key,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        setRecipes(response.data.results);
      } else {
        setRecipes([]);
        setErrorMessage('No recipes found. Please try a different search term.');
      }

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage('Failed to fetch recipes. Please try again later.');
    } finally {
      setIsLoading(false);  // Set loading to false when the request is complete
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Recipe Finder</h1>
          <p className="text-lg mt-2">Discover your favorite recipes</p>
          <div className="mt-6">
            <input 
              type="text" 
              value={inputValue}
              onChange={handleInputChange}  // Update the state when the input changes
              placeholder="Search for recipes..." 
              className="text-black px-4 py-2 w-full max-w-md rounded-lg shadow-md border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>

          {/* Display error message when input is not available or recipes are not found */}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          {/* Search button */}
          <button onClick={searchBtn} className="bg-white text-blue-600 rounded py-2 px-6 mt-4 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
        </div>
      </div>

      {/* Show loader while fetching */}
      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <div className="loader"></div>
        </div>
      )}

      <main className="container mx-auto my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                title={recipe.title} 
                image={recipe.image} 
                description={recipe.description} 
                recipeUrl={recipe.spoonacularSourceUrl}  // Link to the full recipe page
              />
            ))
          ) : (
            !isLoading && !errorMessage && (
              <p className="text-center text-lg">Start searching for recipes!</p>
            )
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 Recipe Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
