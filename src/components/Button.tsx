import React from 'react';

type StandardButtonProps = JSX.IntrinsicElements['button'];

export const Button: React.FC<StandardButtonProps> = ({ ...allProps }: StandardButtonProps) => {
  return (
    <button
      {...allProps}
      className="bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded transition ease-in-out duration-200"
    />
  );
};
