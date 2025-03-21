import { CITIES } from '../../const';
import classNames from 'classnames';

type Props = {
  currentCity: string;
  onCityClick: (evt: React.MouseEvent<HTMLAnchorElement>) => void;
}

function Cities(props: Props): JSX.Element {
  const { currentCity, onCityClick } = props;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map((city) => (
              <li key={city} className="locations__item">
                <a
                  className={classNames('locations__item-link', 'tabs__item', {
                    'tabs__item--active': city === currentCity
                  })}
                  data-name={city}
                  onClick={onCityClick}
                  href="#"
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div >
    </>
  );
}

export default Cities;
