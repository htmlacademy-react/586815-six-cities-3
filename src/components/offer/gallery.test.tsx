import { render, screen } from '@testing-library/react';
import Gallery from './gallery';

describe('Component: Gallery', (() => {
  it('should render correctly', () => {
    const offerGalleryContainerTestId = 'offer-gallery-container';

    render(<Gallery images={['image.jpg']} />);

    expect(screen.getByTestId(offerGalleryContainerTestId)).toBeInTheDocument();
  });
}));
