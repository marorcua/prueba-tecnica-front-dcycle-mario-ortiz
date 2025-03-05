import React from 'react';
import { normalizeCamelCase } from '../lib';

const DragButton = ({
  action,
  title,
}: {
  title: string;
  action: () => void;
}) => {
  return (
    <p className={`m-4 inline-block rounded-2xl bg-gray-300 px-4 py-2 text-sm`}>
      {normalizeCamelCase(title)}
      <span className="m-2 cursor-pointer" onClick={action}>
        X
      </span>
    </p>
  );
};

export default DragButton;
