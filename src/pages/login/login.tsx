import Logo from '../../components/header/logo/logo';
import { Helmet } from 'react-helmet-async';
import { AppRoute, CITIES } from '../../const/const';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/store';
import { userActions } from '../../store/slices/user';
import { FormEvent, useEffect, useState } from 'react';
import { favoriteActions } from '../../store/slices/favorites';
import { toast } from 'react-toastify';
import { getRandomElement } from '../../utils/common';
import { offersActions } from '../../store/slices/offers';

const { loginAction } = userActions;
const { fetchFavoritesOffers } = favoriteActions;
const { changeCity } = offersActions;

export default function Login(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [cityName, setCityName] = useState(getRandomElement(CITIES));

  useEffect(() => {
    setCityName(getRandomElement(CITIES));
  }, []);


  const handleCityClick = () => {
    dispatch(changeCity(cityName));
    navigate(AppRoute.Main);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{2,}$/;

    if (!passwordRegex.test(password)) {
      toast.warn('The password must contain at least 1 letter and 1 digit');
      return;
    }

    dispatch(loginAction({ login, password }))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Main);
        dispatch(fetchFavoritesOffers());
      });
  };

  return (
    <div className="page page--gray page--login" data-testid="login-page-container">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={login}
                  onChange={(evt) => setLogin(evt.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={handleCityClick}>
                <span>{cityName}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
