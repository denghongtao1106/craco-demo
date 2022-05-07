import React, { FC, useEffect } from 'react';

const Overview: FC = () => {
  useEffect(() => {
    console.log('Overview');
  }, []);
  return (
    <div>
      <span>Overview</span>
    </div>
  );
};
export default Overview;
