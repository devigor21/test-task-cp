import { useState, useEffect, useRef } from 'react'


export default function Popup({ game }) {
  const { title, game_url, short_description, genre, platform, publisher, developer, thumbnail } = game;
  const [isHidden, setHidden] = useState(true);
  // const [active, setActive] = useState(false);
  const sortRef = useRef();
  // console.log(props);
  const toggleVisiblePopup = () => {
    setHidden(!isHidden)
  };

  const handleClick = name => {
    // setActive(idx);
    setHidden(true);
  };
  /*
    const handleOutsideClick = (e) => {
      if (e.target !== sortRef && isHidden === false) {
        setHidden(true);
      }
    }; */

  const handleOutsideClick = event => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
      setHidden(true);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    }
  }, []);
  // const temp = { title, game_url, short_description, genre, platform, publisher, developer };
  return (
    <div className="card game">
      <div className="card-image">
        <img className="game-poster" src={thumbnail} alt="Poster" />
        <div className="card-content">
          <h5 className="indigo-text">{title}</h5>
          <div>
            <p className="genre">Жанр: {genre}</p>
            <p className="platform">Платформы: {platform}</p>
          </div>
          <p>Описание: {short_description}</p>
        </div>
      </div>
      <a class="waves-light btn" href={game_url} target="_blank" rel="noopener noreferrer">Сайт игры</a>
      <button className="modal-close" type="button">Закрыть</button>
    </div>
  );
}
