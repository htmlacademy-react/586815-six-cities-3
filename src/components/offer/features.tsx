type Props = {
  features: string[];
};

export default function Features(props: Props): JSX.Element {
  const { features } = props;
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {features.map((feature) => (
          <li className="offer__inside-item" key={feature}>
            {feature}
          </li>))}
      </ul>
    </div>
  );
}
