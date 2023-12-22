import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useGames from "../hooks/useGames";
import GalleryCard from "../components/GalleryCard";
import { IoSearch } from "react-icons/io5";
import { Hourglass } from "react-loader-spinner";
import Description from "../components/Description";

export function Gallery() {
  const [games, setGames] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [byGenre, setByGenre] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pickedGame, setPickedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavorites;
  });

  const { getGames } = useGames();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGames();
      setTimeout(() => {
        if (res) {
          setGames(res.data);
          setFiltered(res.data);
        }
      }, 2000);
    };
    fetchData();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    const isFavorite = favorites.includes(id);
    if (isFavorite) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const onSearch = () => {
    console.log("entro");
    const filteredGames = games.filter((game) => {
      if (byGenre) return game.genres.toLowerCase().includes(searchTerm.toLowerCase());
      else return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFiltered(filteredGames);
  };

  const handleByGenreCange = () => {
    setByGenre(!byGenre);
  };

  const handlePickedGame = (gamePicked) => {
    setPickedGame(gamePicked);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      {games.length > 0 ? (
        <div name="" className=" mt-[80px] w-full text-white text-center md:text-left">
          <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
            <div className="pb-8">
              <p className="text-4xl font-bold inline border-b-4 border-gray-500">Video Games </p>
              <p className="py-6">Playstation 5</p>
              <div className="w-[full] flex md:flex-row flex-col justify-center items-center mb-5">
                <div className="w-full flex justify-center items-center mb-3">
                  <input
                    value={searchTerm}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Search..."
                    className=" bg-neutral-900 rounded-md p-2 w-full md:w-[50%]"
                  />
                  <button onClick={onSearch}>
                    <IoSearch className="w-6 h-6 text-gray-300 relative right-8" />
                  </button>
                </div>
                <div className="w-[100px]">
                  <label className="mr-3" htmlFor="by-genre">
                    by genre
                  </label>
                  <input type="checkbox" id="by-genre" onChange={handleByGenreCange} checked={byGenre} />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5">
              {filtered.map((game, i) => (
                <GalleryCard
                  key={i}
                  game={game}
                  handleOnClick={handlePickedGame}
                  isFavorite={favorites.includes(game._id)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      )}
      {showModal && <Description game={pickedGame} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Gallery;
