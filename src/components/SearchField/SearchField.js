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
import { CSVLink, CSVDownload } from "react-csv";

const SearchField = ({ onSubmit, rows }) => {
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
          sx={{
            width: "499px",
            background: "#F2F2F2",
            padding: "6px 12px",
            marginLeft: "180px",
          }}
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

        <CSVLink className={s.csv_downloader} data={rows}>
          <svg
            className={s.svg__downloader}
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.99992 0.5L0.333252 5.16667H2.99992V9.16667H6.99992V5.16667H9.66659L4.99992 0.5ZM5.66659 3.83333V7.83333H4.33325V3.83333H3.55325L4.99992 2.38667L6.44659 3.83333H5.66659ZM0.333252 10.5H9.66659V11.8333H0.333252V10.5Z"
              fill="#C0C0C0"
            />
          </svg>
          Export CSV
        </CSVLink>
      </form>
    </div>
  );
};

export default SearchField;
