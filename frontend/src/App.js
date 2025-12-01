import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FiltersSidebar from "./components/FiltersSidebar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetail from "./components/RecipeDetail";

// Color theme (Ocean Professional)
const THEME = {
  primary: "#2563EB",
  secondary: "#F59E0B",
  success: "#F59E0B",
  error: "#EF4444",
  background: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
  gradient: "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, #f9fafb 100%)"
};

const MOCK_RECIPES = [
  {
    id: 1,
    title: "Spicy Thai Noodles",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
    category: "Noodles",
    cuisine: "Thai",
    difficulty: "Intermediate",
    ingredients: [
      "Rice noodles",
      "Chili flakes",
      "Soy sauce",
      "Peanut butter",
      "Carrots",
      "Cilantro"
    ],
    steps: [
      "Boil the noodles",
      "Mix sauce ingredients",
      "Stir fry vegetables",
      "Combine noodles and sauce",
      "Serve with cilantro"
    ]
  },
  {
    id: 2,
    title: "Classic Carbonara",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=500&q=80",
    category: "Pasta",
    cuisine: "Italian",
    difficulty: "Easy",
    ingredients: [
      "Spaghetti",
      "Pancetta",
      "Eggs",
      "Parmesan cheese",
      "Black pepper"
    ],
    steps: [
      "Cook the spaghetti",
      "Fry pancetta until crisp",
      "Beat eggs and cheese",
      "Mix everything quickly off-heat",
      "Serve immediately"
    ]
  },
  {
    id: 3,
    title: "Vegetarian Sushi Rolls",
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=500&q=80",
    category: "Rice",
    cuisine: "Japanese",
    difficulty: "Difficult",
    ingredients: [
      "Sushi rice",
      "Nori sheets",
      "Cucumber",
      "Avocado",
      "Carrot",
      "Vinegar"
    ],
    steps: [
      "Prepare and season rice",
      "Lay out nori and spread rice",
      "Add fillings",
      "Roll tightly and slice",
      "Serve with soy sauce"
    ]
  }
];

function fetchRecipes() {
  // If REACT_APP_API_BASE is set, fetch from backend, else use MOCK_RECIPES.
  const base = process.env.REACT_APP_API_BASE || "";
  if (base) {
    return fetch(`${base}/recipes`).then((res) => res.json());
  }
  // Simulate API delay for realism
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_RECIPES), 400));
}

function RecipeMainView({ recipes, loading, error, filters, setFilters, search, setSearch, onRecipeSelect, selectedId }) {
  return (
    <div className="main-content">
      <div className="sidebar-section" aria-label="Filters sidebar">
        <FiltersSidebar
          filters={filters}
          setFilters={setFilters}
          recipes={recipes}
        />
      </div>
      <div className="recipes-section">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        {loading ? (
          <div className="loading-message" role="status" aria-live="polite">
            Loading recipes...
          </div>
        ) : error ? (
          <div className="error-message" role="alert">
            {error}
          </div>
        ) : (
          <RecipeGrid
            recipes={recipes}
            search={search}
            filters={filters}
            onRecipeSelect={onRecipeSelect}
            selectedId={selectedId}
          />
        )}
      </div>
    </div>
  );
}

function AppInner() {
  // Theme always Ocean Professional, but provide dark mode if future needed.
  useEffect(() => {
    document.body.style.background = THEME.background;
    document.body.style.color = THEME.text;
  }, []);

  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    cuisine: "",
    difficulty: ""
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchRecipes()
      .then((data) => {
        if (!ignore) {
          setAllRecipes(Array.isArray(data) ? data : []);
          setError("");
        }
      })
      .catch(() => {
        if (!ignore) setError("Failed to fetch recipes.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Routing param: /recipes/:id for detail modal/route
  let selectedRecipeId = null;
  if (location.pathname.startsWith("/recipes/")) {
    const paramId = parseInt(location.pathname.replace("/recipes/", ""), 10);
    if (!isNaN(paramId)) selectedRecipeId = paramId;
  }

  const handleRecipeSelect = (id) => {
    navigate(`/recipes/${id}`);
  };
  const handleCloseDetail = () => {
    navigate("/");
  };

  return (
    <div className="app-theme-wrapper" style={{background: THEME.gradient, minHeight: "100vh"}}>
      <Header theme={THEME} />
      <RecipeMainView
        recipes={allRecipes}
        loading={loading}
        error={error}
        filters={filters}
        setFilters={setFilters}
        search={search}
        setSearch={setSearch}
        onRecipeSelect={handleRecipeSelect}
        selectedId={selectedRecipeId}
      />
      {selectedRecipeId && (
        <RecipeDetail
          isOpen={!!selectedRecipeId}
          recipe={allRecipes.find((r) => r.id === selectedRecipeId)}
          onClose={handleCloseDetail}
          theme={THEME}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppInner />} />
        <Route path="/recipes/:id" element={<AppInner />} />
        {/* fallback to AppInner */}
        <Route path="*" element={<AppInner />} />
      </Routes>
    </Router>
  );
}

export default App;
