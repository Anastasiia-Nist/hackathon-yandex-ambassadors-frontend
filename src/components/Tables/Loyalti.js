import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import "../Tabs/Tabs.css";
import { LOYALTI_PROGRAMM_DATA, USERS } from "../utils/constants";

export default function Loyalti(props) {
  const [users, setUsers] = useState(USERS);
  // let USERS = [],
  // STATUSES = ["активный", "уточняется", "на паузе", "не амбассадор"];

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {LOYALTI_PROGRAMM_DATA.map((cell) => (
              <TableCell
                className="table__header_cell"
                align="center"
                key={cell.data}
              >
                <Typography className="table__header_cell">
                  {cell.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell>
                <Grid container>
                  <Grid item lg={10}>
                    <Typography>{row.userId}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography
                  style={{
                    color: "#1d6bf3",
                  }}
                >
                  {row.userName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  textAlign={"center"}
                  style={{
                    borderBottom: "none",
                  }}
                >
                  {row.userHudi}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"}>{row.userCoffee}</Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"}>{row.userSticker}</Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"}>{row.userPlus}</Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"}>{row.userArzamas}</Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"}>{row.userShopper}</Typography>
              </TableCell>
              <TableCell>
                <Typography textAlign={"center"}>{row.userBackpack}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
