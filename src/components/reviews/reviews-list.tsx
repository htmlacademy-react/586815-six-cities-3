import ReviewsItem from './reviews-item';
import { ReviewType } from '../../types/common';

type Props = {
  reviews: ReviewType[];
}

function ReviewsList(props: Props): JSX.Element {
  const { reviews } = props;

  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewsItem key={review.date + review.user.name} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
