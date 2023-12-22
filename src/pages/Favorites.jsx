import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useGames from "../hooks/useGames";
import GalleryCard from "../components/GalleryCard";
import { IoSearch } from "react-icons/io5";
import { Hourglass } from "react-loader-spinner";
import Description from "../components/Description";

const Favorites = () => {
  const { getGames } = useGames();
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pickedGame, setPickedGame] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return storedFavorites;
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGames();
      setTimeout(() => {
        if (res) {
          setGames(res.data);
        }
      }, 500);
    };
    fetchData();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handlePickedGame = (gamePicked) => {
    setPickedGame(gamePicked);
    setShowModal(true);
  };

  const toggleFavorite = (id) => {
    const isFavorite = favorites.includes(id);
    if (isFavorite) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <>
      <Header />
      {games.length > 0 ? (
        <div name="" className=" mt-[80px] w-full text-white text-center md:text-left">
          <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
            <div className="pb-8">
              <p className="text-4xl font-bold inline border-b-4 border-gray-500">Favorites </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5">
              {games
                .filter((game) => favorites.includes(game._id))
                .map((game, i) => (
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
};

export default Favorites;
