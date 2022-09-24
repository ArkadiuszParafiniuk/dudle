import React from "react";
import { AppBar } from "@material-ui/core";
import "./HeaderBar.css";
import { useNavigate } from "react-router-dom";

type HeaderBarProps = {
  headerText: string;
};

export default function HeaderBar(props: HeaderBarProps) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" onClick={() => navigate(`/`)}>
      <h1>{props.headerText}</h1>
    </AppBar>
  );
}
