import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useMyStore from "../store"; // Import the Zustand store hook



function TablePagination() {
  const { tagsData, currentPage, itemsPerPage, setCurrentPage } =
    useMyStore();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginationCount =
    tagsData.length > 0 && itemsPerPage > 0
      ? Math.ceil(tagsData.length / itemsPerPage)
      : 1;

  return (
    <Stack spacing={2} className="pagination">
      <Pagination
        count={paginationCount}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={1}
      />
    </Stack>
  );
}

export default TablePagination;
