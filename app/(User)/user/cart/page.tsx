const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cart", {
      method: "GET",
    });
    const result = await response.json();
    console.log({ result });
    return result;
  } catch (error) {
    console.log({ error });
    return error;
  }
};
export default async function Page() {
  const data = await getData();
  console.log({ data });
  return <div>Cart</div>;
}
