import React from "react";
import s from "./Filter.module.css";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowDropDown, Clear } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
  button: {
    padding: "7px 18px 7px 12px",
    fontFamily: "Rubik, sans-serif",
  },
  button_cross: {
    fontWeight: 700,
    padding: "7px 2px 7px 3px",
  },
  arrow: {
    marginLeft: 10,
  },
  cross: {
    marginRight: 10,
  },
}));

const Filter = () => {
  const classes = useStyles();
  return (
    <div className={s.filter}>
      <ul className={s.filter__list}>
        <li className={s.item}>
          <Button className={classes.button} sx={{ color: "#C0C0C0" }}>
            show all
            <ArrowDropDown className={classes.arrow} />
          </Button>
        </li>
        <li className={s.item}>
          <Button className={classes.button} sx={{ color: "#C0C0C0" }}>
            all grades
            <ArrowDropDown className={classes.arrow} />
          </Button>
        </li>
        <li className={s.item}>
          <Button className={classes.button} sx={{ color: "#C0C0C0" }}>
            all classes
            <ArrowDropDown className={classes.arrow} />
          </Button>
        </li>
        <li className={s.item}>
          <Button className={classes.button} sx={{ color: "#C0C0C0" }}>
            av.score
            <ArrowDropDown className={classes.arrow} />
          </Button>
        </li>
        <li className={s.item}>
          <Button className={classes.button} sx={{ color: "#C0C0C0" }}>
            av.speed
            <ArrowDropDown className={classes.arrow} />
          </Button>
        </li>
        <li className={s.item}>
          <Button className={classes.button} sx={{ color: "#C0C0C0" }}>
            all classes
            <ArrowDropDown className={classes.arrow} />
          </Button>
        </li>
        <li className={s.item}>
          <Button className={classes.button_cross} sx={{ color: "#C0C0C0" }}>
            <Clear className={classes.cross} />
            clear all
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
