import { IResourceComponentsProps } from "@refinedev/core";
import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { useList } from "@refinedev/core";

import { Card } from "antd";
import { Line } from "@ant-design/plots";

export const PlantsPage: React.FC<IResourceComponentsProps> = () => {
  const { data, isLoading, isErorr } = useList({
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

  const config = {
    data: isLoading? {} : data.data[2].measurement_history,
    padding: 'auto',
    xField: 'time',
    yField: "moisture",
  }

  return (
    <>
    <Card>
      <Line {...config} />
      <h2>
        PLANTS ROCK
      </h2>
    </Card>
    </>
  )
};

