import React from 'react';

const RecipeCard = ({ title, image, description, recipeUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">
          {description ? description : 'No description available.'}
        </p>
        <div className="mt-4">
          <a
            href={recipeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
