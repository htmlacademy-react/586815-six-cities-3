import { AuthorizationStatus } from '../../../const';
import ReviewsList from './reviews-list';
import ReviewForm from './review-form';
import { ReviewType } from '../../../types/common';
import '../../../css/reviews.css';
import { useRef, useState } from 'react';
import { VISIBLE_REVIEWS_AMOUNT } from '../../../const';
import ShowMoreReviewsButton from './show-more-reviews-button';

type Props = {
  authorizationStatus: AuthorizationStatus;
  reviews?: ReviewType[];
}

function ReviewsSection(props: Props): JSX.Element {
  const { authorizationStatus, reviews } = props;
  const reviewsAmount = reviews?.length || 0;
  const [renderAmount, setRenderAmount] = useState(VISIBLE_REVIEWS_AMOUNT);
  const buttonRef = useRef(false);

  if (reviewsAmount > VISIBLE_REVIEWS_AMOUNT) {
    buttonRef.current = true;
  }

  const sortedReviews = reviews?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleShowButtonClick = () => {
    setRenderAmount(sortedReviews?.length || 0);
  };

  const handleHideButtonClick = () => {
    setRenderAmount(VISIBLE_REVIEWS_AMOUNT);
  };

  const reviewsForRender = sortedReviews && sortedReviews.slice(0, renderAmount);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      {reviewsForRender &&
        <><ReviewsList reviews={reviewsForRender} />
          {buttonRef.current &&
            <ShowMoreReviewsButton handleShowButtonClick={handleShowButtonClick} handleHideButtonClick={handleHideButtonClick} />}
        </>}
      {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewForm />}
    </section>
  );
}

export default ReviewsSection;
