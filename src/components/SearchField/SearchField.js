import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import s from "./SearchField.module.css";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";

const SearchField = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const ucFirst = (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  };

  const handleChangeName = (e) => {
    const { name, value } = e.currentTarget;
    setName(ucFirst(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(name);

    reset();
  };

  const reset = () => {
    setName("");
  };
  return (
    <div className={s.searchfield}>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: 700,
          fontSize: "20px",
          lineHeight: "24px",
          fontFamily: "inherit",
          color: "#5B5B5B",
        }}
      >
        Students
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          sx={{ width: "499px", background: "#F2F2F2", padding: "6px 12px" }}
          variant="filled"
          onChange={handleChangeName}
          type="text"
          value={name}
          placeholder="Enter Student Name, Parent or ID here"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon fontSize="small" color="disabled" />
              </IconButton>
            </InputAdornment>
          }
        />
        <Button
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "17px",
            fontFamily: "inherit",
            color: "#C0C0C0",
            marginRight: "133px",
          }}
        >
          <UploadIcon fontSize="small" sx={{ marginRight: "9px" }} />
          export csv
        </Button>
      </form>
    </div>
  );
};

export default SearchField;
