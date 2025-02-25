type Props = {
  onToggleReviewsVisibility: () => void;
  buttonText: string;
}

function ShowMoreReviewsButton(props: Props): JSX.Element {
  const { onToggleReviewsVisibility, buttonText } = props;

  const handleButtonClick = () => {
    onToggleReviewsVisibility();
  };

  return (
    <button className="button button-show-more" onClick={handleButtonClick}>{buttonText}</button>
  );
}

export default ShowMoreReviewsButton;
