import { UserInfo } from '../types';

export const handleErrorMessage = (response: UserInfo) => {
  const errorKeys = (Object.keys(response) as (keyof UserInfo)[])
    .filter((key) => !response[key])
    .join(', ');

  return errorKeys;
};
