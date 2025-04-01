import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { getMockStoreCreator, getAxiosAdapter } from './mocks';
import { State } from '../types/state';
import { Provider } from 'react-redux';


export function withHistory(component: JSX.Element, initialEntries?: string[]) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </MemoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const mockAxiosAdapter = getAxiosAdapter();
  const mockStoreCreator = getMockStoreCreator();
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
