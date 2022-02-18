import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ExchangeHistory from "src/components/ExchangeHistory";
//
import { getCurrencyList } from "src/Api";

const CurrencyConverter = ({ ...rest }) => {
  const [currencies, setCurrency] = useState([]);
  const [values, setValues] = useState({
    amount: "",
    fromCurrency: "",
    toCurrency: "",
  });

  const handleChangeSelect = (value) => {
    setValues({
      ...values,
      fromCurrency: value.id,
    });
  };

  useEffect(() => {
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
              // toCurrency: Yup.string().required("Required"),
            })}
            onSubmit={async (
              values,
              { resetForm, setErrors, setStatus, setSubmitting }
            ) => {
              console.log(values, "our values");
            }}
          >
            {({
              errors,
              handleSubmit,
              isSubmitting,
              touched,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit} noValidate {...rest}>
                <Box sx={{ display: "flex", gap: 8 }}>
                  <TextField
                    id="standard-basic"
                    label="Amount"
                    variant="standard"
                    name="amount"
                    helperText={touched.amount && errors.amount}
                    error={Boolean(touched.amount && errors.amount)}
                    onChange={(event) => {
                      setValues((prevState) => ({
                        ...prevState,
                        amount: event.target.value,
                      }));
                    }}
                  />
                  <Autocomplete
                    getOptionLabel={(option) => option.id}
                    options={currencies}
                    noOptionsText={<small>You have none for now</small>}
                    inputValue={values.fromCurrency}
                    disableClearable={true}
                    onInputChange={(event, newInputValue) => {
                      handleChangeSelect(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      handleChangeSelect(newValue);
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
                  <TextField
                    id="standard-basic"
                    label="To"
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: "#009688" }}
                  >
                    Convert
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </div>
        <div className="result-wrapper">
          <div className="from-currency">500 EUR =</div>
          <div className="to-currency">576,000 USD</div>
        </div>
        <div className="result-container">
          <div className="conversion-rate">1 EUR = 1.00303 USD</div>
          <div className="conversion-rate"> 1 USD = 0.00303 EUR</div>
        </div>
        <Divider sx={{ marginTop: "48px" }} />
        <ExchangeHistory />
      </div>
    </main>
  );
};

export default CurrencyConverter;
