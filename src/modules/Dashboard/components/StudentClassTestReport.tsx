import { Badge, Card, Col, Row } from "antd";
import ApexCharts from "apexcharts";
import { useEffect, useMemo } from "react";

declare global {
  interface HTMLElement {
    _apexChart?: ApexCharts;
  }
}

const StudentClassTestReport = () => {
  const subjects = useMemo(
    () => [
      { name: "Bangla", marks: 40 },
      { name: "English", marks: 75 },
      { name: "Math", marks: 50 },
    ],
    []
  );

  useEffect(() => {
    const getChartOptions = (marks: number, subjectName: string) => ({
      series: [marks],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: { show: true },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "25%",
            background: "#fff",
            dropShadow: {
              enabled: true,
              top: 3,
              blur: 4,
              opacity: 0.5,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "1%",
            dropShadow: {
              enabled: true,
              top: -3,
              blur: 4,
              opacity: 0.7,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#888",
              fontSize: "10px",
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#ABE5A1"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [subjectName],
    });

    subjects.forEach((subject, index) => {
      const chartElement = document.getElementById(
        `chart-${index}`
      ) as HTMLElement;

      if (chartElement && !chartElement._apexChart) {
        const chart = new ApexCharts(
          chartElement,
          getChartOptions(subject.marks, subject.name)
        );

        chartElement._apexChart = chart;

        chart.render();
      }
    });

    return () => {
      subjects.forEach((_, index) => {
        const chartElement = document.getElementById(
          `chart-${index}`
        ) as HTMLElement;
        if (chartElement && chartElement._apexChart) {
          chartElement._apexChart.destroy();
          delete chartElement._apexChart;
        }
      });
    };
  }, [subjects]);

  return (
    <div>
      <Badge.Ribbon text="Class Tests Report" placement="start">
        <Card className="pt-2">
          <Card className="my-2 bg-gradient-to-r from-teal-500 to-teal-700 shadow-lg rounded-lg">
            <div style={{ textAlign: "center", color: "#fff" }}>
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Class Tests (3)
              </h2>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "lighter",
                  color: "#f1f1f1",
                }}
              >
                Total Marks (150)
              </h3>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "lighter",
                  color: "#f1f1f1",
                }}
              >
                Obtained Marks (105)
              </h3>
            </div>
          </Card>

          <Row gutter={[16, 16]}>
            {subjects.map((_subject, index) => (
              <Col key={index} span={8} lg={8} xl={12} xxl={8} xs={24}>
                <Card>
                  <div id={`chart-${index}`}></div>{" "}
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default StudentClassTestReport;
