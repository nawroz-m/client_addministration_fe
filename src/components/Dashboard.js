import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";
import { LOCALSTORAGECONSTANT } from "../constant/constant";
import { IconButton, InputBase } from "@mui/material";

const columns = [
  { id: "firstname", label: "First Name", align: "left" },
  { id: "lastname", label: "Last Name", align: "right" },
  {
    id: "email",
    label: "Email",
    align: "right",
  },
  {
    id: "role",
    label: "Role",
    align: "right",
  },
  {
    id: "city",
    label: "City",
    align: "right",
  },
  {
    id: "street",
    label: "Street",
    align: "right",
  },
  {
    id: "postalcode",
    label: "Postalcode",
    align: "right",
  },
  {
    id: "country",
    label: "Country",
    align: "right",
  },
  {
    id: "telephone",
    label: "Telephone",
    align: "right",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userData, setUserData] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [count, setCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const skip = page * rowsPerPage;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  const token = localStorage.getItem(LOCALSTORAGECONSTANT.ACCESSTOKEN);

  const getUserInfo = async () => {
    const response = await axios.get(
      `http://localhost:8090/api/users?&limit=${rowsPerPage}&page=${page}&skip=${skip}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.statusText === "OK" && !response.data.error) {
      setUserData(response.data.data);
      setCount(response.data.count);
    }
  };

  React.useEffect(() => {
    getUserInfo();
  }, [page, rowsPerPage, search]);
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>

              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search ..."
                inputProps={{ "aria-label": "search google maps" }}
                onChange={searchHandler}
              />
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {userData &&
              userData.map((row) => (
                <TableRow
                  hover
                  key={row.firstname}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="right">{row.lastname}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right">{row.postaladdress.city}</TableCell>
                  <TableCell align="right">
                    {row.postaladdress.street}
                  </TableCell>
                  <TableCell align="right">
                    {row.postaladdress.postalcode}
                  </TableCell>
                  <TableCell align="right">
                    {row.postaladdress.country}
                  </TableCell>
                  <TableCell align="right">{row.telephone}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, , 20, 50, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
