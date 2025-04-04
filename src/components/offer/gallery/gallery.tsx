import { MAX_IMAGES_COUNT } from '../../../const/const';

type Props = {
  images: string[];
};

export default function Gallery(props: Props): JSX.Element {
  const { images } = props;

  const firstImages = images.slice(0, MAX_IMAGES_COUNT);

  return (
    <div className="offer__gallery-container container" data-testid="offer-gallery-container">
      <div className="offer__gallery">
        {firstImages.map((imageUrl) => (
          <div className="offer__image-wrapper" key={imageUrl}>
            <img className="offer__image" src={imageUrl} alt="Photo studio" />
          </div>)
        )}
      </div>
    </div>
  );
}
