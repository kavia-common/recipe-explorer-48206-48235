import React from "react";

/**
 * Header component for the recipe explorer app.
 * Ocean Professional theme, sticky and visually prominent.
 */
// PUBLIC_INTERFACE
function Header({ theme }) {
  return (
    <header
      style={{
        width: "100%",
        background: theme.gradient,
        borderBottom: `1px solid #e5e7eb`,
        boxShadow: "0 2px 8px 0 rgba(37,99,235,0.08)",
        padding: "0",
        marginBottom: 0,
        position: "sticky",
        top: 0,
        zIndex: 30
      }}
      aria-label="Main site header"
      className="header-header"
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.3rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <span
          style={{
            fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "1.6rem",
            color: theme.primary,
            letterSpacing: "-1px"
          }}
        >
          <span
            style={{
              color: theme.primary,
              background: "rgba(37,99,235,0.09)",
              padding: "0.22em 0.6em",
              borderRadius: 10,
              marginRight: 12,
              fontWeight: 700
            }}
          >
            Ocean Recipe Explorer
          </span>
        </span>
      </div>
    </header>
  );
}

export default Header;
