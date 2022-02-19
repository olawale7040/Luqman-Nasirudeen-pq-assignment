import Box from "@mui/material/Box";
import HistoryTable from "./ConversionHistoryTable";

const ConversionHistory = () => {
  return (
    <main class="main-container">
      <div className="page-content">
        <div className="page-title">Conversion History</div>
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          <HistoryTable />
        </Box>
      </div>
    </main>
  );
};

export default ConversionHistory;
