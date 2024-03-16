import { jwtDecode } from "jwt-decode";

export function decodeToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
}

export function checkIfTokenIsValid() {
  const generatedDate = decodeToken().iat;
  const now = new Date().getTime();
  const dateTimeStamp = new Date(generatedDate * 1000).getTime();
  const difference = now - dateTimeStamp;
  const millisecondsInADay = 24 * 60 * 60 * 1000;

  if (difference < millisecondsInADay) return true;
  return false;
}
