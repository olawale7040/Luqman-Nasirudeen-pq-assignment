import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Utils
import { formatNumber } from "src/utils";

const StatisticsTable = ({ exchangeRateStatistics }) => {
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
                colSpan={2}
              >
                Statistics
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchangeRateStatistics().map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{formatNumber(item.value, 7)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StatisticsTable;
