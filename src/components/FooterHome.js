import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import homeIcon from '../images/home.png';
import AppContext from '../context/Context';
import '../styles/footer.css';

export default function FooterHome() {
  const { setHandleChoice, setFilteredApi } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    setFilteredApi(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHandleChoice]);

  return (
    <footer data-testid="footer">
      <div className="container-footer-home">
        <button
          type="button"
          onClick={ () => history.push('/meals') }
          className="home"
        >
          <img
            src={ homeIcon }
            id="meals"
            className="home__btn"
            alt="home-bottom-btn"
            data-testid="home-bottom-btn"
          />
        </button>
      </div>
    </footer>
  );
}
