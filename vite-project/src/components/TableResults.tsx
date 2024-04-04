import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import { Tag } from "../types";

type Props = {
  currentTags: Tag[];
};

function TableResults({ currentTags }: Props) {
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  sortTags();

  return (
    <Table style={{ display: currentTags.length === 0 ? "none" : "table" }}>
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
  );
}

export default TableResults;
