#### Dino Market:
 An online marketplace offering dinosaur products. Securely authenticate with Clerk, manage content effortlessly with Sanity, and enjoy fast performance with Next.js, Vercel, and PostgreSQL. Accept payments seamlessly with Stripe for a smooth shopping experience.


# POSTGRES TABLE
- Step 1
` Order Table `
```
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  userId TEXT NOT NULL,
  itemCount INTEGER NOT NULL,
  total INTEGER NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);
```
- Step 2
` CartItem Table `
```
CREATE TABLE cartitem (
  id SERIAL PRIMARY KEY,
  productId TEXT NOT NULL,
  userId TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  orderId INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE
);
```


- Delete Table
```
DROP TABLE IF EXISTS cartitem
DROP TABLE IF EXISTS orders
```

- Feed
```
INSERT INTO "orders" (userId, itemCount, total, createdAt)
VALUES ('user_1', 3, 2500, NOW());
```
```
INSERT INTO cartitem (productId, quantity, price, orderId, userId, createdAt)
VALUES
  ('product_1', 2, 1000, 1, 'user_1', NOW()),
  ('product_2', 3, 1500, 1, 'user_1', NOW()),
  ('product_3', 1, 500, 1, 'user_2', NOW()),
  ('product_4', 5, 2000, 1, 'user_3', NOW()),
  ('product_5', 4, 1800, 1, 'user_3', NOW());
```
