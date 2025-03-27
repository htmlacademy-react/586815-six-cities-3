import { AuthStatus, RequestStatus } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import { getUserInfo, getAuthStatus } from './user';

describe('User selectors', () => {
  const mockUserInfo = makeFakeUserData();
  const state = {
    user: {
      info: mockUserInfo,
      authStatus: AuthStatus.Auth,
      status: RequestStatus.Succeeded
    }
  };

  it('should return user info from state', () => {
    const expectedData = mockUserInfo;
    const result = getUserInfo(state);
    expect(result).toEqual(expectedData);
  });

  it('should return auth status from state', () => {
    const expectedStatus = AuthStatus.Auth;
    const result = getAuthStatus(state);
    expect(result).toBe(expectedStatus);
  });
});
