import { Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { CSVLink, CSVDownload } from "react-csv";
import {
  ArchiveOutlined,
  CloseRounded,
  UploadOutlined,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
  },
  button: {
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    fontWeight: "700",
    fontSize: "12px",
    lineHeight: "17px",
    textTransorm: "uppercase",
    padding: "8px 13px",
  },
}));
const ToolBar = (props) => {
  const { numSelected, setSelected, rows } = props;
  const s = useStyle();

  return (
    <Toolbar
      sx={{
        padding: "0 40px",
        ...(numSelected > 0 && {
          bgcolor: "#C0C0C0",
        }),
      }}
    >
      <Typography
        sx={{
          flex: "1 1 100%",
          fontFamily: "inherit",
          fontWeight: 700,
          color: "white",
          textTransform: "uppercase",
        }}
        color="inherit"
        variant="subtitle1"
        component="span"
      >
        {numSelected} {numSelected > 1 ? "students" : "student"} selected
      </Typography>
      <div className={s.container}>
        <Button
          className={s.button}
          sx={{ color: "#ffffff" }}
          startIcon={<CloseRounded />}
          onClick={() => setSelected([])}
        >
          cancel selection
        </Button>
        <Button
          className={s.button}
          sx={{ color: "#ffffff" }}
          startIcon={
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
          }
        >
          export csv
        </Button>
        <Button
          className={s.button}
          sx={{ color: "#424242" }}
          startIcon={<ArchiveOutlined />}
        >
          archive selected
        </Button>
      </div>
    </Toolbar>
  );
};

// ToolBar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default ToolBar;
