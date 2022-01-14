import { setContext } from '@apollo/client/link/context';

import { getAccessToken, getRefreshToken, isTokenValid, rotateTokens } from '@services/auth.service';

export const authLink = setContext(async (_request, previousContext) => {
  let accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const accessTokenValid = isTokenValid(accessToken);
  const refreshTokenValid = isTokenValid(refreshToken);

  if (!refreshTokenValid) {
    return previousContext;
  }

  if (!accessTokenValid) {
    try {
      await rotateTokens(refreshToken);
      accessToken = getAccessToken();
    } catch {
      return previousContext;
    }
  }

  return {
    ...previousContext,
    headers: {
      ...previousContext.headers,
      authorization: `Bearer ${accessToken}`,
    },
  };
});
