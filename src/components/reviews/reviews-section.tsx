import { AuthorizationStatus } from '../../const';
import ReviewsList from './reviews-list';
import ReviewForm from './review-form';

type Props = {
  authorizationStatus: AuthorizationStatus;
}

function ReviewsSection(props: Props): JSX.Element {
  const { authorizationStatus } = props;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
      <ReviewsList />
      {(authorizationStatus === AuthorizationStatus.Auth) && <ReviewForm />}
    </section>
  );
}

export default ReviewsSection;
