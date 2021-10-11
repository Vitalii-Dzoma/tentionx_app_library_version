import {Button, TextField} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useState} from 'react'
import s from "./Info.module.css"


const useStyle = makeStyles(() => ({
  button: {
    borderRadius: 0, color: 'black', borderColor: '#C0C0C0', fontFamily: 'inherit', fontWeight: 700
  }
}))

const Info = ({name, ID}) => {
  const [value, setValue] = useState()
  const classes = useStyle()

  const handleChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={s.info}>
      <div className={s.info_main}><p>Student: <span>{name}</span></p><p>ID: <span>{ID}</span></p></div>
      <div className={s.info__filters}>
        <ul>
          <li><Button color="primary" variant="outlined" className={classes.button}>All Concepts</Button></li>
          <li><Button color="primary" variant="outlined" className={classes.button}>All Score</Button></li>
          <li><Button color="primary" variant="outlined" className={classes.button}>All Speed</Button></li>
        </ul>
        <TextField
          variant="standard"
          id="date"
          placeholder="Set the period"
          defaultValue="2017-05-24"
          value={value}
          onChange={handleChange}
          type="date"
          sx={{borderBottom: '1px solid #C0C0C0', width: 200, display: 'flex'}}
        />
      </div>
      <div className={s.info__wrapper}>
        <p className={s.info__title}>Score</p>
        <ul className={s.info__list}>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#4285F4'}}></div>
            <span style={{color: '#4285F4'}}>90%+ accuracy</span></li>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#0F9D58'}}></div>
            <span style={{color: '#0F9D58'}}>80 - 89% accuracy</span></li>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#E2B534'}}></div>
            <span style={{color: '#E2B534'}}>50 - 79% accuracy</span></li>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#DB4437'}}></div>
            <span style={{color: '#DB4437'}}>below 50% accuracy</span></li>
        </ul>
      </div>
      <div className={s.info__wrapper}>
        <p className={s.info__title}>Speed</p>
        <ul className={s.info__list}>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#4285F4'}}></div>
            <span style={{color: '#4285F4'}}>above expected</span></li>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#0F9D58'}}></div>
            <span style={{color: '#0F9D58'}}>as expected</span></li>
          <li className={s.info__list_item}>
            <div className={s.item_circle} style={{background: '#DB4437'}}></div>
            <span style={{color: '#DB4437'}}>below expected</span></li>
        </ul>
      </div>
    </div>
  )
}

export default Info
