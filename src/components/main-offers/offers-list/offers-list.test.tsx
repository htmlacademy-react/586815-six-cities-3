import { render, screen } from '@testing-library/react';
import OffersList from './offers-list';
import { makeFakeOffer, makeFakeStore } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';
import { AppRoute } from '../../../const/const';

describe('Component: OffersList', (() => {
  it('should render correctly', () => {
    const offersListContainerTestId = 'offers-list-container';
    const withHistoryComponent = withHistory(<OffersList offers={[makeFakeOffer()]} onOfferHover={() => { }} />, [AppRoute.Main]);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());


    render(withStoreComponent);

    expect(screen.getByTestId(offersListContainerTestId)).toBeInTheDocument();
  });
}));
