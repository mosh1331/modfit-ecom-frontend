// src/utils/api.ts
import axios, { AxiosInstance } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API

/**
 * ──────────────────────────────────────────────
 * 1) Authenticated API (sends credentials/cookies)
 * ──────────────────────────────────────────────
 */
function createAuthAPI (): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // sends cookie (access + refresh)
    headers: {
      Accept: 'application/json',
    }
  })

  // Handle 401 errors and attempt silent refresh
  instance.interceptors.response.use(
    res => res,
    async err => {
      const originalReq = err.config

      // Only retry once
      if (err.response?.status === 401 && !originalReq._retry) {
        originalReq._retry = true

        try {
          // Attempt refresh token (refresh cookie sent automatically)
          await axios.post(`${BASE_URL}/api/auth/refresh-token`, null, {
            withCredentials: true,
          })

          // Retry the original request
          return instance(originalReq)
        } catch (refreshErr) {
          // Optionally: redirect to login or clear app state
          return Promise.reject(refreshErr)
        }
      }

      return Promise.reject(err)
    }
  )

  return instance
}

/**
 * ──────────────────────────────────────────────
 * 2) Public API (no auth, no interceptors)
 * ──────────────────────────────────────────────
 */
function createPublicAPI (): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: { Accept: 'application/json' }
  })
}

export const authAPI = createAuthAPI()
export const publicAPI = createPublicAPI()
