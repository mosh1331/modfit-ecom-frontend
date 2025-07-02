// src/utils/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { store } from '@/store'

/** ────────────────────────────────────────────── */
/** 1) Authenticated API (with interceptors + refresh) */
/** ────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_API
function createAuthAPI (): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // send cookies if you use them
    headers: { Accept: 'application/json' }
  })

  let isRefreshing = false
  let refreshSubscribers: ((token: string) => void)[] = []

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb)
  }
  const notifySubscribers = (newToken: string) => {
    refreshSubscribers.forEach(cb => cb(newToken))
    refreshSubscribers = []
  }

  // Attach access token to each request
  //@ts-expect-error
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const { auth } = store.getState()
    if (auth.accessToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
      }
    }
    return config
  })

  // Handle 401 + refresh flow
  instance.interceptors.response.use(
    res => res,
    async err => {
      const originalReq = err.config
      if (err.response?.status === 401 && !originalReq._retry) {
        originalReq._retry = true
        if (!isRefreshing) {
          isRefreshing = true
          const { auth } = store.getState()
          try {
            const { data } = await axios.post(
              `${BASE_URL}/auth/token-refresh`,
              { refresh: auth.refreshToken },
              { withCredentials: true }
            )
            // store.dispatch(
            //   setAuthTokens({ access: data.access, refresh: data.refresh })
            // )
            notifySubscribers(data.access)
          } catch (refreshErr) {
            // store.dispatch(logoutAction())
            return Promise.reject(refreshErr)
          } finally {
            isRefreshing = false
          }
        }
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(token => {
            if (!originalReq.headers) return reject(err)
            originalReq.headers.Authorization = `Bearer ${token}`
            resolve(instance(originalReq))
          })
        })
      }
      return Promise.reject(err)
    }
  )

  return instance
}

/** ────────────────────────────────────────────── */
/** 2) Public API (no auth, no interceptors)        */
/** ────────────────────────────────────────────── */
function createPublicAPI (): AxiosInstance {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: { Accept: 'application/json' }
  })
}

export const authAPI = createAuthAPI()
export const publicAPI = createPublicAPI()
