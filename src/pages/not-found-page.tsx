import Logo from '../components/logo';
import {Link} from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main">
        <h1 style={{
          textAlign: 'center'
        }}
        >404. Page not found
        </h1>
        <Link style={{
          display: 'block',
          margin: '0 auto',
          width: 'fit-content',
          padding: '10px',
          color: '#ffffff',
          backgroundColor:'#4481c3',
          borderRadius:'3px'
        }} to="/"
        >Back to Main Page
        </Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
