import { Fragment, ReactEventHandler } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/store';
import { useParams } from 'react-router-dom';
import { ReviewContentType } from '../../../types/common';
import { toast } from 'react-toastify';
import { sendReviewAction } from '../../../store/thunks/reviews';

type ChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

type RatingType = {
  value: number;
  title: string;
}

const rating: RatingType[] = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' }
];

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState<ReviewContentType>({ comment: '', rating: 0 });
  const [isSending, setIsSending] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { id: offerId } = useParams<{ id: string }>();

  const handleChange: ChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'rating') {
      setReview({ ...review, [name]: Number(value) });
      return;
    }
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setIsSending(true);
    dispatch(sendReviewAction({ offerId: offerId as string, body: review }))
      .unwrap()
      .then(() => {
        toast.success('Review successfully published!');
        setReview({ comment: '', rating: 0 });
      })
      .catch((error) => {
        toast.warn(error as string);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {rating.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-stars`}
              type="radio"
              checked={review.rating === value}
              onChange={handleChange}
              disabled={isSending}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleChange}
        disabled={isSending}
      >{review.comment}
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.comment.length < 50 || review.rating === 0 || isSending}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
