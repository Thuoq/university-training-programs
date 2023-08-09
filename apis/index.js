import ky from 'ky-universal';
import { pathified } from '~/utils';
const { $dispatch } = pathified('layout');

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

export const apis = {};

function createAPI(options) {
  const { apiBaseURL, currentPath, toast } = options;
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
            toast.error('Not Found');
          }
          if (res.status === UNAUTHORIZED && !currentPath.includes('logout')) {
            toast.error('Đăng nhập lại');
          }
          if (!res.ok) {
            const body = await res.json();
            console.log(body.message);
            toast.error(body.message || body || '');
          }
        },
      ],
    },
  });
}

export default async function ({ $config, error, route, $toast }) {
  if (process.client) {
    apis.universityAPI = await createAPI({
      apiBaseURL: $config.API_BASE_URL,
      currentPath: route.path,
      toast: $toast,
    });
  }
}
