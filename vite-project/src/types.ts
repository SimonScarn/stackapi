export type Tag = {
  name: string;
  count: number;
};

export type MyStoreState = {
  data: string;
  currentPage: number;
  pageNumberInput: string;
  tagsData: Tag[];
  itemsPerPage: number;
  sortBy: string;
  sortOrder: string;
};

export type MyStoreActions = MyStoreState & {
  setData: (data: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageNumberInput: (pageNumberInput: string) => void;
  setTagsData: (tagsData: Tag[]) => void;
  handlePageChange: (value: number) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setItemsPerPage: (value: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
};
