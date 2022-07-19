import { Chip } from "@material-ui/core";
import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
   
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.mal_id !== genre.mal_id));
    console.log("genre-->", selectedGenres.length);

    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

 

  useEffect(() => {
  

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.mal_id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
