export const getGames = async () => {
  const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "0882bff042msh5be8108c28fc154p11b800jsn16ba854f4d4b"
    }
  });
  return await response.json();
};
