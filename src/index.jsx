import React, { useState, useCallback, useMemo, memo } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import MyDate from "./date";
import classnames from "classnames";
import map from "lodash/map";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider, Table, Tag } from "antd";
import { add } from "./util";

// import "./index.css";
// import "./index.less";

const Button = (props) => {
  const { onClick } = props;
  return <button onClick={onClick}>click123</button>;
};

Button.propTypes = {
  onClick: PropTypes.bool,
};

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];

const App = () => {
  const [count, setCount] = useState(0);
  const increase = useCallback(() => {
    setCount(count + 1);
  });
  return (
    <ConfigProvider locale={zhCN}>
      <h1
        className={classnames("title", {
          green: count % 2 === 0,
          red: count % 2 !== 0,
        })}
      >
        {count}
      </h1>
      <Button onClick={increase} />
      <MyDate />
      <div>1111</div>
      {map([1, 2, 3, 4, 5, 6], (i) => {
        return <Tag>{i}</Tag>;
      })}
      <Table dataSource={dataSource} columns={columns} />
    </ConfigProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
