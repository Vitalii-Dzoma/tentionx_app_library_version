import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchField from "../SearchField/SearchField";
import Pagination from "./Pagination/Pagination";
import Row from "./Row";
import CollapsibleTable from "./TableHead";
import ToolBar from "./ToolBar";
import Loader from "../Loader/Loader";
import { getAllStudents } from "../../services/api";
import { fetchData } from "../../services/api";

const MainTable = () => {
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState("ask");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudents = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllStudents();
      setRows(result);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getStudents();
  }, []);

  const formSubmitHandler = useCallback(async (search) => {
    setPage(1);
    setLoading(true);
    try {
      const result = await fetchData(search, page);
      console.log(result);
      setRows(result);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.ID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      {selected.length > 0 ? (
        <ToolBar
          numSelected={selected.length}
          setSelected={setSelected}
          rows={rows}
        />
      ) : (
        <SearchField onSubmit={formSubmitHandler} rows={rows} />
      )}
      <TableContainer
        component={Paper}
        sx={{ padding: "0 40px", maxWidth: "calc(100% - 80px)" }}
      >
        <Table aria-label="collapsible table" size="small">
          {loading && <Loader style={{ margin: "0 auto" }} />}
          <CollapsibleTable
            onSelectAllClick={handleSelectAllClick}
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={rows.length}
            onRequestSort={handleRequestSort}
          />
          {rows.length > 1
            ? rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <Row
                      key={index}
                      row={row}
                      isItemSelected={isItemSelected}
                      handleClick={handleClick}
                      labelId={labelId}
                      order={order}
                      orderBy={orderBy}
                      handleRequestSort={handleRequestSort}
                      rows={rows}
                    />
                  );
                })
            : rows.sort(getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <Row
                    key={index}
                    row={row}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                    labelId={labelId}
                    order={order}
                    orderBy={orderBy}
                    handleRequestSort={handleRequestSort}
                    rows={rows}
                  />
                );
              })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </Table>
        <Pagination
          page={page}
          setPage={setPage}
          rows={rows}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default MainTable;
