import { create } from "zustand";

interface MyStoreState {
  data: string;
  currentPage: number;
  pageNumberInput: string;
  tagsData: Tag[];
  itemsPerPage: number;
  sortBy: string;
  sortOrder: string;
}

interface Tag {
  name: string;
  count: number;
}

interface MyStoreActions extends MyStoreState {
  setData: (data: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageNumberInput: (pageNumberInput: string) => void;
  setTagsData: (tagsData: Tag[]) => void;
  handlePageChange: (value: number) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setItemsPerPage: (value: number) => void;
  setSortBy: (sortBy: string) => void; // Add action for setting sortBy
  setSortOrder: (sortOrder: string) => void; // Add action for setting sortOrder
}

const useMyStore = create<MyStoreState & MyStoreActions>((set) => ({
  data: "Hello from Context!",
  currentPage: 1,
  pageNumberInput: "",
  tagsData: [],
  itemsPerPage: 5,
  sortBy: "name",
  sortOrder: "asc",
  setData: (data: string) => set({ data }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setPageNumberInput: (pageNumberInput: string) => set({ pageNumberInput }),
  setTagsData: (tagsData: Tag[]) => set({ tagsData }),
  handlePageChange: (value: number) => set({ currentPage: value }),
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumberInput = event.target.value;
    set({ pageNumberInput });
    const pageNumber = parseInt(pageNumberInput);
    set({ currentPage: pageNumber });
  },
  setItemsPerPage: (value: number) => set({ itemsPerPage: value }),
  setSortBy: (sortBy: string) => set({ sortBy }), // Define action for setting sortBy
  setSortOrder: (sortOrder: string) => {
    set({ sortOrder })
  }, // Define action for setting sortOrder
}));

export default useMyStore;
