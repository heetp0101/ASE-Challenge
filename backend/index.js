const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json());
const port = 5000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    console.log("hello world");
    res.send('Hello World !')
  })

// Hardcoded products
const products = [
    { id: 1, name: "Classic Tee", price: 999, imageUrl: "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759339055/classic-tea_tssyz0-removebg-preview_mpmgrd.png" },
    { id: 2, name: "Sneaker 101", price: 2999, imageUrl: "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759340586/e8961de8-4bb7-4973-9868-965b1210da78.png" },
    { id: 3, name: "Denim Jacket", price: 1499, imageUrl: "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759341759/aa1856b9-b7ae-4e0e-98d1-c2d8f0c78c0d.png" },
    { id: 4, name: "Sports Cap", price: 199, imageUrl: "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759341876/6e2de88a-0b91-4643-b39a-22d28dee27ac.png" },
    { id: 5, name: "Smart Watch", price: 4999, imageUrl: "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759342280/d0ee8777-6f9d-41f8-8692-d1be2650659d.png" },
    { id: 6, name: "Wireless Headphone", price: 1999, imageUrl: "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759343360/d38a5c3a-0e33-4a79-8fef-f12e62240ac8.png" }
  ];


// Add all products  
app.post('/products', (req,res) => {

    const new_product = req.body;
    res.send("new product added : " +  JSON.stringify(new_product))
})


// Get all Products
app.get('/products', (req,res)=>{
    res.send(products)
})



// Checkout endpoint
app.post("/checkout", (req, res) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty or invalid" });
  }

  // Log order details
  console.log("----- NEW ORDER -----");
  cart.forEach((item) => {
    console.log(`Product ID: ${item.id}, Quantity: ${item.quantity}`);
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  console.log("Total:", total);
  console.log("--------------------");

  // Respond success
  res.json({ message: "Order placed successfully!", total });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })