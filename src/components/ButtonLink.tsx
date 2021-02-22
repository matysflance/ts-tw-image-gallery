import React from 'react';

type StandardAnchorProps = JSX.IntrinsicElements['a'];

export const ButtonLink: React.FC<StandardAnchorProps> = ({ ...allProps }: StandardAnchorProps) => {
  return (
    <a
      {...allProps}
      className="px-3 py-1 flex justify-center items-center bg-green-500 hover:bg-green-700 text-white transition ease-in-out duration-200"
    >
      {allProps.children}
    </a>
  );
};
