import React from "react";

/**
 * Displays a summarized recipe card with click interaction.
 */
// PUBLIC_INTERFACE
function RecipeCard({ recipe, onClick, selected }) {
  return (
    <button
      className="recipecard-root"
      aria-label={`View details for ${recipe.title}`}
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        border: selected
          ? "2.2px solid #2563EB"
          : "1.5px solid #e5e7eb",
        boxShadow: selected
          ? "0 6px 28px 0 rgba(37,99,235,0.14)"
          : "0 2px 10px 0 rgba(0,0,0,0.06)",
        borderRadius: 17,
        background: "#fff",
        transition: "box-shadow .18s, border .18s",
        padding: 0,
        margin: 0,
        outline: "none",
        overflow: "hidden"
      }}
      onClick={onClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "62%",
          backgroundImage: `url(${recipe.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: 17,
          borderTopRightRadius: 17,
          borderBottom: "1.5px solid #eaeaea"
        }}
        aria-label={`Image for ${recipe.title}`}
        role="img"
      />
      <div
        style={{
          padding: "1.1em 1.2em 0.9em",
          background: "#fff",
          borderBottomLeftRadius: 17,
          borderBottomRightRadius: 17,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.5em"
        }}
      >
        <div
          style={{
            fontWeight: 600,
            color: "#2563EB",
            fontSize: "1.13em",
            marginBottom: 2
          }}
        >
          {recipe.title}
        </div>
        <div
          style={{
            fontSize: "1em",
            color: "#7c7e87",
            marginBottom: 1
          }}
        >
          {recipe.category} &middot; {recipe.cuisine}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto"
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#F59E0B",
              border: "1px solid #FAF1E9",
              background: "#FFF8EC",
              borderRadius: 8,
              padding: "1.5px 10px"
            }}
          >
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </button>
  );
}

export default RecipeCard;
