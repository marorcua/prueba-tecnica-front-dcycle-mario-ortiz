import { CovidData } from '../types';

export interface DataSet {
  label: string;
  data: (number | null)[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  yAxisID?: string;
}

export type DataType =
  | 'cases-recovered'
  | 'testing-outcomes'
  | 'hospitalized-deaths'
  | 'hospitalized-states'
  | 'testing-deaths';

export const obtainDataSets = (data: CovidData[], type: DataType) => {
  let datasets: DataSet[] = [];
  switch (type) {
    case 'cases-recovered':
      datasets = [
        {
          label: 'New Cases',
          data: data.map(
            (entry) => entry.cases.total.calculated.change_from_prior_day
          ),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
          yAxisID: 'y1',
        },
        {
          label: 'Recovered',
          data: data.map(
            (entry) =>
              entry.outcomes.hospitalized.currently.calculated
                .change_from_prior_day
          ),
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderWidth: 1,
          yAxisID: 'y2',
        },
      ];
      break;

    case 'testing-outcomes':
      datasets = [
        {
          label: 'Testing Change from Prior Day',
          data: data.map(
            (entry) => entry.testing.total.calculated.change_from_prior_day
          ),
          borderColor: 'rgba(75, 192, 192, 1)', // Teal
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          yAxisID: 'y1',
        },
        {
          label: 'Hospitalized Currently',
          data: data.map(
            (entry) => entry.outcomes.hospitalized.currently.value
          ),
          borderColor: 'rgba(255, 99, 132, 1)', // Red
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          yAxisID: 'y2',
        },
        {
          label: 'Cases Change from Prior Day',
          data: data.map(
            (entry) => entry.cases.total.calculated.change_from_prior_day
          ),
          borderColor: 'rgba(54, 162, 235, 1)', // Blue
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          yAxisID: 'y1',
        },
      ];
      break;
    case 'hospitalized-states':
      datasets = [
        {
          label: 'Hospitalized In ICU',
          data: data.map(
            (entry) => entry.outcomes.hospitalized.in_icu.currently.value
          ),
          borderColor: 'rgba(75, 192, 192, 1)', // Teal
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          yAxisID: 'y1',
        },
        {
          label: 'Hospitalized On Ventilator',
          data: data.map(
            (entry) => entry.outcomes.hospitalized.on_ventilator.currently.value
          ),
          borderColor: 'rgba(255, 99, 132, 1)', // Red
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          yAxisID: 'y1',
        },
        {
          label: 'Deaths change per day',
          data: data.map(
            (entry) =>
              entry.outcomes.death.total.calculated.change_from_prior_day
          ),
          borderColor: 'rgba(54, 162, 235, 1)', // Blue
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          yAxisID: 'y2',
        },
      ];
      break;
    case 'hospitalized-deaths':
      datasets = [
        {
          label: 'Hospitalized currently',
          data: data.map(
            (entry) => entry.outcomes.hospitalized.currently.value
          ),
          borderColor: 'rgba(75, 192, 192, 1)', // Teal
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          yAxisID: 'y1',
        },
        {
          label: 'Deaths Change from Prior Day',
          data: data.map(
            (entry) =>
              entry.outcomes.death.total.calculated.change_from_prior_day
          ),
          borderColor: 'rgba(255, 99, 132, 1)', // Red
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          yAxisID: 'y2',
        },
      ];
      break;
    default:
      break;
  }
  return datasets;
};
