import {useCallback, useEffect, useState} from 'react';
import Pagination from './Pagination/Pagination';
import CollapsibleTable from './TableHead';
import ToolBar from './ToolBar';
import SearchField from '../SearchField/SearchField';
import {getAllStudents, getStudentsTests} from "../../services/api";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import {
  IconButton,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  TableSortLabel
} from '@mui/material';
import {ArrowDropDown, ArrowDropUp, EditOutlined, InfoOutlined, TrendingUp} from '@mui/icons-material';
import Info from './Info/Info';


function FullTable() {
  const [tests, setTests] = useState([]);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('ask');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const getStudents = useCallback(async () => {
    try {
      const result = await getAllStudents();
      setRows(result)
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    getStudents()
  }, [])


  const openTable = async (id) => {
    try {
      const data = await getStudentsTests(id);
      setTests(data)
    } catch (error) {
      console.log(error)
    }
    setOpen(!open)
  }

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
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
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

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
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


  return (
    <>
      {selected.length > 0 ? (<ToolBar numSelected={selected.length} setSelected={setSelected}/>) : (<SearchField/>)}
      <TableContainer component={Paper} sx={{padding: '0 40px', maxWidth: 'calc(100% - 80px)'}}>
        {open && <Pagination page={page} setPage={setPage} rows={rows} rowsPerPage={rowsPerPage}
                             setRowsPerPage={setRowsPerPage}/>
        }
        <Table aria-label="collapsible table" size="small">
          <CollapsibleTable onSelectAllClick={handleSelectAllClick} order={order} orderBy={orderBy}
                            numSelected={selected.length} rowCount={rows.length} onRequestSort={handleRequestSort}/>
          <TableBody>
            {rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <>
                  <TableRow hover aria-checked={isItemSelected} role="checkbox" selected={isItemSelected} tabIndex={-1}
                            key={row.id}>
                    <TableCell>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        id={row.id}
                        onClick={(event) => handleClick(event, row.id)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left" id={labelId}><p>{row.name}</p></TableCell>
                    <TableCell align="left"><p>{row.id}</p></TableCell>
                    <TableCell align="center"><p>{row.class}</p></TableCell>
                    <TableCell align="left" style={{
                      fontFamily: 'inherit',
                      color: row.avScore < 50 ? "#DB4437" : row.avScore < 80 ? "#E2B534" : row.avScore < 90 ? "#0F9D58" : "#4285F4"
                    }}><p>{`${row.avScore}%`}</p></TableCell>
                    <TableCell align="left" style={{
                      fontFamily: 'inherit',
                      color: row.avSpeed === "Below Expected" ? "#DB4437" : row.avSpeed === "As Expected" ? "#0F9D58" : "#4285F4"
                    }}><p>{row.avSpeed}</p></TableCell>
                    <TableCell align="left" style={{
                      fontFamily: 'inherit',
                      color: row.parents ? "black" : "#C0C0C0"
                    }}>{row.parents ? (<p style={{display: 'flex', alignItems: 'flex-end'}}><InfoOutlined sx={{
                      color: '#C0C0C0', width: '17px', marginRight: '5px'
                    }}/><span>{row.parents}</span></p>) : <p>No parents added</p>}</TableCell>
                    <TableCell align="right">
                      <Button size="large" sx={{
                        background: 'rgb(239, 239, 239)',
                        color: "#828282",
                        minWidth: 0,
                        padding: "8px", ...!isItemSelected && {
                          visibility: 'hidden'
                        }
                      }}><EditOutlined/></Button>
                      <Button size="large" sx={{
                      background: 'rgb(239, 239, 239)',
                      color: "#828282",
                      minWidth: 0,
                      padding: "8px",
                      margin: '0 8px', ...!isItemSelected && {
                        visibility: 'hidden'
                      }
                    }}><TrendingUp/>
                      </Button>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => openTable(row.id)}
                      >
                        {open ? <ArrowDropUp/> : <ArrowDropDown/>}
                      </IconButton>
                    </TableCell>

                  </TableRow>
                  <TableRow sx={{background: '#F2F2F2'}}>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0, borderBottom: 0}} colSpan={8}>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                          <Info name={row.name} id={row.id}/>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Test Label</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell>Speed</TableCell>
                                <TableCell>Total Q-ns</TableCell>
                                <TableCell>Exp. Speed</TableCell>
                                <TableCell>Concept</TableCell>
                                <TableCell sortDirection={orderBy === 'date' ? order : false}>
                                  <TableSortLabel
                                    active={orderBy === 'date'}
                                    direction={orderBy === 'date' ? order : 'asc'}
                                    onClick={() => handleRequestSort('date')}
                                  >
                                    Date
                                    {orderBy === 'date' ? (
                                      <Box component="span" sx={{display: 'none'}}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                      </Box>
                                    ) : null}
                                  </TableSortLabel>
                                </TableCell>
                                <TableCell>Absent</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {tests.map((test) => (
                                <TableRow key={row.id} sx={{...test.absent && {color: '#C0C0C0'}}}
                                          sortDirection={orderBy === test.id ? order : false}>
                                  <TableCell sx={{color: 'inherit'}}>{test.id}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.label}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.score}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.speed}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.totalQuations}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.expectedSpeed}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.concept}</TableCell>
                                  <TableCell sx={{color: 'inherit'}}>{test.date}</TableCell>
                                  <TableCell>
                                    <Checkbox
                                      color="default"
                                      checked={test.absent}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell sx={{borderBottom: 0}}/>
                                <TableCell sx={{
                                  padding: '20px 16px',
                                  fontWeight: 700,
                                  borderBottom: 0,
                                  textTransform: 'uppercase',
                                  color: "#777777",
                                  fontSize: 14,
                                  lineHeight: '20px'
                                }}>Average</TableCell>
                                <TableCell sx={{
                                  fontWeight: 700,
                                  borderBottom: 0,
                                  textTransform: 'uppercase',
                                  color: row.avScore < 50 ? "#DB4437" : row.avScore < 80 ? "#E2B534" : row.avScore < 90 ? "#0F9D58" : "#4285F4",
                                  fontSize: 14,
                                  lineHeight: '20px'
                                }}>{row.avScore}%</TableCell>
                                <TableCell sx={{
                                  fontWeight: 700,
                                  borderBottom: 0,
                                  textTransform: 'uppercase',
                                  color: row.avSpeed === "Below Expected" ? "#DB4437" : row.avSpeed === "As Expected" ? "#0F9D58" : "#4285F4",
                                  whiteSpace: 'break-spaces',
                                  fontSize: 14,
                                  lineHeight: '20px'
                                }}>{row.avSpeed}</TableCell>
                                <TableCell sx={{borderBottom: 0}}/>
                                <TableCell sx={{borderBottom: 0}}/>
                                <TableCell sx={{borderBottom: 0}}/>
                                <TableCell sx={{borderBottom: 0}}/>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              )
            })
            }
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>

        </Table>
        {!open && <Pagination page={page} setPage={setPage} rows={rows} rowsPerPage={rowsPerPage}
                              setRowsPerPage={setRowsPerPage}/>}
      </TableContainer>
    </>

  )
}

FullTable.propTypes = {
  rows: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    class: PropTypes.string.isRequired,
    avScore: PropTypes.number.isRequired,
    avSpeed: PropTypes.string.isRequired,
    parents: PropTypes.string.isRequired,
    tests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        speed: PropTypes.string.isRequired,
        totalQuations: PropTypes.number.isRequired,
        expectedSpeed: PropTypes.string.isRequired,
        concept: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        absent: PropTypes.bool
      }),
    ).isRequired,
  }).isRequired,
};

export default FullTable;



