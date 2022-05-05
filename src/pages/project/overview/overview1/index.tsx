import React, { FC, useEffect } from 'react';

const Overview: FC = () => {
  useEffect(() => {
    console.log('Overview1');
  }, []);
  return (
    <div>
      <span>Overview1</span>
    </div>
  );
};
export default Overview;
