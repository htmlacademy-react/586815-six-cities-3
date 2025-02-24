import { useState } from 'react';
import { ShowMoreButtonText } from '../../const';

type Props = {
  handleShowButtonClick: () => void;
  handleHideButtonClick: () => void;
}

function ShowMoreReviewsButton(props: Props): JSX.Element {
  const { handleShowButtonClick, handleHideButtonClick } = props;
  const [buttonText, setButtonText] = useState(ShowMoreButtonText.SHOW);

  const onShowMoreButtonClick = () => {
    if (buttonText === ShowMoreButtonText.SHOW) {
      handleShowButtonClick();
      return setButtonText(ShowMoreButtonText.HIDE);
    }
    handleHideButtonClick();
    setButtonText(ShowMoreButtonText.SHOW);
  };

  return (
    <button className="button button-show-more" onClick={onShowMoreButtonClick}>{buttonText}</button>
  );
}

export default ShowMoreReviewsButton;
