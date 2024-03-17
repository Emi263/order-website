import axios from "axios";

export async function getAllProducts() {
  const res = await axios.get("https://api.escuelajs.co/api/v1/products?limit=10&offset=0");
  return res.data;
}

export async function getSingleProduct(id) {
  const res = await axios.get("https://api.escuelajs.co/api/v1/products/" + id);
  return res.data;
}

//update product
export async function updateProduct({ id, dataToChange }) {
  const res = await axios.put("https://api.escuelajs.co/api/v1/products/" + id, {
    title: dataToChange.title,
    price: dataToChange.price,
  });

  return res.data;
}

//createNewProduct product
export async function createNewProduct(data) {
  console.log(data);
  const res = await axios.post("https://api.escuelajs.co/api/v1/products/", data);
  return res.data;
}

export async function deleteProduct(id) {
  console.log(id);
  const res = await axios.delete("https://api.escuelajs.co/api/v1/products/" + id);
  return res.data;
}
