import ky from 'ky-universal';
import { pathified } from '~/utils';
const { $dispatch } = pathified('layout');

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

export const apis = {};

function createAPI(options) {
  const { apiBaseURL, error, currentPath } = options;
  return ky.create({
    prefixUrl: apiBaseURL,
    credentials: 'include',
    timeout: 30000,
    hooks: {
      beforeRequest: [
        (req) => {
          $dispatch('setLoading', true);
        },
      ],
      afterResponse: [
        async (req, options, res) => {
          $dispatch('setLoading', false);
          if (res.status === NOT_FOUND) {
            error({ statusCode: 404, message: '存在しないページです。' });
          }
          if (res.status === UNAUTHORIZED && !currentPath.includes('logout')) {
            // const link = document.createElement('a')
            // link.click()
          }
          if (!res.ok) {
            const body = await res.json();
            const error = {
              message: body.message || body || '',
              statusCode: res.status,
            };
            console.log(error);
          }
        },
      ],
    },
  });
}

export default async function ({ $config, error, route }) {
  if (process.client) {
    apis.universityAPI = await createAPI({
      apiBaseURL: $config.API_BASE_URL,
      error,
      currentPath: route.path,
    });
  }
}
