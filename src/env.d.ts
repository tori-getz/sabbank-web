/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_STORAGE_URL: string
    readonly VITE_APP_SOCKET_URL: string

    readonly VITE_APP_INTERCOM_APP_ID: string
    readonly VITE_APP_COIN_GECKO_URL: string
    readonly VITE_APP_SENTRY_DSN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}