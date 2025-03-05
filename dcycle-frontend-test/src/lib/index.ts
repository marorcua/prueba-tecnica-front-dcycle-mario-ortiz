import { Data } from '../components/ChartTest';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const convertToChartData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr: { [x: string]: (Record<string, any> | undefined)[] }[],
  yAxis: number
): Data[] => {
  return arr?.map((e) => ({
    label: Object.keys(e)[0],
    data: Object.values(e)[0],
    yAxisID: `y${yAxis}`,
  }));
};
