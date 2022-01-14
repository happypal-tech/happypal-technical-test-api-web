import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export async function rotateTokens(refreshToken: string) {
  try {
    const { data } = await axios.post<null, AxiosResponse<TokensResponse>>(
      `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/token`,
      null,
      {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    return data;
  } catch (err) {
    setAccessToken(null);
    setRefreshToken(null);
    throw err;
  }
}

type LoginArgs = {
  email: string;
  password: string;
};

export async function login(args: LoginArgs) {
  const { data } = await axios.post<LoginArgs, AxiosResponse<TokensResponse>>(
    `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/login`,
    args,
  );

  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}

type RegisterArgs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function register(args: RegisterArgs) {
  const { data } = await axios.post<RegisterArgs, AxiosResponse<TokensResponse>>(
    `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/register`,
    args,
  );

  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}

type DetermineActionArgs = {
  email: string;
};

export async function determineAction(args: DetermineActionArgs) {
  try {
    await axios.post<DetermineActionArgs, AxiosResponse<TokensResponse>>(
      `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/login`,
      {
        email: args.email,
        password: '_',
      },
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.data?.extensions?.code) {
        case 'auth/user-not-found':
          return 'register';
        case 'auth/invalid-password':
          return 'login';
      }

      throw err;
    } else {
      throw err;
    }
  }
}

type LogoutArgs = {
  all?: boolean;
};

export async function logout(args?: LogoutArgs) {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    await axios.post<LogoutArgs, AxiosResponse<null>>(`${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/logout`, args, {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    });
  }

  setAccessToken(null);
  setRefreshToken(null);
}

type ForgottenPasswordArgs = {
  email: string;
};

export async function forgottenPassword(args: ForgottenPasswordArgs) {
  await axios.post<ForgottenPasswordArgs, AxiosResponse<TokensResponse>>(
    `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/forgotten-password`,
    args,
  );
}

type ResetPasswordArgs = {
  token: string;
  newPassword: string;
};

export async function resetPassword(args: ResetPasswordArgs) {
  await axios.post<ResetPasswordArgs, AxiosResponse<TokensResponse>>(
    `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/reset-password`,
    args,
  );
}

type UpdatePasswordArgs = {
  email: string;
  password: string;
  newPassword: string;
};

export async function updatePassword(args: UpdatePasswordArgs) {
  const { data } = await axios.put<UpdatePasswordArgs, AxiosResponse<TokensResponse>>(
    `${process.env.REACT_APP_API_HTTP_ENDPOINT}/auth/password`,
    args,
  );

  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}

export function setAccessToken(accessToken: string | null) {
  if (accessToken) localStorage.setItem('access_token', accessToken);
  else localStorage.removeItem('access_token');
}

export function setRefreshToken(refreshToken: string | null) {
  if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
  else localStorage.removeItem('refresh_token');
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function isTokenValid(token?: string | null): token is string {
  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode<{ exp: number } | undefined>(token);

  if (!decodedToken) {
    return false;
  } else if (decodedToken.exp * 1000 > Date.now()) {
    return true;
  } else {
    return false;
  }
}
