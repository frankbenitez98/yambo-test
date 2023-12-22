import React, { useEffect } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const GalleryCard = ({ game, handleOnClick, isFavorite, toggleFavorite }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-left"
      key={game._id}
      className="shadow-md shadow-gray-600 rounded-lg overflow-hidden cursor-pointer"
    >
      <button className="float-right top-0 z-50" onClick={() => toggleFavorite(game._id)}>
        {isFavorite ? (
          <MdFavorite className="w-5 h-5 text-red-500 right-3 top-0 m-2" />
        ) : (
          <MdFavoriteBorder className="w-5 h-5 text-red-500 right-3 top-0 m-2" />
        )}
      </button>
      <div onClick={() => handleOnClick(game)}>
        <img src={game.image} alt="" className="rounded-md duration-200 hover:scale-105 h-[170px] w-full" />
        <div className="flex flex-col justify-start">
          <p className="px-6 py-3 font-semibold duration-200 hover:scale-105 w-full">{game.title}</p>
          <p className=" px-6 py-3  duration-200 hover:scale-105 w-full">Genres: {game.genres}.</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
