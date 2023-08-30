interface Product {
  productId: string;
  userId: string;
  price: number;
  quantity: number;
}
export async function addToCartAPI(data: Product) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/cart`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function removeToCartAPI(id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/cart?cartId=${id}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function fetchUserCartAPI() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/cart`, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

interface IOrder {
  price: string;
  quantity: number;
}
export async function buyOrder(data: IOrder[]) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/order`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    window.open(result.url, "_blank");
    return result;
  } catch (error) {
    return error;
  }
}
