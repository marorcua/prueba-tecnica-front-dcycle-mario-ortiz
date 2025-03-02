import { GenderResults } from '../types';
import { API_URL } from './fetchData';

export const fetchGender = async ({ name }: { name: string }) => {
  try {
    const endpoint = API_URL + '/api/genderize/' + name;

    const result = await fetch(endpoint);
    const data: GenderResults = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
