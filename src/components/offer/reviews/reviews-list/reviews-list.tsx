import ReviewsItem from '../reviews-item/reviews-item';
import { ReviewType } from '../../../../types/common';

type Props = {
  reviews: ReviewType[];
}

function ReviewsList(props: Props): JSX.Element {
  const { reviews } = props;

  return (
    <ul className="reviews__list" data-testid="reviews-list-container">
      {reviews.map((review) => <ReviewsItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
