import axios from "axios";
import {
  Button,
  TextField
} from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Draggable from "react-draggable";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
  // console.log(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/anime?page=${page}`
    );
    console.log("Data-->", data);
    let finalGeners = [];
    data.data.map((generData)=>{
      finalGeners = [...finalGeners, ...generData.genres]
    });
    console.log("finalGeners--->", new Set(finalGeners));
    const result = finalGeners.filter((thing, index, self) =>
  index === self.findIndex((t) => (
    JSON.stringify(t) === JSON.stringify(thing)
  ))
)
    setGenres(result);
    setContent(data.data);
    setNumOfPages(data.pagination.last_visible_page);
  };

  const handleSearch = () => {
    setContent(content.filter((g) => g.title.includes(searchText)));
    if (searchText === "") {
      setPage(1);
      fetchMovies();
   }
    
  };


  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Animes</span>
      <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <Draggable>
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.images.webp.image_url}
              title={c.title || c.name}
              data={c}
              media_type={c.type}
              vote_average={c.score}
            />
            </Draggable>
            
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
