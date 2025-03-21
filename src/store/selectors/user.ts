import { RootState } from '../../types/state';

const selectUserInfo = (state: RootState) => state.user.info;

export { selectUserInfo };
