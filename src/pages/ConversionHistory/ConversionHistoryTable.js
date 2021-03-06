import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Action
import {
  setViewConversion,
  deleteConversionHistory,
} from "src/slices/conversionHistory";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// Utils
import { customizeDate } from "src/utils";

const ConversionHistoryTable = () => {
  // State
  const [isActionButtons, setActionButtons] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  // Redux State
  const conversionHistory = useSelector(
    (state) => state.conversionHistory.conversionHistory
  );
  const dispatch = useDispatch();
  // Navigate
  const navigate = useNavigate();

  const showActionButtons = (id) => {
    setCurrentRow(id);
    setActionButtons(true);
  };
  const hideActionButtons = () => {
    setActionButtons(false);
  };

  const viewHistory = (id) => {
    if (conversionHistory) {
      const findHistory = conversionHistory.find(
        (item) => item.id === Number(id)
      );
      if (findHistory) {
        dispatch(setViewConversion(findHistory));
        navigate("/");
      }
    }
  };

  const handleDeleteHistory = (id) => {
    dispatch(deleteConversionHistory(id));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow
              sx={{
                height: "49px",
              }}
            >
              <TableCell
                sx={{
                  color: "#8d8d8d",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "#8d8d8d",
                }}
              >
                Event
              </TableCell>
              <TableCell
                sx={{
                  color: "#8d8d8d",
                }}
                colSpan={2}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversionHistory.map((history) => (
              <TableRow
                key={history.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onMouseOver={() => showActionButtons(history.id)}
                onMouseLeave={hideActionButtons}
              >
                <TableCell component="th" scope="row">
                  {customizeDate(history.date)}
                </TableCell>
                <TableCell>
                  Converted an amount of {history.amount} from{" "}
                  {history.fromCurrency.currency} to{" "}
                  {history.toCurrency.currency}
                </TableCell>
                <TableCell
                  sx={{
                    height: "32px",
                    width: "70px",
                  }}
                >
                  {isActionButtons && currentRow === history.id && (
                    <span
                      onClick={() => viewHistory(history.id)}
                      className="material-icons view-icon"
                      color="green"
                    >
                      visibility
                    </span>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    height: "32px",
                    width: "180px",
                  }}
                >
                  {isActionButtons && currentRow === history.id && (
                    <Box
                      sx={{
                        display: "flex",
                      }}
                      onClick={() => handleDeleteHistory(history.id)}
                    >
                      <Box>
                        <span className="material-icons delete-icon">
                          delete_forever
                        </span>
                      </Box>
                      <Box>
                        <span className="delete-icon">Delete from history</span>
                      </Box>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConversionHistoryTable;
