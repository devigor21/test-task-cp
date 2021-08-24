import { useEffect, useState } from 'react';
import { getGames } from './api';
import Pagination from './Pagination';
import Popup from './Popup';

export default function Table() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(50); // eslint-disable-line
  const [activeSorting, setActiveSorting] = useState('');
  const [descending, setDescending] = useState(true);
  const [value, setValue] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);
  const [popupId, setPopupId] = useState(null);

  const handleClick = (e) => {
    setDescending(!descending);
    setActiveSorting(e.target.textContent);
  };

  const paginate = (pageNumber) => setPage(pageNumber);
  const prevPage = () => setPage(prev => prev - 1);
  const nextPage = () => setPage(prev => prev + 1);


  const lastIndex = page * count;
  const firstIndex = lastIndex - count;

  switch (activeSorting) {
    case 'Наименование':
      if (descending) {
        filteredGames.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        filteredGames.sort((a, b) => a.title.localeCompare(b.title));
      }
      break;

    case 'Издатель':
      if (descending) {
        filteredGames.sort((a, b) => b.publisher.localeCompare(a.publisher));
      } else {
        filteredGames.sort((a, b) => a.publisher.localeCompare(b.publisher));
      }
      break;

    default:
      break;
  }

  const pagination = <Pagination
    page={page}
    count={count}
    total={filteredGames.length}
    paginate={paginate}
    prevPage={prevPage}
    nextPage={nextPage}
  />

  const data = {
    game: filteredGames.find(game => game.id === popupId),
    closePopup: setPopupId
  };

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  useEffect(() => {
    setFilteredGames(games.filter(game => game.title.toLowerCase().includes(value.toLowerCase())));
    setPage(1);
  }, [value]); // eslint-disable-line

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
      />
      {pagination}
      <table className="centered highlight">
        <thead>
          <tr className="row headline-row">
            <th>№</th>
            <th></th>
            <th
              className={"headline"}
              onClick={(e) => handleClick(e)} >
              <svg
                className={`${activeSorting === 'Наименование' ? 'red-arrow' : ''} ${activeSorting === 'Наименование' && descending ? 'rotated' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
              </svg>
              Наименование</th>
            <th
              className={"headline"}
              onClick={(e) => handleClick(e)}>
              <svg
                className={`${activeSorting === 'Издатель' ? 'red-arrow' : ''} ${activeSorting === 'Издатель' && descending ? 'rotated' : ''}`}
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
          {filteredGames.map((game, index) => {
            return (
              <tr
                className="row"
                key={game.id}
                onClick={() => setPopupId(game.id)}
              >
                <td>{++index}</td>
                {<td>
                  <img className="game-cover" src={game.thumbnail} alt="Game Cover" />
                </td>}
                <td className="game-title">{game.title}</td>
                <td>{game.publisher}
                </td>
              </tr>
            );
          }).slice(firstIndex, lastIndex)}
        </tbody>
      </table>
      {pagination}
      {popupId && <Popup {...data} />}
    </div >
  );
}
