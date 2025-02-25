import { useState } from 'react';
import { ShowMoreButtonText } from '../../../const';

type Props = {
  onToggleReviewsVisibility: (isVisibleAllReviews: React.MutableRefObject<boolean>) => void;
  isVisibleAllReviews: React.MutableRefObject<boolean>;
}

function ShowMoreReviewsButton(props: Props): JSX.Element {
  const { onToggleReviewsVisibility, isVisibleAllReviews } = props;
  const [buttonText, setButtonText] = useState(ShowMoreButtonText.SHOW);

  const handleToggleButtonText = () => {
    if (isVisibleAllReviews.current) {
      return setButtonText(ShowMoreButtonText.SHOW);
    }
    setButtonText(ShowMoreButtonText.HIDE);
  };

  const handleButtonClick = () => {
    handleToggleButtonText();
    onToggleReviewsVisibility(isVisibleAllReviews);
  };

  return (
    <button className="button button-show-more" onClick={handleButtonClick}>{buttonText}</button>
  );
}

export default ShowMoreReviewsButton;
