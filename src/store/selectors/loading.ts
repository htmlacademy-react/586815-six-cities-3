import { RootState } from '../../types/state';

const getLoadingStatus = (state: Pick<RootState, 'loading'>) => state.loading.isLoading;

export { getLoadingStatus };
