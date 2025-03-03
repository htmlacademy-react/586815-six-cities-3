import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { SortingOptions } from '../../const';

type Props = {
  onSortOptionChange: (sortType: string) => void;
};

const enum ClassNamesSortingList {
  SORTING_OPTIONS_CLOSED = 'places__options--closed',
  SORTING_OPTIONS_OPENED = 'places__options--opened',
}

function Sorting(props: Props): JSX.Element {
  const { onSortOptionChange: onSortingOptionChange } = props;
  const [classNameSortingList, setClassNameSortingList] = useState(ClassNamesSortingList.SORTING_OPTIONS_CLOSED);
  const [currentOption, setCurrentOption] = useState(SortingOptions.POPULAR);
  const sortingRef = useRef<HTMLFormElement>(null);
  const sortingOptions = Object.values(SortingOptions);

  const handleDropdownToggle = () => {
    setClassNameSortingList((prevState) => prevState === ClassNamesSortingList.SORTING_OPTIONS_CLOSED
      ? ClassNamesSortingList.SORTING_OPTIONS_OPENED
      : ClassNamesSortingList.SORTING_OPTIONS_CLOSED);
  };

  const handleOutsideDropdownClick = (evt: MouseEvent) => {
    if (sortingRef.current && !sortingRef.current.contains(evt.target as Node)) {
      setClassNameSortingList(ClassNamesSortingList.SORTING_OPTIONS_CLOSED);
    }
  };

  const handleOptionChange = (option: string) => {
    setCurrentOption(option);
    onSortingOptionChange(option);
    setClassNameSortingList(ClassNamesSortingList.SORTING_OPTIONS_CLOSED);
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
        className={classNames('places__options places__options--custom', classNameSortingList)}
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
