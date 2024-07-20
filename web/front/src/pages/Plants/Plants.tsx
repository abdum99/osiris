import { IResourceComponentsProps } from "@refinedev/core";
import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { useList } from "@refinedev/core";

import { Card, Row, Col } from "antd";
import { Line, Liquid } from "@ant-design/plots";

export const PlantsPage: React.FC = () => {
  const { data, isLoading, isError } = useList({
    resource: "plants",
    meta: {
      fields: "*",
    },
  })

  if (isLoading) {
    return (
      <Card>
        Loading...
      </Card>
    );
  }

  const lineConfig = {
    data: isLoading? {} : data?.data[2]?.measurement_history,
    padding: 'auto',
    xField: 'time',
    yField: "moisture",
  }

  const liquidConfig = {
    percent: 0.25,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };

  return (
    <>
    <Row>
      <Col span={16}>
        <Card>
          <h2>
            PLANTS ROCK
          </h2>
          <Line {...lineConfig} />
        </Card>
      </Col>
      <Col span={4}>
        <Liquid {...liquidConfig} />;
      </Col>
    </Row>
    </>
  )
};

