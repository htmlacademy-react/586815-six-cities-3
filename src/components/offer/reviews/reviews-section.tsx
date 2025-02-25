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
  const sortedReviews = reviews?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const reviewsForRender = sortedReviews?.slice(0, renderAmount);
  const isVisibleReviewsRef = useRef(reviewsForRender?.length === sortedReviews?.length);
  const buttonRef = useRef(false);

  if (reviewsAmount > VISIBLE_REVIEWS_AMOUNT) {
    buttonRef.current = true;
  }

  const handleToggleReviewsVisibility = (isVisibleAllReviews: React.MutableRefObject<boolean>) => {
    if (!isVisibleAllReviews.current) {
      setRenderAmount(sortedReviews?.length || 0);
      isVisibleReviewsRef.current = true;
      return;
    }
    setRenderAmount(VISIBLE_REVIEWS_AMOUNT);
    isVisibleReviewsRef.current = false;
  };


  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      {reviewsForRender &&
        <><ReviewsList reviews={reviewsForRender} />
          {buttonRef.current &&
            <ShowMoreReviewsButton onToggleReviewsVisibility={handleToggleReviewsVisibility} isVisibleAllReviews={isVisibleReviewsRef} />}
        </>}
      {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewForm />}
    </section>
  );
}

export default ReviewsSection;
