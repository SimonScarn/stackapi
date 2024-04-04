import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useMyStore from './../store'; // Import the Zustand store hook

interface Tag {
  name: string;
  count: number;
}

function PaginationA() {
  const [pageNumberInput, setPageNumberInput] = useState<string>('');

  const { tagsData, currentPage, itemsPerPage, setCurrentPage, setTagsData } = useMyStore();

  const indexOfLastTag: number = currentPage * itemsPerPage;
  const indexOfFirstTag: number = indexOfLastTag - itemsPerPage;
  const currentTags: Tag[] = tagsData.slice(indexOfFirstTag, indexOfLastTag);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageNumberInput(event.target.value);
    const pageNumber = parseInt(event.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(tagsData.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    console.log(Math.ceil(tagsData.length / itemsPerPage));
  }, [itemsPerPage]);

  const paginationCount = tagsData.length > 0 && itemsPerPage > 0 ? Math.ceil(tagsData.length / itemsPerPage) : 1;

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

export default PaginationA;
