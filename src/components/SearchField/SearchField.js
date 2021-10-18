import { Button, IconButton, Input, InputAdornment, Typography } from '@mui/material'
import React from 'react'
import s from "./SearchField.module.css"
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';

const SearchField = () => {
  return (
    <div className={s.searchfield}>
      <Typography sx={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '20px', lineHeight: '24px', fontFamily: 'inherit', color: "#5B5B5B"}}>Students</Typography>
      <Input
        sx={{width: '499px', background: '#F2F2F2', padding: '6px 12px'}}
        variant="filled"
        placeholder="Enter Student Name, Parent or ID here"
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon fontSize="small" color="disabled"/>
            </IconButton>
          </InputAdornment>
        }
      />
      <Button sx={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '12px', lineHeight: '17px', fontFamily: 'inherit', color: '#C0C0C0', marginRight: '133px' }}><UploadIcon fontSize="small" sx={{ marginRight: '9px' }}/>export csv</Button>
    </div>
  )
}

export default SearchField
