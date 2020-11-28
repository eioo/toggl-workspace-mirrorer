import axios, { AxiosRequestConfig } from 'axios';
import rateLimit from 'axios-rate-limit';

// sets max 1 equests per 1 second, other will be delayed
export const http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1000,
});

export async function getRequest<T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig | undefined
): Promise<T> {
  const res = await http.get<T>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    auth: {
      username: localStorage.getItem('toggl-api-token') || '',
      password: 'api_token',
    },
    params,
    ...config,
  });
  return res.data;
}

export async function postRequest<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig | undefined
): Promise<T> {
  const res = await http.post<T>(url, data, {
    auth: {
      username: localStorage.getItem('toggl-api-token') || '',
      password: 'api_token',
    },
    ...config,
  });
  return res.data;
}
