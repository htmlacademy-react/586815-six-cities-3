type Props = {
  images: string[];
};

export default function Gallery(props: Props): JSX.Element {
  const { images } = props;


  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((imageUrl) => (
          <div className="offer__image-wrapper" key={imageUrl}>
            <img className="offer__image" src={imageUrl} alt="Photo studio" />
          </div>)
        )}
      </div>
    </div>
  );
}
