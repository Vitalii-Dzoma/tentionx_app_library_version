import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Checkbox, TableSortLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from "prop-types"

//

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

export default function CollapsibleTable(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;

    const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles()

  return (
    <>
        <TableHead >
          <TableRow >
            <TableCell >
                <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
                  inputProps={{
              'aria-label': 'select all students',
              }}
              />
          </TableCell>
          {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
              sortDirection={orderBy === headCell.id ? order : false}
              className={classes.tableCell}
            >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={{display: 'none'}}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          ))}
          <TableCell align="left" className={classes.tableCell}><p>Parents</p></TableCell>
          <TableCell align="left" className={classes.tableCell}>{numSelected > 0 && 'Actions'}</TableCell>
          </TableRow>
        </TableHead>
      </>
  );
}

TableHead.propTypes = {
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
};

const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'class',
    label: 'Class',
  },
  {
    id: 'avScore',
    label: 'Av. Score, %',
  },
  {
    id: 'avSpeed',
    label: 'Av. Speed',
  },
];
