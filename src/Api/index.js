import axios from "axios";

const myKey = "086fa3779199d3ec5a37ab1efd1d847057a8be55";
const apiKey = process.env.REACT_APP_API_KEY
  ? process.env.REACT_APP_API_KEY
  : myKey;

const Axios = axios.create({
  baseURL: `https://api.nomics.com/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export const getCurrencyList = () =>
  Axios.get(
    `currencies/ticker?key=${apiKey}&interval=1h&per-page=10&status=active&quote-currency=USD&symbols=NGN,USD&filter=any&include-fiat=true`
  );
