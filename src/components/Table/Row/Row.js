import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {useState} from 'react';
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
import Info from '../Info/Info';


function Row(props) {
  const {row} = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.ID}</TableCell>
        <TableCell align="center">{row.clas}</TableCell>
        <TableCell align="left" style={{
          fontFamily: 'inherit',
          color: row.score < 50 ? "#DB4437" : row.score < 80 ? "#E2B534" : row.score < 90 ? "#0F9D58" : "#4285F4"
        }}>{`${row.score}%`}</TableCell>
        <TableCell align="left" style={{
          fontFamily: 'inherit',
          color: row.speed === "Below Expected" ? "#DB4437" : row.speed === "As Expected" ? "#0F9D58" : "#4285F4"
        }}>{row.speed}</TableCell>
        <TableCell align="left" style={{
          fontFamily: 'inherit',
          color: row.parents ? "black" : "#C0C0C0"
        }}>{row.parents ? row.parents : 'No parents added'}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowDropUp/> : <ArrowDropDown/>}
          </IconButton>
        </TableCell>

      </TableRow>
      <TableRow sx={{background: '#F2F2F2'}}>
        <TableCell style={{paddingBottom: 0, paddingTop: 0, borderBottom: 0}} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{margin: 1}}>
              <Info name={row.name} ID={row.ID}/>
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
                    <TableCell>Date</TableCell>
                    <TableCell>Absent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.number}>
                      <TableCell>{historyRow.number}</TableCell>
                      <TableCell>{historyRow.label}</TableCell>
                      <TableCell>{historyRow.score}</TableCell>
                      <TableCell>{historyRow.speed}</TableCell>
                      <TableCell>{historyRow.totalQ}</TableCell>
                      <TableCell>{historyRow.expSpeed}</TableCell>
                      <TableCell>{historyRow.concept}</TableCell>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          checked={historyRow.absent}
                          // inputProps={{
                          //   'aria-labelledby': labelId,
                          // }}
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
                      color: "#4285F4",
                      fontSize: 14,
                      lineHeight: '20px'
                    }}>96%</TableCell>
                    <TableCell sx={{
                      fontWeight: 700,
                      borderBottom: 0,
                      textTransform: 'uppercase',
                      color: "#4285F4",
                      whiteSpace: 'break-spaces',
                      fontSize: 14,
                      lineHeight: '20px'
                    }}>Above Expected</TableCell>
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
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ID: PropTypes.number.isRequired,
    clas: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    speed: PropTypes.string.isRequired,
    parents: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        speed: PropTypes.string.isRequired,
        totalQ: PropTypes.number.isRequired,
        expSpeeed: PropTypes.string.isRequired,
        concept: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        absent: PropTypes.bool
      }),
    ).isRequired,
  }).isRequired,
};

export default Row;
