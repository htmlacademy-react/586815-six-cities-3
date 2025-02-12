import Logo from '../components/logo';
import {Link} from 'react-router-dom';
import UserProfile from '../components/user-profile';
import { AuthorizationStatus } from '../const';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>404. Page not found</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <UserProfile authorizationStatus={AuthorizationStatus.NoAuth}/>
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
