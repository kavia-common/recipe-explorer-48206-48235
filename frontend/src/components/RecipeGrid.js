import React, { useMemo } from "react";
import RecipeCard from "./RecipeCard";

/**
 * Main grid for displaying recipe previews.
 */
// PUBLIC_INTERFACE
function RecipeGrid({
  recipes,
  search,
  filters,
  onRecipeSelect,
  selectedId
}) {
  // Filter logic
  const shown = useMemo(() => {
    let arr = recipes;
    if (filters.category) arr = arr.filter((r) => r.category === filters.category);
    if (filters.cuisine) arr = arr.filter((r) => r.cuisine === filters.cuisine);
    if (filters.difficulty) arr = arr.filter((r) => r.difficulty === filters.difficulty);
    if (search) {
      const s = search.trim().toLowerCase();
      arr = arr.filter((r) =>
        r.title.toLowerCase().includes(s) ||
        (r.ingredients || []).join(" ").toLowerCase().includes(s)
      );
    }
    return arr;
  }, [recipes, search, filters]);

  if (!recipes.length)
    return <div style={{padding:40}}>No recipes available.</div>;
  if (!shown.length)
    return <div style={{padding:"2.7em 1.5em", color:"#bbb"}}>No recipes found with selected filters or search.</div>;

  return (
    <div
      className="recipegrid-root"
      style={{
        display:"grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
        gap: "2.1em",
        margin:"0 auto",
        maxWidth:1200,
        minHeight: "342px"
      }}
      aria-label="Recipe grid"
    >
      {shown.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          selected={selectedId === recipe.id}
          onClick={() => onRecipeSelect(recipe.id)}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;
