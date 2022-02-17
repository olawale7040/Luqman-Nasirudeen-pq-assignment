import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HistoryTable from "./HistoryTable";

const ExchangeHistory = () => {
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
            <InputLabel id="demo-simple-select-standard-label">
              Duration
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ marginTop: "12px" }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="female"
          >
            <FormControlLabel
              value="female"
              control={<Radio color="primary" />}
              label="Female"
              color="primary"
            />
            <FormControlLabel
              value="male"
              control={<Radio color="primary" />}
              label="Male"
              color="primary"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "12px",
          gap: "10px",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <HistoryTable />
        </Box>
        <Box sx={{ width: "50%" }}>
          <HistoryTable />
        </Box>
      </Box>
    </Box>
  );
};

export default ExchangeHistory;
