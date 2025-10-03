import { useCart } from "./CartContext";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, increment, decrement , clearCart } = useCart();
  const [successMessage, setSuccessMessage] = useState(""); // new state for success message

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {

      console.log({cart})
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`✅ ${data.message} Total: ₹${data.total.toFixed(2)}`);
        clearCart(); // clear cart after successful checkout

        // Remove success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(`Checkout failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Your Cart</h2>

      {/* Success message */}
      {successMessage && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
          }}
        >
          {successMessage}
        </div>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ flex: "1" }}>{item.name}</span>

              <div style={{ display: "flex", alignItems: "center" }}>
                <button onClick={() => decrement(item.id)} style={{ padding: "2px 8px", margin: "0 5px" }}> - </button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item.id)} style={{ padding: "2px 8px", margin: "0 5px" }}> + </button>
              </div>

              <span style={{ width: "80px", textAlign: "right" }}>₹{(item.price * item.quantity).toFixed(2)}</span>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "transparent",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <h3>Total: ₹{total.toFixed(2)}</h3>

            <button
              onClick={clearCart}
              style={{
                marginTop: "10px",
                marginRight: "10px",
                padding: "8px 16px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>

            <button
              onClick={handleCheckout}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
