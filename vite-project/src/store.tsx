import { create } from "zustand";
import { MyStoreActions, MyStoreState, Tag } from "./types";

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
  setSortBy: (sortBy: string) => set({ sortBy }),
  setSortOrder: (sortOrder: string) => set({ sortOrder }), 
}));

export default useMyStore;
