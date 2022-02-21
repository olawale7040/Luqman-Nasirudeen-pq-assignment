import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// Utils
import { historyDuration } from "src/utils";

// Components
import ExchangeRateTable from "src/components/ExchangeRateTable";
import StatisticsTable from "src/components/StatisticsTable";
import ExchangeRateChart from "src/components/ExchangeRateChart";

const ExchangeHistory = ({ exchangeHistory, handleFetchExchangeHistory }) => {
  const [duration, setDuration] = useState(historyDuration[0].value);
  const [viewType, setViewType] = useState("table");

  const handleChange = (event) => {
    setDuration(event.target.value);
    handleFetchExchangeHistory(event.target.value);
  };

  const exchangeRateStatistics = () => {
    const rateArray = exchangeHistory;
    const statistics = rateArray.reduce((acc, item) => {
      const currentRate = Number(item.rate);
      acc[0] = Math.min(acc[0] ? acc[0] : currentRate, currentRate);
      acc[1] = Math.max(acc[1] ? acc[1] : currentRate, currentRate);
      acc[2] = acc[2] ? acc[2] + currentRate : 0 + currentRate;
      return acc;
    }, []);
    // Computing array statistics
    return [
      {
        name: "Lowest",
        value: statistics[0],
      },
      { name: "Highest", value: statistics[1] },
      {
        name: "Average",
        value: statistics[2] / rateArray.length,
      },
    ];
  };

  return (
    <Box sx={{ marginTop: "48px" }}>
      <div className="section-title">Exchange History</div>
      <Box
        sx={{
          display: "flex",
          marginTop: "16px",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Duration</InputLabel>
            <Select value={duration} onChange={handleChange} label="Duration">
              {historyDuration.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ marginTop: "12px" }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="Table"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <FormControlLabel
              value="table"
              control={<Radio color="primary" />}
              label="Table"
              color="primary"
            />
            <FormControlLabel
              value="chart"
              control={<Radio color="primary" />}
              label="Chart"
              color="primary"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {exchangeHistory && exchangeHistory.length > 0 && (
        <Box
          sx={{
            display: "flex",
            marginTop: "12px",
            gap: "10px",
          }}
        >
          <Box sx={{ width: "50%" }}>
            {viewType === "table" ? (
              <ExchangeRateTable exchangeHistory={exchangeHistory} />
            ) : (
              <ExchangeRateChart exchangeHistory={exchangeHistory} />
            )}
          </Box>
          <Box sx={{ width: "50%" }}>
            <StatisticsTable exchangeRateStatistics={exchangeRateStatistics} />
          </Box>
        </Box>
      )}

      {!exchangeHistory && (
        <Box
          sx={{
            marginTop: "12px",
          }}
        >
          No Data Yet...
        </Box>
      )}
    </Box>
  );
};

export default ExchangeHistory;
