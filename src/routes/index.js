import CurrencyConverter from "src/pages/CurrencyConverter";
import ConversionHistory from "src/pages/ConversionHistory";

const routes = [
  {
    path: "/",
    element: <CurrencyConverter />,
  },
  {
    path: "/history",
    element: <ConversionHistory />,
  },
];
export default routes;
