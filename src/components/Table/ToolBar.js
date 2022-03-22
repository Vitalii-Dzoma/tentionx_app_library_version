import {Button, Toolbar, Typography} from '@mui/material';
import React from 'react'
import PropTypes from "prop-types"
import {ArchiveOutlined, CloseRounded, UploadOutlined} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';

const useStyle = makeStyles(() => ({
  container: {
    display: 'flex'
  },
  button: {
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '17px',
    textTransorm: 'uppercase',
    padding: '8px 13px',
  }
}))
const ToolBar = (props) => {
  const {numSelected, setSelected} = props;
  const s = useStyle()

  return (
    <Toolbar
      sx={{
        padding: '0 40px',
        ...(numSelected > 0 && {
          bgcolor: '#C0C0C0'
        }),
      }}
    >
      <Typography
        sx={{flex: '1 1 100%', fontFamily: 'inherit', fontWeight: 700, color: 'white', textTransform: 'uppercase'}}
        color="inherit"
        variant="subtitle1"
        component="span"
      >
        {numSelected} {numSelected > 1 ? 'students' : 'student'} selected
      </Typography>
      <div className={s.container}>
        <Button className={s.button} sx={{color: '#ffffff'}} startIcon={<CloseRounded/>}
                onClick={() => setSelected([])}>cancel selection</Button>
        <Button className={s.button} sx={{color: '#ffffff'}} startIcon={<UploadOutlined/>}>export csv</Button>
        <Button className={s.button} sx={{color: '#424242'}} startIcon={<ArchiveOutlined/>}>archive selected</Button>
      </div>
    </Toolbar>
  );
}

// ToolBar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };


export default ToolBar
