import React from "react";
import * as d3 from "d3";
import "../css/line-chart.css";

export default (props) => {
  const d3Component = React.useRef();
  const createChart = () => {
    if (props.data.length === 0) return;
    console.log("x", props.data.length);
    const width = 960;
    const height = 500;
    const margin = 5;
    const padding = 5;
    const adj = 30;
    // we are appending SVG first
    const svg = d3
      .select(d3Component.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr(
        "viewBox",
        "-" +
          adj * 3 +
          " -" +
          adj +
          " " +
          (width + adj) +
          " " +
          (height + adj * 3)
      )
      .style("padding", padding)
      .style("margin", margin)
      .classed("svg-content", true);

    //-----------------------------DATA-----------------------------//
    let myData = [
      {
        date: "20-Jul-2019",
        A: 10,
        B: 20,
        C: 16,
      },
      {
        date: "20-Jul-2019",
        A: 10,
        B: 20,
        C: 16,
      },
      {
        date: "21-Jul-2019",
        A: 11,
        B: 22,
        C: 18,
      },
      {
        date: "22-Jul-2019",
        A: 13,
        B: 19,
        C: 21,
      },
      {
        date: "23-Jul-2019",
        A: 11,
        B: 17,
        C: 22,
      },
      {
        date: "24-Jul-2019",
        A: 15,
        B: 16,
        C: 20,
      },
      {
        date: "25-Jul-2019",
        A: 16,
        B: 19,
        C: 18,
      },
      {
        date: "26-Jul-2019",
        A: 19,
        B: 21,
        C: 18,
      },
      {
        date: "27-Jul-2019",
        A: 22,
        B: 25,
        C: 15,
      },
      {
        date: "28-Jul-2019",
        A: 18,
        B: 24,
        C: 12,
      },
      {
        date: "29-Jul-2019",
        A: 14,
        B: 20,
        C: 16,
      },
      {
        date: "30-Jul-2019",
        A: 14,
        B: 18,
        C: 18,
      },
      {
        date: "31-Jul-2019",
        A: 16,
        B: 18,
        C: 21,
      },
      {
        date: "01-Aug-2019",
        A: 15,
        B: 20,
        C: 22,
      },
      {
        date: "02-Aug-2019",
        A: 14,
        B: 21,
        C: 19,
      },
    ];
    myData = props.data;
    const mySeries = props.series;
    const timeConv = d3.timeParse("%d-%b-%Y");
    const slices = mySeries.map((s) => ({
      id: s,
      values: myData.map((d) => ({
        date: timeConv(d.date),
        measurement: +d[s],
      })),
    }));
    console.log(slices);

    //----------------------------SCALES----------------------------//
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    xScale.domain(
      d3.extent(myData, function (d) {
        return timeConv(d.date);
      })
    );
    yScale.domain([
      0,
      d3.max(slices, function (c) {
        return d3.max(c.values, function (d) {
          return d.measurement + 4;
        });
      }),
    ]);

    //-----------------------------AXES-----------------------------//
    const yaxis = d3.axisLeft().ticks(slices[0].values.length).scale(yScale);

    const xaxis = d3
      .axisBottom()
      .ticks(d3.timeDay.every(1))
      .tickFormat(d3.timeFormat("%b %d"))
      .scale(xScale);

    //----------------------------LINES-----------------------------//
    const line = d3
      .line()
      .x(function (d) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d.measurement);
      });

    let id = 0;
    const ids = function () {
      return "line-" + id++;
    };
    //-------------------------2. DRAWING---------------------------//
    //-----------------------------AXES-----------------------------//
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xaxis);

    svg
      .append("g")
      .attr("class", "axis")
      .call(yaxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy", ".75em")
      .attr("y", 6)
      .style("text-anchor", "end")
      .text("Frequency");

    //----------------------------LINES-----------------------------//
    const lines = svg.selectAll("lines").data(slices).enter().append("g");

    lines
      .append("path")
      .attr("class", ids)
      .attr("d", function (d) {
        return line(d.values);
      });

    lines
      .append("text")
      .attr("class", "serie_label")
      .datum(function (d) {
        return {
          id: d.id,
          value: d.values[d.values.length - 1],
        };
      })
      .attr("transform", function (d) {
        return (
          "translate(" +
          (xScale(d.value.date) + 10) +
          "," +
          (yScale(d.value.measurement) + 5) +
          ")"
        );
      })
      .attr("x", 5)
      .text(function (d) {
        return "Serie " + d.id;
      });
  };
  React.useEffect(() => {
    createChart();
    // d3.select(d3Component.current).style("background-color", "blue");
  }, [props.data]);
  return <div ref={d3Component}></div>;
};
