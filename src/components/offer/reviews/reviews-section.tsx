import { AuthorizationStatus } from '../../../const';
import ReviewsList from './reviews-list';
import ReviewForm from './review-form';
import { ReviewType } from '../../../types/common';
import '../../../css/reviews.css';
import { useState } from 'react';
import { VISIBLE_REVIEWS_AMOUNT } from '../../../const';
import ShowMoreReviewsButton from './show-more-reviews-button';
import { ShowMoreButtonText } from '../../../const';
import { useEffect } from 'react';

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
  const [isVisibleMoreReviews, setIsVisibleMoreReviews] = useState(false);
  const [isVisibleButton, setIsVisibleButton] = useState(reviewsAmount > VISIBLE_REVIEWS_AMOUNT);


  useEffect(() => {
    setIsVisibleButton(reviewsAmount > VISIBLE_REVIEWS_AMOUNT);
  }, [reviewsAmount]);

  const handleToggleReviewsVisibility = () => {
    setRenderAmount(!isVisibleMoreReviews ? sortedReviews?.length || 0 : VISIBLE_REVIEWS_AMOUNT);
    setIsVisibleMoreReviews(!isVisibleMoreReviews);
  };


  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{reviewsAmount}</span>
      </h2>
      {reviewsForRender &&
        <><ReviewsList reviews={reviewsForRender} />
          {isVisibleButton &&
            <ShowMoreReviewsButton
              onToggleReviewsVisibility={handleToggleReviewsVisibility}
              buttonText={isVisibleMoreReviews ? ShowMoreButtonText.HIDE : ShowMoreButtonText.SHOW}
            />}
        </>}
      {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewForm />}
    </section>
  );
}

export default ReviewsSection;
