import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from MUI
import useMyStore from "./../store";
import PaginationA from "./Pagination";
import { Button } from "@mui/material";

const apiKey = "AvuPRm2rKwTCgAWxlur)rA((";
const apiUrl = `https://api.stackexchange.com/2.3/tags?site=stackoverflow&key=${apiKey}`;

interface Tag {
  name: string;
  count: number;
}

function ApiContainer() {
  const {
    tagsData,
    setTagsData,
    currentPage,
    itemsPerPage,
    setPageNumberInput,
    setItemsPerPage,
    setCurrentPage,
  } = useMyStore();
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name"); // State variable for sorting column
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State variable for sorting order
  const [loading, setLoading] = useState<boolean>(false); // State variable for loading indicator
  const [error, setError] = useState(false);

  const fetchApi = () => {
    setLoading(true); // Show loader before the delay
  
    setTimeout(() => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTagsData(data.items);
        })
        .catch((error) => {
          console.error("There was a problem with your fetch operation:", error);
          setError(true);
        })
        .finally(() => {
          setError(false);
          setLoading(false); // Hide loader after the fetch operation completes
        });
    }, 1000); // 3000 milliseconds = 3 seconds
  };
  

  useEffect(() => {
    fetchApi();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (parseInt(value) < 0) return;
    setIsValidInput(false);
    if (value === "" || parseInt(value) === 0) {
      setIsValidInput(true);
    }
    setPageNumberInput(value);
    setItemsPerPage(parseInt(value) || 0);
    setCurrentPage(1); // Reset pagination to first page
  };

  const indexOfFirstItem: number = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem: number = indexOfFirstItem + itemsPerPage;

  let currentTags: Tag[] = tagsData.slice(indexOfFirstItem, indexOfLastItem);

  // Sort function based on column and order
  const sortTags = () => {
    currentTags.sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc" ? a.count - b.count : b.count - a.count;
      }
    });
  };

  sortTags(); // Call sort function to sort currentTags

  return (
    <div className="container">
      <h2>Tags List</h2>
      <TextField
        className="input"
        type="number"
        value={itemsPerPage.toString()}
        onChange={handleInputChange}
        label="Items per page"
        variant="outlined"
        error={isValidInput}
        helperText={isValidInput ? "Please enter a valid number" : ""}
        style={{ marginBottom: "16px" }}
      />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            overflowY: "scroll",
            marginBottom: "30px",
          }}
        >
          {error ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                Please fetch again
                <br />
                <Button variant="contained" onClick={fetchApi}>
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "name"}
                      direction={sortBy === "name" ? sortOrder : "asc"}
                      onClick={() => {
                        setSortBy("name");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Tag Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "count"}
                      direction={sortBy === "count" ? sortOrder : "asc"}
                      onClick={() => {
                        setSortBy("count");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Tag Count
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTags.map((tag: Tag) => (
                  <TableRow key={tag.name}>
                    <TableCell>{tag.name}</TableCell>
                    <TableCell>{tag.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
      {itemsPerPage > 0 && !loading && <PaginationA />}
    </div>
  );
}

export default ApiContainer;
