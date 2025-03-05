import { UserInfo } from '../types';

export const handleErrorMessage = (response: UserInfo) => {
  const errorKeys = (Object.keys(response) as (keyof UserInfo)[])
    .filter((key) => !response[key])
    .join(', ');

  return errorKeys;
};

export const normalizeCamelCase = (str: string) =>
  str
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });

export const byString = function (o: Record<string, any>, s: string) {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};
