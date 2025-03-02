import { AgeResults } from '../types';
import { API_URL } from './fetchData';

export const fetchAge = async ({ name }: { name: string }) => {
  try {
    const endpoint = API_URL + '/api/agify/' + name;
    const result = await fetch(endpoint);
    const data: AgeResults = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
