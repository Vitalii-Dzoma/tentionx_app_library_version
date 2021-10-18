import React from 'react'
import { TablePagination } from '@mui/material';

const Pagination = (props) => {
  const { page, setPage, rowsPerPage, setRowsPerPage, rows } = props;
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
            <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{width: 'fit-content', margin: '0 auto'}}
        />

  )
}

export default Pagination
