import { getMockStoreCreator, getAxiosAdapter, extractActionsTypes } from '../../utils/mocks';
import { fetchFavoritesOffers, changeFavorite } from './favorites';
import { makeFakeOffer } from '../../utils/mocks';
import { APIRoute } from '../../const';

describe('Favorites async actions', () => {
  const mockStoreCreator = getMockStoreCreator();
  const mockAxiosAdapter = getAxiosAdapter();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ favorites: { items: [] } });
  });

  describe('fetchFavoritesOffers', () => {
    it('should dispatch "fetchFavoritesOffers.pending", "fetchFavoritesOffers.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoritesOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesOffers.pending.type,
        fetchFavoritesOffers.fulfilled.type,
      ]);

      expect(fetchActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoritesOffer.pending", "fetchFavoritesOffers.fulfilled", when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);

      await store.dispatch(fetchFavoritesOffers());

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesOffers.pending.type,
        fetchFavoritesOffers.rejected.type,
      ]);
    });
  });

  describe('changeFavorite', () => {
    const mockProps = {
      offerId: '123',
      status: false
    };
    const mockRoute = `${APIRoute.Favorite}/${mockProps.offerId}/${Number(mockProps.status)}`;

    it('should dispatch "changeFavorite.pending", "changeFavorite.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(mockRoute).reply(200);

      await store.dispatch(changeFavorite(mockProps));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        changeFavorite.pending.type,
        changeFavorite.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavorite.pending", "changeFavorite.rejected", when server response 400', async () => {
      mockAxiosAdapter.onPost(mockRoute).reply(400);

      await store.dispatch(changeFavorite(mockProps));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        changeFavorite.pending.type,
        changeFavorite.rejected.type,
      ]);
    });
  });

});
