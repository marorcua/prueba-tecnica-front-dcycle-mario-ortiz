import { UserInfo } from '../types';
import { fetchAge } from './fetchAge';
import { fetchGender } from './fetchGender';
import { fetchNationalities } from './fetchNationalities';

export const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserInfo = async (name: string): Promise<UserInfo> => {
  if (!name) {
    return {
      name,
      error: 'Nombre vacío, por favor completa el nombre.',
    };
  }
  try {
    const response = await Promise.all([
      fetchGender({ name }),
      fetchAge({ name }),
      fetchNationalities({ name }),
    ]);

    const [genderData, ageData, nationalitiesData] = response;

    return {
      name,
      genderData,
      ageData,
      nationalitiesData,
    };
  } catch (error) {
    console.log(error);
    return {
      name,
      error: 'No se pudo obtener la información. Inténtalo de nuevo.',
    };
  }
};
