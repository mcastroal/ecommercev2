import { useEffect, useRef, useState } from "react";

/**
 * ProductControls
 * - Filter button opens filter panel
 * - Sort dropdown closes when clicking outside + on ESC
 */
export default function ProductControls({
  type,
  setType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

  // Close sort dropdown on click outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (!sortOpen) return;
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setSortOpen(false);
        setFiltersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [sortOpen]);

  function resetFilters() {
    setType("All");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <>
      <section className="controlsBar">
        {/* Left: Filter icon */}
        <button
          className="iconBtn"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          aria-controls="filters-panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 5h18M6 12h12M10 19h4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Filter</span>
        </button>

        {/* Right: Sort dropdown */}
        <div className="dropdown" ref={sortRef}>
          <button
            className="sortBtn"
            onClick={() => setSortOpen((v) => !v)}
            aria-expanded={sortOpen}
            aria-controls="sort-menu"
          >
            Sort By <span className={`chev ${sortOpen ? "up" : ""}`}>⌄</span>
          </button>

          {sortOpen && (
            <div id="sort-menu" className="dropdownMenu" role="menu">
              <button
                className={`menuItem ${sortBy === "low" ? "active" : ""}`}
                onClick={() => {
                  setSortBy("low");
                  setSortOpen(false);
                }}
                role="menuitem"
              >
                Low to High
              </button>

              <button
                className={`menuItem ${sortBy === "high" ? "active" : ""}`}
                onClick={() => {
                  setSortBy("high");
                  setSortOpen(false);
                }}
                role="menuitem"
              >
                High to Low
              </button>

              <button
                className={`menuItem ${sortBy === "none" ? "active" : ""}`}
                onClick={() => {
                  setSortBy("none");
                  setSortOpen(false);
                }}
                role="menuitem"
              >
                Default
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter panel */}
      {filtersOpen && (
        <section id="filters-panel" className="filtersPanel">
          <div className="panelHeader">
            <h3>Filters</h3>
            <button className="textBtn" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="filterBlock">
            <p className="filterLabel">Product Type</p>
            <div className="pillGrid">
              <button
                className={`pillBtn ${type === "Matcha" ? "selected" : ""}`}
                onClick={() => setType("Matcha")}
              >
                Matcha
              </button>
              <button
                className={`pillBtn ${type === "Accessories" ? "selected" : ""}`}
                onClick={() => setType("Accessories")}
              >
                Accessories
              </button>
              <button
                className={`pillBtn ${type === "All" ? "selected" : ""}`}
                onClick={() => setType("All")}
              >
                All
              </button>
            </div>
          </div>

          <div className="filterBlock">
            <p className="filterLabel">Price</p>
            <div className="priceRow">
              <div className="priceField">
                <label className="miniLabel">Min</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="priceField">
                <label className="miniLabel">Max</label>
                <input
                  type="number"
                  placeholder="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
