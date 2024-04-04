import { useEffect, useState } from "react";
import useMyStore from "../store";
import TablePagination from "./TablePagination";
import TableResults from "./TableResults";
import { Tag } from "../types";
import Loader from "./Loader";
import InputNumber from "./InputNumber";
import ErrorMessage from "./ErrorMessage";

const apiUrl =
  "https://api.stackexchange.com/2.3/tags?site=stackoverflow&key=AvuPRm2rKwTCgAWxlur)rA((";

function Main() {
  const { tagsData, setTagsData, currentPage, itemsPerPage } = useMyStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const indexOfFirstItem: number = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem: number = indexOfFirstItem + itemsPerPage;
  let currentTags: Tag[] = tagsData.slice(indexOfFirstItem, indexOfLastItem);

  const fetchApi = () => {
    setLoading(true);
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
        console.error("Fetch error", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="container">
      <h2>Tags List</h2>
      <InputNumber />
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            overflowY: itemsPerPage < 10 ? "hidden" : "scroll",
            marginBottom: "30px",
          }}
        >
          {error ? (
            <ErrorMessage fetchApi={fetchApi} />
          ) : (
            <TableResults currentTags={currentTags} />
          )}
        </div>
      )}
      {itemsPerPage > 0 && !loading && <TablePagination />}
    </div>
  );
}

export default Main;
