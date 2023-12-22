import React from "react";
import backApi from "../api/BackApi";

const useGames = () => {
  const getGames = async () => {
    try {
      const { data } = await backApi.get("/games");
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    getGames,
  };
};

export default useGames;
