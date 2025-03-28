import { RootState } from '../../types/state';

const getUserInfo = (state: Pick<RootState, 'user'>) => state.user.info;
const getAuthStatus = (state: Pick<RootState, 'user'>) => state.user.authStatus;

export { getUserInfo, getAuthStatus };
