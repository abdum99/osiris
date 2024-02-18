import { IResourceComponentsProps } from "@refinedev/core";
import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { useList } from "@refinedev/core";

import { Card } from "antd";
import { Line } from "@ant-design/plots";

export const PlantsPage: React.FC<IResourceComponentsProps> = () => {
  const { data, isDataLoaded } = useList({
    resource: "plants",
    meta: {
      fields: "*",
    },
  })

  if (isDataLoaded) {
    console.log(data)
  }

  const config = {
    data: isDataLoaded? data.data[0].measurement_history: {},
    padding: 'auto',
    xField: ''
  }

  return (
    <>
    <Card>
      {isDataLoaded?
      <Line {...config} />
      :
      <></>
      }
      <h2>
        PLANTS ROCK
      </h2>
    </Card>
    </>
  )
};

