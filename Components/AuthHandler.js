import axios from "axios";
import { getAccessToken, removeFromStorage } from "./Tokens";
const host = "";

const conn = axios.create({
  url: host,
  headers: { "Content-Type": "application/json" },
});

conn.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

conn.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") removeFromStorage();
      }
    }
    throw error;
  }
);
export async function login(data) {
  const response = await axios.post(host, data);
}
/*
export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await instance<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data,
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},
	async getNewTokens() {
		const refreshToken = getRefreshToken()

		if (!refreshToken) return
		const response = await axios.post<string, { data: IAuthResponse }>(
			import.meta.env.VITE_SERVER_URL + 'auth/login/access-token',
			{ refreshToken },
			{ headers: getContentType() }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	async logout() {
		removeFromStorage()
	},
}


*/
