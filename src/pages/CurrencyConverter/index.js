import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ExchangeHistory from "src/components/ExchangeHistory";

const CurrencyConverter = () => {
  return (
    <main className="main-container">
      <div className="page-content">
        <div className="page-title">I want to convert</div>
        <div className="form-container">
          <Formik
            initialValues={{
              amount: "",
              from: "",
              to: "",
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              amount: Yup.number().max(255).required("Amount is required"),
              from: Yup.string().required("Required"),
              to: Yup.string().required("Required"),
            })}
          >
            {({ errors, isSubmitting }) => (
              <Form>
                <Box sx={{ display: "flex", gap: 8 }}>
                  <TextField
                    id="standard-basic"
                    label="Amount"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="From"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    label="To"
                    variant="standard"
                  />
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#009688" }}
                  >
                    Convert
                  </Button>
                </Box>
              </Form>
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
