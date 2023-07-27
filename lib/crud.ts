interface Product {
  productId: string;
  userId: string;
  price: number;
  quantity: number;
}
export async function addToCartAPI(data: Product) {
  try {
    const response = await fetch("http://localhost:3000/api/cart", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function removeToCartAPI(id: string) {
  try {
    const response = await fetch("http://localhost:3000/api/cart", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    const result = await response.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
}

export async function fetchUserCartAPI() {
  try {
    const response = await fetch(`http://localhost:3000/api/cart`, {
      method: "GET",
    });
    const result = await response.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
}
