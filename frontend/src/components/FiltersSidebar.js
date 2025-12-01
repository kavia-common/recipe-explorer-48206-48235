import React, { useState } from "react";

/**
 * Collapsible sidebar for recipe filters (category, cuisine, difficulty).
 * Local state for collapse, props for filtered values.
 */
// PUBLIC_INTERFACE
function FiltersSidebar({ filters, setFilters, recipes }) {
  // Extract distinct values for filters
  const getFilterOptions = (field) => {
    const vals = [
      ...new Set(recipes.map((r) => r[field]).filter(Boolean))
    ];
    return vals;
  };
  const categories = getFilterOptions("category");
  const cuisines = getFilterOptions("cuisine");
  const difficulties = getFilterOptions("difficulty");

  const [open, setOpen] = useState(true);

  return (
    <aside
      style={{
        background: "#fff",
        borderRadius: "1.1em",
        padding: "1.3em 1.2em 1.7em",
        minWidth: 188,
        maxWidth: 230,
        boxShadow: open
          ? "0 2px 8px 0 rgba(17,24,39,0.09)"
          : "none",
        marginRight: open ? "1.6em" : 0,
        zIndex: 1,
        transition: "all .25s cubic-bezier(.41,.46,0,1.03)",
        position: "relative"
      }}
      aria-label="Recipe Filters"
    >
      <button
        aria-label={open ? "Hide filters sidebar" : "Show filters sidebar"}
        aria-expanded={open}
        onClick={() => setOpen((c) => !c)}
        style={{
          display: "block",
          border: "none",
          background: open
            ? "rgba(37,99,235,0.18)"
            : "rgba(17,24,39,0.03)",
          color: "#2563EB",
          borderRadius: 12,
          padding: "0.33em 0.9em",
          fontWeight: 500,
          position: "absolute",
          left: -32,
          top: 10,
          fontSize: "0.95em",
          cursor: "pointer",
          boxShadow: "0 1px 5px 0 rgba(37,99,235,0.04)"
        }}
      >
        {open ? "⏴" : "⏵"}
      </button>
      {open && (
        <div>
          <div style={{marginBottom:18, fontWeight:600, color:"#2563EB", fontSize:"1.13em"}}>Filters</div>
          <FilterSelect
            name="Category"
            options={categories}
            value={filters.category}
            onChange={(val) =>
              setFilters((f) => ({ ...f, category: val }))
            }
          />
          <FilterSelect
            name="Cuisine"
            options={cuisines}
            value={filters.cuisine}
            onChange={(val) =>
              setFilters((f) => ({ ...f, cuisine: val }))
            }
          />
          <FilterSelect
            name="Difficulty"
            options={difficulties}
            value={filters.difficulty}
            onChange={(val) =>
              setFilters((f) => ({ ...f, difficulty: val }))
            }
          />
          <button
            onClick={() =>
              setFilters({ category: "", cuisine: "", difficulty: "" })
            }
            aria-label="Clear all filters"
            style={{
              background: "#F59E0B",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              padding: "0.45em 1.15em",
              fontWeight: 500,
              fontSize: "0.98em",
              marginTop: 18,
              transition: "background 0.16s"
            }}
          >
            Clear
          </button>
        </div>
      )}
    </aside>
  );
}

function FilterSelect({ name, options, value, onChange }) {
  return (
    <div style={{marginBottom:12}}>
      <label style={{display:"block", marginBottom:3, fontWeight: 500, color: "#374151"}}>
        {name}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width:"100%",
          fontSize: "1em",
          padding: "0.55em 0.65em",
          border: "1.2px solid #e5e7eb",
          borderRadius: 7,
          color: "#111827",
          background: "#f9fafb"
        }}
        aria-label={name}
      >
        <option value="">All</option>
        {options.map((v, i) => (
          <option value={v} key={i}>{v}</option>
        ))}
      </select>
    </div>
  );
}

export default FiltersSidebar;
