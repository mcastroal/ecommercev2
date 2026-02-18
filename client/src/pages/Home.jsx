import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    // Page wrapper
    <div className="home"> 
      <section className="scrollScene">
        {/* HERO SECTION*/}
        <div className="hero">
          <div className="heroPanel" aria-hidden="true" />
          <div className="heroText">
            <h1>MATCHA</h1>
            <div className="heroBtn">
               <Link to="/products" className="shopBtn">SHOP NOW</Link> 
            </div>
          </div>
        </div>

        {/* STICKY OVERLAY */}
        <div className="overlaySticky">
          <img
            className="overlayPng"
            src="/images/logoprofile.PNG"
            alt="Dinoco Matcha Logo"
          />
          
        </div>

        
        {/* CLOUDS SECTION */}
        <div className="cloudSection">
          <div className="cloudLayer" aria-hidden="true" />
          <div className="cloudContent">
            <h2>WHY CHOOSE DINOCO?</h2>
            <p>
              We believe matcha is more than a drink it’s a moment. Thoughtfully sourced, beautifully crafted, and designed to elevate your daily ritual.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT BELOW: SLIDER */}
      <section className="belowContent">
        <Slider></Slider>
      </section>
    </div>
  );
}
