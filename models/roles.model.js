import { apis } from '~/apis';

export const fetchListRoles = () => apis.universityAPI.get('roles').json();
