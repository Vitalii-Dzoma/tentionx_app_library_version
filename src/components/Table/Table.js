import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from "./Row/Row"
import {Checkbox, IconButton} from '@mui/material';
import {ArrowDropDown} from '@mui/icons-material';
import TablePagination from '@mui/material/TablePagination';
import {makeStyles} from '@mui/styles';
import HeightIcon from '@mui/icons-material/Height';

const useStyles = makeStyles(() => ({
  tableCell: {
    fontFamily: 'inherit',
    fontSize: 14,
    color: '#777777',
    width: 'fit-content',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

function createData(name, ID, clas, score, speed, parents) {
  return {
    name,
    ID,
    clas,
    score,
    speed,
    parents,
    history: [
      {
        number: 1,
        label: 'Finding Averages 1 to 400',
        score: 350,
        speed: '1h 00m 41s',
        totalQ: 400,
        expSpeed: '01h 00m 00s',
        concept: "Multiplication",
        date: 'APR 30 2021',
        absent: false
      },
      {
        number: 2,
        label: 'Finding Averages 1 to 10',
        score: 9,
        speed: '1h 12m 41s',
        totalQ: 10,
        expSpeed: '01h 00m 00s',
        concept: "Multiplication",
        date: 'APR 30 2021',
        absent: false
      },
      {
        number: 3,
        label: 'Finding Averages 1 to 400',
        score: 400,
        speed: '1h 00m 41s',
        totalQ: 400,
        expSpeed: '01h 00m 00s',
        concept: "Multiplication",
        date: 'APR 30 2021',
        absent: true
      },

    ],
  };
}


const rows = [
  createData('Nicole Kidman', 7512552212, '1D', 76, 'Below Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Floyd Miles', 7512552212, '1D', 96, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Kathryn Murphy', 7512552212, '1D', 16, 'Below Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Arlene McCoy', 7512552212, '1D', 25, 'Below Expected', ''),
  createData('Theresa Webb', 7512552212, '1D', 88, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Dianne Russell', 7512552212, '1D', 74, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Annette Black', 7512552212, '1D', 91, 'As Expected', ''),
  createData('Courtney Henry', 7512552212, '1D', 96, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Nicole Kidman', 7512552212, '1D', 76, 'Below Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Floyd Miles', 7512552212, '1D', 96, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Kathryn Murphy', 7512552212, '1D', 16, 'Below Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Arlene McCoy', 7512552212, '1D', 25, 'Below Expected', ''),
  createData('Theresa Webb', 7512552212, '1D', 88, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Dianne Russell', 7512552212, '1D', 74, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
  createData('Annette Black', 7512552212, '1D', 91, 'As Expected', ''),
  createData('Courtney Henry', 7512552212, '1D', 96, 'Above Expected', 'Antony Kidman, Jesica Alba-Gabriella '),
];

export default function CollapsibleTable() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  // checked={isItemSelected}
                  // inputProps={{
                  //   'aria-labelledby': labelId,
                  // }}
                />
              </TableCell>
              <TableCell align="left" className={classes.tableCell}><p className={classes.title}><span>Name</span></p>
              </TableCell>
              <TableCell align="left" className={classes.tableCell}><p className={classes.title}>
                <span>ID </span><HeightIcon/></p></TableCell>
              <TableCell align="center" className={classes.tableCell}><p>Class</p></TableCell>
              <TableCell align="left" className={classes.tableCell}><p className={classes.title}>
                <span>Av.Score, %</span><HeightIcon/></p></TableCell>
              <TableCell align="left" className={classes.tableCell}><p className={classes.title}>
                <span>Av.Speed</span><HeightIcon/></p></TableCell>
              <TableCell align="left" className={classes.tableCell}><p>Parents</p></TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small">
                  <ArrowDropDown variant="filled"/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.name} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </>
  );
}
