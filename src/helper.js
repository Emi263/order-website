import { jwtDecode } from "jwt-decode";
import products from "./data/products";

export function decodeToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
  return null;
}

export function checkIfTokenIsValid() {
  if (decodeToken() === null) return false;

  const generatedDate = decodeToken().iat;
  const now = new Date().getTime();
  const dateTimeStamp = new Date(generatedDate * 1000).getTime();
  const difference = now - dateTimeStamp;
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  if (difference < millisecondsInADay) return true;
  return false;
}

export function getCategories() {
  const allCategories = products.map((item) => item.category);
  const allUniqueCategories = ["All", ...new Set(allCategories)];
  return allUniqueCategories;
}
