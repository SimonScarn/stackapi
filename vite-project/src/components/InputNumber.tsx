import React, { useState } from "react";
import useMyStore from "../store";
import { TextField } from "@mui/material";

function InputNumber() {
  const {
    itemsPerPage,
    setPageNumberInput,
    setItemsPerPage,
    setCurrentPage,
  } = useMyStore();
  const [isValidInput, setIsValidInput] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (parseInt(value) < 0) return;
    setIsValidInput(false);
    if (value === "" || parseInt(value) === 0) {
      setIsValidInput(true);
    }
    setPageNumberInput(value);
    setItemsPerPage(parseInt(value) || 0);
    setCurrentPage(1); 
  };

  return (
    <TextField
      className="input"
      type="number"
      value={itemsPerPage.toString()}
      onChange={handleInputChange}
      label="Items per page"
      variant="outlined"
      error={isValidInput}
      helperText={isValidInput ? "Please enter a valid number" : ""}
      style={{ marginBottom: "8px" }}
    />
  );
}

export default InputNumber;
