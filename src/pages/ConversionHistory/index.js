import Box from "@mui/material/Box";
import ConversionHistoryTable from "./ConversionHistoryTable";
import { useSelector } from "react-redux";

const ConversionHistory = () => {
  // Redux State
  const conversionHistory = useSelector(
    (state) => state.conversionHistory.conversionHistory
  );
  return (
    <main className="main-container">
      <div className="page-content">
        <div className="page-title">Conversion History</div>
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          {conversionHistory && conversionHistory.length > 0 && (
            <ConversionHistoryTable />
          )}

          {!conversionHistory && (
            <Box
              sx={{
                marginTop: "32px",
                textAlign: "center",
              }}
            >
              No Conversion History
            </Box>
          )}
        </Box>
      </div>
    </main>
  );
};

export default ConversionHistory;
