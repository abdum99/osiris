import React from 'react';
import { Switch } from 'antd';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

export const CoffeePage: React.FC = () => {
  return (
  <div>
    <h1>Whatup</h1>
    <Switch defaultChecked onChange={onChange} />
  </div>
  );
};
