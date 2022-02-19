import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
//
import { getCurrencyList, getExchangeHistory } from "src/Api";
import { formatNumber, subtractDaysFromDate } from "src/utils";
import { decimalPlace, defaultNoDay } from "src/constant";
// Components
import ExchangeHistory from "./ExchangeHistory";

const CurrencyConverter = () => {
  // Exchange-history state data
  const [exchangeHistory, setExchangeHistory] = useState([]);
  // Currency state data
  const [currencies, setCurrency] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(null);
  const [selectedQuoteCurrency, setSelectedQuoteCurrency] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [basePrice, setBasePrice] = useState(null);
  const [quotePrice, setQuotePrice] = useState(null);
  const [values, setValues] = useState({
    amount: "",
    fromCurrency: "",
    toCurrency: "",
  });

  const handleChange = (value, type) => {
    if (type === "fromCurrency") {
      setSelectedBaseCurrency(value);
    } else if (type === "toCurrency") {
      setSelectedQuoteCurrency(value);
    }
    setValues({
      ...values,
      [type]: value.currency ? value.currency : value,
    });
    setConvertedAmount(null);
  };

  const handleConversion = () => {
    const { amount } = values;
    const basePrice = selectedBaseCurrency.rate;
    const quotePrice = selectedQuoteCurrency.rate;
    const oneBasePrice = Number(basePrice) / Number(quotePrice);
    const oneQuotePrice = Number(quotePrice) / Number(basePrice);
    let result = amount * oneBasePrice;
    setConvertedAmount(result);
    setBasePrice(oneBasePrice);
    setQuotePrice(oneQuotePrice);

    // Get exchange rate history (default 7 days)
    let startDate = subtractDaysFromDate(defaultNoDay);
    handleFetchExchangeHistory(startDate);
    // Save conversion result to localStorage
    handleSaveConversion();
  };
  // Save conversion history
  const handleSaveConversion = () => {
    const date = new Date();
    const payload = {
      ...values,
      date,
    };
    let data = [];
    if (localStorage.hasOwnProperty("conversionHistory")) {
      const conversionHistory = JSON.parse(
        localStorage.getItem("conversionHistory")
      );
      payload.id = conversionHistory.length + 1;
      conversionHistory.push(payload);
      data = conversionHistory;
    } else {
      // First Item
      payload.id = 1;
      data.push(payload);
    }
    localStorage.setItem("conversionHistory", JSON.stringify(data));
  };
  const handleFetchExchangeHistory = (start) => {
    const currency = values?.fromCurrency;
    getExchangeHistory(currency, start)
      .then((response) => {
        if (response.status === 200) {
          setExchangeHistory(response.data.reverse());
          console.log(response, "History...");
        } else {
          // Error Handling
        }
      })
      .catch((error) => {
        // Error Handling
        // console.log(error.message, "error...");
      });
  };
  const fetchCurrencyList = () => {
    getCurrencyList()
      .then((response) => {
        if (response.status === 200) {
          setCurrency(response.data);
        } else {
          // Error Handling
        }
      })
      .catch((error) => {
        // Error Handling
        // console.log(error.message, "error...");
      });
  };
  useEffect(() => {
    fetchCurrencyList();
  }, []);
  return (
    <main className="main-container">
      <div className="page-content">
        <div className="page-title">I want to convert</div>
        <div className="form-container">
          <Formik
            enableReinitialize
            initialValues={values}
            validationSchema={Yup.object().shape({
              amount: Yup.number().min(1).required("Amount is required"),
              fromCurrency: Yup.string().required("Required"),
              toCurrency: Yup.string().required("Required"),
            })}
            onSubmit={async () => {
              handleConversion();
              // console.log(values, "our values");
            }}
          >
            {({ errors, handleSubmit, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 8 }}>
                  <TextField
                    label="Amount"
                    variant="standard"
                    name="amount"
                    helperText={touched.amount && errors.amount}
                    error={Boolean(touched.amount && errors.amount)}
                    onChange={(event) => {
                      handleChange(event.target.value, "amount");
                    }}
                  />
                  <Autocomplete
                    sx={{ width: "30%" }}
                    getOptionLabel={(option) => option.currency}
                    options={currencies}
                    noOptionsText={<small>You have none for now</small>}
                    onInputChange={(event, newInputValue) => {
                      handleChange(newInputValue, "fromCurrency");
                    }}
                    onChange={(event, newValue) => {
                      handleChange(newValue, "fromCurrency");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="from"
                        helperText={touched.fromCurrency && errors.fromCurrency}
                        error={Boolean(
                          touched.fromCurrency && errors.fromCurrency
                        )}
                        variant="standard"
                        name="fromCurrency"
                        value={values.fromCurrency}
                      />
                    )}
                  />
                  <Autocomplete
                    sx={{ width: "30%" }}
                    getOptionLabel={(option) => option.currency}
                    options={currencies}
                    noOptionsText={<small>You have none for now</small>}
                    onInputChange={(event, newInputValue) => {
                      handleChange(newInputValue, "toCurrency");
                    }}
                    onChange={(event, newValue) => {
                      handleChange(newValue, "toCurrency");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="To"
                        helperText={touched.toCurrency && errors.toCurrency}
                        error={Boolean(touched.toCurrency && errors.toCurrency)}
                        variant="standard"
                        name="toCurrency"
                        value={values.toCurrency}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#009688",
                      height: "48px",
                      padding: "22px",
                    }}
                  >
                    Convert
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </div>
        <div className="conversion-result">
          {convertedAmount && (
            <div>
              <div className="result-wrapper">
                <div className="from-currency">
                  {values?.amount} {values?.fromCurrency} =
                </div>
                <div className="to-currency">
                  {formatNumber(convertedAmount)} {values?.toCurrency}
                </div>
              </div>
              <div className="result-container">
                <div className="conversion-rate">
                  1 {values?.fromCurrency} ={" "}
                  {formatNumber(basePrice, decimalPlace)} {values?.toCurrency}
                </div>
                <div className="conversion-rate">
                  {" "}
                  1 {values?.toCurrency} ={" "}
                  {formatNumber(quotePrice, decimalPlace)}{" "}
                  {values?.fromCurrency}
                </div>
              </div>
            </div>
          )}
        </div>
        <Divider sx={{ marginTop: "48px" }} />
        <ExchangeHistory
          exchangeHistory={exchangeHistory}
          handleFetchExchangeHistory={handleFetchExchangeHistory}
        />
      </div>
    </main>
  );
};

export default CurrencyConverter;
