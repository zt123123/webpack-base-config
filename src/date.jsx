import React from "react";

import { DatePicker } from "antd";

import { List, Typography, Divider } from 'antd';

const data = [
'Racing car sprays burning fuel into crowd.',
'Japanese princess to wed commoner.',
'Australian walks 100km after outback crash.',
'Man charged over missing wedding girl.',
'Los Angeles battles huge wildfires.',
];

function onChange(date, dateString) {
  console.log(date, dateString);
}

export default () => [
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />,
  <DatePicker onChange={onChange} />];
