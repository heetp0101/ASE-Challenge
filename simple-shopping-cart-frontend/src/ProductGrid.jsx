// src/ProductGrid.jsx
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, increment, decrement } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {products.map((product) => {
        const itemInCart = cart.find((item) => item.id === product.id);

        return (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              background: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                backgroundColor: "rgb(165,215,215)",
                borderRadius: "15px",
                transition: "transform 0.3s ease",
              }}
            />
            <h3
              style={{
                marginTop: "10px",
                fontSize: "1.2rem",
                fontWeight: "600",
                color: "#333",
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#007bff",
              }}
            >
              {product.price.toFixed(2)} ₹
            </p>

            {!itemInCart ? (
              <button
                onClick={() => addToCart(product)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0056b3";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#007bff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Add to Cart
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => decrement(product.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  -
                </button>

                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    margin: "0 8px",
                    color:"rgb(15,11,21)"
                  }}
                >
                  {itemInCart.quantity}
                </span>

                <button
                  onClick={() => increment(product.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
