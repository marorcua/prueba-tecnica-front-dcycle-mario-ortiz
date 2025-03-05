import React from 'react';

function ChartSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse rounded-sm border border-gray-100 p-4 shadow-sm md:p-6 dark:border-gray-400"
    >
      <div className="mb-2.5 h-2.5 w-32 rounded-full bg-gray-100 dark:bg-gray-400"></div>
      <div className="mb-10 h-2 w-48 rounded-full bg-gray-100 dark:bg-gray-400"></div>
      <div className="mt-4 flex items-baseline">
        <div className="h-72 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
        <div className="ms-6 h-56 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
        <div className="ms-6 h-72 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
        <div className="ms-6 h-64 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
        <div className="ms-6 h-80 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
        <div className="ms-6 h-72 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
        <div className="ms-6 h-80 w-full rounded-t-lg bg-gray-100 dark:bg-gray-400"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default ChartSkeleton;
