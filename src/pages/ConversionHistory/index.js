import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ConversionHistoryTable from "./ConversionHistoryTable";

const ConversionHistory = (props) => {
  const [conversionHistory, setConversionHistory] = useState([]);

  const handleDeleteHistory = (id) => {
    const filteredHistory = conversionHistory.filter((item) => item.id !== id);
    setConversionHistory(filteredHistory);
    localStorage.setItem("conversionHistory", JSON.stringify(filteredHistory));
  };

  useEffect(() => {
    if (localStorage.hasOwnProperty("conversionHistory")) {
      const allHistory = JSON.parse(localStorage.getItem("conversionHistory"));
      setConversionHistory(allHistory);
    }
  }, []);
  return (
    <main className="main-container">
      <div className="page-content">
        <div className="page-title">Conversion History</div>
        <Box
          sx={{
            marginTop: "24px",
          }}
        >
          {conversionHistory.length > 0 && (
            <ConversionHistoryTable
              conversionHistory={conversionHistory}
              handleDeleteHistory={handleDeleteHistory}
            />
          )}

          {conversionHistory.length === 0 && (
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
