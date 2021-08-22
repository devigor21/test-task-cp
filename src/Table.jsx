import { useEffect, useState } from 'react';
import Pagination from './Pagination';

export default function Table() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(50);
  const [activeSorting, setActiveSorting] = useState('');
  const [descending, setDescending] = useState(true);
  const [value, setValue] = useState('');
  const [filtration, setFiltration] = useState(false);

  const getGames = async () => {
    const response = await fetch("https://free-to-play-games-database.p.rapidapi.com/api/games", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": "0882bff042msh5be8108c28fc154p11b800jsn16ba854f4d4b"
      }
    });
    return await response.json();
  };

  const paginate = pageNumber => setPage(pageNumber);
  const prevPage = () => setPage(prev => prev - 1);
  const nextPage = () => setPage(prev => prev + 1);

  const handleClick = (e) => {
    setActiveSorting(e.target.textContent);
    setDescending(!descending);
  }

  let filteredGames = [];
  if (filtration) {
    filteredGames = games.filter(game => game.title.toLowerCase().includes(value.toLowerCase()));
  } else {
    filteredGames = games;
  }

  const lastIndex = page * count;
  const firstIndex = lastIndex - count;

  let sortedGames = [];
  switch (activeSorting) {
    case 'Наименование':
      if (descending) {
        sortedGames = filteredGames.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        sortedGames = filteredGames.sort((a, b) => a.title.localeCompare(b.title));
      }
      break;

    case 'Издатель':
      if (descending) {
        sortedGames = filteredGames.sort((a, b) => b.publisher.localeCompare(a.publisher));
      } else {
        sortedGames = filteredGames.sort((a, b) => a.publisher.localeCompare(b.publisher));
      }
      break;

    default:
      sortedGames = filteredGames;
  }

  const pagination = <Pagination
    page={page}
    count={count}
    total={sortedGames.length}
    paginate={paginate}
    prevPage={prevPage}
    nextPage={nextPage}
  />

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Поиск игры по наименованию"
        onFocus={() => setFiltration(true)}
      />
      {pagination}
      <table className="centered highlight">
        <thead>
          <tr className="row">
            <th>№</th>
            <th></th>
            <th onClick={(e) => handleClick(e)} >
              <svg
                className={`${activeSorting === 'Наименование' ? 'redArrow' : ''} ${activeSorting === 'Наименование' && descending ? 'rotated' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
              </svg>
              Наименование</th>
            <th onClick={(e) => handleClick(e)}>
              <svg
                className={`${activeSorting === 'Издатель' ? 'redArrow' : ''} ${activeSorting === 'Издатель' && descending ? 'rotated' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
              </svg>
              Издатель</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game, index) => {
            return (
              <tr
                className="row"
                key={game.id}
              >
                <td>{++index}</td>
                {<td>
                  <img className="image" src={game.thumbnail} alt="Game Cover" />
                </td>}
                {/* <td>{game.id}</td> */}
                <td className="game-title">{game.title}</td>
                <td>{game.publisher}
                </td>
              </tr>
            );
          }).slice(firstIndex, lastIndex)}
        </tbody>
      </table>
      {pagination}
    </div >
  );
}
