import React from "react";
import useRecipeData from "../hooks/useRecipeData";

const TestComponent = () => {
  const { recipeData, error } = useRecipeData( 1 );


  if (error) {
    return <div>ErroR: {error}</div>;
  }

  return (
    <div>
      {JSON.stringify(recipeData)}
    </div>
  );
};

export default TestComponent;