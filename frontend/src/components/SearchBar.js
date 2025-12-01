import React, { useRef } from "react";

/**
 * Search bar for recipes. Calls setSearch with value.
 */
// PUBLIC_INTERFACE
function SearchBar({ search, setSearch }) {
  const inputRef = useRef(null);

  return (
    <form
      style={{
        maxWidth: 440,
        margin: "2rem 0 2.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
      }}
      role="search"
      aria-label="Search recipes"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current) inputRef.current.blur();
      }}
    >
      <label htmlFor="searchbar-input" className="visually-hidden">
        Search for recipes
      </label>
      <input
        id="searchbar-input"
        ref={inputRef}
        type="search"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          padding: "0.88rem 1.1rem",
          fontSize: "1.1rem",
          borderRadius: "2em",
          background: "#fff",
          border: "1.5px solid #e4e7ec",
          boxShadow: "0 2px 8px 0 rgba(37,99,235,0.045)",
          color: "#111827",
          outline: "none",
          transition: "all 0.18s"
        }}
        aria-label="Search"
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Search"
        style={{
          border: "none",
          background: "#2563EB",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "1.7em",
          padding: "0.6em 1.2em",
          marginLeft: "-0.6em",
          fontSize: "1.1rem",
          boxShadow: "0 2px 8px 0 rgba(37,99,235,0.1)",
          transition: "background 0.18s",
        }}
      >
        <span aria-hidden>🔍</span>
      </button>
    </form>
  );
}

export default SearchBar;
