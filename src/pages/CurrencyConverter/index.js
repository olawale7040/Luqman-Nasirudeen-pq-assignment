import { useEffect, useState, useCallback } from "react";
import { Formik, getIn } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
// Action
import { updateConversionHistory } from "src/slices/conversionHistory";

//Utils
import { getCurrencyList, getExchangeHistory } from "src/Api";
import { formatNumber, subtractDaysFromDate } from "src/utils";
import { decimalPlace, defaultNoDay } from "src/constant";
// Components
import ExchangeHistory from "./ExchangeHistory";

const CurrencyConverter = () => {
  // Redux State
  const selectedViewHistory = useSelector(
    (state) => state.conversionHistory.viewConversion
  );
  // dispatch
  const dispatch = useDispatch();

  // Exchange-history state data
  const [exchangeHistory, setExchangeHistory] = useState([]);
  // Error Msg
  const [errorMessage, setErrorMessage] = useState("");
  // Currency state data
  const [currencies, setCurrency] = useState([]);
  const [basePrice, setBasePrice] = useState(null);
  const [quotePrice, setQuotePrice] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [values, setValues] = useState({
    amount: "",
    fromCurrency: { currency: "", rate: "" },
    toCurrency: { currency: "", rate: "" },
  });

  const handleSwitchCurrencyBtn = () => {
    const { fromCurrency, toCurrency } = values;
    if (fromCurrency.currency && toCurrency.currency) {
      setValues({
        ...values,
        fromCurrency: toCurrency,
        toCurrency: fromCurrency,
      });
      handleConversion();
    }
  };
  const handleChange = (value, type) => {
    setValues({
      ...values,
      [type]: value,
    });
    setConvertedAmount(null);
  };

  // Save conversion history
  const handleSaveConversion = useCallback(() => {
    const date = new Date();
    const payload = {
      ...values,
      amount: Number(values.amount),
      date,
    };
    dispatch(updateConversionHistory(payload));
  }, [dispatch, values]);

  // Fetch Exchange History
  const handleFetchExchangeHistory = useCallback(
    (start) => {
      const currency = values?.fromCurrency.currency;
      if (start && currency) {
        getExchangeHistory(currency, start)
          .then((response) => {
            if (response.status === 200) {
              setExchangeHistory(response.data.reverse());
            } else {
              setErrorMessage("An error occurred");
            }
          })
          .catch((error) => {
            setErrorMessage("An error occurred");
          });
      }
    },
    [values.fromCurrency?.currency]
  );
  // Trigger the conversion
  const handleConversion = useCallback(() => {
    const { amount, fromCurrency, toCurrency } = values;
    if (amount) {
      const basePrice = fromCurrency.rate;
      const quotePrice = toCurrency.rate;
      const oneBasePrice = Number(basePrice) / Number(quotePrice);
      const oneQuotePrice = Number(quotePrice) / Number(basePrice);
      const result = Number(amount) * oneBasePrice;
      setConvertedAmount(result);
      setBasePrice(oneBasePrice);
      setQuotePrice(oneQuotePrice);
      // Get exchange rate history (default 7 days)
      let startDate = subtractDaysFromDate(defaultNoDay);
      handleFetchExchangeHistory(startDate);
      // Save conversion result to store
      handleSaveConversion();
    }
  }, [handleFetchExchangeHistory, handleSaveConversion, values]);

  // Perform the conversion of a selected history
  const calculateViewHistory = useCallback(() => {
    if (selectedViewHistory) {
      setValues(selectedViewHistory);
      handleConversion();
    }
  }, [selectedViewHistory, handleConversion]);
  // Fetch all currencies
  const fetchCurrencyList = () => {
    getCurrencyList()
      .then((response) => {
        if (response.status === 200) {
          setCurrency(response.data);
        } else {
          // Error Handling
          setErrorMessage("An error occurred");
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred");
      });
  };

  useEffect(() => {
    fetchCurrencyList();
  }, []);

  useEffect(() => {
    calculateViewHistory();
  }, [values.amount, calculateViewHistory]);
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
              fromCurrency: Yup.object().shape({
                currency: Yup.string().required("required"),
              }),
              toCurrency: Yup.object().shape({
                currency: Yup.string().required("required"),
              }),
            })}
            onSubmit={async () => {
              handleConversion();
            }}
          >
            {({ errors, handleSubmit, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 8 }}>
                  <TextField
                    label="Amount"
                    variant="standard"
                    name="amount"
                    value={values.amount}
                    helperText={touched.amount && errors.amount}
                    error={Boolean(touched.amount && errors.amount)}
                    onChange={(event) => {
                      handleChange(event.target.value, "amount");
                    }}
                  />
                  <Autocomplete
                    sx={{ width: "30%" }}
                    options={currencies}
                    getOptionLabel={(option) => option.currency}
                    noOptionsText={<small>You have none for now</small>}
                    value={values.fromCurrency}
                    onChange={(event, newValue) => {
                      handleChange(newValue, "fromCurrency");
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="From"
                        helperText={
                          touched.fromCurrency?.currency &&
                          errors.fromCurrency?.currency
                        }
                        error={Boolean(
                          getIn(touched, values.fromCurrency) &&
                            getIn(errors, values.fromCurrency)
                        )}
                        variant="standard"
                        name="fromCurrency"
                        id="fromCurrency"
                        {...params}
                      />
                    )}
                  />

                  <button
                    type="button"
                    className="compare-button"
                    onClick={handleSwitchCurrencyBtn}
                  >
                    <span className="material-icons compare_arrows">
                      compare_arrows
                    </span>
                  </button>

                  <Autocomplete
                    sx={{ width: "30%" }}
                    options={currencies}
                    getOptionLabel={(option) =>
                      option.currency ? option.currency : ""
                    }
                    noOptionsText={<small>You have none for now</small>}
                    value={values.toCurrency}
                    onChange={(event, newValue) => {
                      handleChange(newValue, "toCurrency");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="To"
                        helperText={
                          touched.toCurrency?.currency &&
                          errors.toCurrency?.currency
                        }
                        error={Boolean(
                          getIn(touched, values.toCurrency) &&
                            getIn(errors, values.toCurrency)
                        )}
                        variant="standard"
                        name="toCurrency"
                        id="toCurrency"
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
                  {values?.amount} {values?.fromCurrency.currency} =
                </div>
                <div className="to-currency">
                  {formatNumber(convertedAmount)} {values?.toCurrency.currency}
                </div>
              </div>
              <div className="result-container">
                <div className="conversion-rate">
                  1 {values?.fromCurrency.currency} ={" "}
                  {formatNumber(basePrice, decimalPlace)}{" "}
                  {values?.toCurrency.currency}
                </div>
                <div className="conversion-rate">
                  {" "}
                  1 {values?.toCurrency.currency} ={" "}
                  {formatNumber(quotePrice, decimalPlace)}{" "}
                  {values?.fromCurrency.currency}
                </div>
              </div>
            </div>
          )}
        </div>
        <Divider sx={{ marginTop: "48px" }} />
        <ExchangeHistory
          exchangeHistory={exchangeHistory}
          handleFetchExchangeHistory={handleFetchExchangeHistory}
          errorMessage={errorMessage}
        />
      </div>
    </main>
  );
};

export default CurrencyConverter;
