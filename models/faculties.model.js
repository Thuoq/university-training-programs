import { apis } from '~/apis';
export const fetchListFaculties = () => apis.universityAPI.get('faculties').json();
