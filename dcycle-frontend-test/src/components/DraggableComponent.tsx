import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { byString, convertToChartData, normalizeCamelCase } from '../lib';
import { Data } from './ChartZoomable';
import { CovidData } from '../types';
import DragButton from './DragButton';

const metrics: Record<string, string> = {
  dailyCases: 'cases.total.calculated.change_from_prior_day',
  accumulatedCases: 'cases.total.value',
  dailyDeaths: 'outcomes.death.total.calculated.change_from_prior_day',
  deathsSevenDayAvg: 'outcomes.death.total.calculated.seven_day_average',
  accumulatedDeaths: 'outcomes.death.total.value',
  dailyHospitalized:
    'outcomes.hospitalized.currently.calculated.change_from_prior_day',
  hospitalizedSevenDayAvg:
    'outcomes.hospitalized.currently.calculated.seven_day_average',
  accumulatedHospitalized: 'outcomes.hospitalized.in_icu.currently.total.value',
  dailyHospitalizedInIcu:
    'outcomes.hospitalized.in_icu.currently.calculated.change_from_prior_day',
  inIcuSevenDayAvg:
    'outcomes.hospitalized.in_icu.currently.calculated.seven_day_average',
  accumulatedHospitalizedInIcu: 'outcomes.hospitalized.in_icu.currently.value',
  dailyHospitalizedOnVentilatior:
    'outcomes.hospitalized.on_ventilator.currently.calculated.change_from_prior_day',
  onVentilatiorSevenDayAvg:
    'outcomes.hospitalized.on_ventilator.currently.calculated.seven_day_average',
  accumulatedHospitalizedOnVentilatior:
    'outcomes.hospitalized.on_ventilator.currently.value',
  dailyTesting: 'testing.total.calculated.change_from_prior_day',
  accumulatedTesting: 'testing.total.value',
};

function DraggableComponent({
  setSelectedData,
  filteredData,
}: {
  setSelectedData: Dispatch<SetStateAction<Data[]>>;
  filteredData: CovidData[];
}) {
  const [axis1Metrics, setAxis1Metrics] = useState<string[]>([]);
  const [axis2Metrics, setAxis2Metrics] = useState<string[]>([]);
  const handleDrop = (metric: string, axis: number) => {
    if (axis === 1) {
      setAxis1Metrics((prev) => [...new Set([...prev, metric])]);
      setAxis2Metrics((prev) => prev.filter((m) => m !== metric));
    } else {
      setAxis2Metrics((prev) => [...new Set([...prev, metric])]);
      setAxis1Metrics((prev) => prev.filter((m) => m !== metric));
    }
  };

  useEffect(() => {
    function filteredArray(arr: string[]) {
      if (arr.length === 0) return [];
      const dataToShow = arr.map((metric) => ({
        [metric]: filteredData.map((e) => byString(e, metrics[metric])),
      }));
      console.log(dataToShow);
      return dataToShow;
    }
    setSelectedData([
      ...convertToChartData(filteredArray(axis1Metrics), 1),
      ...convertToChartData(filteredArray(axis2Metrics), 2),
    ]);
  }, [axis1Metrics, axis2Metrics, filteredData, setSelectedData]);
  return (
    <>
      <h2 className="m-auto px-2 py-4 text-center text-3xl">
        Drag the following buttons to the axis!!!
      </h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(metrics).map((metric: string) => (
          <button
            key={metric}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('metric', metric)}
            className={`cursor-grab rounded-2xl px-4 py-2 text-sm ${'bg-gray-200'}`}
          >
            {normalizeCamelCase(metric)}
          </button>
        ))}
      </div>
      <div className="mb-4 flex justify-between gap-4 rounded-lg">
        <div
          className="min-h-[50px] w-1/2 rounded-md border bg-gray-100 p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e.dataTransfer.getData('metric'), 1)}
        >
          <h3 className="font-bold">Axis 1</h3>
          {axis1Metrics.map((metric) => (
            <DragButton
              key={metric}
              title={metric}
              action={() =>
                setAxis1Metrics((prev) => prev.filter((m) => m !== metric))
              }
            />
          ))}
        </div>
        <div
          className="min-h-[50px] w-1/2 rounded-lg rounded-md border bg-gray-100 p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e.dataTransfer.getData('metric'), 2)}
        >
          <h3 className="font-bold">Axis 2</h3>
          {axis2Metrics.map((metric) => (
            <DragButton
              key={metric}
              title={metric}
              action={() =>
                setAxis2Metrics((prev) => prev.filter((m) => m !== metric))
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DraggableComponent;
