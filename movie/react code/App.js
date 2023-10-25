import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import "./Card.css";
import Loader from "./Loader";

function App() {
  const [arr, setArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const itemsPerPage = 3;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isfilter, setIsfilter] = useState(false);
  const [load, setLoad] = useState(true);

  

  console.log(window.location.href);


  const fetchData = async (category, page) => {
    try {
      let url;

      if (category === "All") {

        setIsfilter(false);
        setLoad(true);
        url = `http://localhost:8080/custom-api/nodes?page=${page}&items_per_page=${itemsPerPage}`;
      } else {
        setIsfilter(true);
        setLoad(true);
        // window.location.href = category;
        url = `http://localhost:8080/custom-api/nodes-by-category/${category}?page=${page}&items_per_page=${itemsPerPage}`;
      }

      const response = await axios.get(url);

      if(response){
        setLoad(false)
      }

      // setTimeout(() => {
      //   setLoad(false);
      //   setArr(response.data);
      // }, 5000);
      setArr(response.data);

      // Check if this is the last page based on the response data
      setIsLastPage(response.data.length < itemsPerPage);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Call fetchData with the selected category and current page
    fetchData(selectedCategory, currentPage);
  }, [selectedCategory, currentPage]);

  const stateOfOption = useRef(null);

  const handleChange = (category) => {
    // Update both category and page state
    setSelectedCategory(category);
    setCurrentPage(1);

    // Call fetchData with the updated category and page
    fetchData(category, 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setIsLastPage(false); // Enable "Next Page" button
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {/* {load && <Loader />} */}
      <h1
        style={{
          margin: "10px auto",
          color: "rebeccapurple",
          fontSize: "65px",
          textAlign: "center",
        }}
      >
        Movies
      </h1>

      <select
        ref={stateOfOption}
        onChange={(e) => {
          handleChange(stateOfOption.current.value);
        }}
        style={{
          height: "51px",
          width: "183px",
          border: "none",
          background: "aliceblue",
          fontSize: "20px",
          textAlign: "center",
          margin: "46px",
        }}
      >
        <option value="All">All</option>
        <option value="Religious">Religious</option>
        <option value="Patriotic">Patriotic</option>
        <option value="Romantic">Romantic</option>
        <option value="Wajandari">Wajandari</option>
      </select>

      <div className="pagination-buttons">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isfilter}
        >
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={isLastPage || isfilter}>
          Next Page
        </button>
      </div>

      <div className="mainDiv">
        {load && <Loader />}
        {arr.map((e, index) => {
          return (
            <Card
              name={e.MovieName}
              cost={e.TicketCost}
              category={e.MovieCategory}
              total={e.TotalSeats}
              occupied={e.SeatsBooked}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
