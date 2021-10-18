import {Box, Checkbox, Collapse, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material'
import React from 'react'
import Info from './Info/Info'

const InnerTable = (props) => {
  const {open, row, sortRequest, order, orderBy, tests} = props;
  return (
    <>
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
                        onClick={() => sortRequest('date')}>
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
}

export default InnerTable
