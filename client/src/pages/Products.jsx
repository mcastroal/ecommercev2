// Import React hooks
import { useEffect, useMemo, useState } from "react";

// Import components
import ProductControls from "../components/ProductControls";
import ProductCard from "../components/ProductCard";

// Import CSS
import "./Products.css";

export default function Products() {
  // STATE
  const [products, setProducts] = useState([]); //stores the list of products from the backend
  // FILTER STATE
  const [type, setType] = useState("All"); // Product category filter
  const [minPrice, setMinPrice] = useState(""); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price filter
  // SORTING STATE
  const [sortBy, setSortBy] = useState("none"); // none | low | high
  const API = import.meta.env.VITE_API_URL;
  // FETCH PRODUCTS FROM BACKEND (when the ilters change)
  useEffect(() => {
    const params = new URLSearchParams();
    // Only add filter is user selects them
    if (type !== "All") params.append("type", type);
    if (minPrice !== "") params.append("minPrice", minPrice);
    if (maxPrice !== "") params.append("maxPrice", maxPrice);
    // Send GET request to backend with filters
    fetch(`${API}/api/products?${params.toString()}`)
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setProducts(data)) //Store results in state
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [type, minPrice, maxPrice]);

  // CLIENTSIDE SORTING (no backend changes)
  const sortedProducts = useMemo(() => {
    const copy = [...products]; // Creating a copy to keep original state intact
    if (sortBy === "low") copy.sort((a, b) => Number(a.price) - Number(b.price)); // Sort low to high
    if (sortBy === "high") copy.sort((a, b) => Number(b.price) - Number(a.price)); // Sort high to low
    return copy;
  }, [products, sortBy]); // Recalc only when sort by changes or products

  // === UI ===
  return (
    <div className="productsPage">
      <section className="productsHeader">
        <h1>PRODUCTS</h1>
        <p>Discover our premium collection.</p>
      </section>

      <ProductControls
        type={type}
        setType={setType}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <section className="productGrid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
