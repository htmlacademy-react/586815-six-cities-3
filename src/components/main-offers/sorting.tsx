import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { SortingOptions } from '../../const';

type Props = {
  onSortOptionChange: (sortType: string) => void;
};

function Sorting(props: Props): JSX.Element {
  const { onSortOptionChange: onSortingOptionChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(SortingOptions.POPULAR);
  const sortingRef = useRef<HTMLFormElement>(null);
  const sortingOptions = Object.values(SortingOptions);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideDropdownClick = (evt: MouseEvent) => {
    if (sortingRef.current && !sortingRef.current.contains(evt.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOptionChange = (option: string) => {
    setCurrentOption(option);
    onSortingOptionChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideDropdownClick);

    return () => {
      document.removeEventListener('click', handleOutsideDropdownClick);
    };
  }, []);

  return (
    <form
      ref={sortingRef}
      className="places__sorting"
      action="#" method="get"
    >
      <span className="places__sorting-caption" > Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleDropdownToggle}
      >
        {currentOption}
        < svg className="places__sorting-arrow" width="7" height="4" >
          <use xlinkHref="#icon-arrow-select" > </use>
        </svg>
      </span>
      < ul
        className={classNames('places__options places__options--custom',
          isOpen ? 'places__options--opened' : 'places__options--closed')}
      >
        {sortingOptions.map((option) => (
          <li
            key={option}
            className={classNames('places__option', option === currentOption && 'places__option--active')}
            tabIndex={0}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form >
  );
}

export default Sorting;
