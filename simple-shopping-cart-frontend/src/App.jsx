// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Cart from "./Cart";

function Header({ cart }) {
  const location = useLocation();
  const isCart = location.pathname === "/cart";

  return (
    <header
      style={{
        display: "flex",
        width: "90vw",
        marginTop: "20px",
        justifyContent: "right",
        padding: "1rem",
        background: "#333",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", flexBasis: "52%" }}>
        <h2>Simple Shopping Cart</h2>
      </div>

      <div>
        <Link
          to={isCart ? "/" : "/cart"}
          style={{
            position: "relative",
            textDecoration: "none",
            display: "inline-block",
            padding: "8px 16px",
            background: "rgb(15,15,24)",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.2s ease", // smooth hover transition
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#222"; // slightly lighter/darker
            e.currentTarget.style.transform = "scale(1.05)"; // slight zoom
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"; // subtle shadow
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgb(15,15,24)";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {isCart ? "Home" : "🛒 Cart"}
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </span>
          )}
        </Link>
      </div>
    </header>

  );
}

function AppContent() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductGrid addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
