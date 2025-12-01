import React, { useEffect, useRef } from "react";

/**
 * Displays detailed view of a recipe in modal or as route.
 * Handles focus and ESC close, accessible.
 */
// PUBLIC_INTERFACE
function RecipeDetail({ isOpen, recipe, onClose, theme }) {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const listener = (evt) => {
      if (evt.key === "Escape") onClose();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && bgRef.current) {
      bgRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !recipe) return null;

  return (
    <div
      ref={bgRef}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      aria-label={recipe.title + " details"}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(17,24,39,0.07)",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeInRecipeModal .22s"
      }}
      onClick={(e) => {
        if (e.target === bgRef.current) onClose();
      }}
    >
      <div
        style={{
          background: theme.surface,
          borderRadius: 23,
          maxWidth: 430,
          width: "94%",
          boxShadow:
            "0 7px 42px 0 rgba(37,99,235,0.18), 0 0.5px 0 0 #efefef",
          display: "flex",
          flexDirection: "column",
          padding: "2.3em 2em 1.6em",
          position: "relative"
        }}
      >
        <button
          aria-label="Go back"
          style={{
            background: "none",
            border: "none",
            padding: 4,
            borderRadius: 6,
            color: "#EF4444",
            position: "absolute",
            top: 18,
            right: 18,
            fontSize: 28,
            cursor: "pointer",
            fontWeight: 500
          }}
          onClick={onClose}
        >
          ×
        </button>
        <div
          style={{
            fontWeight: 700,
            fontSize: "1.5em",
            marginBottom: 18,
            color: theme.primary
          }}
        >
          {recipe.title}
        </div>
        <img
          src={recipe.image}
          alt={recipe.title + " image"}
          style={{
            width: "100%",
            borderRadius: 16,
            marginBottom: "1.2em",
            aspectRatio: "5/3.2",
            objectFit: "cover"
          }}
        />
        <div style={{fontWeight: 600, marginBottom:3, color:"#F59E0B", fontSize:"1.1em"}}>
          Ingredients
        </div>
        <ul style={{paddingLeft: '1em', marginBottom:"1.2em"}}>
          {(recipe.ingredients || []).map((item, idx) => (
            <li key={idx} style={{color: "#222"}}>{item}</li>
          ))}
        </ul>
        <div style={{fontWeight: 600, marginBottom:3, color:theme.primary, fontSize:"1.1em"}}>
          Steps
        </div>
        <ol style={{paddingLeft: '1.0em'}}>
          {(recipe.steps || []).map((step, idx) => (
            <li key={idx} style={{marginBottom:"0.55em", color: "#444"}}>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        @keyframes fadeInRecipeModal {
          from { opacity: 0; transform: scale(0.98);}
          to { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}

export default RecipeDetail;
