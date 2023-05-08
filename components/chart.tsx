"use client";
import useSWR from "swr";
import {
  Card,
  Title,
  Text,
  ColGrid,
  Col,
  Block,
  Button,
  AreaChart,
} from "@tremor/react";
import Navbar from "./navbar";

interface ChartProps {
  id: string | string[] | undefined;
}

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Chart({ id }: ChartProps) {
  const { data, error, isLoading } = useSWR(
    `/api/getCoinHistoryData/${id}/`,
    fetcher
  );

  let coinName = id?.at(0)?.toUpperCase() + id?.slice(1, id.length);
  if (error) coinName = "An error has occurred.";
  if (isLoading) coinName = "Loading...";

  return (
    <main>
      <Navbar />
      <ColGrid numColsLg={6} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        {/* Main section */}
        <Col numColSpanLg={4}>
          <Card hFull={true}>
            <Title>{coinName}</Title>
            <Text>Price chart over last 90 days.</Text>
            <AreaChart
              data={data}
              categories={["Price"]}
              dataKey="Date"
              colors={["green"]}
              valueFormatter={valueFormatter}
              height="h-96"
            />
          </Card>
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <Block spaceY="space-y-6">
            <Card>
              <div className="h-24" />
            </Card>
            <Card>
              <div className="h-24" />
            </Card>
            <Card>
              <div className="h-24" />
            </Card>
          </Block>
        </Col>
      </ColGrid>
    </main>
  );
}
