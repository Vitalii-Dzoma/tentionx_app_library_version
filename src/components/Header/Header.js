import { Button, IconButton, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import s from "./Header.module.css"
import LOGO from "../../assets/LOGO.png"
import { Avatar } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { deepPurple } from '@mui/material/colors'

const Header = () => {
  const [school, setSchool] = useState('School 1');

  const handleChange = e => {
    setSchool(e.target.value)
  }

  return (
    <header className={s.header}>
      <div className={s.header__left}>
        <img src={LOGO} alt="logo" className={s.logo}/>
        <Select value={school} onChange={handleChange} variant="standard">
          <MenuItem value='School 1'>School 1</MenuItem>
          <MenuItem value='School 2'>School 2</MenuItem>
          <MenuItem value='School 3'>School 3</MenuItem>
        </Select>
        <nav className={s.header_nav}>
          <Button onClick={e=>e.preventDefault()}>analytics</Button>
          <Button onClick={e=>e.preventDefault()}>gradebooks</Button>
          <Button onClick={e=>e.preventDefault()}>tests</Button>
          <Button onClick={e=>e.preventDefault()}>students</Button>
          <Button onClick={e=>e.preventDefault()}>teachers</Button>
          <Button onClick={e=>e.preventDefault()}>archive</Button>
        </nav>
      </div>
      <div className={s.header_right}>
        <Avatar sx={{bgcolor: deepPurple[500]}}>YP</Avatar>
        <IconButton>
          <ArrowDropDownIcon/>
        </IconButton>
      </div>
    </header>
  )
}

export default Header
