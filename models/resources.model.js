import { apis } from '~/apis';
export const getListResource = () => apis.universityAPI.get('resources').json();
