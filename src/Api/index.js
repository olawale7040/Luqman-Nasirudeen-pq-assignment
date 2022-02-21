import axios from "axios";

// This variable is created in the .env file, but won't be push to the repo
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

export const getCurrencyList = () => Axios.get(`exchange-rates?key=${apiKey}`);

export const getExchangeHistory = (currency, start) =>
  Axios.get(
    `exchange-rates/history?key=${apiKey}&currency=${currency}&start=${start}`
  );
