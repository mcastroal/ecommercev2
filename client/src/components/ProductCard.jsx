import { useEffect, useState } from "react";

/**
 * ProductCard
 * - Desktop: flips on hover (CSS)
 * - Mobile: flips on tap (JS toggles "isFlipped" class)
 * - Keyboard: Enter/Space flips (accessibility)
 */
export default function ProductCard({ product }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Optional: unflip when product changes (rare but safe)
  useEffect(() => {
    setIsFlipped(false);
  }, [product.id]);

  function toggleFlip() {
    setIsFlipped((v) => !v);
  }

  return (
    <div
      className={`flipCard ${isFlipped ? "isFlipped" : ""}`}
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      }}
    >
      <div className="flipInner">
        {/* FRONT: image + title + price */}
        <div className="flipFront">
          <img
            className="productImg"
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
          />

          <div className="imageOverlay">
            <h3 className="overlayTitle">{product.title}</h3>
          </div>
        </div>

        {/* BACK: description + type + price */}
        <div className="flipBack">
          <h3 className="productTitle">{product.title}</h3>

          <p className="productDesc">{product.description}</p>

          <div className="backMeta">
            <span className="pill">{product.type}</span>
            <span className="productPrice">${Number(product.price).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
