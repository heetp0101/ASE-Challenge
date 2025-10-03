### Follow the below steps to run this Project

#### Step 1 :  Clone Repo
- Clone the Git Repostory

  ```
  git clone  https://github.com/heetp0101/ASE-Challenge.git
  ```


#### Step 2 : Install libraries and dependencies

- Install libraries for frontend and backend

  ```
  cd backend
  npm install
  ```

  ```
  cd simple-shopping-cart-frontend
  npm install
  ```


#### Step 3 : Implement Backend API Endpoints (Without Frontend)

- Open POSTMAN API Testing Tool and run following API Endpoints

  - `GET /products` to fetch all products that are hardcoded

    Example : 
    ```
    GET  /http://localhost:5000/products
    ```

  - `POST /checkout` to list the products from product id through cart

    Example :
    ```
    POST  /http://localhost:5000/checkout

    Body :
    
    {
      "cart": [
                {
                    "id": 3,
                    "name": "Denim Jacket",
                    "price": 1499,
                    "imageUrl": "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759341759/aa1856b9-b7ae-4e0e-98d1-c2d8f0c78c0d.png",
                    "quantity": 2
                },
                {
                    "id": 5,
                    "name": "Smart Watch",
                    "price": 4999,
                    "imageUrl": "https://res.cloudinary.com/dcgsu3rat/image/upload/v1759342280/d0ee8777-6f9d-41f8-8692-d1be2650659d.png",
                    "quantity": 1
                }
             ]
    }

    ```


#### Step 4 : Run Backend 

- Run Node js server inside `backend` folder

  ```
  cd backend
  npm run dev
  ```


### Step 5 : Run Frontend

- Run React app inside `simple-shopping-cart-frontend` folder

  ```
  cd simple-shopping-cart-frontend
  npm run dev
  ```
