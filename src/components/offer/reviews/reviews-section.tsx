import ReviewsList from './reviews-list';
import ReviewForm from './review-form';
import { ReviewType } from '../../../types/common';
import '../../../css/reviews.css';
import { useState } from 'react';
import { VISIBLE_REVIEWS_AMOUNT } from '../../../const';
import { ShowMoreButtonText } from '../../../const';
import { useEffect } from 'react';
import useAuth from '../../../hooks/auth';

type Props = {
  reviews?: ReviewType[];
}

function ReviewsSection(props: Props): JSX.Element {
  const { reviews } = props;

  const [renderAmount, setRenderAmount] = useState(VISIBLE_REVIEWS_AMOUNT);
  const [isVisibleMoreReviews, setIsVisibleMoreReviews] = useState(false);
  const [isVisibleButton, setIsVisibleButton] = useState(false);

  const isAuth = useAuth();

  const reviewsAmount = reviews?.length || 0;
  const reviewsForRender = reviews?.slice(0, renderAmount);

  useEffect(() => {
    setIsVisibleButton(reviewsAmount > VISIBLE_REVIEWS_AMOUNT);
  }, [reviewsAmount]);

  const handleButtonClick = () => {
    setRenderAmount(!isVisibleMoreReviews ? reviewsAmount : VISIBLE_REVIEWS_AMOUNT);
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
            <button
              className="button button-show-more"
              onClick={handleButtonClick}
            >
              {isVisibleMoreReviews ? ShowMoreButtonText.HIDE : ShowMoreButtonText.SHOW}
            </button>}
        </>}
      {isAuth && <ReviewForm />}
    </section>
  );
}

export default ReviewsSection;
