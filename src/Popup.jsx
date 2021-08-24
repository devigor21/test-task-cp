import { useEffect, useRef } from 'react'

export default function Popup({ game, closePopup }) {
  const { title, game_url, short_description, genre, platform, publisher, developer, thumbnail } = game;
  const popupRef = useRef();

  const handleOutsideClick = event => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(popupRef.current)) {
      closePopup(null);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    }
  }, []); // eslint-disable-line

  return (
    <div className="card game" ref={popupRef}>
      <div className="card-image">
        <img className="game-poster" src={thumbnail} alt="Poster" />
        <div className="card-content">
          <h5 className="indigo-text">{title}</h5>
          <div>
            <p className="genre"><span className="category">Жанр:</span> {genre}</p>
            <p className="platform"><span className="category">Платформа:</span> {platform}</p>
            <p className="platform"><span className="category">Разработчик:</span> {developer}</p>
            <p className="platform"><span className="category">Издатель:</span> {publisher}</p>
          </div>
          <p><span className="category">Описание:</span> {short_description}</p>
        </div>
      </div>
      <a className="waves-light btn" href={game_url} target="_blank" rel="noopener noreferrer">Сайт игры</a>
      <button className="modal-close" type="button" onClick={() => closePopup(null)}>Закрыть</button>
    </div>
  );
}
