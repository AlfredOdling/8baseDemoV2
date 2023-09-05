const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_8BASE_API_ENDPOINT,
  REACT_APP_APIFY_API_KEY,
  REACT_APP_8BASE_TOKEN,
  REACT_APP_SERVER_URL_LOCAL,

  REACT_APP_NETLIFY_AUTH0_DOMAIN,
  REACT_APP_NETLIFY_AUTH0_CLIENT_ID,
  REACT_APP_NETLIFY_8BASE_API_ENDPOINT,
  REACT_APP_NETLIFY_APIFY_API_KEY,
  REACT_APP_NETLIFY_8BASE_TOKEN,
  REACT_APP_NETLIFY_SERVER_URL_HOSTED,
} = process.env

export const isDev = process.env.NODE_ENV === 'development'

export const env = {
  AUTH0_DOMAIN: isDev ? REACT_APP_AUTH0_DOMAIN : REACT_APP_NETLIFY_AUTH0_DOMAIN,

  AUTH0_CLIENT_ID: isDev
    ? REACT_APP_AUTH0_CLIENT_ID
    : REACT_APP_NETLIFY_AUTH0_CLIENT_ID,

  EIGHTBASE_API_ENDPOINT: isDev
    ? REACT_APP_8BASE_API_ENDPOINT
    : REACT_APP_NETLIFY_8BASE_API_ENDPOINT,

  APIFY_API_KEY: isDev
    ? REACT_APP_APIFY_API_KEY
    : REACT_APP_NETLIFY_APIFY_API_KEY,

  EIGHTBASE_TOKEN: isDev
    ? REACT_APP_8BASE_TOKEN
    : REACT_APP_NETLIFY_8BASE_TOKEN,

  SERVER_URL: isDev
    ? REACT_APP_SERVER_URL_LOCAL
    : REACT_APP_NETLIFY_SERVER_URL_HOSTED,
}
