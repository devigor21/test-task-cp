const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);
export const getGames = async () => {
  const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": API_KEY
    }
  });
  return await response.json();
};
