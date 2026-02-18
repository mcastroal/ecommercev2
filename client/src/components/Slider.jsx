import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./slider.css";

export default function Slider() {
  // REF- object
  const trackRef = useRef(null);
  // STATE
  const [active, setActive] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  // SLIDES
  const slides = useMemo(
    () => [
      {
        id: 1,
        src: "/images/Pour.JPG",
        alt: "Matcha being poured",
        headline: "Matcha",
        cta: "Browse",
        to: "/products",
      },
      {
        id: 2,
        src: "/images/shopmatcha.jpg",
        alt: "matcha powder",
        headline: "Best Sellers",
        cta: "Browse",
        to: "/products",
      },
      {
        id: 3,
        src: "/images/shopall.JPG",
        alt: "matcha whisk and bowl",
        headline: "Accessories",
        cta: "Browse",
        to: "/products",
      },
    ],
    []
  );

  // Scrolls the track to the slide at index i
  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    // Grabs the first slide element
    const slide = track.querySelector(".slide");
    if (!slide) return;

    const left = i * slide.offsetWidth;
    track.scrollTo({ left, behavior: "smooth" });
  };


  // Autoplay
  useEffect(() => {
    if (isInteracting) return;

    const t = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length;
        scrollToIndex(next);
        return next;
      });
    }, 3000);

    return () => clearInterval(t);
  }, [isInteracting, slides.length]);

  // Track active slide while scrolling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slideWidth = track.clientWidth;
      const i = Math.round(track.scrollLeft / slideWidth);
      setActive(Math.max(0, Math.min(i, slides.length - 1)));
    };

    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  const startInteract = () => setIsInteracting(true);
  const endInteract = () => setTimeout(() => setIsInteracting(false), 800);

  return (
    <section className="slider">
      <div
        ref={trackRef}
        className="slider-track"
        onPointerDown={startInteract}
        onPointerUp={endInteract}
        onMouseEnter={startInteract}
        onMouseLeave={endInteract}
      >
        {slides.map((s) => (
          <div key={s.id} className="slide">
            <img src={s.src} alt={s.alt} className="slide-image" />

            <div className="slide-overlay">
              <h3 className="slide-title">{s.headline}</h3>

              <Link to={s.to} className="slide-button">
                {s.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
