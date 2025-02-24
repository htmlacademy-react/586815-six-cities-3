import { ReviewType } from '../../../types/common';
import { SCALE_RATING } from '../../../const';
import classNames from 'classnames';

type Props = {
  review: ReviewType;
}

function ReviewsItem(props: Props): JSX.Element {
  const { comment, date, rating, user } = props.review;
  const { avatarUrl, isPro, name } = user;

  const parsedDate = new Date(date);

  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  });


  const formattedDate = formatter.format(parsedDate);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={classNames('reviews__avatar-wrapper user__avatar-wrapper',
          isPro && 'reviews__avatar-wrapper--pro')}
        >
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating * SCALE_RATING}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={parsedDate.toISOString().split('T')[0]}>{formattedDate}</time>
      </div>
    </li >
  );
}

export default ReviewsItem;
