import { useEffect, useState } from "react";
import AnyChart from "anychart-react";
// Utils
import { formatNumber, shortDateFormat } from "src/utils";

const ExchangeRateChart = ({ exchangeHistory }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    let exchangeRate = [];
    exchangeHistory.map((item) => {
      let row = [];
      row.push(shortDateFormat(item.timestamp));
      row.push(formatNumber(+item.rate, 2));
      exchangeRate.push(row);
      return row;
    });
    setChartData(exchangeRate);
  }, [exchangeHistory]);
  return (
    <AnyChart
      type="area"
      height={600}
      data={chartData}
      title="Exchange Rate Chart"
    />
  );
};

export default ExchangeRateChart;
